export interface SafetyDevice {
  id: string;
  name: string;
  category: 'Emergency Trigger' | 'AI Fall Sensor' | 'Vitals Telemetry' | 'Medication & Routine';
  tagline: string;
  priceBuy: number;
  priceRentPerMonth: number;
  image: string;
  features: string[];
  specs: { [key: string]: string };
  bestFor: string;
  includedInPlans: string[];
}

export const safetyDevicesData: SafetyDevice[] = [
  {
    id: 'sos-pendant-247',
    name: 'Aeterna SafeTouch™ 4G SOS Panic Pendant',
    category: 'Emergency Trigger',
    tagline: 'Waterproof 1-touch emergency trigger with 2-way cellular speaker & GPS locator.',
    priceBuy: 4999,
    priceRentPerMonth: 499,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    features: [
      'Built-in 4G SIM (no smartphone or Wi-Fi required)',
      '1-press direct connect to 24/7 Aeterna Emergency Command Center',
      '2-way speakerphone with crystal-clear loud audio',
      'IP67 100% waterproof for bathroom and shower safety',
      'Battery lasts up to 7 days on a single magnetic charge'
    ],
    specs: {
      Connectivity: '4G LTE Cellular + GPS + Wi-Fi Positioning',
      Weight: '38 grams (lightweight neck pendant or wristband)',
      Battery: 'Rechargeable Li-Ion (Magnetic USB Dock)',
      Durability: 'IP67 Waterproof & Drop-Resistant'
    },
    bestFor: 'Seniors living alone who need instant emergency access anywhere in the house or during walks.',
    includedInPlans: ['Platinum Comprehensive', 'Diamond Concierge']
  },
  {
    id: 'ai-fall-radar',
    name: 'Aeterna GuardianRadar™ AI Fall Detection Sensor',
    category: 'AI Fall Sensor',
    tagline: 'Zero-camera millimeter-wave radar that detects falls instantly without invading privacy.',
    priceBuy: 8999,
    priceRentPerMonth: 899,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    features: [
      '100% Privacy Safe: Uses radio millimeter waves, ZERO optical cameras',
      'Detects sudden falls in bathrooms, bedrooms, and hallways in < 1.2 seconds',
      'Auto-triggers ambulance & alerts family app even if senior is unconscious',
      'Tracks breathing rate & room occupancy patterns in real-time',
      'Pet-immune algorithm prevents false alarms from dogs/cats'
    ],
    specs: {
      Coverage: '20 x 20 ft room area (wall or ceiling mount)',
      Technology: '60GHz mmWave Radar + On-Device AI Neural Engine',
      Power: 'Direct AC Wall Adapter with 12-hour battery backup',
      AlertTime: '< 1.5 seconds to 24/7 dispatch desk'
    },
    bestFor: 'Bathroom and wet-area fall prevention where seniors cannot wear pendants or cameras are not acceptable.',
    includedInPlans: ['Diamond Concierge']
  },
  {
    id: 'tele-vitals-kit',
    name: 'Aeterna VitalSync™ Connected Telehealth Suite',
    category: 'Vitals Telemetry',
    tagline: 'Bluetooth medical devices that auto-upload BP, Sugar, and SpO2 to Family Portal.',
    priceBuy: 6499,
    priceRentPerMonth: 699,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    features: [
      'Automated Bluetooth sync — zero manual writing in diaries',
      'Includes Digital Voice BP Monitor, Blood Glucometer, and Pulse Oximeter',
      'AI algorithm flags sudden spikes or drops directly to attending physician',
      'Weekly automated PDF health summary generated for family doctor',
      'Multi-user support for both mother and father'
    ],
    specs: {
      IncludedHardware: 'BP Cuff + Glucometer + SpO2 Probe + Digital Thermometer',
      SyncMethod: 'Bluetooth 5.2 to Family Mobile Gateway',
      Certifications: 'CE Medical, FDA 510(k), ISO 13485 Medical Grade'
    },
    bestFor: 'Hypertensive, cardiac, and diabetic seniors needing daily telemetry without hospital visits.',
    includedInPlans: ['Gold Essential', 'Platinum Comprehensive', 'Diamond Concierge']
  },
  {
    id: 'smart-pill-dispenser',
    name: 'Aeterna MedMinder™ Smart Automatic Pill Dispenser',
    category: 'Medication & Routine',
    tagline: 'Timed rotating pill carousel with audio alarm & family missed-dose alerts.',
    priceBuy: 5499,
    priceRentPerMonth: 599,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    features: [
      'Holds 28 days of medication with motorized locked compartments',
      'Flashing LED and loud audio chime at exact prescription times',
      'Rotates and opens ONLY the correct compartment to prevent accidental double-dosing',
      'Sends instant SMS/WhatsApp notification to children if dose is not taken within 30 minutes',
      'Pre-loaded and audited weekly by our visiting Registered Nurse'
    ],
    specs: {
      Capacity: '28 compartments (up to 6 doses per day)',
      Lock: 'Keyed physical lock to prevent confusion or polypharmacy errors',
      Battery: 'AC Plug + 48-Hour Rechargeable Backup'
    },
    bestFor: 'Seniors with complex medication schedules or mild cognitive impairment.',
    includedInPlans: ['Platinum Comprehensive', 'Diamond Concierge']
  }
];
