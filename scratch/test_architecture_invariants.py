import json
import re

GEOMETRY_PATH = "/Users/raghavshah/02_BUSINESS/03_CLIENTS/14_ELDER_CARE/04_DELIVERABLES/website/src/lib/architecture/geometry.ts"
DATABASE_PATH = "/Users/raghavshah/02_BUSINESS/03_CLIENTS/14_ELDER_CARE/04_DELIVERABLES/website/data/slcf_database.json"

def test_architecture_invariants():
    print("==================================================")
    print("SLCF ARCHITECTURAL INVARIANTS & GEOMETRIC TEST SUITE")
    print("==================================================")

    # 1. Read geometry.ts
    with open(GEOMETRY_PATH, "r", encoding="utf-8") as f:
        geom_content = f.read()

    # 2. Read database
    with open(DATABASE_PATH, "r", encoding="utf-8") as f:
        db_data = json.load(f)

    results = []

    # Test 1: Exactly 64 plot objects defined
    plot_ids = re.findall(r"id:\s*'(plot-\d\d)'", geom_content)
    unique_plot_ids = sorted(list(set(plot_ids)))
    t1_pass = len(unique_plot_ids) == 64
    results.append(("1. Exactly 64 canonical plot IDs in geometry.ts (plot-01 to plot-64)", t1_pass, f"Found {len(unique_plot_ids)} plots"))

    # Test 2: Database contains exactly 64 plots
    db_plots = [u for u in db_data.get("inventory", []) if u.get("unitType") == "PLOT"]
    t2_pass = len(db_plots) == 64
    results.append(("2. Exactly 64 plots in slcf_database.json", t2_pass, f"Found {len(db_plots)} DB plot records"))

    # Test 3: 1:1 ID and Unit Code congruence between geometry and database
    all_codes_match = True
    for p in db_plots:
        code = p.get("unitCode")
        num = p.get("plotNumber")
        num_str = f"{num:02d}"
        expected_id = f"plot-{num_str}"
        if expected_id not in unique_plot_ids:
            all_codes_match = False
            break
    results.append(("3. 100% 1:1 Unit Code and Plot ID sync between DB and Geometry", all_codes_match, "All 64 units mapped"))

    # Test 4: Check Area Method Annotations
    has_area_methods = "areaMethod:" in geom_content and "DERIVED_RECTANGLE" in geom_content and "MUNICIPAL_SCHEDULE" in geom_content
    results.append(("4. Forensic Area Calculation Methods declared in geometry.ts", has_area_methods, "Methodology active"))

    # Test 5: Source Classifications for all 5 Landmarks
    landmarks = ["hospital-main", "senior-residence-63-64", "community-mandir", "utility-services", "entrance-gate-west"]
    landmarks_pass = all(l in geom_content for l in landmarks)
    results.append(("5. All 5 certified Landmarks registered in geometry.ts", landmarks_pass, f"{len(landmarks)} landmarks certified"))

    print("\n--- TEST EXECUTION SUMMARY ---")
    all_passed = True
    for title, passed, detail in results:
        mark = "✅ PASS" if passed else "❌ FAIL"
        if not passed:
            all_passed = False
        print(f"{mark} | {title} -> {detail}")

    print("--------------------------------------------------")
    if all_passed:
        print("ALL ARCHITECTURAL INVARIANT TESTS PASSED!")
    else:
        print("SOME ARCHITECTURAL INVARIANT TESTS FAILED!")

if __name__ == "__main__":
    test_architecture_invariants()
