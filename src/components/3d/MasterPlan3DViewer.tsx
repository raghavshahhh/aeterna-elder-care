'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { PlotItem } from '@/types';
import { allPlots, plotsSummary, projectOverview } from '@/data/propertyData';
import {
  CANONICAL_PLOTS,
  CANONICAL_LANDMARKS,
  BLOCK_COLORS,
  getPlotGeometryByNumber,
  BlockId,
  SourceClassification
} from '@/lib/architecture/geometry';
import { useModal } from '@/context/ModalContext';
import {
  Layers,
  Rotate3d,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sparkles,
  Building2,
  Compass,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Trees,
  Heart,
  Eye,
  Activity,
  ArrowRight,
  Home,
  X,
  Phone,
  MessageSquare,
  FileText,
  Search,
  ZoomIn,
  Navigation,
  Sliders,
  Check,
  Calendar,
  Lock,
  Info,
  Car,
  DoorOpen,
  Waves,
  Sun,
  Flame
} from 'lucide-react';

interface MasterPlan3DViewerProps {
  onSelectPlot?: (plot: PlotItem) => void;
  onToggle2DView?: () => void;
}

type LandmarkType = 'hospital' | 'mandir' | 'residence' | 'gate' | 'utility' | 'park';

interface LandmarkInfo {
  id: LandmarkType;
  title: string;
  badge: string;
  category: string;
  area: string;
  dimensions: string;
  floors: string;
  description: string;
  features: string[];
  cadZone: string;
  cadCoordinates: { x: number; y: number };
  sourceConfidence: SourceClassification;
  subFeatures?: { title: string; desc: string }[];
}

const LANDMARK_REGISTRY: Record<LandmarkType, LandmarkInfo> = {
  hospital: {
    id: 'hospital',
    title: '30,000 Sq. Ft. Multi-Speciality & Ayurvedic Hospital',
    badge: 'On-Site Healthcare Continuum',
    category: 'Healthcare & Wellness',
    area: '30,000 sq. ft. Built-Up Area (G+2)',
    dimensions: '117\x27-10\" \times 138\x27-0\" (35.92m \times 42.06m) L-Shaped Footprint',
    floors: 'G+2 Structural Hospital with Stretcher Lift Core',
    description: 'Authoritative multi-speciality hospital featuring dedicated Panchakarma Ayurvedic detox suites, 24/7 Geriatric Emergency with ambulance portico, 6 OPD doctor consultation chambers, Cathlab, 1.5T MRI / 128-Slice CT diagnostics, major modular OT, ICU, inpatient wards, and rooftop hydrotherapy pool with 50-seat open auditorium and open-sky terrace deck.',
    features: [
      'Ground Floor: Yoga Hall (34\x27-2\" \times 49\x27-0\"), 6 OPDs, Reception & Waiting (25\x27-7\" \times 50\x27-1\"), Emergency Bay & 10 Panchakarma Suites',
      'First Floor: Cardiac Cathlab, 1.5T MRI, 128-Slice CT, Modular OT, ICU & Inpatient Wards',
      'Second Floor: 50-Seat Tiered Auditorium, Hydrotherapy Pool (10\x27 \times 12\x27) & Open-Sky Roof Terrace Deck (39\x27-2\" \times 56\x27-11\")',
      '24/7 Ambulance Docking Portico on 33ft Highway Frontage'
    ],
    cadZone: 'South-West Healthcare Zone (Facing 33ft Main Highway)',
    cadCoordinates: { x: -25.77, y: 27.58 },
    sourceConfidence: 'SOURCE_VERIFIED',
    subFeatures: [
      { title: 'Ground Floor', desc: 'Yoga Hall, 6 OPDs, Emergency Resuscitation, 10 Panchakarma Detox Suites, Central Reception Atrium, Cafeteria & Pharmacies' },
      { title: 'First Floor', desc: 'Major Surgical OT, ICU, 1.5T MRI, 128-Slice CT, Cathlab, Dialysis Unit, Male/Female Inpatient Recovery Wards' },
      { title: 'Second Floor & Roof', desc: '50-Seat Tiered Open Auditorium, Hydrotherapy Translucent Pool, Louvered Pergola, 2,230 sq.ft. Open Sky Terrace Deck' }
    ]
  },
  residence: {
    id: 'residence',
    title: 'G+2 Senior Care Residences on Plots 63 & 64',
    badge: '14 Stilt Bays • G+2 Assisted Living',
    category: 'Plotted Residences',
    area: '50\x27-6\" \times 46\x27-0\" (260 Sq. Yds. / 2,340 Sq. Ft.)',
    dimensions: '46\x27-0\" \times 50\x27-6\" + 3\x27-6\" Front Cantilever Balconies',
    floors: 'Stilt Parking + Ground + 1st + 2nd Residential Floors + Roof Lift Tower',
    description: 'Dedicated senior living apartment building on Plots 63 & 64 featuring 14 covered stilt parking bays (6 North, 2 Center, 6 South pattern), 3 distinct South entry portals, 16 RC column structural grid, West senior staircase, East stretcher elevator, and barrier-free 1 BHK & 1 RK suites with cantilevered balconies.',
    features: [
      '14 Covered Stilt Parking Bays (6 North + 2 Center + 6 South pattern)',
      '3 Separate Entrance Gates on South Facade along 22\x27-6\" Spine Rasta',
      '16 Reinforced Concrete Structural Columns (4 \times 4 grid, 450mm \times 450mm)',
      'West Senior Staircase Core & East 8-Passenger Stretcher Elevator Shaft',
      'Residential Suites: Unit 01 (1 BHK Left), Unit 02 (1 RK Center), Unit 03 (1 BHK Deluxe Right)'
    ],
    cadZone: 'Block A (Plots 63 & 64, East of Ayurvedic Hospital along 22\x27-6\" Spine Rasta)',
    cadCoordinates: { x: -11.13, y: 13.56 },
    sourceConfidence: 'SOURCE_VERIFIED',
    subFeatures: [
      { title: 'Stilt Level', desc: '14 Covered Parking Bays, 3 South Portals, 16 Columns with Safety Collars, Electric Mobility Carts, Lift & Stair Access' },
      { title: 'Typical Floors (1st-3rd)', desc: 'Unit 01 (1 BHK Left), Unit 02 (1 RK Studio Center), Unit 03 (1 BHK Deluxe Right), 3\x27-6\" Cantilever Balconies' }
    ]
  },
  mandir: {
    id: 'mandir',
    title: 'Community Mandir & Sacred Reflection Kund (425 SQYD)',
    badge: 'Spiritual Sanctuary • 3,825 SQFT',
    category: 'Spirituality & Culture',
    area: '425 Sq. Yds. (3,825 Sq. Ft.) Dedicated Temple Land',
    dimensions: '85\x27-0\" \times 45\x27-0\" (25.91m \times 13.72m) Sandstone Plinth',
    floors: 'Traditional Carved Mandapa + 7-Tier Shikhara + Stepped Kund',
    description: 'Sacred temple sanctuary constructed in hand-carved Rajasthani sandstone on a dedicated 425 sq.yd. (3,825 sq.ft.) parcel along the East boundary. Features an East-facing Garbhagriha, 7-tiered carved Shikhara with a gilded gold Kalasha, an 8-columned Mandapa prayer hall, step-free senior access ramp, Torana gateway arch, and a 24\x27 \times 18\x27 stepped Sacred Reflection Kund with concentric stone ghats.',
    features: [
      'Dedicated 425 Sq. Yds. (3,825 Sq. Ft.) Temple Land Parcel (85\x27 \times 45\x27)',
      'East-Facing Garbhagriha Sanctum Sanctorum for Positive Vastu Energy',
      '7-Tiered Carved Sandstone Shikhara Spire with 24K Gilded Gold Kalasha',
      'Mandapa Prayer Hall supported by 8 Hand-Carved Stone Pillars',
      'Stepped Sacred Reflection Kund (24\x27 \times 18\x27) with Concentric Stone Ghats',
      'Elder-Friendly Step-Free Approach Ramp for Wheelchair & Assisted Walking',
      'Surrounded by Fragrant Tulsi, Parijat & Marigold Sacred Garden'
    ],
    cadZone: 'Block A (South-East Temple Enclave along East Boundary & 33ft Highway)',
    cadCoordinates: { x: -30.71, y: -10.53 },
    sourceConfidence: 'SOURCE_VERIFIED',
    subFeatures: [
      { title: 'Sanctum & Shikhara', desc: 'Traditional Vastu-compliant Garbhagriha with 7-tier Shikhara spire rising 12m, crowned with a gold Kalasha and Dhwaja' },
      { title: 'Sacred Reflection Kund', desc: 'Stepped freshwater Kund (24\x27 \times 18\x27) with stone ghat steps for morning aarti, peaceful meditation, and evening satsang' }
    ]
  },
  gate: {
    id: 'gate',
    title: '33ft Main Arterial Highway & SH-22 Access Portals',
    badge: 'Gated Security Checkpoint',
    category: 'Infrastructure & Access',
    area: '33ft Dual Highway Access Corridors',
    dimensions: '33\x27-0\" Wide Road Network (SH-22 & Reliance MET Direct)',
    floors: '24/7 Security Post & Automatic Boom Barrier Check',
    description: 'Direct highway frontage connecting to State Highway 22 (Jhajjar-Bahadurgarh Road) and NH-71 / Reliance MET City with 24/7 manned security checkpoint and CCTV surveillance.',
    features: [
      '33ft Main Arterial East-West & West Boundaries',
      '24/7 Guarded Boom Barrier & Number-Plate Scanner Checkpoint',
      'Direct Connectivity to Reliance MET City, Chhudani & Gurugram',
      'Continuous 5ft & 6ft Perimeter Green Belts with Native Amaltas Trees'
    ],
    cadZone: 'West & Central 33ft Highway Frontages',
    cadCoordinates: { x: -43.67, y: 0 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  utility: {
    id: 'utility',
    title: 'Township Utility Services Enclave (289 SQYD)',
    badge: 'Civic Infrastructure',
    category: 'Utilities & Power',
    area: '289 Sq. Yds. Dedicated Enclave (48\x27 \times 54\x27)',
    dimensions: 'North-East Perimeter Sector (Behind Plot 15)',
    floors: 'Ground Utility Substation & Water Treatment',
    description: 'Dedicated infrastructure compound housing underground water filtration reservoir, electrical power transformer substation, and 24/7 maintenance operations.',
    features: [
      'Dedicated 289 SQYD Utility Demarcation on North-East Boundary',
      'Underground Potable Water Filtration & Rainwater Harvesting Units',
      'Dedicated Power Transformer Substation with 100% DG Backup',
      '24/7 Facility Management & Security Control Station'
    ],
    cadZone: 'North-East Corner (Behind Plot 15 & 11ft Perimeter Rasta)',
    cadCoordinates: { x: 45.66, y: -62.65 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  park: {
    id: 'park',
    title: '5ft & 6ft Continuous Green Tree Buffer Belts',
    badge: 'Eco Green Buffer',
    category: 'Landscaping & Nature',
    area: 'Perimeter Green Belts along 33ft Arterial Road',
    dimensions: '5ft & 6ft Continuous Landscaped Strips',
    floors: 'Botanical Tree & Herbal Buffers',
    description: 'Pristine natural environment with native Amaltas, Neem, and medicinal herbal tree lines buffering the residences from road corridors with anti-skid walking paths.',
    features: [
      '6ft Green Buffer along North Parcel Boundary',
      '5ft Green Buffer along South Parcel Boundary',
      'Continuous Non-Slip Senior Walking Promenades',
      'Solar-Powered LED Streetlight Network along all Rastas'
    ],
    cadZone: 'Central & Peripheral Buffer Strips',
    cadCoordinates: { x: 0, y: 0 },
    sourceConfidence: 'SOURCE_VERIFIED'
  }
};

// ─── High-Resolution Procedural Canvas Texture Generators ───────────────────────

function createPlotCanvasTexture(
  number: number,
  sizeSqYd: number,
  blockName: string,
  blockColorHex: number,
  dimensions?: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // 1. High-Quality Block Background
  const hexStr = '#' + blockColorHex.toString(16).padStart(6, '0');
  ctx.fillStyle = hexStr;
  ctx.fillRect(0, 0, 512, 512);

  // 2. Crisp White Inset Panel
  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.fillRect(16, 16, 480, 480);

  // 3. Dark Contrast Outer & Inner Border
  ctx.strokeStyle = '#071519';
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, 496, 496);

  ctx.strokeStyle = 'rgba(7, 21, 25, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, 456, 456);

  // 4. White Marble Corner Markers
  ctx.fillStyle = '#FFFFFF';
  [[20, 20], [472, 20], [20, 472], [472, 472]].forEach(([px, py]) => {
    ctx.fillRect(px - 8, py - 8, 16, 16);
  });

  // 5. Header: Block Badge Pill
  ctx.fillStyle = 'rgba(7, 21, 25, 0.85)';
  ctx.beginPath();
  ctx.roundRect(86, 44, 340, 54, 27);
  ctx.fill();

  ctx.fillStyle = '#FAF8F5';
  ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${blockName.toUpperCase()} • FREEHOLD`, 256, 71);

  // 6. Center: Giant High-Contrast Plot Number
  ctx.fillStyle = '#071519';
  ctx.font = '900 160px -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // White outline shadow around plot number for 100% legibility at any angle
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;
  ctx.strokeText(String(number), 256, 215);
  ctx.fillText(String(number), 256, 215);

  // 7. Area in Square Yards Pill
  ctx.fillStyle = '#071519';
  ctx.beginPath();
  ctx.roundRect(64, 320, 384, 68, 16);
  ctx.fill();

  ctx.fillStyle = '#E0AB77';
  ctx.font = 'bold 42px -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, monospace';
  ctx.fillText(`${sizeSqYd} SQ. YDS.`, 256, 354);

  // 8. Bottom Dimensions Text
  ctx.fillStyle = '#071519';
  ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, monospace';
  const dimText = dimensions || `${Math.round(sizeSqYd * 9)} SQ. FT.`;
  ctx.fillText(dimText, 256, 435);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  return tex;
}

function createMasterGroundTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1a3324';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 20000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const g = 40 + Math.random() * 35;
    ctx.fillStyle = `rgb(${g - 16}, ${g + 14}, ${g - 10})`;
    ctx.fillRect(x, y, 1.5, 2.5);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(16, 16);
  return tex;
}

function createHighwayAsphaltTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#222527';
  ctx.fillRect(0, 0, 512, 128);

  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 128;
    const v = 34 + Math.random() * 22;
    ctx.fillStyle = `rgb(${v}, ${v + 2}, ${v + 3})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  // Yellow Curb Edges
  ctx.strokeStyle = '#D9A74A';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.lineTo(512, 8);
  ctx.moveTo(0, 120);
  ctx.lineTo(512, 120);
  ctx.stroke();

  // White Dashed Centerline
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 4;
  ctx.setLineDash([24, 18]);
  ctx.beginPath();
  ctx.moveTo(0, 64);
  ctx.lineTo(512, 64);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 1);
  return tex;
}

function createRastaTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#343a3e';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const v = 45 + Math.random() * 25;
    ctx.fillStyle = `rgb(${v}, ${v + 2}, ${v + 3})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  // Paved Stone Cobble Pattern
  ctx.strokeStyle = 'rgba(20, 24, 28, 0.45)';
  ctx.lineWidth = 2;
  for (let y = 0; y < 256; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function createGreenBeltTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#144222';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const g = 55 + Math.random() * 45;
    ctx.fillStyle = `rgb(${g - 22}, ${g + 18}, ${g - 14})`;
    ctx.fillRect(x, y, 2, 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 2);
  return tex;
}

function disposeScene(scene: THREE.Scene) {
  scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry?.dispose();
      if (Array.isArray(obj.material)) {
        obj.material.forEach((m) => {
          if (m.map) m.map.dispose();
          m.dispose();
        });
      } else if (obj.material) {
        if (obj.material.map) obj.material.map.dispose();
        obj.material.dispose();
      }
    }
  });
  scene.clear();
}

// ─── Main MasterPlan3DViewer Component ─────────────────────────────────────────

export const MasterPlan3DViewer: React.FC<MasterPlan3DViewerProps> = ({
  onSelectPlot,
  onToggle2DView
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openWhatsApp, openLeadDrawer, openFloorPlanModal } = useModal();

  const [selectedBlock, setSelectedBlock] = useState<string>('All');
  const [selectedPlotId, setSelectedPlotId] = useState<string>('plot-1');
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkType | null>(null);
  const [activeInspectorTab, setActiveInspectorTab] = useState<'details' | 'cad-map' | 'specs'>('details');
  const [viewPreset, setViewPreset] = useState<'isometric' | 'top' | 'hospital' | 'highway' | 'residence' | 'mandir'>('isometric');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // CAD Overlay QA Mode
  const [isCadOverlay, setIsCadOverlay] = useState<boolean>(false);
  const [cadOpacity, setCadOpacity] = useState<number>(0.75);
  const [plotsOpacity, setPlotsOpacity] = useState<number>(0.85);

  // Live Inventory Sync
  const [liveInventory, setLiveInventory] = useState<Record<string, { status: string; price: number }>>({});

  useEffect(() => {
    setMounted(true);

    async function loadLiveInventory() {
      try {
        const res = await fetch('/api/inventory');
        if (res.ok) {
          const data = await res.json();
          const map: Record<string, { status: string; price: number }> = {};
          (data.units || []).forEach((u: any) => {
            if (u.id) map[u.id.toLowerCase()] = { status: u.status, price: u.price };
            if (u.unitCode) map[u.unitCode.toLowerCase()] = { status: u.status, price: u.price };
          });
          setLiveInventory(map);
        }
      } catch (err) {
        console.warn('[3D Masterplan] Live inventory fetch skipped:', err);
      }
    }
    loadLiveInventory();
  }, []);

  const getPlotLiveStatus = (plot: any): { status: string; label: string; badgeClass: string; isAvailable: boolean } => {
    const idKey = plot.id.toLowerCase();
    const numKey = plot.plotNumber.toLowerCase();
    const cleanId = `plot-a-${plot.id.replace('plot-', '').padStart(2, '0')}`;
    const rawStatus = liveInventory[idKey]?.status || liveInventory[numKey]?.status || liveInventory[cleanId]?.status || 'AVAILABLE';

    if (rawStatus === 'SOLD') {
      return { status: 'SOLD', label: 'Sold / Registered', badgeClass: 'bg-rose-950/80 text-rose-300 border-rose-500/40', isAvailable: false };
    }
    if (rawStatus === 'RESERVED') {
      return { status: 'RESERVED', label: 'Reserved', badgeClass: 'bg-purple-950/80 text-purple-300 border-purple-500/40', isAvailable: false };
    }
    if (rawStatus === 'HOLD') {
      return { status: 'HOLD', label: '24h Priority Hold', badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-500/40', isAvailable: false };
    }
    return { status: 'AVAILABLE', label: 'Available', badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40', isAvailable: true };
  };

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const plotMeshesRef = useRef<{ [plotNumber: number]: THREE.Mesh }>({});
  const landmarkMeshesRef = useRef<THREE.Group[]>([]);
  const cadOverlayMeshRef = useRef<THREE.Mesh | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const animationFrameId = useRef<number | null>(null);
  const selectedPlotMeshRef = useRef<THREE.Mesh | null>(null);
  const onSelectPlotRef = useRef(onSelectPlot);

  useEffect(() => {
    onSelectPlotRef.current = onSelectPlot;
  }, [onSelectPlot]);

  // Keyboard Escape listener for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Smooth Orbit Controls State
  const orbitRef = useRef({
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    theta: Math.PI / 4.2,
    phi: Math.PI / 3.4,
    radius: 120,
    targetTheta: Math.PI / 4.2,
    targetPhi: Math.PI / 3.4,
    targetRadius: 120,
    lookAt: new THREE.Vector3(0, 0, 15),
    targetLookAt: new THREE.Vector3(0, 0, 15)
  });

  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    const o = orbitRef.current;

    o.theta += (o.targetTheta - o.theta) * 0.08;
    o.phi += (o.targetPhi - o.phi) * 0.08;
    o.radius += (o.targetRadius - o.radius) * 0.08;
    o.lookAt.lerp(o.targetLookAt, 0.08);

    const sinPhiRadius = Math.sin(o.phi) * o.radius;
    cameraRef.current.position.x = o.lookAt.x + sinPhiRadius * Math.sin(o.theta);
    cameraRef.current.position.y = o.lookAt.y + Math.cos(o.phi) * o.radius;
    cameraRef.current.position.z = o.lookAt.z + sinPhiRadius * Math.cos(o.theta);

    cameraRef.current.lookAt(o.lookAt);
  }, []);

  // Three.js Initialization & Scene Construction
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x071519);
    scene.fog = new THREE.FogExp2(0x071519, 0.0035);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.5, 600);
    cameraRef.current = camera;
    updateCameraPosition();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfffaed, 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff3d6, 1.8);
    sunLight.position.set(65, 110, -50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 300;
    sunLight.shadow.camera.left = -90;
    sunLight.shadow.camera.right = 90;
    sunLight.shadow.camera.top = 90;
    sunLight.shadow.camera.bottom = -90;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    const hemiLight = new THREE.HemisphereLight(0x88c4d8, 0x1e3828, 0.6);
    scene.add(hemiLight);

    // Materials
    const masterGroundTex = createMasterGroundTexture();
    const highwayTex = createHighwayAsphaltTexture();
    const rastaTex = createRastaTexture();
    const greenBeltTex = createGreenBeltTexture();

    const masterGroundMat = new THREE.MeshStandardMaterial({
      map: masterGroundTex,
      roughness: 0.92,
      metalness: 0.05
    });

    const highwayRoadMat = new THREE.MeshStandardMaterial({
      map: highwayTex,
      color: 0x32383c,
      roughness: 0.82
    });

    const rastaMat = new THREE.MeshStandardMaterial({
      map: rastaTex,
      color: 0x444b50,
      roughness: 0.84
    });

    const greenBeltMat = new THREE.MeshStandardMaterial({
      map: greenBeltTex,
      color: 0x225530,
      roughness: 0.88
    });

    const buildingWallMat = new THREE.MeshStandardMaterial({ color: 0xeee7db, roughness: 0.65 });
    const sandstoneMat = new THREE.MeshStandardMaterial({ color: 0xd8ba8f, roughness: 0.72 });
    const bronzeAccentMat = new THREE.MeshStandardMaterial({ color: 0x48382c, metalness: 0.85, roughness: 0.3 });
    const goldAccentMat = new THREE.MeshStandardMaterial({ color: 0xc58f58, metalness: 0.75, roughness: 0.25 });
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0x8a9296, roughness: 0.85 });
    const limestoneMat = new THREE.MeshStandardMaterial({ color: 0xe6ded1, roughness: 0.6 });
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x15728a,
      roughness: 0.08,
      metalness: 0.85,
      transparent: true,
      opacity: 0.85
    });
    const glassFacadeMat = new THREE.MeshStandardMaterial({
      color: 0x88c4d8,
      roughness: 0.08,
      metalness: 0.25,
      transparent: true,
      opacity: 0.55
    });

    // ─── 1. Township Master Ground Terrain (240m × 240m) ───────────────────
    const masterTerrain = new THREE.Mesh(new THREE.PlaneGeometry(240, 240), masterGroundMat);
    masterTerrain.rotation.x = -Math.PI / 2;
    masterTerrain.position.set(0, 0, 25);
    masterTerrain.receiveShadow = true;
    scene.add(masterTerrain);

    // ─── 1B. CAD Vector Overlay Plane ──────────────────────────────────────
    const masterCadTexLoader = new THREE.TextureLoader();
    const masterCadGeo = new THREE.PlaneGeometry(175, 195);
    const masterCadMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const masterCadMesh = new THREE.Mesh(masterCadGeo, masterCadMat);
    masterCadMesh.rotation.x = -Math.PI / 2;
    masterCadMesh.position.set(0, 0.06, 25);
    masterCadMesh.visible = false;
    scene.add(masterCadMesh);
    cadOverlayMeshRef.current = masterCadMesh;

    masterCadTexLoader.load('/project-assets/architecture/cad/previews/masterplan-real.jpg', (tex) => {
      tex.anisotropy = 8;
      masterCadMat.map = tex;
      masterCadMat.needsUpdate = true;
    });

    // ─── 2. Road Network (Strict CAD Dimensions & Widths) ─────────────────

    // A. Central Arterial Highway: ROAD 33'-0" WIDE (10.06m) — East-West Dividing Road
    const centralHighway = new THREE.Mesh(new THREE.PlaneGeometry(120, 10.06), highwayRoadMat);
    centralHighway.rotation.x = -Math.PI / 2;
    centralHighway.position.set(4, 0.025, 0);
    centralHighway.receiveShadow = true;
    scene.add(centralHighway);

    // B. West Highway Corridor: ROAD 33'-0" WIDE (10.06m) — Running North-South
    const westHighway = new THREE.Mesh(new THREE.PlaneGeometry(10.06, 180), highwayRoadMat);
    westHighway.rotation.x = -Math.PI / 2;
    westHighway.position.set(-43.67, 0.02, 25);
    westHighway.receiveShadow = true;
    scene.add(westHighway);

    // C. Central North-South Spine: RASTA 22'-6" WIDE (6.86m) — Connecting North and South
    const centralRastaSpine = new THREE.Mesh(new THREE.PlaneGeometry(6.86, 180), rastaMat);
    centralRastaSpine.rotation.x = -Math.PI / 2;
    centralRastaSpine.position.set(0, 0.02, 25);
    centralRastaSpine.receiveShadow = true;
    scene.add(centralRastaSpine);

    // D. North Sector RASTA 20'-0" WIDE (6.10m) — Separating Plots 10-15 and 21-16
    const northRasta20 = new THREE.Mesh(new THREE.PlaneGeometry(50, 6.10), rastaMat);
    northRasta20.rotation.x = -Math.PI / 2;
    northRasta20.position.set(28, 0.022, -37.65);
    northRasta20.receiveShadow = true;
    scene.add(northRasta20);

    // E. North Perimeter RASTA 11'-0" WIDE (3.35m) — Along North Boundary
    const northPerimeterRasta11 = new THREE.Mesh(new THREE.PlaneGeometry(50, 3.35), rastaMat);
    northPerimeterRasta11.rotation.x = -Math.PI / 2;
    northPerimeterRasta11.position.set(28, 0.022, -57.0);
    northPerimeterRasta11.receiveShadow = true;
    scene.add(northPerimeterRasta11);

    // F. Mid-East Sector RASTA 20'-0" WIDE (6.10m) — Between Plots 31-33 and Plots 34-36
    const midEastRasta20 = new THREE.Mesh(new THREE.PlaneGeometry(26, 6.10), rastaMat);
    midEastRasta20.rotation.x = -Math.PI / 2;
    midEastRasta20.position.set(16, 0.022, 38.56);
    midEastRasta20.receiveShadow = true;
    scene.add(midEastRasta20);

    // G. Hospital Front RASTA 20'-0" WIDE (6.10m) — Below Hospital and Plots 61-64
    const hospFrontRasta20 = new THREE.Mesh(new THREE.PlaneGeometry(36, 6.10), rastaMat);
    hospFrontRasta20.rotation.x = -Math.PI / 2;
    hospFrontRasta20.position.set(-18.5, 0.022, 51.66);
    hospFrontRasta20.receiveShadow = true;
    scene.add(hospFrontRasta20);

    // H. West South RASTA 16'-6" WIDE (5.03m) — Along Block E Plots 55-60
    const westSouthRasta16 = new THREE.Mesh(new THREE.PlaneGeometry(5.03, 62), rastaMat);
    westSouthRasta16.rotation.x = -Math.PI / 2;
    westSouthRasta16.position.set(-36.75, 0.022, 85);
    westSouthRasta16.receiveShadow = true;
    scene.add(westSouthRasta16);

    // ─── 3. Green Buffer Belts (6ft North & 5ft South Strips from CAD) ────
    const northGreenBelt = new THREE.Mesh(new THREE.PlaneGeometry(100, 1.83), greenBeltMat);
    northGreenBelt.rotation.x = -Math.PI / 2;
    northGreenBelt.position.set(6, 0.03, -5.95);
    scene.add(northGreenBelt);

    const southGreenBelt = new THREE.Mesh(new THREE.PlaneGeometry(100, 1.52), greenBeltMat);
    southGreenBelt.rotation.x = -Math.PI / 2;
    southGreenBelt.position.set(6, 0.03, 5.79);
    scene.add(southGreenBelt);

    // ─── 4. Landmark 1: Proposed 30,000 Sq. Ft. Multi-Speciality Ayurvedic Hospital (G+2) ───
    const hospitalGroup = new THREE.Group();
    hospitalGroup.name = 'landmark-hospital';
    hospitalGroup.position.set(-25.77, 0, 27.58);

    // A. Finished Hospital Base Plinth
    const hospPlinth = new THREE.Mesh(new THREE.BoxGeometry(35.92, 0.4, 42.06), limestoneMat);
    hospPlinth.position.set(0, 0.2, 0);
    hospPlinth.receiveShadow = true;
    hospitalGroup.add(hospPlinth);

    // B. Ground Floor Wings (0.4m to 3.8m)
    // 1. Northwest Yoga & Meditation Hall Wing
    const hospYogaWing = new THREE.Mesh(new THREE.BoxGeometry(10.5, 3.4, 15.0), buildingWallMat);
    hospYogaWing.position.set(-10.8, 2.1, -12.5);
    hospYogaWing.castShadow = true;
    hospYogaWing.receiveShadow = true;
    hospitalGroup.add(hospYogaWing);

    // 2. Central Glazed Reception Atrium & Waiting Lounge
    const hospAtriumGlass = new THREE.Mesh(new THREE.BoxGeometry(16.0, 3.4, 0.2), glassFacadeMat);
    hospAtriumGlass.position.set(0, 2.1, -19.5);
    hospitalGroup.add(hospAtriumGlass);

    // 3. West 6 OPD Doctor Consultation Suites
    const hospOpdWing = new THREE.Mesh(new THREE.BoxGeometry(14.0, 3.4, 12.0), buildingWallMat);
    hospOpdWing.position.set(-8.5, 2.1, 0);
    hospOpdWing.castShadow = true;
    hospOpdWing.receiveShadow = true;
    hospitalGroup.add(hospOpdWing);

    // 4. Southeast Geriatric Emergency Bay & Ambulance Portico
    const hospEmergWing = new THREE.Mesh(new THREE.BoxGeometry(12.0, 3.4, 14.0), buildingWallMat);
    hospEmergWing.position.set(10.5, 2.1, 12.0);
    hospEmergWing.castShadow = true;
    hospEmergWing.receiveShadow = true;
    hospitalGroup.add(hospEmergWing);

    // Ambulance Cantilever Canopy & Columns
    const hospCanopy = new THREE.Mesh(new THREE.BoxGeometry(12.0, 0.4, 6.0), goldAccentMat);
    hospCanopy.position.set(10.5, 3.4, 20.0);
    hospCanopy.castShadow = true;
    hospitalGroup.add(hospCanopy);

    [6.0, 15.0].forEach((px) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 3.4, 8), bronzeAccentMat);
      col.position.set(px, 1.7, 22.0);
      col.castShadow = true;
      hospitalGroup.add(col);
    });

    // 5. East Panchakarma 10 Ayurvedic Treatment Suites Wing
    const hospPanchaWing = new THREE.Mesh(new THREE.BoxGeometry(12.0, 3.4, 18.0), sandstoneMat);
    hospPanchaWing.position.set(10.5, 2.1, -4.0);
    hospPanchaWing.castShadow = true;
    hospPanchaWing.receiveShadow = true;
    hospitalGroup.add(hospPanchaWing);

    // C. First Floor Surgical & Diagnostic Wings (3.8m to 7.2m)
    const hospFirstSlab = new THREE.Mesh(new THREE.BoxGeometry(34.0, 0.3, 38.0), limestoneMat);
    hospFirstSlab.position.set(0, 3.95, 0);
    hospFirstSlab.castShadow = true;
    hospitalGroup.add(hospFirstSlab);

    // Major OT & Cathlab Surgical Wing (West)
    const hospOtCathlab = new THREE.Mesh(new THREE.BoxGeometry(14.0, 3.2, 16.0), buildingWallMat);
    hospOtCathlab.position.set(-8.5, 5.7, -4.0);
    hospOtCathlab.castShadow = true;
    hospitalGroup.add(hospOtCathlab);

    // Inpatient Recovery Wards & Dialysis (East)
    const hospWards = new THREE.Mesh(new THREE.BoxGeometry(12.0, 3.2, 22.0), buildingWallMat);
    hospWards.position.set(10.5, 5.7, 0);
    hospWards.castShadow = true;
    hospitalGroup.add(hospWards);

    // Inpatient Balconies
    const wardBalcony = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 18.0), glassFacadeMat);
    wardBalcony.position.set(16.8, 5.7, 0);
    hospitalGroup.add(wardBalcony);

    // D. Second Floor & Rooftop Amenities (7.2m to 10.8m)
    const hospSecondSlab = new THREE.Mesh(new THREE.BoxGeometry(32.0, 0.3, 36.0), limestoneMat);
    hospSecondSlab.position.set(0, 7.45, 0);
    hospSecondSlab.castShadow = true;
    hospitalGroup.add(hospSecondSlab);

    // 50-Seat Tiered Auditorium (West)
    const audWing = new THREE.Mesh(new THREE.BoxGeometry(12.0, 3.0, 12.0), buildingWallMat);
    audWing.position.set(-8.5, 9.1, -4.0);
    audWing.castShadow = true;
    hospitalGroup.add(audWing);

    // Translucent Hydrotherapy Pool (South Terrace)
    const hospPoolPlinth = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.8, 4.5), limestoneMat);
    hospPoolPlinth.position.set(-6.0, 7.8, 10.0);
    hospitalGroup.add(hospPoolPlinth);

    const hospPoolWater = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.6, 3.5), waterMat);
    hospPoolWater.position.set(-6.0, 8.0, 10.0);
    hospitalGroup.add(hospPoolWater);

    // Open-Sky Roof Terrace Deck (39'-2" × 56'-11" / 2,230 sq.ft.)
    const roofTerraceGlass = new THREE.Mesh(new THREE.BoxGeometry(12.0, 1.1, 17.0), glassFacadeMat);
    roofTerraceGlass.position.set(8.5, 8.15, 6.0);
    hospitalGroup.add(roofTerraceGlass);

    // Shaded Louvered Pergola Pavilion
    for (let i = 0; i < 6; i++) {
      const pergolaBeam = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.15, 0.4), bronzeAccentMat);
      pergolaBeam.position.set(8.5, 10.2, -1.0 + i * 2.2);
      hospitalGroup.add(pergolaBeam);
    }

    // Hospital Front Illuminated Marquee Signage
    const hospSign = new THREE.Mesh(
      new THREE.BoxGeometry(18.0, 1.6, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x0a382c, roughness: 0.3 })
    );
    hospSign.position.set(0, 11.2, -18.5);
    hospitalGroup.add(hospSign);

    hospitalGroup.traverse((child) => {
      child.userData = { landmark: 'hospital' };
    });
    scene.add(hospitalGroup);

    // ─── 5. Landmark 2: Proposed G+2 Senior Residences (ON PLOTS 63 & 64) ───
    const residenceGroup = new THREE.Group();
    residenceGroup.name = 'landmark-residence';
    residenceGroup.position.set(-11.13, 0, 13.56);

    // A. Stilt Finished Concrete Floor
    const stiltBase = new THREE.Mesh(new THREE.BoxGeometry(14.02, 0.2, 15.39), concreteMat);
    stiltBase.position.set(0, 0.1, 0);
    stiltBase.receiveShadow = true;
    residenceGroup.add(stiltBase);

    // B. Stilt Ceiling Slab
    const resStiltCeiling = new THREE.Mesh(new THREE.BoxGeometry(14.4, 0.25, 15.8), limestoneMat);
    resStiltCeiling.position.set(0, 3.2, 0);
    resStiltCeiling.castShadow = true;
    residenceGroup.add(resStiltCeiling);

    // C. 16 Reinforced Concrete Columns (4 × 4 Structural Grid with Yellow Hazard Collars)
    const colGuardMat = new THREE.MeshStandardMaterial({ color: 0xf5b82e, roughness: 0.4 });
    const colXPos = [-5.9, -1.95, 1.95, 5.9];
    const colZPos = [-6.5, -2.15, 2.15, 6.5];

    colXPos.forEach((cx) => {
      colZPos.forEach((cz) => {
        const col = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.1, 0.45), concreteMat);
        col.position.set(cx, 1.65, cz);
        col.castShadow = true;
        residenceGroup.add(col);

        const collar = new THREE.Mesh(new THREE.BoxGeometry(0.49, 0.4, 0.49), colGuardMat);
        collar.position.set(cx, 0.3, cz);
        residenceGroup.add(collar);
      });
    });

    // D. 14 Covered Stilt Parking Bays (6 North, 2 Center, 6 South)
    const bayMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    [-5.0, -3.0, -1.0, 1.0, 3.0, 5.0].forEach((bx) => {
      // North 6 bays
      const b1 = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 4.0), bayMat);
      b1.rotation.x = -Math.PI / 2;
      b1.position.set(bx, 0.22, -4.5);
      residenceGroup.add(b1);

      // South 6 bays
      const b2 = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 4.0), bayMat);
      b2.rotation.x = -Math.PI / 2;
      b2.position.set(bx, 0.22, 4.5);
      residenceGroup.add(b2);
    });

    // Center 2 bays
    [-1.0, 1.0].forEach((bx) => {
      const bC = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 3.8), bayMat);
      bC.rotation.x = -Math.PI / 2;
      bC.position.set(bx, 0.22, 0.0);
      residenceGroup.add(bC);
    });

    // E. 3 Distinct South Entry Portals along 22'-6" Spine
    [-4.5, 0.0, 4.5].forEach((gx) => {
      const pL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.6, 0.35), concreteMat);
      pL.position.set(gx - 1.1, 1.4, 7.6);
      residenceGroup.add(pL);

      const pR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.6, 0.35), concreteMat);
      pR.position.set(gx + 1.1, 1.4, 7.6);
      residenceGroup.add(pR);

      const lintel = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.25, 0.35), bronzeAccentMat);
      lintel.position.set(gx, 2.7, 7.6);
      residenceGroup.add(lintel);
    });

    // F. West Stair Core & East Lift Core
    const stiltStair = new THREE.Mesh(new THREE.BoxGeometry(2.8, 3.0, 3.8), buildingWallMat);
    stiltStair.position.set(-3.8, 1.6, 0);
    residenceGroup.add(stiltStair);

    const stiltLift = new THREE.Mesh(new THREE.BoxGeometry(2.8, 3.0, 3.8), buildingWallMat);
    stiltLift.position.set(3.8, 1.6, 0);
    residenceGroup.add(stiltLift);

    // Parked Senior Electric Golf Cart in Bay
    const cartBody = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.1, 2.8), new THREE.MeshStandardMaterial({ color: 0x2c5e50, metalness: 0.6 }));
    cartBody.position.set(-3.0, 0.75, -4.5);
    cartBody.castShadow = true;
    residenceGroup.add(cartBody);

    // G. Upper Residential Floors (Ground/1st, 2nd, 3rd) (3.3m to 12.5m)
    for (let fl = 0; fl < 3; fl++) {
      const flY = 3.3 + fl * 3.0;

      // Habitable Living Core (Units 01, 02, 03)
      const resFloor = new THREE.Mesh(new THREE.BoxGeometry(14.02, 2.8, 15.39), limestoneMat);
      resFloor.position.set(0, flY + 1.4, 0);
      resFloor.castShadow = true;
      resFloor.receiveShadow = true;
      residenceGroup.add(resFloor);

      // Floor dividing cornice slab
      const slab = new THREE.Mesh(new THREE.BoxGeometry(14.5, 0.2, 15.9), bronzeAccentMat);
      slab.position.set(0, flY + 2.8, 0);
      residenceGroup.add(slab);

      // Cantilevered 3'-6" Front Balconies (South Facing)
      const frontBalcony = new THREE.Mesh(new THREE.BoxGeometry(13.6, 0.9, 1.2), glassFacadeMat);
      frontBalcony.position.set(0, flY + 1.4, 8.2);
      residenceGroup.add(frontBalcony);

      const balcSlab = new THREE.Mesh(new THREE.BoxGeometry(13.6, 0.15, 1.2), goldAccentMat);
      balcSlab.position.set(0, flY + 0.9, 8.2);
      residenceGroup.add(balcSlab);
    }

    // Rooftop Lift Machine Room & Solar PV Array
    const liftTower = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.6, 3.8), bronzeAccentMat);
    liftTower.position.set(3.8, 13.5, 0);
    liftTower.castShadow = true;
    residenceGroup.add(liftTower);

    // Rooftop Safety Parapet Railing
    const resParapet = new THREE.Mesh(new THREE.BoxGeometry(14.2, 1.1, 15.6), glassFacadeMat);
    resParapet.position.set(0, 12.8, 0);
    residenceGroup.add(resParapet);

    residenceGroup.traverse((child) => {
      child.userData = { landmark: 'residence' };
    });
    scene.add(residenceGroup);

    // ─── 6. Landmark 3: Community Mandir & Reflection Kund (425 SQYD / 3,825 SQFT) ───
    const mandirGroup = new THREE.Group();
    mandirGroup.name = 'landmark-mandir';
    mandirGroup.position.set(-30.71, 0, -10.53);

    // A. 425 SQ. YD. Dedicated Sandstone Plinth (85'-0" × 45'-0" / 25.91m × 13.72m)
    const mandirPlinth = new THREE.Mesh(new THREE.BoxGeometry(25.91, 0.6, 13.72), sandstoneMat);
    mandirPlinth.position.set(0, 0.3, 0);
    mandirPlinth.receiveShadow = true;
    mandirGroup.add(mandirPlinth);

    // B. Garbhagriha Sanctum Sanctorum (Facing East +X)
    const garbhagriha = new THREE.Mesh(new THREE.BoxGeometry(8.0, 4.5, 8.0), sandstoneMat);
    garbhagriha.position.set(-7.5, 2.8, 0);
    garbhagriha.castShadow = true;
    mandirGroup.add(garbhagriha);

    // C. Traditional 7-Tiered Carved Shikhara Spire (Rising to 12.5m)
    for (let s = 0; s < 6; s++) {
      const tierW = 7.6 - s * 1.0;
      const tierMesh = new THREE.Mesh(new THREE.BoxGeometry(tierW, 1.1, tierW), sandstoneMat);
      tierMesh.position.set(-7.5, 5.0 + s * 1.0, 0);
      tierMesh.castShadow = true;
      mandirGroup.add(tierMesh);
    }

    // Pyramid Shikhara Peak
    const shikharaPeak = new THREE.Mesh(
      new THREE.ConeGeometry(2.4, 3.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.35, metalness: 0.55 })
    );
    shikharaPeak.position.set(-7.5, 11.2, 0);
    shikharaPeak.castShadow = true;
    mandirGroup.add(shikharaPeak);

    // Gilded 24K Gold Kalasha & Sacred Saffron Flag (Dhwaja)
    const kalasha = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.15, metalness: 0.95 })
    );
    kalasha.position.set(-7.5, 13.2, 0);
    mandirGroup.add(kalasha);

    const dhwaja = new THREE.Mesh(
      new THREE.ConeGeometry(0.35, 1.2, 3),
      new THREE.MeshStandardMaterial({ color: 0xff6600, roughness: 0.3 })
    );
    dhwaja.rotation.z = Math.PI / 2.5;
    dhwaja.position.set(-7.2, 14.1, 0);
    mandirGroup.add(dhwaja);

    // D. Mandapa Prayer Hall (with 8 Carved Sandstone Pillars)
    const mandapaRoof = new THREE.Mesh(new THREE.BoxGeometry(11.0, 0.4, 9.0), sandstoneMat);
    mandapaRoof.position.set(2.5, 4.4, 0);
    mandapaRoof.castShadow = true;
    mandirGroup.add(mandapaRoof);

    // 8 Carved Sandstone Pillars
    [-2.0, 1.0, 4.0, 7.0].forEach((px) => {
      [-3.8, 3.8].forEach((pz) => {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 3.8, 12), sandstoneMat);
        pillar.position.set(px, 2.5, pz);
        pillar.castShadow = true;
        mandirGroup.add(pillar);

        // Pillar Capital
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.25, 0.7), goldAccentMat);
        cap.position.set(px, 4.2, pz);
        mandirGroup.add(cap);
      });
    });

    // E. Traditional Torana Entrance Gateway Arch (East Portal)
    const toranaL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 4.2, 0.6), sandstoneMat);
    toranaL.position.set(10.5, 2.7, -3.0);
    mandirGroup.add(toranaL);

    const toranaR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 4.2, 0.6), sandstoneMat);
    toranaR.position.set(10.5, 2.7, 3.0);
    mandirGroup.add(toranaR);

    const toranaArch = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 7.0), goldAccentMat);
    toranaArch.position.set(10.5, 4.8, 0);
    mandirGroup.add(toranaArch);

    // F. Stepped Sacred Reflection Kund / Pond (24'-0" × 18'-0" / 7.3m × 5.5m)
    const kundPlinth = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.5, 6.5), sandstoneMat);
    kundPlinth.position.set(5.5, 0.35, -5.5);
    mandirGroup.add(kundPlinth);

    const kundWater = new THREE.Mesh(
      new THREE.PlaneGeometry(7.3, 5.5),
      new THREE.MeshStandardMaterial({
        color: 0x186b80,
        roughness: 0.05,
        metalness: 0.88,
        transparent: true,
        opacity: 0.88
      })
    );
    kundWater.rotation.x = -Math.PI / 2;
    kundWater.position.set(5.5, 0.42, -5.5);
    mandirGroup.add(kundWater);

    // Concentric Stone Ghat Steps
    [1, 2].forEach((st) => {
      const stepMesh = new THREE.Mesh(new THREE.BoxGeometry(7.3 + st * 0.6, 0.15, 5.5 + st * 0.6), sandstoneMat);
      stepMesh.position.set(5.5, 0.3 - st * 0.1, -5.5);
      mandirGroup.add(stepMesh);
    });

    // G. Deepa Stambha (Brass Oil Lamp Pillars)
    [9.5, -9.5].forEach((dx) => {
      const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 2.4, 8), bronzeAccentMat);
      lamp.position.set(dx, 1.8, 5.2);
      mandirGroup.add(lamp);

      const flame = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xff8800, emissive: 0xffaa00, emissiveIntensity: 1.2 })
      );
      flame.position.set(dx, 3.1, 5.2);
      mandirGroup.add(flame);
    });

    mandirGroup.traverse((child) => {
      child.userData = { landmark: 'mandir' };
    });
    scene.add(mandirGroup);

    // ─── 7. Landmark 4: Utility Enclave (289 SQYD) ──────────────────────────
    const utilityGroup = new THREE.Group();
    utilityGroup.name = 'landmark-utility';
    utilityGroup.position.set(45.66, 0, -62.65);

    const utilBuilding = new THREE.Mesh(new THREE.BoxGeometry(12, 3.6, 12), buildingWallMat);
    utilBuilding.position.set(0, 1.8, 0);
    utilBuilding.castShadow = true;
    utilityGroup.add(utilBuilding);

    const utilSubstation = new THREE.Mesh(
      new THREE.BoxGeometry(6, 2.2, 5),
      new THREE.MeshStandardMaterial({ color: 0x485055, metalness: 0.7, roughness: 0.3 })
    );
    utilSubstation.position.set(0, 1.1, 8);
    utilityGroup.add(utilSubstation);

    utilityGroup.traverse((child) => {
      child.userData = { landmark: 'utility' };
    });
    scene.add(utilityGroup);

    // ─── 8. Landmark 5: 33ft Main Entrance Gateways ──────────────────────────
    const gateGroup = new THREE.Group();
    gateGroup.name = 'landmark-gate';
    gateGroup.position.set(-43.67, 0, 0);

    const gateCol1 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 5.2, 1.4), buildingWallMat);
    gateCol1.position.set(0, 2.6, -5.5);
    gateGroup.add(gateCol1);

    const gateCol2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 5.2, 1.4), buildingWallMat);
    gateCol2.position.set(0, 2.6, 5.5);
    gateGroup.add(gateCol2);

    const gateLintel = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.0, 13), bronzeAccentMat);
    gateLintel.position.set(0, 5.4, 0);
    gateGroup.add(gateLintel);

    const guardPost = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.8, 3.5), buildingWallMat);
    guardPost.position.set(4.0, 1.4, -5.5);
    gateGroup.add(guardPost);

    gateGroup.traverse((child) => {
      child.userData = { landmark: 'gate' };
    });
    scene.add(gateGroup);

    landmarkMeshesRef.current = [hospitalGroup, residenceGroup, mandirGroup, utilityGroup, gateGroup];

    // ─── 9. Exact 64 Freehold Residential Plots (CANONICAL CAD ALIGNED) ──────
    const plotMeshes: { [plotNumber: number]: THREE.Mesh } = {};
    const cornerStoneGeo = new THREE.BoxGeometry(0.3, 0.6, 0.3);
    const cornerStoneMat = new THREE.MeshStandardMaterial({ color: 0xf5eedc, roughness: 0.5 });

    CANONICAL_PLOTS.forEach((canonicalPlot) => {
      const { cadBoundingBox: bbox, number, sizeSqYd, block, blockColorHex, dimensions } = canonicalPlot;
      const plotItem = allPlots.find((p) => p.number === number);
      if (!plotItem) return;

      const plotTexture = createPlotCanvasTexture(number, sizeSqYd, block, blockColorHex, dimensions);

      const materials = [
        new THREE.MeshStandardMaterial({ color: 0x163942, roughness: 0.8 }), // right
        new THREE.MeshStandardMaterial({ color: 0x163942, roughness: 0.8 }), // left
        new THREE.MeshStandardMaterial({ map: plotTexture, roughness: 0.6, metalness: 0.05 }), // top
        new THREE.MeshStandardMaterial({ color: 0x163942, roughness: 0.8 }), // bottom
        new THREE.MeshStandardMaterial({ color: 0x163942, roughness: 0.8 }), // front
        new THREE.MeshStandardMaterial({ color: 0x163942, roughness: 0.8 })  // back
      ];

      const plotGeo = new THREE.BoxGeometry(bbox.width, 0.12, bbox.depth);
      const plotMesh = new THREE.Mesh(plotGeo, materials);
      plotMesh.position.set(bbox.x, 0.06, bbox.z);
      plotMesh.receiveShadow = true;
      plotMesh.castShadow = true;
      plotMesh.userData = { plot: plotItem, canonicalPlot, baseColor: blockColorHex };

      // 4 Demarcation Corner Boundary Pegs
      const halfW = bbox.width / 2;
      const halfD = bbox.depth / 2;
      [
        [-halfW, -halfD],
        [halfW, -halfD],
        [-halfW, halfD],
        [halfW, halfD]
      ].forEach(([cx, cz]) => {
        const stone = new THREE.Mesh(cornerStoneGeo, cornerStoneMat);
        stone.position.set(cx, 0.3, cz);
        stone.castShadow = true;
        plotMesh.add(stone);
      });

      scene.add(plotMesh);
      plotMeshes[number] = plotMesh;
    });

    plotMeshesRef.current = plotMeshes;

    // ─── 10. Outer Site Perimeter Boundary Wall ────────────────────────────
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xd8c8b0, roughness: 0.8 });
    const wallGeoH = new THREE.BoxGeometry(110, 1.2, 0.6);
    const wallGeoV = new THREE.BoxGeometry(0.6, 1.2, 190);

    // North Wall
    const northWall = new THREE.Mesh(wallGeoH, wallMat);
    northWall.position.set(10, 0.6, -60);
    scene.add(northWall);

    // South Wall
    const southWall = new THREE.Mesh(wallGeoH, wallMat);
    southWall.position.set(0, 0.6, 120);
    scene.add(southWall);

    // East Wall
    const eastWall = new THREE.Mesh(wallGeoV, wallMat);
    eastWall.position.set(55, 0.6, 25);
    scene.add(eastWall);

    // ─── 11. Landscaping: Trees & Royal Palms along Buffer Belts ───────────
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1f4a2c, roughness: 0.8 });
    const amaltasMat = new THREE.MeshStandardMaterial({ color: 0xd4a017, roughness: 0.75 });

    const treeGeo = new THREE.SphereGeometry(1.4, 8, 8);
    const trunkGeo = new THREE.CylinderGeometry(0.15, 0.22, 2.5, 6);

    // Trees along Central East-West Green Buffer (Positioned so they do NOT cover plot numbers)
    [-38, -20, -4, 18, 32, 46].forEach((gx) => {
      [-5.0, 5.0].forEach((gz) => {
        const treeTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 2.2, 6), trunkMat);
        treeTrunk.position.set(gx, 1.1, gz);
        scene.add(treeTrunk);

        const treeCrown = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), foliageMat);
        treeCrown.position.set(gx, 2.8, gz);
        scene.add(treeCrown);
      });
    });

    // Perimeter boundary trees
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      const r = 85 + (i % 3) * 6;
      const tx = Math.cos(angle) * r;
      const tz = 25 + Math.sin(angle) * r;

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(tx, 1.25, tz);
      trunk.castShadow = true;
      scene.add(trunk);

      const crown = new THREE.Mesh(treeGeo, i % 3 === 0 ? amaltasMat : foliageMat);
      crown.position.set(tx, 3.2, tz);
      crown.scale.set(1.0, 1.2 + (i % 3) * 0.2, 1.0);
      crown.castShadow = true;
      scene.add(crown);
    }

    // ─── Interaction Listeners ─────────────────────────────────────────────
    const handleMouseDown = (e: MouseEvent) => {
      orbitRef.current.isDragging = true;
      orbitRef.current.prevMouseX = e.clientX;
      orbitRef.current.prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (orbitRef.current.isDragging) {
        const deltaX = e.clientX - orbitRef.current.prevMouseX;
        const deltaY = e.clientY - orbitRef.current.prevMouseY;
        orbitRef.current.prevMouseX = e.clientX;
        orbitRef.current.prevMouseY = e.clientY;

        orbitRef.current.targetTheta -= deltaX * 0.006;
        orbitRef.current.targetPhi = Math.max(
          0.04,
          Math.min(Math.PI / 2 - 0.05, orbitRef.current.targetPhi - deltaY * 0.006)
        );
      }
    };

    const handleMouseUp = () => {
      if (!orbitRef.current.isDragging) return;
      orbitRef.current.isDragging = false;

      if (cameraRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const meshArray = Object.values(plotMeshesRef.current);
        const intersects = raycasterRef.current.intersectObjects(meshArray);

        if (intersects.length > 0) {
          const hitPlot: PlotItem = intersects[0].object.userData.plot;
          if (hitPlot) {
            if (selectedPlotMeshRef.current) {
              const prevMat = (selectedPlotMeshRef.current.material as THREE.Material[])[2] as THREE.MeshStandardMaterial;
              if (prevMat) {
                prevMat.emissive.setHex(0x000000);
                prevMat.emissiveIntensity = 0;
              }
            }

            const hitMesh = intersects[0].object as THREE.Mesh;
            const topMat = (hitMesh.material as THREE.Material[])[2] as THREE.MeshStandardMaterial;
            if (topMat) {
              topMat.emissive.setHex(0xffffff);
              topMat.emissiveIntensity = 0.45;
            }
            selectedPlotMeshRef.current = hitMesh;

            setSelectedPlotId(hitPlot.id);
            setSelectedLandmark(null);
            if (onSelectPlotRef.current) onSelectPlotRef.current(hitPlot);

            orbitRef.current.targetLookAt.set(hitMesh.position.x, 0, hitMesh.position.z);
            orbitRef.current.targetRadius = 45;
            return;
          }
        }

        // Landmark raycasting
        const allLandmarkChildren: THREE.Object3D[] = [];
        landmarkMeshesRef.current.forEach((g) => {
          g.traverse((c) => {
            if (c instanceof THREE.Mesh && c.userData?.landmark) {
              allLandmarkChildren.push(c);
            }
          });
        });

        const landmarkIntersects = raycasterRef.current.intersectObjects(allLandmarkChildren);
        if (landmarkIntersects.length > 0) {
          const landmarkKey = landmarkIntersects[0].object.userData.landmark as LandmarkType;
          if (landmarkKey) {
            setSelectedLandmark(landmarkKey);
            if (landmarkKey === 'hospital') {
              orbitRef.current.targetLookAt.set(-25.77, 4, 27.58);
              orbitRef.current.targetRadius = 52;
            } else if (landmarkKey === 'mandir') {
              orbitRef.current.targetLookAt.set(-30.71, 4, -10.53);
              orbitRef.current.targetRadius = 38;
            } else if (landmarkKey === 'residence') {
              orbitRef.current.targetLookAt.set(-11.13, 4, 13.56);
              orbitRef.current.targetRadius = 38;
            } else if (landmarkKey === 'utility') {
              orbitRef.current.targetLookAt.set(45.66, 2, -62.65);
              orbitRef.current.targetRadius = 45;
            } else if (landmarkKey === 'gate') {
              orbitRef.current.targetLookAt.set(-43.67, 2, 0);
              orbitRef.current.targetRadius = 55;
            }
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRef.current.targetRadius = Math.max(
        22,
        Math.min(180, orbitRef.current.targetRadius + e.deltaY * 0.05)
      );
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        orbitRef.current.isDragging = true;
        orbitRef.current.prevMouseX = e.touches[0].clientX;
        orbitRef.current.prevMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && orbitRef.current.isDragging) {
        const dx = e.touches[0].clientX - orbitRef.current.prevMouseX;
        const dy = e.touches[0].clientY - orbitRef.current.prevMouseY;
        orbitRef.current.prevMouseX = e.touches[0].clientX;
        orbitRef.current.prevMouseY = e.touches[0].clientY;
        orbitRef.current.targetTheta -= dx * 0.006;
        orbitRef.current.targetPhi = Math.max(0.04, Math.min(Math.PI / 2 - 0.05, orbitRef.current.targetPhi - dy * 0.006));
      }
    };

    const handleTouchEnd = () => {
      orbitRef.current.isDragging = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    // ─── Animation Loop ───────────────────────────────────────────────────
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      updateCameraPosition();
      renderer.render(scene, camera);
    };
    animate();
    setIsLoading(false);

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      disposeScene(scene);
      renderer.dispose();
    };
  }, [updateCameraPosition]);

  // CAD Overlay Visibility & Opacity Effect
  useEffect(() => {
    const cadMesh = cadOverlayMeshRef.current;
    if (!cadMesh) return;
    cadMesh.visible = isCadOverlay;
    if (cadMesh.material && 'opacity' in cadMesh.material) {
      (cadMesh.material as THREE.MeshBasicMaterial).opacity = cadOpacity;
      cadMesh.material.needsUpdate = true;
    }
  }, [isCadOverlay, cadOpacity]);

  // Plots Opacity Effect
  useEffect(() => {
    Object.values(plotMeshesRef.current).forEach((mesh) => {
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshStandardMaterial).opacity = plotsOpacity;
      }
    });
  }, [plotsOpacity]);

  // Handle preset view transitions
  const handlePresetView = (preset: typeof viewPreset) => {
    setViewPreset(preset);
    setSelectedLandmark(null);

    if (preset === 'isometric') {
      orbitRef.current.targetTheta = Math.PI / 4.2;
      orbitRef.current.targetPhi = Math.PI / 3.4;
      orbitRef.current.targetRadius = 120;
      orbitRef.current.targetLookAt.set(0, 0, 25);
    } else if (preset === 'top') {
      orbitRef.current.targetTheta = 0.001;
      orbitRef.current.targetPhi = 0.04;
      orbitRef.current.targetRadius = 145;
      orbitRef.current.targetLookAt.set(0, 0, 25);
    } else if (preset === 'hospital') {
      orbitRef.current.targetTheta = -Math.PI / 3.8;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 52;
      orbitRef.current.targetLookAt.set(-25.77, 4, 27.58);
      setSelectedLandmark('hospital');
    } else if (preset === 'residence') {
      orbitRef.current.targetTheta = Math.PI / 3.5;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 38;
      orbitRef.current.targetLookAt.set(-11.13, 4, 13.56);
      setSelectedLandmark('residence');
    } else if (preset === 'mandir') {
      orbitRef.current.targetTheta = Math.PI / 4;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 38;
      orbitRef.current.targetLookAt.set(-30.71, 4, -10.53);
      setSelectedLandmark('mandir');
    } else if (preset === 'highway') {
      orbitRef.current.targetTheta = Math.PI / 2.05;
      orbitRef.current.targetPhi = Math.PI / 2.6;
      orbitRef.current.targetRadius = 60;
      orbitRef.current.targetLookAt.set(-43.67, 2, 0);
      setSelectedLandmark('gate');
    }
  };

  // Block filter handler
  const handleBlockSelect = (block: string) => {
    setSelectedBlock(block);
    if (block === 'All') return;

    const firstInBlock = allPlots.find((p) => p.block === block);
    if (firstInBlock && plotMeshesRef.current[firstInBlock.number]) {
      const mesh = plotMeshesRef.current[firstInBlock.number];
      setSelectedPlotId(firstInBlock.id);
      setSelectedLandmark(null);
      orbitRef.current.targetLookAt.set(mesh.position.x, 0, mesh.position.z);
      orbitRef.current.targetRadius = 50;
    }
  };

  const selectedPlot = allPlots.find((p) => p.id === selectedPlotId) || allPlots[0];
  const activeLandmarkInfo = selectedLandmark ? LANDMARK_REGISTRY[selectedLandmark] : null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#071519] border border-[#163942] shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-[99999] rounded-none h-screen w-screen flex flex-col lg:flex-row' : 'rounded-3xl h-[660px] sm:h-[800px]'
      }`}
    >
      {/* Main 3D Canvas Viewport */}
      <div className={`relative h-full ${isFullscreen ? 'flex-1 min-w-0 h-full' : 'w-full'}`}>
        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#071519] flex flex-col items-center justify-center gap-3 z-30">
            <div className="w-10 h-10 border-2 border-[#C58F58] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-[#FAF8F5] uppercase tracking-widest">
              Rendering CAD-Faithful 3D Master Plan...
            </span>
          </div>
        )}

        {/* Top Left Header & CAD Badge */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2329]/90 border border-white/15 text-[11px] font-mono text-[#E0AB77] uppercase tracking-widest backdrop-blur-md shadow-lg pointer-events-auto">
            <Layers className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>CAD MASTERPLAN 3D RECONSTRUCTION</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold backdrop-blur-md shadow-lg pointer-events-auto">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>64 Plots (Blocks A–F) • Certified 1:1 Topology</span>
          </div>
        </div>

        {/* Top Right Controls & View Toolbar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#0D2329]/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 shadow-xl pointer-events-auto">
          <button
            onClick={() => handlePresetView('isometric')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewPreset === 'isometric' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
            title="Overview 3D Perspective"
          >
            Overview
          </button>

          <button
            onClick={() => handlePresetView('top')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              viewPreset === 'top' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
            title="Orthographic Top-Down CAD Validation View"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Top CAD View</span>
          </button>

          <button
            onClick={() => handlePresetView('hospital')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewPreset === 'hospital' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
            title="Focus on 30k sqft Ayurvedic & Multi-Speciality Hospital"
          >
            Hospital (30k sqft)
          </button>

          <button
            onClick={() => handlePresetView('residence')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewPreset === 'residence' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
            title="Focus on Plots 63 & 64 G+2 Residences with 14 Stilt Bays"
          >
            Residences (63-64)
          </button>

          <button
            onClick={() => handlePresetView('mandir')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewPreset === 'mandir' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
            title="Focus on 425 SQYD Mandir & Sacred Reflection Kund"
          >
            Mandir Land
          </button>

          {onToggle2DView && (
            <button
              onClick={onToggle2DView}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-l border-white/10 pl-2.5"
            >
              2D Matrix
            </button>
          )}

          <button
            onClick={() => setIsCadOverlay(!isCadOverlay)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
              isCadOverlay
                ? 'bg-[#C58F58] text-[#071519] border-[#C58F58] shadow-md'
                : 'bg-white/5 text-[#E0AB77] border-[#C58F58]/40 hover:bg-[#C58F58]/20'
            }`}
            title="Toggle Masterplan CAD blueprint overlay alignment mode"
          >
            CAD Overlay QA
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Studio Fullscreen Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-[#C58F58]" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Masterplan CAD Overlay QA Sliders Floating Bar */}
        {isCadOverlay && (
          <div className="absolute top-20 left-4 z-20 pointer-events-auto bg-[#071519]/95 backdrop-blur-md p-4 rounded-2xl border border-[#C58F58]/60 shadow-2xl space-y-3 max-w-sm">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
              <span className="text-[11px] font-mono text-[#E0AB77] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Masterplan CAD Overlay QA
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    handlePresetView('top');
                    orbitRef.current.targetRadius = 220;
                    orbitRef.current.targetPhi = 0.001;
                    orbitRef.current.targetTheta = 0;
                    orbitRef.current.targetLookAt.set(0, 0, 25);
                  }}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[#C58F58]/20 hover:bg-[#C58F58] hover:text-[#071519] text-[#E0AB77] transition-all font-bold cursor-pointer"
                  title="Fit to Cadastral Map (Orthographic North-Up)"
                >
                  Fit To CAD
                </button>
                <button
                  onClick={() => {
                    orbitRef.current.targetTheta = 0;
                  }}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-all font-bold cursor-pointer"
                  title="Reset North-Up"
                >
                  North Up
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-white/70 font-mono text-[10px]">
                <span>CAD Vector Map Opacity:</span>
                <span className="text-[#E0AB77] font-bold">{Math.round(cadOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={cadOpacity}
                onChange={(e) => setCadOpacity(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C58F58]"
              />

              <div className="flex items-center justify-between text-white/70 font-mono text-[10px] pt-1">
                <span>3D Plots &amp; Roads Opacity:</span>
                <span className="text-[#E0AB77] font-bold">{Math.round(plotsOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={plotsOpacity}
                onChange={(e) => setPlotsOpacity(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C58F58]"
              />

              <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-white/60">
                <span>Scale: 1 Three.js unit = 1.0 meter</span>
                <button
                  onClick={() => {
                    setCadOpacity(0.65);
                    setPlotsOpacity(0.85);
                    orbitRef.current.targetTheta = 0;
                    orbitRef.current.targetPhi = 0.001;
                    orbitRef.current.targetRadius = 220;
                    orbitRef.current.targetLookAt.set(0, 0, 25);
                  }}
                  className="text-[#C58F58] hover:underline cursor-pointer"
                >
                  Reset Alignment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Left HUD: Interaction Guide + Source Legend */}
        <div className="absolute bottom-4 left-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 text-[11px] text-white/70 pointer-events-none z-10">
          <div className="flex items-center gap-2 bg-[#071519]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>Drag to Orbit • Scroll to Zoom • Tap Plot / Landmark to Inspect</span>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-[#071519]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 font-mono text-[10px]">
            <span className="flex items-center gap-1 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> SOURCE_VERIFIED
            </span>
            <span className="flex items-center gap-1 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> SOURCE_DERIVED
            </span>
            <span className="flex items-center gap-1 text-sky-300">
              <span className="w-2 h-2 rounded-full bg-sky-400" /> VISUALIZATION_ONLY
            </span>
          </div>
        </div>

        {/* Floating Quick Card (Non-fullscreen mode) */}
        {!isFullscreen && (selectedPlot || activeLandmarkInfo) && (
          <div className="absolute bottom-4 right-4 z-20 w-80 sm:w-96 bg-[#071519]/95 backdrop-blur-xl p-4 rounded-3xl border border-white/20 shadow-2xl space-y-3 pointer-events-auto">
            {activeLandmarkInfo ? (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase">
                    {activeLandmarkInfo.badge}
                  </span>
                  <span className="text-[10px] text-white/60 font-mono">{activeLandmarkInfo.category}</span>
                </div>
                <div>
                  <h4 className="text-base font-serif-heading font-bold text-[#FAF8F5]">
                    {activeLandmarkInfo.title}
                  </h4>
                  <p className="text-xs text-white/70 mt-1 line-clamp-2">
                    {activeLandmarkInfo.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  {activeLandmarkInfo.id === 'hospital' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => openFloorPlanModal('hospital-ground')}
                        className="py-2.5 rounded-xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Explore 3D Floors
                      </button>
                      <a
                        href="/amenities"
                        className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 text-center border border-white/15"
                      >
                        <Building2 className="w-3.5 h-3.5 text-[#C58F58]" />
                        Hospital Specs →
                      </a>
                    </div>
                  )}
                  {activeLandmarkInfo.id === 'residence' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => openFloorPlanModal('stilt')}
                        className="py-2.5 rounded-xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Car className="w-3.5 h-3.5" />
                        14 Stilt Bays
                      </button>
                      <a
                        href="/apartments"
                        className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 text-center border border-white/15"
                      >
                        <Home className="w-3.5 h-3.5 text-[#C58F58]" />
                        Explore Units →
                      </a>
                    </div>
                  )}
                  {activeLandmarkInfo.id === 'mandir' && (
                    <button
                      onClick={() => openLeadDrawer({ title: 'Inquire about Community Mandir & Satsang Enclave', actionType: 'book-site-visit' })}
                      className="w-full py-2.5 rounded-xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Flame className="w-3.5 h-3.5" />
                      Inquire about Mandir Land (425 SQYD) →
                    </button>
                  )}
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#C58F58]" />
                    <span>Open Full Inspector &amp; Specs</span>
                  </button>
                </div>
              </>
            ) : selectedPlot ? (() => {
              const liveStatus = getPlotLiveStatus(selectedPlot);
              return (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase ${liveStatus.badgeClass}`}>
                      {liveStatus.label}
                    </span>
                    <span className="text-xs text-white/70 font-mono font-bold">{selectedPlot.block}</span>
                  </div>
                  <span className="text-xs font-bold text-[#C58F58]">{selectedPlot.priceEstimate}</span>
                </div>
                <div>
                  <h4 className="text-lg font-serif-heading font-bold text-[#FAF8F5]">
                    {selectedPlot.plotNumber}
                  </h4>
                  <p className="text-xs text-white/75 font-light mt-0.5">
                    {selectedPlot.sizeSqYd} sq. yd. (~{Math.round(selectedPlot.sizeSqYd * 9).toLocaleString()} sq. ft.) • {selectedPlot.dimensions} • {selectedPlot.facing} Facing
                  </p>
                </div>
                <div className="pt-1 flex flex-col gap-2">
                  {liveStatus.isAvailable ? (
                    <a
                      href={`/book/${selectedPlot.id.toUpperCase()}`}
                      className="w-full py-2.5 rounded-2xl bg-[#C58F58] hover:bg-[#b07d48] text-[#071519] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 text-center"
                    >
                      Lock 24h Reservation Hold →
                    </a>
                  ) : (
                    <div className="w-full py-2.5 rounded-2xl bg-white/10 text-white/70 text-xs font-medium text-center border border-white/10">
                      {liveStatus.label} • Inquire for Next Phase
                    </div>
                  )}
                  <button
                    onClick={() =>
                      openWhatsApp({
                        actionType: 'reserve-plot',
                        plotNumber: selectedPlot.plotNumber,
                        plotBlock: selectedPlot.block,
                        message: `Hello, I am viewing ${selectedPlot.plotNumber} (${selectedPlot.block}, ${selectedPlot.sizeSqYd} sq.yd., ${selectedPlot.dimensions}) on the 3D Master Plan for Senior Living Citizens Foundation. Status: ${liveStatus.label}. Please share dossier.`
                      })
                    }
                    className="w-full py-2 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Inquire on WhatsApp
                  </button>
                </div>
              </>
            );})() : null}
          </div>
        )}
      </div>

      {/* ─── FULLSCREEN STUDIO INSPECTOR SIDEBAR ─────────────────────────────── */}
      {isFullscreen && (
        <aside className="w-full lg:w-[420px] xl:w-[460px] shrink-0 h-full bg-[#0A1C22]/98 border-t lg:border-t-0 lg:border-l border-white/15 p-6 overflow-y-auto flex flex-col justify-between backdrop-blur-2xl z-30 shadow-2xl text-white space-y-6">
          {/* Sidebar Top Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#2C5E50]/40 border border-emerald-400/40 text-[#C58F58] flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-heading font-bold text-base text-[#FAF8F5]">
                    CAD Master Plan Inspector
                  </h3>
                  <span className="text-[10px] font-mono text-[#C58F58] uppercase tracking-wider block">
                    The Vision Architects • Approved Layout
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Exit Fullscreen (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Block Filter Pills */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                Filter by Sector / Block:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F'].map((b) => (
                  <button
                    key={b}
                    onClick={() => handleBlockSelect(b)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedBlock === b
                        ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-white/75 border border-white/10'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Inspector Navigation Tabs */}
            <div className="flex items-center gap-1 p-1 bg-black/30 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveInspectorTab('details')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeInspectorTab === 'details' ? 'bg-[#2C5E50] text-white shadow-md' : 'text-white/60 hover:text-white'
                }`}
              >
                Live Specs
              </button>
              <button
                onClick={() => setActiveInspectorTab('cad-map')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  activeInspectorTab === 'cad-map' ? 'bg-[#2C5E50] text-white shadow-md' : 'text-white/60 hover:text-white'
                }`}
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#C58F58]" />
                2D CAD Zoom
              </button>
              <button
                onClick={() => setActiveInspectorTab('specs')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeInspectorTab === 'specs' ? 'bg-[#2C5E50] text-white shadow-md' : 'text-white/60 hover:text-white'
                }`}
              >
                Statutory
              </button>
            </div>

            {/* TAB 1: LIVE SPECS (Plot or Landmark) */}
            {activeInspectorTab === 'details' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {activeLandmarkInfo ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase">
                          {activeLandmarkInfo.badge}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold">
                          {activeLandmarkInfo.sourceConfidence}
                        </span>
                      </div>
                      <h4 className="text-xl font-serif-heading font-bold text-[#FAF8F5]">
                        {activeLandmarkInfo.title}
                      </h4>
                      <p className="text-xs text-white/75 leading-relaxed">
                        {activeLandmarkInfo.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-white/50 block font-mono">Area / Footprint</span>
                        <span className="font-bold text-white mt-0.5 block">{activeLandmarkInfo.area}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-white/50 block font-mono">Structure Tier</span>
                        <span className="font-bold text-white mt-0.5 block">{activeLandmarkInfo.floors}</span>
                      </div>
                    </div>

                    {activeLandmarkInfo.subFeatures && (
                      <div className="space-y-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#C58F58] font-bold">
                          Architectural Floor Breakdown:
                        </span>
                        <div className="space-y-1.5">
                          {activeLandmarkInfo.subFeatures.map((sf, idx) => (
                            <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-0.5">
                              <span className="font-bold text-emerald-300 block">{sf.title}</span>
                              <span className="text-white/75 text-[11px] block">{sf.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#C58F58] font-bold">
                        Key Architectural Features:
                      </span>
                      <div className="space-y-1.5">
                        {activeLandmarkInfo.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-white/85">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Landmark Direct Action Buttons */}
                    {activeLandmarkInfo.id === 'hospital' && (
                      <div className="space-y-2 pt-1">
                        <button
                          onClick={() => openFloorPlanModal('hospital-ground')}
                          className="w-full py-3 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Explore Hospital 3D Floor Plans &amp; Rooms →</span>
                        </button>
                        <a
                          href="/amenities"
                          className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 text-center block"
                        >
                          <Building2 className="w-4 h-4 text-[#C58F58]" />
                          <span>View Full Hospital Specifications Page →</span>
                        </a>
                      </div>
                    )}

                    {activeLandmarkInfo.id === 'residence' && (
                      <div className="space-y-2 pt-1">
                        <button
                          onClick={() => openFloorPlanModal('stilt')}
                          className="w-full py-3 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Car className="w-4 h-4" />
                          <span>Inspect 14 Stilt Parking Bays &amp; Gates →</span>
                        </button>
                        <a
                          href="/apartments"
                          className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 text-center block"
                        >
                          <Home className="w-4 h-4 text-[#C58F58]" />
                          <span>Explore Residence 3D Units 01-03 →</span>
                        </a>
                      </div>
                    )}

                    {activeLandmarkInfo.id === 'mandir' && (
                      <div className="space-y-2 pt-1">
                        <button
                          onClick={() => openLeadDrawer({ title: 'Schedule Private Walk to Mandir Land (425 SQYD)', actionType: 'book-site-visit' })}
                          className="w-full py-3 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Flame className="w-4 h-4" />
                          <span>Inquire about Mandir Land &amp; Reflection Kund →</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase ${getPlotLiveStatus(selectedPlot).badgeClass}`}>
                          {getPlotLiveStatus(selectedPlot).label}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold">
                          SOURCE_VERIFIED
                        </span>
                      </div>
                      <h4 className="text-2xl font-serif-heading font-bold text-[#FAF8F5]">
                        {selectedPlot.plotNumber} • {selectedPlot.block}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-white/75">
                        <span><strong>{selectedPlot.sizeSqYd}</strong> sq. yd.</span>
                        <span>•</span>
                        <span>~<strong>{Math.round(selectedPlot.sizeSqYd * 9).toLocaleString()}</strong> sq. ft.</span>
                        <span>•</span>
                        <span>{selectedPlot.facing}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-white/50 block font-mono">Plot Dimensions</span>
                        <span className="font-bold text-white mt-0.5 block">{selectedPlot.dimensions}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-white/50 block font-mono">Frontage Road</span>
                        <span className="font-bold text-white mt-0.5 block">{selectedPlot.roadWidth}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-white/50 block font-mono">Corner Status</span>
                        <span className="font-bold text-[#C58F58] mt-0.5 block">{selectedPlot.isCorner ? 'Yes (2-Side Open)' : 'Standard Plot'}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-white/50 block font-mono">Cost-Plus Price</span>
                        <span className="font-bold text-emerald-400 mt-0.5 block">{selectedPlot.priceEstimate}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Section 8 Non-Profit Cost-Plus Pricing</span>
                      </div>
                      <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                        Zero commercial builder margins. Includes underground utilities, road infrastructure, power connection, and perimeter green buffers.
                      </p>
                    </div>

                    {/* 3 Decision Actions in 3D Details */}
                    <div className="space-y-2 pt-1">
                      <button
                        onClick={() => onSelectPlotRef.current && onSelectPlotRef.current(selectedPlot)}
                        className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-[#C58F58]" />
                        <span>Open Complete Plot Dossier &amp; CAD Specs →</span>
                      </button>

                      <button
                        onClick={() => openLeadDrawer({
                          title: `Schedule Site Visit for ${selectedPlot.plotNumber} (${selectedPlot.block})`,
                          plotNumber: selectedPlot.plotNumber,
                          plotBlock: selectedPlot.block,
                          plotSize: `${selectedPlot.sizeSqYd} sq. yd.`,
                          actionType: 'book-site-visit'
                        })}
                        className="w-full py-3 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-[#E0AB77]" />
                        <span>Book Guided Ground Walk for {selectedPlot.plotNumber}</span>
                      </button>

                      {getPlotLiveStatus(selectedPlot).isAvailable ? (
                        <a
                          href={`/book/${selectedPlot.id.toUpperCase()}`}
                          className="w-full py-3 rounded-2xl bg-[#C58F58] hover:bg-[#b07d48] text-[#071519] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 text-center block"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Reserve 24h Hold for {selectedPlot.plotNumber}</span>
                        </a>
                      ) : (
                        <div className="w-full py-3 rounded-2xl bg-white/10 text-white/70 text-xs font-medium text-center border border-white/10 flex items-center justify-center gap-2">
                          <span>{getPlotLiveStatus(selectedPlot).label} • Inquire for Next Phase</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: 2D CAD MAP ZOOM (Cross-Referencing) */}
            {activeInspectorTab === 'cad-map' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60 font-mono">Architectural Masterplan CAD</span>
                  <span className="text-[#C58F58] font-bold">Zoomed Alignment</span>
                </div>

                <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/20 bg-black/40 shadow-inner group">
                  <img
                    src="/project-assets/architecture/cad/previews/masterplan-real.jpg"
                    alt="Masterplan CAD Blueprint"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                  />
                  {/* Glowing Target Crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full border-2 border-[#C58F58] animate-ping opacity-75" />
                    <div className="w-4 h-4 rounded-full bg-[#C58F58] text-[9px] font-bold text-black flex items-center justify-center shadow-lg absolute">
                      ★
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] text-white/80 flex items-center justify-between">
                    <span>Target: {activeLandmarkInfo ? activeLandmarkInfo.title : selectedPlot.plotNumber}</span>
                    <span className="font-mono text-[#C58F58]">SH-22 Demarcation</span>
                  </div>
                </div>

                <p className="text-[11px] text-white/60 leading-relaxed">
                  Ground coordinates are certified by Haryana Revenue Department Aks Shajra and verified against architectural CAD layout from The Vision Architects.
                </p>
              </div>
            )}

            {/* TAB 3: STATUTORY & LEGAL */}
            {activeInspectorTab === 'specs' && (
              <div className="space-y-3 text-xs animate-in fade-in duration-200">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-[#C58F58] uppercase">Legal Title &amp; Demarcation</span>
                  <p className="text-white/85">Clear unencumbered freehold title chain in Kheri Asra, Tehsil Jhajjar revenue records.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-[#C58F58] uppercase">Foundation Governance</span>
                  <p className="text-white/85">Administered by Senior Living Citizens Foundation under Section 8 (Companies Act 2013, Licence No. 172654).</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-[#C58F58] uppercase">Site Verification</span>
                  <p className="text-white/85">Boundary stones physically anchored along State Highway 22 frontage with 33ft arterial access avenue.</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Bottom CTA Actions */}
          <div className="pt-4 border-t border-white/15 space-y-2.5">
            <button
              onClick={() =>
                openWhatsApp({
                  actionType: 'reserve-plot',
                  plotNumber: selectedPlot.plotNumber,
                  plotBlock: selectedPlot.block,
                  message: `Hello, I am inspecting ${activeLandmarkInfo ? activeLandmarkInfo.title : `${selectedPlot.plotNumber} (${selectedPlot.block}, ${selectedPlot.sizeSqYd} sq.yd.)`} on the 3D Masterplan for Senior Living Citizens Foundation. Please share complete CAD dossier and priority booking details.`
                })
              }
              className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Inquire on WhatsApp (+91 99999 55847) →
            </button>

            <button
              onClick={() =>
                openLeadDrawer({
                  title: `Schedule Private Site Walk for ${activeLandmarkInfo ? activeLandmarkInfo.title : selectedPlot.plotNumber}`,
                  plotNumber: selectedPlot.plotNumber,
                  plotBlock: selectedPlot.block,
                  actionType: 'book-site-visit'
                })
              }
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#C58F58]" />
              Schedule Private Ground Site Walk
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
