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
  Info
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
}

const LANDMARK_REGISTRY: Record<LandmarkType, LandmarkInfo> = {
  hospital: {
    id: 'hospital',
    title: '30,000 Sq. Ft. Multi-Speciality Ayurvedic Hospital',
    badge: 'On-Site Healthcare Continuum',
    category: 'Healthcare & Wellness',
    area: '30,000 sq. ft. Built-Up Area',
    dimensions: '117\'-6" × 138\'-0" L-Shaped Footprint',
    floors: 'G+2 Structural Facility with Lift Core',
    description: 'Specialized senior care hospital featuring Panchakarma Ayurvedic detox suites, 24/7 ICU emergency response, 6 OPD doctor consultation chambers, diagnostic pathology, and rooftop hydrotherapy pool.',
    features: [
      '24/7 Geriatric Emergency & Ambulance Dock',
      'Authentic Ayurvedic Panchakarma Suites (Abhyanga & Shirodhara)',
      '6 Physician OPD Chambers + Dialysis & ICU Wing',
      'Rooftop Hydrotherapy Pool (10\' × 12\') & 50-Seat Open Auditorium'
    ],
    cadZone: 'South-West Healthcare Zone (Facing 33ft Main Road)',
    cadCoordinates: { x: -25.77, y: 27.58 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  mandir: {
    id: 'mandir',
    title: 'Community Mandir & Sacred Reflection Kund',
    badge: 'Spiritual Sanctuary',
    category: 'Spirituality & Culture',
    area: 'Dedicated Mandir Land Parcel (85\' × 24\')',
    dimensions: 'Sandstone Plinth with Shikhara Spire + Reflection Kund',
    floors: 'Traditional Carved Mandapa + Stepped Kund',
    description: 'Tranquil community temple crafted in authentic Rajasthani sandstone with a stepped water body (kund) for daily morning aarti, meditation, and satsang.',
    features: [
      'Traditional Shikhara with Gold Kalasha',
      'Stepped Sandstone Meditation Kund',
      'Elder-Friendly Step-Free Approach Ramp',
      '6ft Continuous Green Tree Buffer Frontage'
    ],
    cadZone: 'Block A (South of Plot 3 along 33ft Road)',
    cadCoordinates: { x: -30.71, y: -10.53 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  residence: {
    id: 'residence',
    title: 'G+2 Senior Care Apartment Suites (Plots 63 & 64)',
    badge: '12 Barrier-Free Residences',
    category: 'Plotted Residences',
    area: '50\'-6" × 46\'-0" Combined Plot Footprint',
    dimensions: 'Stilt Parking + 3 Habitable Residential Floors',
    floors: 'Stilt + G+2 with 8-Passenger Stretcher Elevator',
    description: 'Dedicated senior living apartment block on Plots 63 & 64 with 1 BHK & 1 RK barrier-free care suites, covered 14-bay stilt parking, 3 entry gates, and cantilevered balconies.',
    features: [
      '8-Passenger Stretcher-Compliant Elevator Core',
      '14 Covered Stilt Parking Bays with 3 Entry Gates',
      'Cantilevered 3\'-6" Balconies with Safety Railings',
      '4 × 1 RK Studio Suites + 2 × 1 BHK Residences per Floor'
    ],
    cadZone: 'Block A (Plots 63 & 64, East of Ayurvedic Hospital)',
    cadCoordinates: { x: -11.13, y: 13.56 },
    sourceConfidence: 'SOURCE_VERIFIED'
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
    cadCoordinates: { x: -44, y: 0 },
    sourceConfidence: 'SOURCE_VERIFIED'
  },
  utility: {
    id: 'utility',
    title: 'Township Utility Services Enclave (289 SQYD)',
    badge: 'Civic Infrastructure',
    category: 'Utilities & Power',
    area: '289 Sq. Yds. Dedicated Enclave (48\' × 54\')',
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
    description: 'Pristine natural environment with native Amaltas, Neem, and medicinal herbal tree lines buffering the residences from road corridors.',
    features: [
      '6ft Green Buffer along North Parcel Boundary',
      '5ft Green Buffer along South Parcel Boundary',
      'Continuous Non-Slip Senior Walking Promenades',
      'Solar-Powered LED Streetlight Network'
    ],
    cadZone: 'Central & Peripheral Buffer Strips',
    cadCoordinates: { x: 0, y: 0 },
    sourceConfidence: 'SOURCE_VERIFIED'
  }
};

// ─── Procedural Canvas Texture Generators ──────────────────────────────────────

function createPlotCanvasTexture(number: number, sizeSqYd: number, blockName: string, blockColorHex: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Block Background
  const hexStr = '#' + blockColorHex.toString(16).padStart(6, '0');
  ctx.fillStyle = hexStr;
  ctx.fillRect(0, 0, 256, 256);

  // Subtle interior inset
  ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.fillRect(8, 8, 240, 240);

  // High contrast boundary stroke
  ctx.strokeStyle = 'rgba(13, 35, 41, 0.9)';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 248, 248);

  // Corner markers
  ctx.fillStyle = '#FFFFFF';
  [[8, 8], [240, 8], [8, 240], [240, 240]].forEach(([px, py]) => {
    ctx.fillRect(px - 4, py - 4, 8, 8);
  });

  // Large Bold Plot Number
  ctx.fillStyle = '#0D2329';
  ctx.font = 'bold 78px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(number), 128, 100);

  // Size in Square Yards
  ctx.fillStyle = '#163942';
  ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
  ctx.fillText(`${sizeSqYd} YD`, 128, 172);

  // Block identifier pill
  ctx.fillStyle = 'rgba(13, 35, 41, 0.22)';
  ctx.fillRect(44, 206, 168, 28);
  ctx.fillStyle = '#0D2329';
  ctx.font = 'bold 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(blockName.toUpperCase(), 128, 222);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  return tex;
}

function createRoadLabelTexture(text: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#262A2C';
  ctx.fillRect(0, 0, 512, 64);

  ctx.fillStyle = '#D9A74A';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 32);

  const tex = new THREE.CanvasTexture(canvas);
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
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.lineTo(512, 8);
  ctx.moveTo(0, 120);
  ctx.lineTo(512, 120);
  ctx.stroke();

  // White Dashed Centerline
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

  ctx.fillStyle = '#343a3e';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const v = 45 + Math.random() * 25;
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
    const bronzeAccentMat = new THREE.MeshStandardMaterial({ color: 0x48382c, metalness: 0.85, roughness: 0.3 });
    const goldAccentMat = new THREE.MeshStandardMaterial({ color: 0xc58f58, metalness: 0.75, roughness: 0.25 });
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
    // 6ft Green Belt along North side of Central 33ft Highway
    const northGreenBelt = new THREE.Mesh(new THREE.PlaneGeometry(100, 1.83), greenBeltMat);
    northGreenBelt.rotation.x = -Math.PI / 2;
    northGreenBelt.position.set(6, 0.03, -5.95);
    scene.add(northGreenBelt);

    // 5ft Green Belt along South side of Central 33ft Highway
    const southGreenBelt = new THREE.Mesh(new THREE.PlaneGeometry(100, 1.52), greenBeltMat);
    southGreenBelt.rotation.x = -Math.PI / 2;
    southGreenBelt.position.set(6, 0.03, 5.79);
    scene.add(southGreenBelt);

    // ─── 4. Landmark 1: Proposed 30,000 Sq. Ft. Multi-Speciality Ayurvedic Hospital ───
    const hospitalGroup = new THREE.Group();
    hospitalGroup.name = 'landmark-hospital';
    hospitalGroup.position.set(-25.77, 0, 27.58);

    // Main Hospital Wing Footprint
    const hospMainWing = new THREE.Mesh(new THREE.BoxGeometry(24, 10.5, 26), buildingWallMat);
    hospMainWing.position.set(-4, 5.25, 0);
    hospMainWing.castShadow = true;
    hospMainWing.receiveShadow = true;
    hospitalGroup.add(hospMainWing);

    const hospPanchakarmaWing = new THREE.Mesh(new THREE.BoxGeometry(11.8, 9.0, 16), buildingWallMat);
    hospPanchakarmaWing.position.set(10, 4.5, -5);
    hospPanchakarmaWing.castShadow = true;
    hospPanchakarmaWing.receiveShadow = true;
    hospitalGroup.add(hospPanchakarmaWing);

    // Glass Atrium & OPD Entrance
    const hospGlassAtrium = new THREE.Mesh(new THREE.BoxGeometry(16, 8.5, 0.3), glassFacadeMat);
    hospGlassAtrium.position.set(-4, 4.5, -13.2);
    hospitalGroup.add(hospGlassAtrium);

    // Emergency Drop-off Portico
    const hospCanopy = new THREE.Mesh(new THREE.BoxGeometry(14, 0.5, 7), goldAccentMat);
    hospCanopy.position.set(-4, 4.2, -16.5);
    hospCanopy.castShadow = true;
    hospitalGroup.add(hospCanopy);

    [-9, 1].forEach((px) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 4.2, 8), bronzeAccentMat);
      col.position.set(px, 2.1, -19.5);
      col.castShadow = true;
      hospitalGroup.add(col);
    });

    // Rooftop Hydrotherapy Pool
    const hospPool = new THREE.Mesh(
      new THREE.BoxGeometry(5.5, 0.8, 4.5),
      new THREE.MeshStandardMaterial({ color: 0x1b5e78, metalness: 0.9, roughness: 0.1 })
    );
    hospPool.position.set(-8, 10.9, 5);
    hospitalGroup.add(hospPool);

    // 50-Seat Rooftop Auditorium
    const audPlinth = new THREE.Mesh(new THREE.BoxGeometry(8, 0.5, 8), buildingWallMat);
    audPlinth.position.set(2, 10.8, 5);
    hospitalGroup.add(audPlinth);

    // Hospital Signage
    const hospSign = new THREE.Mesh(
      new THREE.BoxGeometry(12.0, 1.5, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x2c5e50, roughness: 0.3 })
    );
    hospSign.position.set(-4, 11.2, -13.0);
    hospitalGroup.add(hospSign);

    hospitalGroup.traverse((child) => {
      child.userData = { landmark: 'hospital' };
    });
    scene.add(hospitalGroup);

    // ─── 5. Landmark 2: Proposed G+2 Senior Residences (Plots 63 & 64) ───────
    const residenceGroup = new THREE.Group();
    residenceGroup.name = 'landmark-residence';
    residenceGroup.position.set(-11.13, 0, 13.56);

    const stiltCeiling = new THREE.Mesh(new THREE.BoxGeometry(14.5, 0.3, 13.5), buildingWallMat);
    stiltCeiling.position.set(0, 2.4, 0);
    residenceGroup.add(stiltCeiling);

    [-6, 0, 6].forEach((cx) => {
      [-5.5, 0, 5.5].forEach((cz) => {
        const col = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.4, 0.4), buildingWallMat);
        col.position.set(cx, 1.2, cz);
        col.castShadow = true;
        residenceGroup.add(col);
      });
    });

    const gfRes = new THREE.Mesh(new THREE.BoxGeometry(14.2, 2.0, 13.2), buildingWallMat);
    gfRes.position.set(0, 3.5, 0);
    gfRes.castShadow = true;
    residenceGroup.add(gfRes);

    const ffRes = new THREE.Mesh(new THREE.BoxGeometry(14.2, 2.0, 13.2), buildingWallMat);
    ffRes.position.set(0, 5.6, 0);
    ffRes.castShadow = true;
    residenceGroup.add(ffRes);

    const sfRes = new THREE.Mesh(new THREE.BoxGeometry(14.2, 2.0, 13.2), buildingWallMat);
    sfRes.position.set(0, 7.7, 0);
    sfRes.castShadow = true;
    residenceGroup.add(sfRes);

    // Balconies
    [-1, 1].forEach((side) => {
      const balcony1 = new THREE.Mesh(new THREE.BoxGeometry(13.5, 0.15, 1.2), goldAccentMat);
      balcony1.position.set(0, 5.4, side * 7.1);
      residenceGroup.add(balcony1);

      const balcony2 = new THREE.Mesh(new THREE.BoxGeometry(13.5, 0.15, 1.2), goldAccentMat);
      balcony2.position.set(0, 7.5, side * 7.1);
      residenceGroup.add(balcony2);
    });

    // Lift Tower Core
    const liftTower = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.4, 3.0), bronzeAccentMat);
    liftTower.position.set(0, 9.8, 0);
    liftTower.castShadow = true;
    residenceGroup.add(liftTower);

    residenceGroup.traverse((child) => {
      child.userData = { landmark: 'residence' };
    });
    scene.add(residenceGroup);

    // ─── 6. Landmark 3: Community Mandir & Reflection Kund ───────────────────
    const mandirGroup = new THREE.Group();
    mandirGroup.name = 'landmark-mandir';
    mandirGroup.position.set(-30.71, 0, -10.53);

    const mandirPlinthMat = new THREE.MeshStandardMaterial({ color: 0xd8c8b0, roughness: 0.65 });
    const plinth1 = new THREE.Mesh(new THREE.BoxGeometry(18, 0.5, 6.5), mandirPlinthMat);
    plinth1.position.set(0, 0.25, 0);
    mandirGroup.add(plinth1);

    const mandirHall = new THREE.Mesh(new THREE.BoxGeometry(10, 3.8, 5.5), mandirPlinthMat);
    mandirHall.position.set(-3, 2.2, 0);
    mandirHall.castShadow = true;
    mandirGroup.add(mandirHall);

    const shikhara = new THREE.Mesh(
      new THREE.ConeGeometry(3.8, 6.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.35, metalness: 0.55 })
    );
    shikhara.position.set(-3, 7.2, 0);
    shikhara.castShadow = true;
    mandirGroup.add(shikhara);

    const kalasha = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.15, metalness: 0.9 })
    );
    kalasha.position.set(-3, 10.7, 0);
    mandirGroup.add(kalasha);

    // Stepped Reflection Kund / Pond
    const kundWater = new THREE.Mesh(
      new THREE.PlaneGeometry(6.5, 5.0),
      new THREE.MeshStandardMaterial({
        color: 0x1b4d63,
        roughness: 0.05,
        metalness: 0.85,
        transparent: true,
        opacity: 0.85
      })
    );
    kundWater.rotation.x = -Math.PI / 2;
    kundWater.position.set(5.5, 0.28, 0);
    mandirGroup.add(kundWater);

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
      const { cadBoundingBox: bbox, number, sizeSqYd, block, blockColorHex } = canonicalPlot;
      const plotItem = allPlots.find((p) => p.number === number);
      if (!plotItem) return;

      const plotTexture = createPlotCanvasTexture(number, sizeSqYd, block, blockColorHex);

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

    // Trees along Central East-West Green Buffer (Positioned carefully so they do NOT cover plot numbers)
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
            orbitRef.current.targetRadius = 55;
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
              orbitRef.current.targetRadius = 60;
            } else if (landmarkKey === 'mandir') {
              orbitRef.current.targetLookAt.set(-30.71, 4, -10.53);
              orbitRef.current.targetRadius = 45;
            } else if (landmarkKey === 'residence') {
              orbitRef.current.targetLookAt.set(-11.13, 4, 13.56);
              orbitRef.current.targetRadius = 45;
            } else if (landmarkKey === 'utility') {
              orbitRef.current.targetLookAt.set(45.66, 2, -62.65);
              orbitRef.current.targetRadius = 50;
            } else if (landmarkKey === 'gate') {
              orbitRef.current.targetLookAt.set(-43.67, 2, 0);
              orbitRef.current.targetRadius = 60;
            }
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRef.current.targetRadius = Math.max(
        25,
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
      // Direct Top-Down CAD Validation View
      orbitRef.current.targetTheta = 0.001;
      orbitRef.current.targetPhi = 0.04;
      orbitRef.current.targetRadius = 145;
      orbitRef.current.targetLookAt.set(0, 0, 25);
    } else if (preset === 'hospital') {
      orbitRef.current.targetTheta = -Math.PI / 3.8;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 60;
      orbitRef.current.targetLookAt.set(-25.77, 4, 27.58);
      setSelectedLandmark('hospital');
    } else if (preset === 'residence') {
      orbitRef.current.targetTheta = Math.PI / 3.5;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 45;
      orbitRef.current.targetLookAt.set(-11.13, 4, 13.56);
      setSelectedLandmark('residence');
    } else if (preset === 'mandir') {
      orbitRef.current.targetTheta = Math.PI / 4;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 45;
      orbitRef.current.targetLookAt.set(-30.71, 4, -10.53);
      setSelectedLandmark('mandir');
    } else if (preset === 'highway') {
      orbitRef.current.targetTheta = Math.PI / 2.05;
      orbitRef.current.targetPhi = Math.PI / 2.6;
      orbitRef.current.targetRadius = 65;
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
      orbitRef.current.targetRadius = 60;
    }
  };

  const selectedPlot = allPlots.find((p) => p.id === selectedPlotId) || allPlots[0];
  const activeLandmarkInfo = selectedLandmark ? LANDMARK_REGISTRY[selectedLandmark] : null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#071519] border border-[#163942] shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-[99999] rounded-none h-screen w-screen flex flex-col lg:flex-row' : 'rounded-3xl h-[640px] sm:h-[760px]'
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
          >
            Overview
          </button>

          <button
            onClick={() => handlePresetView('top')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              viewPreset === 'top' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
            title="Direct 2D/3D Top-Down CAD Validation View"
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
            Hospital (30k sqft)
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
            Mandir Land
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

          {/* Masterplan CAD Overlay QA Toggle */}
          <button
            onClick={() => setIsCadOverlay(!isCadOverlay)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
              isCadOverlay
                ? 'bg-[#C58F58] text-[#071519] border-[#C58F58] shadow-md'
                : 'bg-white/5 text-[#E0AB77] border-[#C58F58]/40 hover:bg-[#C58F58]/20'
            }`}
            title="Toggle Masterplan Site Blueprint semi-transparent overlay alignment mode"
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
            <span className="hidden sm:inline">Drag to Orbit • Scroll to Zoom • Tap Plot / Landmark to Inspect</span>
            <span className="sm:hidden">Tap to Inspect</span>
          </div>

          {/* Visual Source Legend */}
          <div className="hidden lg:flex items-center gap-2 bg-[#071519]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[10px] font-mono">
            <span className="flex items-center gap-1 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              SOURCE_VERIFIED
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              SOURCE_DERIVED
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1 text-sky-300">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              VISUALIZATION_ONLY
            </span>
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
                    className="text-white/50 hover:text-white cursor-pointer"
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
                <div className="flex gap-2">
                  {activeLandmarkInfo.id === 'hospital' && (
                    <button
                      onClick={() => openFloorPlanModal('hospital-ground')}
                      className="flex-1 py-2 rounded-xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Hospital CAD
                    </button>
                  )}
                  {activeLandmarkInfo.id === 'residence' && (
                    <button
                      onClick={() => openFloorPlanModal('residences')}
                      className="flex-1 py-2 rounded-xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Residence CAD
                    </button>
                  )}
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#C58F58]" />
                    <span>Inspector</span>
                  </button>
                </div>
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
