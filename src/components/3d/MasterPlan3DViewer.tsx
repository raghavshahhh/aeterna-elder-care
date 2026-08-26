'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { PlotItem } from '@/types';
import { allPlots, plotsSummary, projectOverview, MASTER_PLOT_DEFINITIONS } from '@/data/propertyData';
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
  Check,
  Calendar,
  Lock
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
}

const LANDMARK_REGISTRY: Record<LandmarkType, LandmarkInfo> = {
  hospital: {
    id: 'hospital',
    title: '30,000 Sq. Ft. Multi-Speciality Ayurvedic Hospital',
    badge: 'On-Site Healthcare Continuum',
    category: 'Healthcare & Wellness',
    area: '30,000 sq. ft. Built-Up Area',
    dimensions: '117\'-10" × 138\' L-Shaped Footprint',
    floors: 'G+2 Structural Facility with Lift Core',
    description: 'Specialized senior care hospital featuring Panchakarma Ayurvedic detox suites, 24/7 ICU emergency response, 6 OPD doctor consultation chambers, diagnostic pathology, and rooftop hydrotherapy pool.',
    features: [
      '24/7 Geriatric Emergency & Ambulance Dock',
      'Authentic Ayurvedic Panchakarma Suites (Abhyanga & Shirodhara)',
      '6 Physician OPD Chambers + Dialysis & ICU Wing',
      'Rooftop Hydrotherapy Pool (10\' × 12\') & 50-Seat Open Auditorium'
    ],
    cadZone: 'South-West Healthcare Zone (Facing 33ft Main Road)',
    cadCoordinates: { x: -22, y: 16 }
  },
  mandir: {
    id: 'mandir',
    title: 'Community Mandir & Sacred Reflection Kund',
    badge: 'Spiritual Sanctuary',
    category: 'Spirituality & Culture',
    area: 'Dedicated Mandir Land Parcel',
    dimensions: 'Sandstone Plinth with Shikhara Spire + Reflection Kund',
    floors: 'Traditional Carved Mandapa + Stepped Kund',
    description: 'Tranquil community temple crafted in authentic Rajasthani sandstone with a stepped water body (kund) for daily morning aarti, meditation, and satsang.',
    features: [
      'Traditional Shikhara with Gold Kalasha',
      'Stepped Sandstone Meditation Kund',
      'Elder-Friendly Step-Free Approach Ramp',
      '6ft Continuous Green Tree Buffer Frontage'
    ],
    cadZone: 'Block A (Between Plot 3 & Plot 4 along 33ft Road)',
    cadCoordinates: { x: -28, y: -5 }
  },
  residence: {
    id: 'residence',
    title: 'G+2 Senior Care Apartment Suites (Plots 63 & 64)',
    badge: '12 Barrier-Free Residences',
    category: 'Plotted Residences',
    area: '46\'-0" × 50\'-6" Combined Plot Footprint',
    dimensions: 'Stilt Parking + 3 Habitable Residential Floors',
    floors: 'Stilt + G+2 with 8-Passenger Stretcher Elevator',
    description: 'Dedicated senior living apartment block on Plots 63 & 64 with 1 BHK & 1 RK barrier-free care suites, covered 14-bay stilt parking, 3 entry gates, and cantilevered balconies.',
    features: [
      '8-Passenger Stretcher-Compliant Elevator Core',
      '14 Covered Stilt Parking Bays with 3 Entry Gates',
      'Cantilevered 3\'-6" Balconies with Safety Railings',
      '4 × 1 RK Studio Suites + 2 × 1 BHK Residences per Floor'
    ],
    cadZone: 'Block F (Plots 63 & 64, East of Ayurvedic Hospital)',
    cadCoordinates: { x: -6, y: 10 }
  },
  gate: {
    id: 'gate',
    title: '33ft Main Arterial Highway & SH-22 Access Portals',
    badge: 'Gated Security Checkpoint',
    category: 'Infrastructure & Access',
    area: '33ft Dual Highway Access Corridors',
    dimensions: '33\'-0" Wide Road Network (SH-22 & NH-71 Direct)',
    floors: '24/7 Security Post & Boom Barrier Check',
    description: 'Direct highway frontage connecting to State Highway 22 (SH-22 Jhajjar-Bahadurgarh) and NH-71 / Reliance MET City with 24/7 security checkpoint.',
    features: [
      '33ft Main Arterial East-West & West Boundaries',
      '24/7 Guarded Boom Barrier & Number-Plate Scanner',
      'Connecting to Reliance MET City, Jhajjar & Gurugram',
      'Continuous 5ft & 6ft Perimeter Green Belts'
    ],
    cadZone: 'West & Central 33ft Highway Frontages',
    cadCoordinates: { x: -36, y: 0 }
  },
  utility: {
    id: 'utility',
    title: 'Township Utility Services Enclave (289 SQYD)',
    badge: 'Civic Infrastructure',
    category: 'Utilities & Power',
    area: '289 Sq. Yds. Dedicated Enclave',
    dimensions: 'North-East Perimeter Sector',
    floors: 'Ground Utility Substation',
    description: 'Dedicated infrastructure compound housing underground water filtration reservoir, electrical power transformer substation, and maintenance operations.',
    features: [
      'Dedicated 289 SQYD Utility Demarcation',
      'Underground Water & Power Distribution Grid',
      'Rainwater Harvesting Filtration Units',
      '24/7 Maintenance & Facility Management Office'
    ],
    cadZone: 'North-East Corner (Behind Plot 15 & 11ft Rasta)',
    cadCoordinates: { x: 36, y: -40 }
  },
  park: {
    id: 'park',
    title: '5ft & 6ft Continuous Green Tree Buffer Zones',
    badge: 'Eco Green Buffer',
    category: 'Landscaping & Nature',
    area: 'Perimeter Green Belts along 33ft Arterial Road',
    dimensions: '5ft & 6ft Continuous Landscaped Strips',
    floors: 'Botanical Tree & Herbal Buffers',
    description: 'Pristine natural environment with native Amaltas, Royal Palms, and medicinal herbal tree lines buffering the residences from road corridors.',
    features: [
      '6ft Green Buffer along North Parcel Boundary',
      '5ft Green Buffer along South Parcel Boundary',
      'Continuous Non-Slip Senior Walking Promenades',
      'Solar-Powered LED Streetlight Network'
    ],
    cadZone: 'Central & Peripheral Buffer Strips',
    cadCoordinates: { x: 0, y: 0 }
  }
};

// ─── Source-Accurate 3D Coordinate Mapping (Derived from masterplan-real.jpg) ───
const PLOT_COORDINATES_MAP: Record<number, { x: number; z: number; width: number; depth: number; color: number }> = {
  // BLOCK A (Yellow: 0xEAB308) — Plots 1, 2, 3 (West 33' Highway Frontage)
  1: { x: -28, z: -38, width: 9.5, depth: 10.0, color: 0xEAB308 },
  2: { x: -28, z: -26, width: 9.5, depth: 10.0, color: 0xEAB308 },
  3: { x: -28, z: -14, width: 9.5, depth: 10.0, color: 0xEAB308 },
  // Mandir is at x: -28, z: -5
  // Plot 4 (Block A - Next to Mandir facing 33ft road)
  4: { x: -14, z: -5, width: 8.5, depth: 6.8, color: 0xEAB308 },
  // Plots 5,6,7,8,9 (Block A - stacked facing 22'-6" Central Rasta)
  5: { x: -14, z: -13, width: 7.2, depth: 5.5, color: 0xEAB308 },
  6: { x: -14, z: -19, width: 7.2, depth: 5.5, color: 0xEAB308 },
  7: { x: -14, z: -25, width: 7.2, depth: 5.5, color: 0xEAB308 },
  8: { x: -14, z: -31, width: 7.2, depth: 5.5, color: 0xEAB308 },
  9: { x: -14, z: -37, width: 7.2, depth: 5.5, color: 0xEAB308 },
  // Plot 10 (Block A Corner)
  10: { x: 7, z: -37, width: 9.0, depth: 6.5, color: 0xEAB308 },

  // BLOCK B (Pink: 0xEC4899) — Plots 11-15 (Upper North-East row facing 20' Rasta)
  11: { x: 14.5, z: -37, width: 5.2, depth: 6.5, color: 0xEC4899 },
  12: { x: 20.0, z: -37, width: 5.2, depth: 6.5, color: 0xEC4899 },
  13: { x: 25.5, z: -37, width: 5.2, depth: 6.5, color: 0xEC4899 },
  14: { x: 31.0, z: -37, width: 5.2, depth: 6.5, color: 0xEC4899 },
  15: { x: 36.5, z: -37, width: 5.2, depth: 6.5, color: 0xEC4899 },

  // BLOCK C (Purple: 0x8B5CF6) — Plots 21 to 16 (Facing North 20' Rasta)
  21: { x: 7, z: -20, width: 9.0, depth: 6.2, color: 0x8B5CF6 },
  20: { x: 14.5, z: -20, width: 5.2, depth: 6.2, color: 0x8B5CF6 },
  19: { x: 20.0, z: -20, width: 5.2, depth: 6.2, color: 0x8B5CF6 },
  18: { x: 25.5, z: -20, width: 5.2, depth: 6.2, color: 0x8B5CF6 },
  17: { x: 31.0, z: -20, width: 5.2, depth: 6.2, color: 0x8B5CF6 },
  16: { x: 36.5, z: -20, width: 5.2, depth: 6.2, color: 0x8B5CF6 },

  // BLOCK C (Purple: 0x8B5CF6) — Plots 22 to 27 (Facing South 33' Road with 6' Green Belt)
  22: { x: 7, z: -9, width: 9.0, depth: 6.2, color: 0x8B5CF6 },
  23: { x: 14.5, z: -9, width: 5.2, depth: 6.2, color: 0x8B5CF6 },
  24: { x: 20.0, z: -9, width: 5.2, depth: 6.2, color: 0x8B5CF6 },
  25: { x: 25.5, z: -9, width: 5.2, depth: 6.2, color: 0x8B5CF6 },
  26: { x: 31.0, z: -9, width: 5.2, depth: 6.2, color: 0x8B5CF6 },
  27: { x: 36.5, z: -9, width: 5.2, depth: 6.2, color: 0x8B5CF6 },

  // BLOCK B (Pink: 0xEC4899) — Plots 30, 29, 28 (Facing North 33' Road with 5' Green Belt)
  30: { x: 7, z: 8, width: 6.8, depth: 6.4, color: 0xEC4899 },
  29: { x: 14, z: 8, width: 5.4, depth: 6.4, color: 0xEC4899 },
  28: { x: 20, z: 8, width: 5.4, depth: 6.4, color: 0xEC4899 },

  // BLOCK B (Pink: 0xEC4899) — Plots 31, 32, 33 (Facing South 20' Rasta)
  31: { x: 7, z: 16, width: 6.8, depth: 6.4, color: 0xEC4899 },
  32: { x: 14, z: 16, width: 5.4, depth: 6.4, color: 0xEC4899 },
  33: { x: 20, z: 16, width: 5.4, depth: 6.4, color: 0xEC4899 },

  // BLOCK A (Yellow: 0xEAB308) — Plots 36, 35, 34 (Facing North 20' Rasta)
  36: { x: 7, z: 24, width: 6.2, depth: 6.0, color: 0xEAB308 },
  35: { x: 14, z: 24, width: 5.6, depth: 6.0, color: 0xEAB308 },
  34: { x: 20, z: 24, width: 5.6, depth: 6.0, color: 0xEAB308 },

  // BLOCK D (Green: 0x10B981) — Plots 37 to 44 (South-East Column facing 22'-6" Rasta)
  37: { x: 7, z: 33, width: 5.5, depth: 5.2, color: 0x10B981 },
  38: { x: 7, z: 39, width: 5.5, depth: 5.2, color: 0x10B981 },
  39: { x: 7, z: 45, width: 5.5, depth: 5.2, color: 0x10B981 },
  40: { x: 7, z: 51, width: 5.5, depth: 5.2, color: 0x10B981 },
  41: { x: 7, z: 57, width: 5.5, depth: 5.2, color: 0x10B981 },
  42: { x: 7, z: 63, width: 5.5, depth: 5.2, color: 0x10B981 },
  43: { x: 7, z: 69, width: 5.5, depth: 5.2, color: 0x10B981 },
  44: { x: 7, z: 75, width: 5.1, depth: 5.2, color: 0x10B981 },

  // BLOCK F (Aqua: 0x06B6D4) — Plots 64, 63, 62, 61 (East of Hospital facing 22'-6" Rasta)
  64: { x: -6, z: 7, width: 5.2, depth: 5.8, color: 0x06B6D4 },
  63: { x: -6, z: 13, width: 5.2, depth: 5.8, color: 0x06B6D4 },
  62: { x: -6, z: 19, width: 5.2, depth: 5.8, color: 0x06B6D4 },
  61: { x: -6, z: 25, width: 5.2, depth: 5.8, color: 0x06B6D4 },

  // BLOCK E (Blue: 0x3B82F6) — Plots 54, 53, 52, 51 (Facing North 20' Rasta below Hospital)
  54: { x: -24, z: 32, width: 5.5, depth: 5.4, color: 0x3B82F6 },
  53: { x: -18, z: 32, width: 5.5, depth: 5.4, color: 0x3B82F6 },
  52: { x: -12, z: 32, width: 5.5, depth: 5.4, color: 0x3B82F6 },
  51: { x: -6, z: 32, width: 5.5, depth: 5.4, color: 0x3B82F6 },

  // BLOCK E (Blue: 0x3B82F6) — Plots 50 to 45 (Facing East 22'-6" Central Rasta)
  50: { x: -6, z: 40, width: 5.2, depth: 5.6, color: 0x3B82F6 },
  49: { x: -6, z: 46, width: 5.2, depth: 5.6, color: 0x3B82F6 },
  48: { x: -6, z: 52, width: 5.2, depth: 5.6, color: 0x3B82F6 },
  47: { x: -6, z: 58, width: 5.2, depth: 5.6, color: 0x3B82F6 },
  46: { x: -6, z: 64, width: 5.2, depth: 5.6, color: 0x3B82F6 },
  45: { x: -6, z: 70, width: 5.2, depth: 5.6, color: 0x3B82F6 },

  // BLOCK E (Blue: 0x3B82F6) — Plots 55 to 60 (Facing West 16'-6" Rasta)
  55: { x: -18, z: 40, width: 5.2, depth: 5.6, color: 0x3B82F6 },
  56: { x: -18, z: 46, width: 5.2, depth: 5.6, color: 0x3B82F6 },
  57: { x: -18, z: 52, width: 5.2, depth: 5.6, color: 0x3B82F6 },
  58: { x: -18, z: 58, width: 5.2, depth: 5.6, color: 0x3B82F6 },
  59: { x: -18, z: 64, width: 5.2, depth: 5.6, color: 0x3B82F6 },
  60: { x: -18, z: 70, width: 5.2, depth: 5.6, color: 0x3B82F6 }
};

// ─── Procedural Grass & Road Textures ─────────────────────────────────────────

function createMasterGroundTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1e3828';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 20000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const g = 45 + Math.random() * 40;
    ctx.fillStyle = `rgb(${g - 18}, ${g + 16}, ${g - 12})`;
    ctx.fillRect(x, y, 1.5, 2.5);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(12, 12);
  return tex;
}

function createHighwayAsphaltTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#262A2C';
  ctx.fillRect(0, 0, 512, 128);

  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 128;
    const v = 38 + Math.random() * 25;
    ctx.fillStyle = `rgb(${v}, ${v + 2}, ${v + 4})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  ctx.strokeStyle = '#D9A74A';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(512, 10);
  ctx.moveTo(0, 118);
  ctx.lineTo(512, 118);
  ctx.stroke();

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.setLineDash([20, 16]);
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

  ctx.fillStyle = '#3a4247';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const v = 50 + Math.random() * 25;
    ctx.fillStyle = `rgb(${v}, ${v + 2}, ${v + 3})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  ctx.strokeStyle = 'rgba(20, 24, 28, 0.4)';
  ctx.lineWidth = 1.5;
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

  ctx.fillStyle = '#164828';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const g = 60 + Math.random() * 50;
    ctx.fillStyle = `rgb(${g - 25}, ${g + 20}, ${g - 15})`;
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
        obj.material.forEach((m) => m.dispose());
      } else if (obj.material) {
        if (obj.material.map) obj.material.map.dispose();
        obj.material.dispose();
      }
    }
  });
  scene.clear();
}

// ─── Main Component ──────────────────────────────────────────────────────────

export const MasterPlan3DViewer: React.FC<MasterPlan3DViewerProps> = ({
  onSelectPlot,
  onToggle2DView
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openWhatsApp, openLeadDrawer } = useModal();

  const [selectedBlock, setSelectedBlock] = useState<string>('All');
  const [selectedPlotId, setSelectedPlotId] = useState<string>('plot-1');
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkType | null>(null);
  const [activeInspectorTab, setActiveInspectorTab] = useState<'details' | 'cad-map' | 'specs'>('details');
  const [viewPreset, setViewPreset] = useState<'isometric' | 'top' | 'hospital' | 'highway' | 'residence' | 'mandir'>('isometric');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const plotMeshesRef = useRef<{ [plotNumber: number]: THREE.Mesh }>({});
  const landmarkMeshesRef = useRef<THREE.Group[]>([]);
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
    radius: 95,
    theta: Math.PI / 4.2,
    phi: Math.PI / 3.4,
    target: new THREE.Vector3(0, 0, 15),
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRadius: 95,
    targetTheta: Math.PI / 4.2,
    targetPhi: Math.PI / 3.4,
    targetLookAt: new THREE.Vector3(0, 0, 15)
  });

  const updateCameraPosition = useCallback(() => {
    const orbit = orbitRef.current;
    if (!cameraRef.current) return;

    orbit.radius += (orbit.targetRadius - orbit.radius) * 0.08;
    orbit.theta += (orbit.targetTheta - orbit.theta) * 0.08;
    orbit.phi += (orbit.targetPhi - orbit.phi) * 0.08;
    orbit.target.lerp(orbit.targetLookAt, 0.08);

    const x = orbit.target.x + orbit.radius * Math.sin(orbit.phi) * Math.sin(orbit.theta);
    const y = orbit.target.y + orbit.radius * Math.cos(orbit.phi);
    const z = orbit.target.z + orbit.radius * Math.sin(orbit.phi) * Math.cos(orbit.theta);

    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(orbit.target);
  }, []);

  // ─── Single WebGL Initialization (Mounts Once) ────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x071519);
    scene.fog = new THREE.FogExp2(0x071519, 0.0035);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 580;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    rendererRef.current = renderer;

    // ─── Architectural Natural Lighting Rig ─────────────────────────────────
    const hemiLight = new THREE.HemisphereLight(0xddeaf2, 0x243b2a, 0.9);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xf5eedc, 0.65);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5ea, 2.5);
    sunLight.position.set(50, 90, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = isMobile ? 1024 : 2048;
    sunLight.shadow.mapSize.height = isMobile ? 1024 : 2048;
    sunLight.shadow.camera.left = -75;
    sunLight.shadow.camera.right = 75;
    sunLight.shadow.camera.top = 75;
    sunLight.shadow.camera.bottom = -75;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 250;
    sunLight.shadow.bias = -0.0003;
    sunLight.shadow.radius = 2.0;
    scene.add(sunLight);

    const skyFill = new THREE.DirectionalLight(0x8cb8a8, 0.6);
    skyFill.position.set(-50, 40, -50);
    scene.add(skyFill);

    // ─── Materials ───────────────────────────────────────────────────────────
    const masterGroundTex = createMasterGroundTexture();
    const highwayTex = createHighwayAsphaltTexture();
    const rastaTex = createRastaTexture();
    const greenBeltTex = createGreenBeltTexture();

    const masterGroundMat = new THREE.MeshStandardMaterial({
      map: masterGroundTex,
      color: 0x1d3524,
      roughness: 0.92
    });

    const highwayRoadMat = new THREE.MeshStandardMaterial({
      map: highwayTex,
      color: 0x32383c,
      roughness: 0.82
    });

    const rastaMat = new THREE.MeshStandardMaterial({
      map: rastaTex,
      color: 0x485055,
      roughness: 0.84
    });

    const greenBeltMat = new THREE.MeshStandardMaterial({
      map: greenBeltTex,
      color: 0x225530,
      roughness: 0.88
    });

    const buildingWallMat = new THREE.MeshStandardMaterial({ color: 0xeee7db, roughness: 0.65 });
    const bronzeAccentMat = new THREE.MeshStandardMaterial({ color: 0x48382c, metalness: 0.85, roughness: 0.3 });
    const goldAccentMat = new THREE.MeshStandardMaterial({ color: 0xc58f58, metalness: 0.75, roughness: 0.25 });
    const glassFacadeMat = new THREE.MeshStandardMaterial({
      color: 0x88c4d8,
      roughness: 0.08,
      metalness: 0.25,
      transparent: true,
      opacity: 0.55
    });

    // ─── 1. Township Master Ground Terrain (180m × 180m) ───────────────────
    const masterTerrain = new THREE.Mesh(new THREE.PlaneGeometry(180, 180), masterGroundMat);
    masterTerrain.rotation.x = -Math.PI / 2;
    masterTerrain.position.set(0, 0, 15);
    masterTerrain.receiveShadow = true;
    scene.add(masterTerrain);

    // ─── 2. Road Network (Derived from CAD masterplan-real.jpg) ────────────

    // A. West Highway Corridor: ROAD 33'-0" WIDE (Running North-South along West Boundary)
    const westHighway = new THREE.Mesh(new THREE.PlaneGeometry(10.5, 140), highwayRoadMat);
    westHighway.rotation.x = -Math.PI / 2;
    westHighway.position.set(-36, 0.02, 15);
    westHighway.receiveShadow = true;
    scene.add(westHighway);

    // B. Central Arterial Highway: ROAD 33'-0" WIDE (East-West Dividing Road)
    const centralHighway = new THREE.Mesh(new THREE.PlaneGeometry(85, 10.5), highwayRoadMat);
    centralHighway.rotation.x = -Math.PI / 2;
    centralHighway.position.set(4, 0.025, 0);
    centralHighway.receiveShadow = true;
    scene.add(centralHighway);

    // C. Central North-South Spine: RASTA 22'-6" WIDE (Connecting North and South)
    const centralRastaSpine = new THREE.Mesh(new THREE.PlaneGeometry(7.0, 130), rastaMat);
    centralRastaSpine.rotation.x = -Math.PI / 2;
    centralRastaSpine.position.set(0, 0.02, 15);
    centralRastaSpine.receiveShadow = true;
    scene.add(centralRastaSpine);

    // D. North Sector RASTA 20'-0" WIDE (Separating Plots 10-15 and 21-16)
    const northRasta20 = new THREE.Mesh(new THREE.PlaneGeometry(36, 6.2), rastaMat);
    northRasta20.rotation.x = -Math.PI / 2;
    northRasta20.position.set(22, 0.022, -28.5);
    northRasta20.receiveShadow = true;
    scene.add(northRasta20);

    // E. North Perimeter RASTA 11'-0" WIDE (Along North Boundary)
    const northPerimeterRasta11 = new THREE.Mesh(new THREE.PlaneGeometry(42, 3.5), rastaMat);
    northPerimeterRasta11.rotation.x = -Math.PI / 2;
    northPerimeterRasta11.position.set(22, 0.022, -44.5);
    northPerimeterRasta11.receiveShadow = true;
    scene.add(northPerimeterRasta11);

    // F. Mid-East Sector RASTA 20'-0" WIDE (Separating Plots 31-33 and 34-36)
    const midEastRasta20 = new THREE.Mesh(new THREE.PlaneGeometry(24, 6.2), rastaMat);
    midEastRasta20.rotation.x = -Math.PI / 2;
    midEastRasta20.position.set(16, 0.022, 20);
    midEastRasta20.receiveShadow = true;
    scene.add(midEastRasta20);

    // G. Hospital Front RASTA 20'-0" WIDE (Below Hospital and Plots 61-64)
    const hospFrontRasta20 = new THREE.Mesh(new THREE.PlaneGeometry(32, 6.2), rastaMat);
    hospFrontRasta20.rotation.x = -Math.PI / 2;
    hospFrontRasta20.position.set(-18, 0.022, 28.5);
    hospFrontRasta20.receiveShadow = true;
    scene.add(hospFrontRasta20);

    // H. West South RASTA 16'-6" WIDE (Along Block E Plots 55-60)
    const westSouthRasta16 = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 45), rastaMat);
    westSouthRasta16.rotation.x = -Math.PI / 2;
    westSouthRasta16.position.set(-24, 0.022, 54);
    westSouthRasta16.receiveShadow = true;
    scene.add(westSouthRasta16);

    // ─── 3. Green Buffer Belts (5ft & 6ft Strips from CAD) ─────────────────
    // 6ft Green Belt along South of North Parcel (Facing 33ft road)
    const northGreenBelt = new THREE.Mesh(new THREE.PlaneGeometry(75, 2.0), greenBeltMat);
    northGreenBelt.rotation.x = -Math.PI / 2;
    northGreenBelt.position.set(4, 0.03, -4.5);
    scene.add(northGreenBelt);

    // 5ft Green Belt along North of South Parcel (Facing 33ft road)
    const southGreenBelt = new THREE.Mesh(new THREE.PlaneGeometry(75, 1.8), greenBeltMat);
    southGreenBelt.rotation.x = -Math.PI / 2;
    southGreenBelt.position.set(4, 0.03, 4.5);
    scene.add(southGreenBelt);

    // ─── 4. Landmark 1: Proposed 30,000 Sq. Ft. Multi-Speciality Ayurvedic Hospital ───
    const hospitalGroup = new THREE.Group();
    hospitalGroup.name = 'landmark-hospital';
    hospitalGroup.position.set(-22, 0, 16);

    // Main L-Shape Building Footprint (117'-10" × 138')
    const hospMainWing = new THREE.Mesh(new THREE.BoxGeometry(16, 9.2, 18), buildingWallMat);
    hospMainWing.position.set(0, 4.6, 0);
    hospMainWing.castShadow = true;
    hospMainWing.receiveShadow = true;
    hospitalGroup.add(hospMainWing);

    const hospYogaWing = new THREE.Mesh(new THREE.BoxGeometry(10, 8.5, 12), buildingWallMat);
    hospYogaWing.position.set(6, 4.25, -4);
    hospYogaWing.castShadow = true;
    hospYogaWing.receiveShadow = true;
    hospitalGroup.add(hospYogaWing);

    // Glass Atrium & Reception Entry
    const hospGlassAtrium = new THREE.Mesh(new THREE.BoxGeometry(12, 7.5, 0.2), glassFacadeMat);
    hospGlassAtrium.position.set(0, 4.25, -9.1);
    hospitalGroup.add(hospGlassAtrium);

    // Grand Entrance Canopy & Emergency Portico
    const hospCanopy = new THREE.Mesh(new THREE.BoxGeometry(10, 0.4, 6), goldAccentMat);
    hospCanopy.position.set(0, 4.0, -11.5);
    hospCanopy.castShadow = true;
    hospitalGroup.add(hospCanopy);

    [-4, 4].forEach((px) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 4.0, 8), bronzeAccentMat);
      col.position.set(px, 2.0, -14.0);
      col.castShadow = true;
      hospitalGroup.add(col);
    });

    // Rooftop Hydrotherapy Pool (10' × 12') & Pergola Deck
    const hospPool = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.6, 3.6),
      new THREE.MeshStandardMaterial({ color: 0x1b5e78, metalness: 0.9, roughness: 0.1 })
    );
    hospPool.position.set(-3.5, 9.4, 4);
    hospitalGroup.add(hospPool);

    // 50-Seat Open Auditorium on Roof
    const audPlinth = new THREE.Mesh(new THREE.BoxGeometry(6, 0.4, 6), buildingWallMat);
    audPlinth.position.set(3.5, 9.4, 4);
    hospitalGroup.add(audPlinth);

    // Hospital Signage Plaque
    const hospSign = new THREE.Mesh(
      new THREE.BoxGeometry(8.0, 1.2, 0.25),
      new THREE.MeshStandardMaterial({ color: 0x2c5e50, roughness: 0.3 })
    );
    hospSign.position.set(0, 9.8, -9.0);
    hospitalGroup.add(hospSign);

    hospitalGroup.traverse((child) => {
      child.userData = { landmark: 'hospital' };
    });
    scene.add(hospitalGroup);

    // ─── 5. Landmark 2: Proposed G+2 Senior Residences (Plots 63 & 64) ───────
    const residenceGroup = new THREE.Group();
    residenceGroup.name = 'landmark-residence';
    residenceGroup.position.set(-6, 0, 10);

    // Stilt Parking Floor (46' × 50'-6") with Open Bays
    const stiltCeiling = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.3, 11.5), buildingWallMat);
    stiltCeiling.position.set(0, 2.2, 0);
    residenceGroup.add(stiltCeiling);

    [-4.5, 0, 4.5].forEach((cx) => {
      [-4.5, 0, 4.5].forEach((cz) => {
        const col = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.2, 0.35), buildingWallMat);
        col.position.set(cx, 1.1, cz);
        col.castShadow = true;
        residenceGroup.add(col);
      });
    });

    // 3 Habitable Floors (Ground, 1st, 2nd)
    const gfRes = new THREE.Mesh(new THREE.BoxGeometry(10.2, 1.8, 11.2), buildingWallMat);
    gfRes.position.set(0, 3.2, 0);
    gfRes.castShadow = true;
    residenceGroup.add(gfRes);

    const ffRes = new THREE.Mesh(new THREE.BoxGeometry(10.2, 1.8, 11.2), buildingWallMat);
    ffRes.position.set(0, 5.1, 0);
    ffRes.castShadow = true;
    residenceGroup.add(ffRes);

    const sfRes = new THREE.Mesh(new THREE.BoxGeometry(10.2, 1.8, 11.2), buildingWallMat);
    sfRes.position.set(0, 7.0, 0);
    sfRes.castShadow = true;
    residenceGroup.add(sfRes);

    // Cantilevered 3'-6" Balconies
    [-1, 1].forEach((side) => {
      const balcony = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.15, 1.2), goldAccentMat);
      balcony.position.set(0, 5.0, side * 6.1);
      residenceGroup.add(balcony);

      const balcony2 = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.15, 1.2), goldAccentMat);
      balcony2.position.set(0, 6.9, side * 6.1);
      residenceGroup.add(balcony2);
    });

    // Lift & Stair Core Tower
    const liftTower = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.0, 2.6), bronzeAccentMat);
    liftTower.position.set(0, 8.8, 0);
    liftTower.castShadow = true;
    residenceGroup.add(liftTower);

    residenceGroup.traverse((child) => {
      child.userData = { landmark: 'residence' };
    });
    scene.add(residenceGroup);

    // ─── 6. Landmark 3: Community Mandir & Reflection Kund ───────────────────
    const mandirGroup = new THREE.Group();
    mandirGroup.name = 'landmark-mandir';
    mandirGroup.position.set(-28, 0, -5);

    const mandirPlinthMat = new THREE.MeshStandardMaterial({ color: 0xd8c8b0, roughness: 0.65 });
    const plinth1 = new THREE.Mesh(new THREE.BoxGeometry(10, 0.4, 10), mandirPlinthMat);
    plinth1.position.set(0, 0.2, 0);
    mandirGroup.add(plinth1);

    const mandirHall = new THREE.Mesh(new THREE.BoxGeometry(7, 3.2, 7), mandirPlinthMat);
    mandirHall.position.set(0, 2.0, 0);
    mandirHall.castShadow = true;
    mandirGroup.add(mandirHall);

    const shikhara = new THREE.Mesh(
      new THREE.ConeGeometry(3.6, 5.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.35, metalness: 0.55 })
    );
    shikhara.position.set(0, 6.2, 0);
    shikhara.castShadow = true;
    mandirGroup.add(shikhara);

    const kalasha = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.15, metalness: 0.9 })
    );
    kalasha.position.set(0, 9.2, 0);
    mandirGroup.add(kalasha);

    // Stepped Reflection Kund / Pond
    const kundWater = new THREE.Mesh(
      new THREE.PlaneGeometry(6.5, 5.5),
      new THREE.MeshStandardMaterial({
        color: 0x1b4d63,
        roughness: 0.05,
        metalness: 0.85,
        transparent: true,
        opacity: 0.85
      })
    );
    kundWater.rotation.x = -Math.PI / 2;
    kundWater.position.set(0, 0.25, 7.5);
    mandirGroup.add(kundWater);

    mandirGroup.traverse((child) => {
      child.userData = { landmark: 'mandir' };
    });
    scene.add(mandirGroup);

    // ─── 7. Landmark 4: Utility Enclave (289 SQYD) ──────────────────────────
    const utilityGroup = new THREE.Group();
    utilityGroup.name = 'landmark-utility';
    utilityGroup.position.set(36, 0, -40);

    const utilBuilding = new THREE.Mesh(new THREE.BoxGeometry(7, 3.2, 6), buildingWallMat);
    utilBuilding.position.set(0, 1.6, 0);
    utilBuilding.castShadow = true;
    utilityGroup.add(utilBuilding);

    const utilSubstation = new THREE.Mesh(
      new THREE.BoxGeometry(4, 2.0, 3),
      new THREE.MeshStandardMaterial({ color: 0x485055, metalness: 0.7, roughness: 0.3 })
    );
    utilSubstation.position.set(0, 1.0, 5);
    utilityGroup.add(utilSubstation);

    utilityGroup.traverse((child) => {
      child.userData = { landmark: 'utility' };
    });
    scene.add(utilityGroup);

    // ─── 8. Landmark 5: 33ft Main Entrance Gateway ───────────────────────────
    const gateGroup = new THREE.Group();
    gateGroup.name = 'landmark-gate';
    gateGroup.position.set(-36, 0, 0);

    const gateCol1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 4.8, 1.2), buildingWallMat);
    gateCol1.position.set(0, 2.4, -4.5);
    gateGroup.add(gateCol1);

    const gateCol2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 4.8, 1.2), buildingWallMat);
    gateCol2.position.set(0, 2.4, 4.5);
    gateGroup.add(gateCol2);

    const gateLintel = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.8, 11), bronzeAccentMat);
    gateLintel.position.set(0, 4.8, 0);
    gateGroup.add(gateLintel);

    const guardPost = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.6, 3.0), buildingWallMat);
    guardPost.position.set(3.5, 1.3, -4.5);
    gateGroup.add(guardPost);

    gateGroup.traverse((child) => {
      child.userData = { landmark: 'gate' };
    });
    scene.add(gateGroup);

    landmarkMeshesRef.current = [hospitalGroup, residenceGroup, mandirGroup, utilityGroup, gateGroup];

    // ─── 9. Exact 64 Freehold Residential Plots (Blocks A to F) ───────────────
    const plotMeshes: { [plotNumber: number]: THREE.Mesh } = {};
    const cornerStoneGeo = new THREE.BoxGeometry(0.25, 0.5, 0.25);
    const cornerStoneMat = new THREE.MeshStandardMaterial({ color: 0xf5eedc, roughness: 0.6 });

    allPlots.forEach((plot) => {
      const coord = PLOT_COORDINATES_MAP[plot.number];
      if (!coord) return;

      const plotGeo = new THREE.BoxGeometry(coord.width, 0.08, coord.depth);
      const plotMat = new THREE.MeshStandardMaterial({
        color: coord.color,
        roughness: 0.75,
        metalness: 0.1
      });

      const plotMesh = new THREE.Mesh(plotGeo, plotMat);
      plotMesh.position.set(coord.x, 0.04, coord.z);
      plotMesh.receiveShadow = true;
      plotMesh.userData = { plot, baseColor: coord.color };

      // Add 4 white boundary demarcation corner stones
      const halfW = coord.width / 2;
      const halfD = coord.depth / 2;
      [
        [-halfW, -halfD],
        [halfW, -halfD],
        [-halfW, halfD],
        [halfW, halfD]
      ].forEach(([cx, cz]) => {
        const stone = new THREE.Mesh(cornerStoneGeo, cornerStoneMat);
        stone.position.set(cx, 0.25, cz);
        stone.castShadow = true;
        plotMesh.add(stone);
      });

      scene.add(plotMesh);
      plotMeshes[plot.number] = plotMesh;
    });

    plotMeshesRef.current = plotMeshes;

    // ─── 10. Landscaping: Trees & Royal Palms along Road Buffers ───────────────
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1f4a2c, roughness: 0.8 });
    const amaltasMat = new THREE.MeshStandardMaterial({ color: 0xd4a017, roughness: 0.75 });

    const treeGeo = new THREE.SphereGeometry(1.4, 8, 8);
    const trunkGeo = new THREE.CylinderGeometry(0.15, 0.22, 2.5, 6);

    // Perimeter buffer trees
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      const r = 68 + (i % 3) * 5;
      const tx = Math.cos(angle) * r;
      const tz = 15 + Math.sin(angle) * r;

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(tx, 1.25, tz);
      trunk.castShadow = true;
      scene.add(trunk);

      const crown = new THREE.Mesh(treeGeo, i % 4 === 0 ? amaltasMat : foliageMat);
      crown.position.set(tx, 3.2, tz);
      crown.scale.set(1.0, 1.2 + (i % 3) * 0.2, 1.0);
      crown.castShadow = true;
      scene.add(crown);
    }

    // Trees along Central East-West Green Buffer
    [-24, -16, -8, 8, 16, 24, 32].forEach((gx) => {
      [-3.5, 3.5].forEach((gz) => {
        const treeTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 2.2, 6), trunkMat);
        treeTrunk.position.set(gx, 1.1, gz);
        scene.add(treeTrunk);

        const treeCrown = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), foliageMat);
        treeCrown.position.set(gx, 2.8, gz);
        scene.add(treeCrown);
      });
    });

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
              const prevMat = selectedPlotMeshRef.current.material as THREE.MeshStandardMaterial;
              prevMat.emissive.setHex(0x000000);
              prevMat.emissiveIntensity = 0;
            }

            const hitMesh = intersects[0].object as THREE.Mesh;
            const mat = hitMesh.material as THREE.MeshStandardMaterial;
            mat.emissive.setHex(0xffffff);
            mat.emissiveIntensity = 0.4;
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
              orbitRef.current.targetLookAt.set(-22, 4, 16);
              orbitRef.current.targetRadius = 45;
            } else if (landmarkKey === 'mandir') {
              orbitRef.current.targetLookAt.set(-28, 4, -5);
              orbitRef.current.targetRadius = 40;
            } else if (landmarkKey === 'residence') {
              orbitRef.current.targetLookAt.set(-6, 4, 10);
              orbitRef.current.targetRadius = 38;
            } else if (landmarkKey === 'utility') {
              orbitRef.current.targetLookAt.set(36, 2, -40);
              orbitRef.current.targetRadius = 40;
            } else if (landmarkKey === 'gate') {
              orbitRef.current.targetLookAt.set(-36, 2, 0);
              orbitRef.current.targetRadius = 50;
            }
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRef.current.targetRadius = Math.max(
        20,
        Math.min(140, orbitRef.current.targetRadius + e.deltaY * 0.04)
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

  // Handle preset view transitions
  const handlePresetView = (preset: typeof viewPreset) => {
    setViewPreset(preset);
    setSelectedLandmark(null);

    if (preset === 'isometric') {
      orbitRef.current.targetTheta = Math.PI / 4.2;
      orbitRef.current.targetPhi = Math.PI / 3.4;
      orbitRef.current.targetRadius = 95;
      orbitRef.current.targetLookAt.set(0, 0, 15);
    } else if (preset === 'top') {
      // Direct Top-Down CAD Validation View
      orbitRef.current.targetTheta = 0.001;
      orbitRef.current.targetPhi = 0.04;
      orbitRef.current.targetRadius = 110;
      orbitRef.current.targetLookAt.set(0, 0, 15);
    } else if (preset === 'hospital') {
      orbitRef.current.targetTheta = -Math.PI / 3.8;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 50;
      orbitRef.current.targetLookAt.set(-22, 4, 16);
      setSelectedLandmark('hospital');
    } else if (preset === 'residence') {
      orbitRef.current.targetTheta = Math.PI / 3.5;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 40;
      orbitRef.current.targetLookAt.set(-6, 4, 10);
      setSelectedLandmark('residence');
    } else if (preset === 'mandir') {
      orbitRef.current.targetTheta = Math.PI / 4;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 42;
      orbitRef.current.targetLookAt.set(-28, 4, -5);
      setSelectedLandmark('mandir');
    } else if (preset === 'highway') {
      orbitRef.current.targetTheta = Math.PI / 2.05;
      orbitRef.current.targetPhi = Math.PI / 2.6;
      orbitRef.current.targetRadius = 60;
      orbitRef.current.targetLookAt.set(-36, 2, 0);
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
        isFullscreen ? 'fixed inset-0 z-[99999] rounded-none h-screen w-screen flex flex-col lg:flex-row' : 'rounded-3xl h-[640px] sm:h-[740px]'
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
              Rendering Source-Accurate 3D Master Plan...
            </span>
          </div>
        )}

        {/* Top Left Header & Proposed Badge */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2329]/90 border border-white/15 text-[11px] font-mono text-[#E0AB77] uppercase tracking-widest backdrop-blur-md shadow-lg pointer-events-auto">
            <Layers className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>AUTHENTIC CAD 3D RECONSTRUCTION</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold backdrop-blur-md shadow-lg pointer-events-auto">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>64 Demarcated Freehold Plots (Blocks A–F)</span>
          </div>
        </div>

        {/* Top Right Controls & View Toolbar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#0D2329]/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 shadow-xl pointer-events-auto">
          <button
            onClick={() => handlePresetView('isometric')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewPreset === 'isometric' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => handlePresetView('top')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              viewPreset === 'top' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
            title="Overhead Validation Mode (Exact Blueprint Congruency)"
          >
            <Compass className="w-3.5 h-3.5" />
            Top CAD View
          </button>

          <button
            onClick={() => handlePresetView('hospital')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewPreset === 'hospital' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            Hospital
          </button>

          <button
            onClick={() => handlePresetView('residence')}
            className={`hidden sm:block px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewPreset === 'residence' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            Residences (63-64)
          </button>

          <button
            onClick={() => handlePresetView('mandir')}
            className={`hidden md:block px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewPreset === 'mandir' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            Mandir
          </button>

          <div className="h-4 w-px bg-white/20 mx-1" />

          {onToggle2DView && (
            <button
              onClick={onToggle2DView}
              className="px-2.5 py-1.5 rounded-xl text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              2D Matrix
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Studio Fullscreen Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-[#C58F58]" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Bottom Left HUD Info */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[11px] text-white/70 pointer-events-none z-10">
          <div className="flex items-center gap-2 bg-[#071519]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
            <span className="hidden sm:inline">Drag to Orbit • Scroll to Zoom • Tap Any Plot / Building to Inspect</span>
            <span className="sm:hidden">Tap to Inspect</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 bg-[#071519]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>SH-22 & 33ft Corridor, Kheri Asra, Jhajjar</span>
          </div>
        </div>

        {/* Non-Fullscreen Floating Selection Card */}
        {!isFullscreen && (
          <div className="absolute right-4 bottom-16 sm:bottom-20 max-w-xs w-full bg-[#071519]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-5 text-white shadow-2xl z-20 space-y-3 pointer-events-auto">
            {activeLandmarkInfo ? (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#2C5E50]/40 border border-emerald-400/40 text-[10px] font-bold text-emerald-300 uppercase">
                    {activeLandmarkInfo.badge}
                  </span>
                  <button
                    onClick={() => setSelectedLandmark(null)}
                    className="text-white/50 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <h4 className="text-base font-serif-heading font-bold text-[#FAF8F5]">
                    {activeLandmarkInfo.title}
                  </h4>
                  <p className="text-xs text-white/70 mt-1 line-clamp-2">
                    {activeLandmarkInfo.description}
                  </p>
                </div>
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#C58F58]" />
                  Open Full CAD Inspector
                </button>
              </>
            ) : selectedPlot ? (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-bold text-emerald-300 uppercase">
                      Phase 1 Pre-Launch
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
                  <a
                    href={`/book/${selectedPlot.id.toUpperCase()}`}
                    className="w-full py-2.5 rounded-2xl bg-[#C58F58] hover:bg-[#b07d48] text-[#071519] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 text-center"
                  >
                    Lock 24h Reservation Hold →
                  </a>
                  <button
                    onClick={() =>
                      openWhatsApp({
                        actionType: 'reserve-plot',
                        plotNumber: selectedPlot.plotNumber,
                        plotBlock: selectedPlot.block,
                        message: `Hello, I am viewing ${selectedPlot.plotNumber} (${selectedPlot.block}, ${selectedPlot.sizeSqYd} sq.yd., ${selectedPlot.dimensions}) on the 3D Master Plan for Senior Living Citizens Foundation. Please share price breakdown and payment terms.`
                      })
                    }
                    className="w-full py-2 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Inquire on WhatsApp
                  </button>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>

      {/* ─── FULLSCREEN STUDIO INSPECTOR SIDEBAR (Right 30% on Laptop/Desktop) ─── */}
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
                    Master Plan Studio Inspector
                  </h3>
                  <span className="text-[10px] font-mono text-[#C58F58] uppercase tracking-wider block">
                    Real CAD Blueprint Synchronized
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
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[9px] font-mono font-bold">
                          SOURCE_DERIVED
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

                    {/* Landmark Direct Action */}
                    <button
                      onClick={() => openLeadDrawer({ title: `Inquire about ${activeLandmarkInfo.title}`, actionType: 'book-site-visit' })}
                      className="w-full py-3 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#E0AB77]" />
                      <span>Book Site Visit to Inspect Landmark Location →</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase">
                          Freehold Plotted Land
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

                      <a
                        href={`/book/${selectedPlot.id.toUpperCase()}`}
                        className="w-full py-3 rounded-2xl bg-[#C58F58] hover:bg-[#b07d48] text-[#071519] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 text-center block"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Reserve 24h Hold for {selectedPlot.plotNumber}</span>
                      </a>
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
                  <span className="text-[10px] font-mono text-[#C58F58] uppercase">Legal Title & Demarcation</span>
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

