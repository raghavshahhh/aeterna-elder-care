'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';
import { PlotItem } from '@/types';
import { allPlots, plotsSummary, projectOverview } from '@/data/propertyData';
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
  Navigation
} from 'lucide-react';

interface MasterPlan3DViewerProps {
  onSelectPlot?: (plot: PlotItem) => void;
  onToggle2DView?: () => void;
}

type LandmarkType = 'hospital' | 'mandir' | 'residence' | 'gate' | 'park';

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
    title: '30,000 Sq. Ft. Ayurvedic & General Hospital',
    badge: 'On-Site Healthcare Continuum',
    category: 'Healthcare & Wellness',
    area: '30,000 sq. ft. Built-Up Area',
    dimensions: '117\'-10" × 138\' L-Shaped Footprint',
    floors: 'G+2 Structural Facility with Lift Core',
    description: 'Specialized senior care hospital featuring Panchakarma Ayurvedic detox suites, 24/7 ICU emergency response, doctor consultation chambers, and on-site pharmacy.',
    features: [
      '24/7 Geriatric Emergency & Ambulance Dock',
      'Authentic Ayurvedic Panchakarma Suites',
      'Diagnostic Pathology & Physiotherapy Wing',
      'Direct Wheelchair & Stretcher Portico'
    ],
    cadZone: 'North-East Commercial & Healthcare Sector',
    cadCoordinates: { x: 78, y: 35 }
  },
  mandir: {
    id: 'mandir',
    title: 'Community Mandir & Sacred Reflection Kund',
    badge: 'Spiritual Sanctuary',
    category: 'Spirituality & Culture',
    area: 'Stepped Plinth & Meditation Ghat',
    dimensions: 'Sandstone Plinth (14m × 14m) with Shikhara Spire',
    floors: 'Traditional Carved Mandapa + Kund',
    description: 'Tranquil community temple crafted in authentic Rajasthani sandstone with a stepped water body (kund) for daily morning aarti, meditation, and satsang.',
    features: [
      'Traditional Shikhara with Gold Kalasha',
      'Stepped Sandstone Meditation Kund',
      'Elder-Friendly Step-Free Approach Ramp',
      'Surrounding Fragrant Floral Gardens'
    ],
    cadZone: 'North-Central Spiritual Green Pocket',
    cadCoordinates: { x: 68, y: 75 }
  },
  residence: {
    id: 'residence',
    title: 'G+2 Senior Care Apartment Suites (Plots 63 & 64)',
    badge: '12 Assisted Living Residences',
    category: 'Plotted Residences',
    area: '88\'-6" × 45\'-0" CAD Structural Footprint',
    dimensions: 'Stilt Parking + 3 Habitable Residential Floors',
    floors: 'G+2 with 8-Passenger Stretcher Elevator',
    description: 'Dedicated senior living apartment block with 1 BHK & 1 RK barrier-free care suites, wheelchair-accessible stilt parking, and a rooftop solar pergola.',
    features: [
      '8-Passenger Stretcher-Compliant Elevator',
      '1:12 Accessible Stilt Entrance Ramp',
      'Cantilevered Balconies with Safety Railings',
      'Rooftop Bougainvillea Pergola & Solar Array'
    ],
    cadZone: 'Plots 63 & 64 Residential Corner Zone',
    cadCoordinates: { x: 72, y: 22 }
  },
  gate: {
    id: 'gate',
    title: 'State Highway 22 Grand Entrance Portal',
    badge: 'Gated Security Checkpoint',
    category: 'Infrastructure & Access',
    area: '4-Lane Highway Access Gateway',
    dimensions: '14.5m Wide Double Portal with Guard Cabin',
    floors: 'Security Post & Boom Barrier Check',
    description: 'Grand gateway providing direct entry from State Highway 22 (SH-22) with 24/7 CCTV surveillance, biometric visitor control, and dedicated ambulance lane.',
    features: [
      'Direct State Highway 22 Frontage',
      '24/7 Guarded Boom Barrier Checkpoint',
      'Automated Visitor Number-Plate Recognition',
      'Monumental Foundation Brand Signage'
    ],
    cadZone: 'South-East Highway Frontage Boundary',
    cadCoordinates: { x: 50, y: 88 }
  },
  park: {
    id: 'park',
    title: 'Central Miyawaki Forest & Walking Promenade',
    badge: 'Eco Green Buffer',
    category: 'Landscaping & Nature',
    area: 'Perimeter Green Belts + Central Gardens',
    dimensions: '30 ft Main Avenue + Jogging Track',
    floors: 'Landscaped Botanical Promenades',
    description: 'Lush natural countryside environment with native herbal groves, flowering Amaltas and Royal Palm tree avenues, and anti-glare illuminated walking pathways.',
    features: [
      'Dense Miyawaki Forest Oxygen Belts',
      'Continuous Non-Slip Senior Walking Tracks',
      'Aromatic Herbal & Medicinal Garden Pockets',
      'Solar-Powered LED Streetlight Grid'
    ],
    cadZone: 'Central Spine & Peripheral Buffer',
    cadCoordinates: { x: 50, y: 50 }
  }
};

// ─── High-Fidelity Masterplan Texture Generators ─────────────────────────────

function createMasterGroundTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#2A4D34';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 26000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const g = 50 + Math.random() * 55;
    ctx.fillStyle = `rgb(${g - 20}, ${g + 18}, ${g - 15})`;
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

  ctx.fillStyle = '#262A2C';
  ctx.fillRect(0, 0, 512, 128);

  for (let i = 0; i < 8000; i++) {
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
  ctx.setLineDash([24, 16]);
  ctx.beginPath();
  ctx.moveTo(0, 64);
  ctx.lineTo(512, 64);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 1);
  return tex;
}

function createBoulevardPaverTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#42494D';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const v = 55 + Math.random() * 30;
    ctx.fillStyle = `rgb(${v}, ${v + 2}, ${v + 4})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  ctx.strokeStyle = 'rgba(25, 30, 32, 0.6)';
  ctx.lineWidth = 1.5;
  for (let y = 0; y < 256; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  return tex;
}

function createPlotGrassTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#22503A';
  ctx.fillRect(0, 0, 128, 128);

  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const g = 40 + Math.random() * 45;
    ctx.fillStyle = `rgb(${g - 15}, ${g + 18}, ${g - 10})`;
    ctx.fillRect(x, y, 1, 1.5);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// ─── Disposal Helpers ────────────────────────────────────────────────────────

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
    radius: 78,
    theta: Math.PI / 4.2,
    phi: Math.PI / 3.4,
    target: new THREE.Vector3(0, 0, 0),
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRadius: 78,
    targetTheta: Math.PI / 4.2,
    targetPhi: Math.PI / 3.4,
    targetLookAt: new THREE.Vector3(0, 0, 0)
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
    scene.background = new THREE.Color(0x0a1c22);
    scene.fog = new THREE.FogExp2(0x0a1c22, 0.005);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 580;
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
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
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // ─── Architectural Natural Lighting Rig ─────────────────────────────────

    const hemiLight = new THREE.HemisphereLight(0xddeaf2, 0x2e4034, 0.85);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xf5eedc, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff6ea, 2.4);
    sunLight.position.set(45, 75, 45);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = isMobile ? 1024 : 2048;
    sunLight.shadow.mapSize.height = isMobile ? 1024 : 2048;
    sunLight.shadow.camera.left = -60;
    sunLight.shadow.camera.right = 60;
    sunLight.shadow.camera.top = 60;
    sunLight.shadow.camera.bottom = -60;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 200;
    sunLight.shadow.bias = -0.0003;
    sunLight.shadow.radius = 2.0;
    scene.add(sunLight);

    const skyFill = new THREE.DirectionalLight(0x8cb8a8, 0.55);
    skyFill.position.set(-45, 35, -45);
    scene.add(skyFill);

    // ─── Material Library ───────────────────────────────────────────────────

    const masterGroundTex = createMasterGroundTexture();
    const highwayTex = createHighwayAsphaltTexture();
    const boulevardTex = createBoulevardPaverTexture();
    const plotGrassTex = createPlotGrassTexture();

    const masterGroundMat = new THREE.MeshStandardMaterial({
      map: masterGroundTex,
      color: 0x244c34,
      roughness: 0.92
    });

    const highwayRoadMat = new THREE.MeshStandardMaterial({
      map: highwayTex,
      color: 0x363c40,
      roughness: 0.82
    });

    const boulevardRoadMat = new THREE.MeshStandardMaterial({
      map: boulevardTex,
      color: 0x485055,
      roughness: 0.84
    });

    const buildingWallMat = new THREE.MeshStandardMaterial({ color: 0xe8deca, roughness: 0.65 });
    const bronzeAccentMat = new THREE.MeshStandardMaterial({ color: 0x48382c, metalness: 0.85, roughness: 0.3 });
    const glassFacadeMat = new THREE.MeshStandardMaterial({
      color: 0x90c4d8,
      roughness: 0.08,
      metalness: 0.2,
      transparent: true,
      opacity: 0.52
    });

    // ─── 1. Township Master Ground Plane (160m × 160m) ──────────────────────
    const masterTerrain = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), masterGroundMat);
    masterTerrain.rotation.x = -Math.PI / 2;
    masterTerrain.position.y = 0;
    masterTerrain.receiveShadow = true;
    scene.add(masterTerrain);

    // ─── 2. State Highway 22 (SH-22) Frontage Road Corridor ────────────────
    const highwayMesh = new THREE.Mesh(new THREE.PlaneGeometry(150, 14), highwayRoadMat);
    highwayMesh.rotation.x = -Math.PI / 2;
    highwayMesh.position.set(0, 0.02, 38);
    highwayMesh.receiveShadow = true;
    scene.add(highwayMesh);

    // ─── 3. Grand Entrance Gateway with Security Post ───────────────────────
    const gateGroup = new THREE.Group();
    gateGroup.name = 'landmark-gate';

    const gateColLeft = new THREE.Mesh(new THREE.BoxGeometry(1.2, 4.8, 1.2), buildingWallMat);
    gateColLeft.position.set(-6.5, 2.4, 30);
    gateColLeft.castShadow = true;
    gateGroup.add(gateColLeft);

    const gateColRight = new THREE.Mesh(new THREE.BoxGeometry(1.2, 4.8, 1.2), buildingWallMat);
    gateColRight.position.set(6.5, 2.4, 30);
    gateColRight.castShadow = true;
    gateGroup.add(gateColRight);

    const gateLintel = new THREE.Mesh(new THREE.BoxGeometry(14.5, 0.8, 1.6), bronzeAccentMat);
    gateLintel.position.set(0, 4.8, 30);
    gateLintel.castShadow = true;
    gateGroup.add(gateLintel);

    const guardHouse = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.8, 3.6), buildingWallMat);
    guardHouse.position.set(9.2, 1.4, 28);
    guardHouse.castShadow = true;
    guardHouse.receiveShadow = true;
    gateGroup.add(guardHouse);

    gateGroup.traverse((child) => {
      child.userData = { landmark: 'gate' };
    });
    scene.add(gateGroup);

    // ─── 4. 33ft Main Central Spine Boulevard ──────────────────────────────
    const mainBoulevard = new THREE.Mesh(new THREE.PlaneGeometry(10.5, 70), boulevardRoadMat);
    mainBoulevard.rotation.x = -Math.PI / 2;
    mainBoulevard.position.set(0, 0.03, -4);
    mainBoulevard.receiveShadow = true;
    scene.add(mainBoulevard);

    // 24ft Cross Streets Connecting Blocks A–F
    [-18, 0, 18].forEach((cz) => {
      const crossStreet = new THREE.Mesh(new THREE.PlaneGeometry(95, 7.5), boulevardRoadMat);
      crossStreet.rotation.x = -Math.PI / 2;
      crossStreet.position.set(0, 0.025, cz);
      crossStreet.receiveShadow = true;
      scene.add(crossStreet);
    });

    // Street Lamps along Central Boulevard
    const lampGeo = new THREE.CylinderGeometry(0.08, 0.1, 4.2, 8);
    const lampHeadMat = new THREE.MeshStandardMaterial({
      color: 0xffeedd,
      emissive: 0xffd8aa,
      emissiveIntensity: 0.9
    });
    [-28, -14, 0, 14, 28].forEach((lz) => {
      [-5.8, 5.8].forEach((lx) => {
        const lampPost = new THREE.Mesh(lampGeo, bronzeAccentMat);
        lampPost.position.set(lx, 2.1, lz);
        lampPost.castShadow = true;
        scene.add(lampPost);

        const lampHead = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), lampHeadMat);
        lampHead.position.set(lx, 4.2, lz);
        scene.add(lampHead);
      });
    });

    // ─── 5. Proposed 30,000 Sq. Ft. Multi-Speciality Ayurvedic Hospital ─────
    const hospitalGroup = new THREE.Group();
    hospitalGroup.name = 'landmark-hospital';

    const hospMainWing = new THREE.Mesh(new THREE.BoxGeometry(26, 8.5, 16), buildingWallMat);
    hospMainWing.position.set(38, 4.25, -12);
    hospMainWing.castShadow = true;
    hospMainWing.receiveShadow = true;
    hospitalGroup.add(hospMainWing);

    const hospOpdWing = new THREE.Mesh(new THREE.BoxGeometry(16, 8.5, 20), buildingWallMat);
    hospOpdWing.position.set(43, 4.25, 6);
    hospOpdWing.castShadow = true;
    hospOpdWing.receiveShadow = true;
    hospitalGroup.add(hospOpdWing);

    const hospAtriumGlass = new THREE.Mesh(new THREE.BoxGeometry(18, 7.5, 0.15), glassFacadeMat);
    hospAtriumGlass.position.set(38, 4.25, -3.9);
    hospitalGroup.add(hospAtriumGlass);

    const hospCanopy = new THREE.Mesh(new THREE.BoxGeometry(12, 0.35, 8), bronzeAccentMat);
    hospCanopy.position.set(34, 3.8, 3.5);
    hospCanopy.castShadow = true;
    hospitalGroup.add(hospCanopy);

    [29, 39].forEach((px) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.8, 8), bronzeAccentMat);
      col.position.set(px, 1.9, 7.0);
      col.castShadow = true;
      hospitalGroup.add(col);
    });

    const hospSign = new THREE.Mesh(new THREE.BoxGeometry(5.0, 1.2, 0.2), new THREE.MeshStandardMaterial({ color: 0x2c5e50, roughness: 0.3 }));
    hospSign.position.set(38, 9.2, -12);
    hospitalGroup.add(hospSign);

    hospitalGroup.traverse((child) => {
      child.userData = { landmark: 'hospital' };
    });
    scene.add(hospitalGroup);

    // Hospital Solar Panel Array
    const solarPanelMat = new THREE.MeshStandardMaterial({ color: 0x0a1e36, metalness: 0.9, roughness: 0.15 });
    for (let sx = 0; sx < 3; sx++) {
      for (let sz = 0; sz < 2; sz++) {
        const solarPanel = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.1, 4.0), solarPanelMat);
        solarPanel.position.set(32 + sx * 6.0, 8.7, -15 + sz * 5.0);
        solarPanel.rotation.x = 0.12;
        solarPanel.castShadow = true;
        scene.add(solarPanel);
      }
    }

    // ─── 6. Proposed Community Mandir & Kund ────────────────────────────────
    const mandirGroup = new THREE.Group();
    mandirGroup.name = 'landmark-mandir';

    const mandirPlinthMat = new THREE.MeshStandardMaterial({ color: 0xd8c8b0, roughness: 0.65 });
    const plinth1 = new THREE.Mesh(new THREE.BoxGeometry(14, 0.4, 14), mandirPlinthMat);
    plinth1.position.set(30, 0.2, 26);
    mandirGroup.add(plinth1);

    const plinth2 = new THREE.Mesh(new THREE.BoxGeometry(11.5, 0.4, 11.5), mandirPlinthMat);
    plinth2.position.set(30, 0.6, 26);
    mandirGroup.add(plinth2);

    const mandirHall = new THREE.Mesh(new THREE.BoxGeometry(9, 3.8, 9), mandirPlinthMat);
    mandirHall.position.set(30, 2.7, 26);
    mandirHall.castShadow = true;
    mandirGroup.add(mandirHall);

    [-3.2, -1.1, 1.1, 3.2].forEach((cx) => {
      const pCol = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 3.2, 8), mandirPlinthMat);
      pCol.position.set(30 + cx, 2.3, 30.8);
      pCol.castShadow = true;
      mandirGroup.add(pCol);
    });

    const shikhara = new THREE.Mesh(
      new THREE.ConeGeometry(4.4, 6.8, 8),
      new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.35, metalness: 0.55 })
    );
    shikhara.position.set(30, 8.0, 26);
    shikhara.castShadow = true;
    mandirGroup.add(shikhara);

    const kalasha = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.15, metalness: 0.9 })
    );
    kalasha.position.set(30, 11.6, 26);
    mandirGroup.add(kalasha);

    // Sacred Meditation Pond / Water Kund
    const kundPlinth = new THREE.Mesh(new THREE.BoxGeometry(10, 0.3, 8), mandirPlinthMat);
    kundPlinth.position.set(16, 0.15, 26);
    mandirGroup.add(kundPlinth);

    const kundWater = new THREE.Mesh(
      new THREE.PlaneGeometry(8.5, 6.5),
      new THREE.MeshStandardMaterial({
        color: 0x1b4d63,
        roughness: 0.05,
        metalness: 0.85,
        transparent: true,
        opacity: 0.85
      })
    );
    kundWater.rotation.x = -Math.PI / 2;
    kundWater.position.set(16, 0.31, 26);
    mandirGroup.add(kundWater);

    mandirGroup.traverse((child) => {
      child.userData = { landmark: 'mandir' };
    });
    scene.add(mandirGroup);

    // ─── 7. Proposed 9-Unit G+2 Residential Building (Plots 63 & 64) ────────
    const residenceGroup = new THREE.Group();
    residenceGroup.name = 'landmark-residence';
    residenceGroup.position.set(31.5, 0, -22);

    const stiltSlab = new THREE.Mesh(new THREE.BoxGeometry(14, 0.25, 10), buildingWallMat);
    stiltSlab.position.set(0, 1.8, 0);
    residenceGroup.add(stiltSlab);

    [-5.5, 0, 5.5].forEach((cx) => {
      [-3.8, 3.8].forEach((cz) => {
        const col = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.8, 0.35), buildingWallMat);
        col.position.set(cx, 0.9, cz);
        col.castShadow = true;
        residenceGroup.add(col);
      });
    });

    const gf = new THREE.Mesh(new THREE.BoxGeometry(13.6, 1.6, 9.4), buildingWallMat);
    gf.position.set(0, 2.7, 0);
    gf.castShadow = true;
    residenceGroup.add(gf);

    const ff = new THREE.Mesh(new THREE.BoxGeometry(13.6, 1.6, 9.4), buildingWallMat);
    ff.position.set(0, 4.3, 0);
    ff.castShadow = true;
    residenceGroup.add(ff);

    const sf = new THREE.Mesh(new THREE.BoxGeometry(13.6, 1.6, 9.4), buildingWallMat);
    sf.position.set(0, 5.9, 0);
    sf.castShadow = true;
    residenceGroup.add(sf);

    const rf = new THREE.Mesh(new THREE.BoxGeometry(14, 0.3, 9.8), buildingWallMat);
    rf.position.set(0, 6.85, 0);
    rf.castShadow = true;
    residenceGroup.add(rf);

    const liftCore = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.2, 2.8), bronzeAccentMat);
    liftCore.position.set(0, 7.6, -2.5);
    liftCore.castShadow = true;
    residenceGroup.add(liftCore);

    residenceGroup.traverse((child) => {
      child.userData = { landmark: 'residence' };
    });
    scene.add(residenceGroup);

    landmarkMeshesRef.current = [hospitalGroup, mandirGroup, residenceGroup, gateGroup];

    // ─── 8. 64 Freehold Residential Plots (Blocks A to F) ───────────────────
    const plotMeshes: { [plotNumber: number]: THREE.Mesh } = {};
    const plotBaseMat = new THREE.MeshStandardMaterial({
      map: plotGrassTex,
      color: 0x2a5440,
      roughness: 0.85
    });
    const cornerStoneGeo = new THREE.BoxGeometry(0.3, 0.6, 0.3);
    const cornerStoneMat = new THREE.MeshStandardMaterial({ color: 0xf5eedc, roughness: 0.7 });

    allPlots.forEach((plot) => {
      const blockIndex = ['Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F'].indexOf(plot.block);
      const indexInBlock = (plot.number - 1) % 11;
      const isNorthRow = indexInBlock < 6;

      const width = Math.min(8.5, 4.2 + plot.sizeSqYd / 95);
      const depth = Math.min(9.5, 5.4 + plot.sizeSqYd / 80);

      const blockStartX = -46 + blockIndex * 15.5;
      const posX = blockStartX + (indexInBlock % 3) * 5.0;
      const posZ = isNorthRow
        ? 14 + Math.floor(indexInBlock / 3) * 8.5
        : -16 - Math.floor((indexInBlock - 6) / 3) * 8.5;

      const plotGeo = new THREE.BoxGeometry(width, 0.08, depth);
      const plotMesh = new THREE.Mesh(plotGeo, plotBaseMat.clone());
      plotMesh.position.set(posX, 0.04, posZ);
      plotMesh.receiveShadow = true;
      plotMesh.userData = { plot };

      const halfW = width / 2;
      const halfD = depth / 2;
      [
        [-halfW, -halfD],
        [halfW, -halfD],
        [-halfW, halfD],
        [halfW, halfD]
      ].forEach(([cx, cz]) => {
        const cornerStone = new THREE.Mesh(cornerStoneGeo, cornerStoneMat);
        cornerStone.position.set(cx, 0.3, cz);
        cornerStone.castShadow = true;
        plotMesh.add(cornerStone);
      });

      scene.add(plotMesh);
      plotMeshes[plot.number] = plotMesh;
    });

    plotMeshesRef.current = plotMeshes;

    // ─── 9. Landscaping: Trees & Royal Palms ────────────────────────────────
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1f4a2c, roughness: 0.8 });
    const amaltasFoliageMat = new THREE.MeshStandardMaterial({ color: 0xd4a017, roughness: 0.75 });
    const palmFrondMat = new THREE.MeshStandardMaterial({ color: 0x2d633b, roughness: 0.65, side: THREE.DoubleSide });

    const treeGeo = new THREE.SphereGeometry(1.6, 8, 8);
    const trunkGeo = new THREE.CylinderGeometry(0.18, 0.25, 2.8, 6);

    for (let i = 0; i < 42; i++) {
      const angle = (i / 42) * Math.PI * 2;
      const r = 62 + (i % 3) * 6;
      const tx = Math.cos(angle) * r;
      const tz = Math.sin(angle) * r;

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(tx, 1.4, tz);
      trunk.castShadow = true;
      scene.add(trunk);

      const crown = new THREE.Mesh(treeGeo, i % 5 === 0 ? amaltasFoliageMat : foliageMat);
      crown.position.set(tx, 3.6, tz);
      crown.scale.set(1.0, 1.2 + (i % 3) * 0.2, 1.0);
      crown.castShadow = true;
      scene.add(crown);
    }

    [-24, -12, 0, 12, 24].forEach((pz) => {
      [-4.5, 4.5].forEach((px) => {
        const palmTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 5.0, 6), trunkMat);
        palmTrunk.position.set(px, 2.5, pz);
        palmTrunk.castShadow = true;
        scene.add(palmTrunk);

        for (let fi = 0; fi < 6; fi++) {
          const frondAngle = (fi / 6) * Math.PI * 2;
          const frond = new THREE.Mesh(new THREE.ConeGeometry(0.6, 2.4, 4), palmFrondMat);
          frond.position.set(px + Math.cos(frondAngle) * 0.8, 5.2, pz + Math.sin(frondAngle) * 0.8);
          frond.rotation.z = Math.cos(frondAngle) * 0.45;
          frond.rotation.x = Math.sin(frondAngle) * 0.45;
          frond.castShadow = true;
          scene.add(frond);
        }
      });
    });

    // ─── Interaction Handlers ─────────────────────────────────────────────

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
          0.15,
          Math.min(Math.PI / 2 - 0.06, orbitRef.current.targetPhi - deltaY * 0.006)
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
              const mat = selectedPlotMeshRef.current.material as THREE.MeshStandardMaterial;
              mat.emissive.setHex(0x000000);
              mat.emissiveIntensity = 0;
            }

            const hitMesh = intersects[0].object as THREE.Mesh;
            const mat = hitMesh.material as THREE.MeshStandardMaterial;
            mat.emissive.setHex(0xc58f58);
            mat.emissiveIntensity = 0.45;
            selectedPlotMeshRef.current = hitMesh;

            setSelectedPlotId(hitPlot.id);
            setSelectedLandmark(null);
            if (onSelectPlotRef.current) onSelectPlotRef.current(hitPlot);

            orbitRef.current.targetLookAt.set(
              hitMesh.position.x,
              0,
              hitMesh.position.z
            );
            orbitRef.current.targetRadius = 42;
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
              orbitRef.current.targetLookAt.set(38, 4, -4);
              orbitRef.current.targetRadius = 45;
            } else if (landmarkKey === 'mandir') {
              orbitRef.current.targetLookAt.set(30, 4, 26);
              orbitRef.current.targetRadius = 45;
            } else if (landmarkKey === 'residence') {
              orbitRef.current.targetLookAt.set(31.5, 4, -22);
              orbitRef.current.targetRadius = 40;
            } else if (landmarkKey === 'gate') {
              orbitRef.current.targetLookAt.set(0, 2, 32);
              orbitRef.current.targetRadius = 55;
            }
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRef.current.targetRadius = Math.max(
        25,
        Math.min(120, orbitRef.current.targetRadius + e.deltaY * 0.04)
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
        orbitRef.current.targetPhi = Math.max(0.15, Math.min(Math.PI / 2 - 0.06, orbitRef.current.targetPhi - dy * 0.006));
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
      orbitRef.current.targetRadius = 78;
      orbitRef.current.targetLookAt.set(0, 0, 0);
    } else if (preset === 'top') {
      orbitRef.current.targetTheta = 0.001;
      orbitRef.current.targetPhi = 0.05;
      orbitRef.current.targetRadius = 90;
      orbitRef.current.targetLookAt.set(0, 0, 0);
    } else if (preset === 'hospital') {
      orbitRef.current.targetTheta = -Math.PI / 4;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 48;
      orbitRef.current.targetLookAt.set(38, 4, -4);
      setSelectedLandmark('hospital');
    } else if (preset === 'mandir') {
      orbitRef.current.targetTheta = Math.PI / 3;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 45;
      orbitRef.current.targetLookAt.set(30, 4, 26);
      setSelectedLandmark('mandir');
    } else if (preset === 'highway') {
      orbitRef.current.targetTheta = Math.PI / 2.05;
      orbitRef.current.targetPhi = Math.PI / 2.6;
      orbitRef.current.targetRadius = 55;
      orbitRef.current.targetLookAt.set(0, 2, 32);
      setSelectedLandmark('gate');
    } else if (preset === 'residence') {
      orbitRef.current.targetTheta = -Math.PI / 3.5;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 40;
      orbitRef.current.targetLookAt.set(31.5, 4, -22);
      setSelectedLandmark('residence');
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
        isFullscreen ? 'fixed inset-0 z-[99999] rounded-none h-screen w-screen flex flex-col lg:flex-row' : 'rounded-3xl h-[620px] sm:h-[720px]'
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
              Rendering 64-Plot 3D Master Plan...
            </span>
          </div>
        )}

        {/* Top Left Header & Proposed Badge */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2329]/90 border border-white/15 text-[11px] font-mono text-[#E0AB77] uppercase tracking-widest backdrop-blur-md shadow-lg pointer-events-auto">
            <Layers className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>PROPOSED 64-PLOT MASTER PLAN</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold backdrop-blur-md shadow-lg pointer-events-auto">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>64 Demarcated Freehold Plots</span>
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
            onClick={() => handlePresetView('hospital')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewPreset === 'hospital' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            Hospital
          </button>

          <button
            onClick={() => handlePresetView('mandir')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewPreset === 'mandir' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            Mandir
          </button>

          <button
            onClick={() => handlePresetView('highway')}
            className={`hidden sm:block px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewPreset === 'highway' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            SH-22
          </button>

          <button
            onClick={() => handlePresetView('top')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewPreset === 'top' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            Top CAD
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
            <span className="hidden sm:inline">Click Any Plot or Landmark to Inspect CAD Details</span>
            <span className="sm:hidden">Tap to Inspect</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 bg-[#071519]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>State Highway 22, Kheri Asra, Jhajjar</span>
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
                  Open Full Studio Details
                </button>
              </>
            ) : selectedPlot ? (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-bold text-emerald-300 uppercase">
                      Phase 1 Enquiry
                    </span>
                    <span className="text-xs text-white/70 font-mono">{selectedPlot.block}</span>
                  </div>
                  <span className="text-xs font-bold text-[#C58F58]">{selectedPlot.priceEstimate}</span>
                </div>
                <div>
                  <h4 className="text-lg font-serif-heading font-bold text-[#FAF8F5]">
                    {selectedPlot.plotNumber}
                  </h4>
                  <p className="text-xs text-white/75 font-light mt-0.5">
                    {selectedPlot.sizeSqYd} sq. yd. (~{(selectedPlot.sizeSqYd * 9).toLocaleString()} sq. ft.) • {selectedPlot.dimensions} • {selectedPlot.facing}
                  </p>
                </div>
                <div className="pt-1 flex flex-col gap-2">
                  <button
                    onClick={() =>
                      openWhatsApp({
                        actionType: 'reserve-plot',
                        plotNumber: selectedPlot.plotNumber,
                        plotBlock: selectedPlot.block,
                        message: `Hello, I clicked ${selectedPlot.plotNumber} (${selectedPlot.block}, ${selectedPlot.sizeSqYd} sq.yd.) on the 3D Master Plan for Senior Living Citizen Foundation. Please share price breakdown and payment terms.`
                      })
                    }
                    className="w-full py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Inquire {selectedPlot.plotNumber} on WhatsApp →
                  </button>
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="w-full py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#C58F58]" />
                    Studio Mode (Full Inspector)
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
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase">
                          {activeLandmarkInfo.badge}
                        </span>
                        <span className="text-xs text-[#C58F58] font-mono">{activeLandmarkInfo.category}</span>
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
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase">
                          Freehold Plotted Land
                        </span>
                        <span className="text-xs text-[#C58F58] font-mono font-bold">{selectedPlot.block}</span>
                      </div>
                      <h4 className="text-2xl font-serif-heading font-bold text-[#FAF8F5]">
                        {selectedPlot.plotNumber}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-white/75">
                        <span><strong>{selectedPlot.sizeSqYd}</strong> sq. yd.</span>
                        <span>•</span>
                        <span>~<strong>{(selectedPlot.sizeSqYd * 9).toLocaleString()}</strong> sq. ft.</span>
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
                        <span className="font-bold text-white mt-0.5 block">{selectedPlot.roadWidth || '30 ft. Avenue'}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-white/50 block font-mono">Corner Status</span>
                        <span className="font-bold text-[#C58F58] mt-0.5 block">{selectedPlot.isCorner ? 'Yes (Prime 2-Side Open)' : 'Standard Plot'}</span>
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
                        Zero commercial builder margins. Includes underground utilities, road infrastructure, power substation connection, and security perimeter.
                      </p>
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
                  <p className="text-white/85">Administered by Senior Living Citizen Foundation under Section 8 (Companies Act 2013, Licence No. 172654).</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-[#C58F58] uppercase">Site Verification</span>
                  <p className="text-white/85">Boundary stones physically anchored along State Highway 22 frontage with 30ft access avenue.</p>
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
                  message: `Hello, I am inspecting ${activeLandmarkInfo ? activeLandmarkInfo.title : `${selectedPlot.plotNumber} (${selectedPlot.block}, ${selectedPlot.sizeSqYd} sq.yd.)`} on the 3D Masterplan for Senior Living Citizen Foundation. Please share complete CAD dossier and priority booking details.`
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
