
import { db } from "./src/lib/db/repository.ts";
import { broadcastBusinessEvent, eventBus } from "./src/lib/events/eventBus.ts";

console.log("==================================================================");
console.log("RUNTIME PERSISTENCE & CONCURRENCY AUDIT");
console.log("==================================================================");

// 1. Check inventory count
const inv = db.getInventory();
console.log("Inventory total units count:", inv.length);
const available = inv.filter(u => u.status === "AVAILABLE").length;
const onHold = inv.filter(u => u.status === "HOLD").length;
const sold = inv.filter(u => u.status === "SOLD").length;
console.log(`Units Status: ${available} Available, ${onHold} Hold, ${sold} Sold`);

// 2. Test Single-Process Concurrent Reservation Safety
console.log("\n--- Simulating Concurrent Reservation of Same Unit ---");
const testUnit = inv.find(u => u.status === "AVAILABLE");
if (testUnit) {
  console.log("Target Unit:", testUnit.unitCode, "(ID: " + testUnit.id + ")");
  
  // Attempt 1: User A reserves
  try {
    const resA = db.createBookingWithHold({
      unitId: testUnit.id,
      customerName: "Auditor User A",
      customerPhone: "+91 98765 43210",
      customerEmail: "userA@audit.test",
      holdHours: 24
    });
    console.log("  ✓ User A reservation: SUCCESS (Booking ID: " + resA.booking.bookingNumber + ")");
  } catch (err) {
    console.error("  ✗ User A reservation failed:", err.message);
  }

  // Attempt 2: User B tries to reserve SAME unit
  try {
    const resB = db.createBookingWithHold({
      unitId: testUnit.id,
      customerName: "Auditor User B",
      customerPhone: "+91 98765 43211",
      customerEmail: "userB@audit.test",
      holdHours: 24
    });
    console.error("  ✗ User B reservation: UNEXPECTED SUCCESS (RACE CONDITION DETECTED!)");
  } catch (err) {
    console.log("  ✓ User B reservation: CORRECTLY REJECTED with error:", err.message);
  }
}

// 3. Test Real-Time Event Bus Subscription in node
console.log("\n--- Testing Event Bus Subscription ---");
let eventReceived = false;
eventBus.once("inventory.updated", (evt) => {
  eventReceived = true;
  console.log("  ✓ Realtime Event Bus received event:", evt.type, "for entity:", evt.entityId);
});

broadcastBusinessEvent("inventory.updated", "public", "INVENTORY", "UNIT-TEST-01", { status: "HOLD" });
console.log("Event Bus Dispatched and Received Sync:", eventReceived);
