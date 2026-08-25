'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';
import { UnitType } from '@/types';
import { useModal } from '@/context/ModalContext';
import {
  Rotate3d,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Eye,
  CheckCircle2,
  Info,
  Layers,
  ArrowRight,
  Home,
  Bed,
  Sofa,
  Utensils,
  Bath,
  Lock,
  X,
  MessageSquare,
  Phone
} from 'lucide-react';

interface Interior3DViewerProps {
  unitType?: UnitType;
  initialRoom?: 'bedroom' | 'living' | 'kitchen' | 'bathroom';
  onToggle2DBlueprint?: () => void;
  onToggle2DPlans?: () => void;
}

interface SafetyHotspot {
  id: string;
  name: string;
  room: 'bedroom' | 'living' | 'kitchen' | 'bathroom';
  position: [number, number, number];
  title: string;
  detail: string;
  standard: string;
}

const SAFETY_HOTSPOTS: SafetyHotspot[] = [
  {
    id: 'hs-1',
    name: '32mm Continuous Grab Rails',
    room: 'bathroom',
    position: [1.8, 1.0, -1.2],
    title: '32mm Stainless Steel Grab Rails',
    detail: 'Continuous heavy-duty 150kg-rated wall grab bars flanking the toilet and shower zones for slip prevention.',
    standard: 'NBC 2016 Senior Living Annex D'
  },
  {
    id: 'hs-2',
    name: 'Zero-Threshold Barrier-Free Shower',
    room: 'bathroom',
    position: [-1.4, 0.1, -1.4],
    title: 'Zero-Threshold Flush Drain Shower',
    detail: 'Complete elimination of step-over curbs to permit seamless wheelchair and walker roll-in access.',
    standard: 'Barrier-Free ADA Accessibility Guidelines'
  },
  {
    id: 'hs-3',
    name: 'Ceiling-Drop Emergency SOS Cord',
    room: 'bathroom',
    position: [1.8, 1.8, 1.0],
    title: 'Dual Emergency Pull Cord',
    detail: 'Floor-to-ceiling pull cord reachable even if a resident is on the floor, alerting the nurse station immediately.',
    standard: 'Smart Health Monitoring Spec'
  },
  {
    id: 'hs-4',
    name: 'Low-Reach Master Controls',
    room: 'bedroom',
    position: [-1.8, 0.9, 0.4],
    title: 'Ergonomic Bedside Switch Console',
    detail: 'Switches placed at 900mm height from floor level, allowing effortless operation without getting out of bed.',
    standard: 'Universal Design Standard'
  },
  {
    id: 'hs-5',
    name: 'R11 Slip-Resistant Vitrified Tiles',
    room: 'bedroom',
    position: [0, 0.1, 0],
    title: 'R11 Anti-Skid Floor Finish',
    detail: 'Matte vitrified tiles with high wet-friction coefficient across all circulation corridors and wet zones.',
    standard: 'DIN 51130 R11 Certification'
  },
  {
    id: 'hs-6',
    name: 'Ergonomic Work Triangle & Low Cabinets',
    room: 'kitchen',
    position: [0, 1.1, -1.5],
    title: 'Countertop Pull-Out Drawers',
    detail: 'Elimination of deep high reach overhead storage in favor of waist-height heavy-duty drawer slides.',
    standard: 'Senior Ergonomics Protocol'
  }
];

// ─── High-Fidelity Procedural Interior Texture Generators ────────────────────

function createPorcelainTileTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Warm honed cream porcelain base
  ctx.fillStyle = '#E8E1D5';
  ctx.fillRect(0, 0, 512, 512);

  // Soft marble micro-veining
  for (let i = 0; i < 16000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const v = 225 + Math.random() * 25;
    ctx.fillStyle = `rgb(${v}, ${v - 5}, ${v - 12})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // 800×800mm grid grout joints
  ctx.strokeStyle = 'rgba(160, 150, 140, 0.5)';
  ctx.lineWidth = 2;
  for (let y = 0; y <= 512; y += 128) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }
  for (let x = 0; x <= 512; x += 128) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function createWalnutVeneerTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Deep warm walnut brown
  ctx.fillStyle = '#4A3425';
  ctx.fillRect(0, 0, 512, 512);

  // Linear walnut grain
  for (let i = 0; i < 12000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const len = 30 + Math.random() * 100;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(30, 20, 12, 0.35)' : 'rgba(95, 70, 50, 0.25)';
    ctx.fillRect(x, y, len, 1.2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

function createBoucleFabricTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#D6CEBE';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const v = 200 + Math.random() * 40;
    ctx.fillStyle = `rgb(${v}, ${v - 6}, ${v - 14})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function createAntiSkidBathroomTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#4D5458';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const v = 65 + Math.random() * 35;
    ctx.fillStyle = `rgb(${v}, ${v + 2}, ${v + 4})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  // Textured micro-grid
  ctx.strokeStyle = 'rgba(25, 30, 32, 0.7)';
  ctx.lineWidth = 1;
  for (let y = 0; y < 256; y += 16) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }
  for (let x = 0; x < 256; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  return tex;
}

function createCalacattaQuartzTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#F5F5F0';
  ctx.fillRect(0, 0, 256, 256);

  // Gold & grey soft marble veining
  ctx.strokeStyle = 'rgba(180, 160, 130, 0.35)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(10, 20);
  ctx.bezierCurveTo(80, 100, 180, 140, 240, 230);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(160, 170, 175, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(120, 10);
  ctx.bezierCurveTo(160, 80, 200, 180, 250, 200);
  ctx.stroke();

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

export const Interior3DViewer: React.FC<Interior3DViewerProps> = ({
  unitType = '1-bhk',
  initialRoom = 'bedroom',
  onToggle2DBlueprint,
  onToggle2DPlans
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openWhatsApp, openLeadDrawer } = useModal();

  const [activeRoom, setActiveRoom] = useState<'bedroom' | 'living' | 'kitchen' | 'bathroom'>(initialRoom);
  const [activeHotspot, setActiveHotspot] = useState<SafetyHotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Smooth Orbit Controls State
  const orbitRef = useRef({
    radius: 12,
    theta: Math.PI / 4,
    phi: Math.PI / 3.2,
    target: new THREE.Vector3(0, 1.2, 0),
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRadius: 12,
    targetTheta: Math.PI / 4,
    targetPhi: Math.PI / 3.2,
    targetLookAt: new THREE.Vector3(0, 1.2, 0)
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

  // ─── Single WebGL Scene Mount ─────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a1c22);
    scene.fog = new THREE.FogExp2(0x0a1c22, 0.015);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 580;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 500);
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
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // ─── Realistic Interior Daylight & Warm Accent Rig ──────────────────────

    // Natural Sky Fill from Exterior Windows
    const hemiLight = new THREE.HemisphereLight(0xdcebf5, 0x3d352b, 0.85);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xfcf8ee, 0.5);
    scene.add(ambientLight);

    // Warm Sun Streaming Through South Balcony Windows
    const sunLight = new THREE.DirectionalLight(0xfff7e8, 2.2);
    sunLight.position.set(12, 18, 14);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = isMobile ? 1024 : 2048;
    sunLight.shadow.mapSize.height = isMobile ? 1024 : 2048;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    sunLight.shadow.bias = -0.0002;
    sunLight.shadow.radius = 2.0;
    scene.add(sunLight);

    // Interior Warm Concealed Cove Light
    const coveLight = new THREE.PointLight(0xffe8c8, 1.2, 18, 1.2);
    coveLight.position.set(0, 2.8, 0);
    scene.add(coveLight);

    // ─── Material Library ───────────────────────────────────────────────────

    const tileTex = createPorcelainTileTexture();
    const walnutTex = createWalnutVeneerTexture();
    const boucleTex = createBoucleFabricTexture();
    const bathTex = createAntiSkidBathroomTexture();
    const quartzTex = createCalacattaQuartzTexture();

    const plasterWallMat = new THREE.MeshStandardMaterial({
      color: 0xf5f0eb,
      roughness: 0.85
    });

    const porcelainFloorMat = new THREE.MeshStandardMaterial({
      map: tileTex,
      color: 0xf0ece4,
      roughness: 0.35,
      metalness: 0.08
    });

    const walnutWoodMat = new THREE.MeshStandardMaterial({
      map: walnutTex,
      color: 0x5a3e2b,
      roughness: 0.55,
      metalness: 0.05
    });

    const boucleMat = new THREE.MeshStandardMaterial({
      map: boucleTex,
      color: 0xd8cebe,
      roughness: 0.85
    });

    const bathFloorMat = new THREE.MeshStandardMaterial({
      map: bathTex,
      color: 0x485055,
      roughness: 0.82
    });

    const quartzCounterMat = new THREE.MeshStandardMaterial({
      map: quartzTex,
      color: 0xf8f8f4,
      roughness: 0.22,
      metalness: 0.1
    });

    const bronzeMetalMat = new THREE.MeshStandardMaterial({
      color: 0x3d3024,
      metalness: 0.88,
      roughness: 0.28
    });

    const glassBalconyMat = new THREE.MeshStandardMaterial({
      color: 0x90c4d8,
      roughness: 0.06,
      metalness: 0.2,
      transparent: true,
      opacity: 0.45
    });

    // ─── 1. Main Residence Floor Slab (9.0m × 8.0m) ─────────────────────────
    const floorSlab = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.25, 8.0), porcelainFloorMat);
    floorSlab.position.set(0, -0.12, 0);
    floorSlab.receiveShadow = true;
    scene.add(floorSlab);

    // ─── 2. Perimeter Enclosure Walls (Chalk White Plaster) ──────────────────
    // North Back Wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(9.0, 3.2, 0.22), plasterWallMat);
    backWall.position.set(0, 1.6, -4.0);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // West Side Wall
    const westWall = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.2, 8.0), plasterWallMat);
    westWall.position.set(-4.5, 1.6, 0);
    westWall.castShadow = true;
    westWall.receiveShadow = true;
    scene.add(westWall);

    // East Side Wall
    const eastWall = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.2, 8.0), plasterWallMat);
    eastWall.position.set(4.5, 1.6, 0);
    eastWall.castShadow = true;
    eastWall.receiveShadow = true;
    scene.add(eastWall);

    // Internal Dividing Partition (Separating Living/Kitchen from Bedroom/Bath)
    const partitionWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 3.2, 5.2), plasterWallMat);
    partitionWall.position.set(0.2, 1.6, -1.4);
    partitionWall.castShadow = true;
    partitionWall.receiveShadow = true;
    scene.add(partitionWall);

    // ─── 3. LIVING ROOM ZONE (Left Side, Z: 0.5 to 3.8m) ───────────────────
    const livingGroup = new THREE.Group();

    // Boucle 3-Seater Luxury Sofa
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 0.9), boucleMat);
    sofaBase.position.set(-2.4, 0.25, 1.8);
    sofaBase.castShadow = true;
    sofaBase.receiveShadow = true;
    livingGroup.add(sofaBase);

    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.55, 0.25), boucleMat);
    sofaBack.position.set(-2.4, 0.65, 1.35);
    sofaBack.castShadow = true;
    livingGroup.add(sofaBack);

    [-1.2, 1.2].forEach((ax) => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.5, 0.9), boucleMat);
      arm.position.set(-2.4 + ax, 0.5, 1.8);
      arm.castShadow = true;
      livingGroup.add(arm);
    });

    // Fluted Travertine Coffee Table
    const coffeeTable = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.38, 0.7), walnutWoodMat);
    coffeeTable.position.set(-2.4, 0.19, 2.9);
    coffeeTable.castShadow = true;
    coffeeTable.receiveShadow = true;
    livingGroup.add(coffeeTable);

    // Wall-Mounted OLED Television & Low Media Console
    const tvScreen = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 1.0, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.15, metalness: 0.85 })
    );
    tvScreen.position.set(-2.4, 1.7, -0.05);
    tvScreen.castShadow = true;
    livingGroup.add(tvScreen);

    const mediaUnit = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.4, 0.38), walnutWoodMat);
    mediaUnit.position.set(-2.4, 0.2, -0.05);
    mediaUnit.castShadow = true;
    livingGroup.add(mediaUnit);

    // Architectural Floor Lamp with Warm Glow
    const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8, 8), bronzeMetalMat);
    lampStem.position.set(-4.0, 0.9, 1.5);
    lampStem.castShadow = true;
    livingGroup.add(lampStem);

    const lampShade = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.32, 0.35, 16),
      new THREE.MeshStandardMaterial({ color: 0xfff2dc, emissive: 0xffd8aa, emissiveIntensity: 0.8 })
    );
    lampShade.position.set(-4.0, 1.8, 1.5);
    livingGroup.add(lampShade);

    scene.add(livingGroup);

    // ─── 4. MODULAR KITCHENETTE (Left Rear, Z: -3.8 to -0.5m) ───────────────
    const kitchenGroup = new THREE.Group();

    // Base Quartz Countertop with Walnut Cabinets
    const kitchenBase = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.86, 0.65), walnutWoodMat);
    kitchenBase.position.set(-2.4, 0.43, -3.6);
    kitchenBase.castShadow = true;
    kitchenBase.receiveShadow = true;
    kitchenGroup.add(kitchenBase);

    const kitchenTop = new THREE.Mesh(new THREE.BoxGeometry(3.64, 0.06, 0.68), quartzCounterMat);
    kitchenTop.position.set(-2.4, 0.89, -3.6);
    kitchenTop.castShadow = true;
    kitchenGroup.add(kitchenTop);

    // Undermount Stainless Sink & Gooseneck Faucet
    const sinkMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.02, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x909498, metalness: 0.9, roughness: 0.2 })
    );
    sinkMesh.position.set(-3.2, 0.92, -3.6);
    kitchenGroup.add(sinkMesh);

    const faucet = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8), bronzeMetalMat);
    faucet.position.set(-3.2, 1.1, -3.8);
    kitchenGroup.add(faucet);

    // Flush 2-Burner Induction Cooktop
    const hob = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.015, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.1, metalness: 0.8 })
    );
    hob.position.set(-1.6, 0.92, -3.6);
    kitchenGroup.add(hob);

    // Overhead Walnut Cabinets with Under-Cabinet LED Strip
    const upperCabinets = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.7, 0.38), walnutWoodMat);
    upperCabinets.position.set(-2.4, 2.3, -3.75);
    upperCabinets.castShadow = true;
    kitchenGroup.add(upperCabinets);

    const ledStrip = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 0.02, 0.04),
      new THREE.MeshStandardMaterial({ color: 0xffeedd, emissive: 0xffd8aa, emissiveIntensity: 0.9 })
    );
    ledStrip.position.set(-2.4, 1.94, -3.75);
    kitchenGroup.add(ledStrip);

    scene.add(kitchenGroup);

    // ─── 5. MASTER BEDROOM ZONE (Right Side, Z: 0.0 to 3.8m) ────────────────
    const bedGroup = new THREE.Group();

    // 500mm Senior Ergonomic King Bed Base
    const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.35, 2.2), walnutWoodMat);
    bedFrame.position.set(2.4, 0.2, 1.8);
    bedFrame.castShadow = true;
    bedFrame.receiveShadow = true;
    bedGroup.add(bedFrame);

    // Orthopaedic Mattress & Tailored Duvet
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.3, 2.1), boucleMat);
    mattress.position.set(2.4, 0.5, 1.8);
    mattress.castShadow = true;
    bedGroup.add(mattress);

    // Fluted Wood Headboard with Brass Reading Sconces
    const headboard = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.2, 0.12), walnutWoodMat);
    headboard.position.set(2.4, 0.9, 0.72);
    headboard.castShadow = true;
    bedGroup.add(headboard);

    // Dual Bedside Nightstands
    [1.1, 3.7].forEach((nx) => {
      const nightstand = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.48, 0.45), walnutWoodMat);
      nightstand.position.set(nx, 0.24, 0.9);
      nightstand.castShadow = true;
      bedGroup.add(nightstand);

      const lamp = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.15, 0.25, 12),
        new THREE.MeshStandardMaterial({ color: 0xfff0dc, emissive: 0xffd8aa, emissiveIntensity: 0.8 })
      );
      lamp.position.set(nx, 0.65, 0.9);
      bedGroup.add(lamp);
    });

    // Floor-to-Ceiling Wardrobe on East Wall
    const wardrobe = new THREE.Mesh(new THREE.BoxGeometry(0.65, 2.8, 2.6), walnutWoodMat);
    wardrobe.position.set(4.1, 1.4, 2.4);
    wardrobe.castShadow = true;
    bedGroup.add(wardrobe);

    scene.add(bedGroup);

    // ─── 6. SENIOR BARRIER-FREE BATHROOM (Right Rear, Z: -3.8 to -0.5m) ─────
    const bathGroup = new THREE.Group();

    // R11 Anti-Skid Floor Tile Slab
    const bathSlab = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.04, 3.2), bathFloorMat);
    bathSlab.position.set(2.4, 0.02, -2.4);
    bathSlab.receiveShadow = true;
    bathGroup.add(bathSlab);

    // Zero-Threshold Walk-In Shower Linear Drain & Glass Screen
    const showerScreen = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.1, 1.6), glassBalconyMat);
    showerScreen.position.set(1.4, 1.05, -3.2);
    bathGroup.add(showerScreen);

    // Stainless Steel / Bronze Heavy-Duty Grab Rails (850mm Height)
    const railMat = new THREE.MeshStandardMaterial({ color: 0x3a3028, metalness: 0.9, roughness: 0.25 });
    const grabRail1 = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.9, 8), railMat);
    grabRail1.rotation.z = Math.PI / 2;
    grabRail1.position.set(2.4, 0.9, -3.95);
    grabRail1.castShadow = true;
    bathGroup.add(grabRail1);

    const grabRail2 = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.9, 8), railMat);
    grabRail2.position.set(4.35, 1.0, -3.0);
    grabRail2.castShadow = true;
    bathGroup.add(grabRail2);

    // Fold-Down Teak Shower Bench
    const showerBench = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.06, 0.42), walnutWoodMat);
    showerBench.position.set(4.1, 0.48, -3.4);
    showerBench.castShadow = true;
    bathGroup.add(showerBench);

    // Wall-Hung Rimless Toilet with Support Arms
    const toiletBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.44, 0.62),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
    );
    toiletBase.position.set(2.8, 0.4, -1.2);
    toiletBase.castShadow = true;
    bathGroup.add(toiletBase);

    // Floating Quartz Vanity with Backlit Mirror
    const vanityTop = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.55), quartzCounterMat);
    vanityTop.position.set(1.4, 0.85, -1.2);
    vanityTop.castShadow = true;
    bathGroup.add(vanityTop);

    const mirror = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 1.0, 0.04),
      new THREE.MeshStandardMaterial({ color: 0xeef4f8, roughness: 0.05, metalness: 0.95 })
    );
    mirror.position.set(1.4, 1.7, -1.2);
    bathGroup.add(mirror);

    // Emergency Ceiling SOS Pull Cord with Ring
    const sosRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.06, 0.015, 8, 16),
      new THREE.MeshStandardMaterial({ color: 0xff3b30, emissive: 0xff3b30, emissiveIntensity: 0.8 })
    );
    sosRing.position.set(3.4, 0.6, -1.2);
    bathGroup.add(sosRing);

    scene.add(bathGroup);

    // ─── Interaction Handlers ─────────────────────────────────────────────

    const handleMouseDown = (e: MouseEvent) => {
      orbitRef.current.isDragging = true;
      orbitRef.current.prevMouseX = e.clientX;
      orbitRef.current.prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current.isDragging) return;
      const deltaX = e.clientX - orbitRef.current.prevMouseX;
      const deltaY = e.clientY - orbitRef.current.prevMouseY;
      orbitRef.current.prevMouseX = e.clientX;
      orbitRef.current.prevMouseY = e.clientY;

      orbitRef.current.targetTheta -= deltaX * 0.007;
      orbitRef.current.targetPhi = Math.max(
        0.18,
        Math.min(Math.PI / 2 - 0.04, orbitRef.current.targetPhi - deltaY * 0.007)
      );
    };

    const handleMouseUp = () => {
      orbitRef.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRef.current.targetRadius = Math.max(
        6,
        Math.min(24, orbitRef.current.targetRadius + e.deltaY * 0.02)
      );
    };

    // Touch support for mobile
    let touchStartDist = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        orbitRef.current.isDragging = true;
        orbitRef.current.prevMouseX = e.touches[0].clientX;
        orbitRef.current.prevMouseY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[1].clientX - e.touches[0].clientX,
          e.touches[1].clientY - e.touches[0].clientY
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1 && orbitRef.current.isDragging) {
        const dx = e.touches[0].clientX - orbitRef.current.prevMouseX;
        const dy = e.touches[0].clientY - orbitRef.current.prevMouseY;
        orbitRef.current.prevMouseX = e.touches[0].clientX;
        orbitRef.current.prevMouseY = e.touches[0].clientY;
        orbitRef.current.targetTheta -= dx * 0.007;
        orbitRef.current.targetPhi = Math.max(0.18, Math.min(Math.PI / 2 - 0.04, orbitRef.current.targetPhi - dy * 0.007));
      } else if (e.touches.length === 2) {
        const newDist = Math.hypot(
          e.touches[1].clientX - e.touches[0].clientX,
          e.touches[1].clientY - e.touches[0].clientY
        );
        const delta = touchStartDist - newDist;
        orbitRef.current.targetRadius = Math.max(6, Math.min(24, orbitRef.current.targetRadius + delta * 0.03));
        touchStartDist = newDist;
      }
    };

    const handleTouchEnd = () => {
      orbitRef.current.isDragging = false;
    };

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (!orbitRef.current.isDragging) {
        orbitRef.current.targetTheta += 0.0005;
      }

      updateCameraPosition();
      renderer.render(scene, camera);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    setIsLoading(false);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      disposeScene(scene);
      renderer.dispose();
    };
  }, [updateCameraPosition]);

  // ─── Room Camera Switchers ────────────────────────────────────────────────

  const handleSelectRoom = (room: 'bedroom' | 'living' | 'kitchen' | 'bathroom') => {
    setActiveRoom(room);
    if (room === 'living') {
      orbitRef.current.targetLookAt.set(-2.4, 1.2, 1.8);
      orbitRef.current.targetRadius = 8.5;
      orbitRef.current.targetPhi = Math.PI / 3.4;
      orbitRef.current.targetTheta = Math.PI / 3.8;
    } else if (room === 'bedroom') {
      orbitRef.current.targetLookAt.set(2.4, 1.1, 1.8);
      orbitRef.current.targetRadius = 8.0;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetTheta = Math.PI / 4.2;
    } else if (room === 'kitchen') {
      orbitRef.current.targetLookAt.set(-2.4, 1.2, -3.2);
      orbitRef.current.targetRadius = 7.5;
      orbitRef.current.targetPhi = Math.PI / 3.5;
      orbitRef.current.targetTheta = Math.PI / 2.8;
    } else if (room === 'bathroom') {
      orbitRef.current.targetLookAt.set(2.4, 1.1, -2.4);
      orbitRef.current.targetRadius = 6.8;
      orbitRef.current.targetPhi = Math.PI / 3.4;
      orbitRef.current.targetTheta = Math.PI / 3.2;
    }
  };

  const ROOM_METRICS: Record<'bedroom' | 'living' | 'kitchen' | 'bathroom', { title: string; imperial: string; metric: string; features: string[]; cadCoords: string }> = {
    bedroom: {
      title: 'Master Bedroom Sanctuary',
      imperial: "12'-6\" × 14'-0\" (175 sq. ft.)",
      metric: '3.8m × 4.2m',
      features: ['Low-reach 900mm master switch panel', 'Anti-glare warm cove perimeter lighting', 'Wide 1200mm doorway for walker clearance', 'R11 slip-resistant vitrified flooring'],
      cadCoords: 'North-East Suite Sector'
    },
    living: {
      title: 'Sunlit Living & Lounge Area',
      imperial: "14'-0\" × 16'-6\" (231 sq. ft.)",
      metric: '4.2m × 5.0m',
      features: ['Zero-threshold flush balcony sliding track', 'Continuous 1500mm wheelchair turning diameter', 'Ergonomic firm-cushioned armchairs', 'Panic SOS pull station at 400mm & 1200mm'],
      cadCoords: 'South-East Balcony Frontage'
    },
    kitchen: {
      title: 'Ergonomic Low-Height Kitchenette',
      imperial: "8'-0\" × 9'-6\" (76 sq. ft.)",
      metric: '2.4m × 2.9m',
      features: ['800mm low-reach calacatta quartz countertop', 'Under-counter pull-out drawers (no high stretch)', 'Induction cooktop with auto cut-off', 'Single-lever high-neck swivel faucet'],
      cadCoords: 'West Utility Corridor'
    },
    bathroom: {
      title: 'Barrier-Free Accessible Bathroom',
      imperial: "8'-0\" × 7'-6\" (60 sq. ft.)",
      metric: '2.4m × 2.3m',
      features: ['Zero-threshold flush linear shower channel', '32mm stainless steel grab bars (150kg tested)', 'Wall-mounted fold-down shower seat', 'Emergency ceiling pull cord linked to nurse desk'],
      cadCoords: 'Central Wet Core'
    }
  };

  const currentRoomSpec = ROOM_METRICS[activeRoom];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#071519] border border-[#163942] shadow-2xl transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-[99999] rounded-none h-screen w-screen flex flex-col lg:flex-row'
          : 'rounded-3xl h-[620px] sm:h-[700px]'
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
              Rendering 3D Interior Walkthrough...
            </span>
          </div>
        )}

        {/* Top Left Header & Proposed Badge */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2329]/90 border border-white/15 text-[11px] font-mono text-[#E0AB77] uppercase tracking-widest backdrop-blur-md shadow-lg pointer-events-auto">
            <Home className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>PROPOSED RESIDENCE INTERIOR CGI</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold backdrop-blur-md shadow-lg pointer-events-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Senior Universal Design Standards</span>
          </div>
        </div>

        {/* Top Right Room Navigation Toolbar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#0D2329]/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 shadow-xl pointer-events-auto">
          <button
            onClick={() => handleSelectRoom('living')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeRoom === 'living' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sofa className="w-3.5 h-3.5" />
            <span>Living</span>
          </button>

          <button
            onClick={() => handleSelectRoom('bedroom')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeRoom === 'bedroom' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            <Bed className="w-3.5 h-3.5" />
            <span>Bedroom</span>
          </button>

          <button
            onClick={() => handleSelectRoom('kitchen')}
            className={`hidden sm:flex px-3 py-1.5 rounded-xl text-xs font-semibold items-center gap-1.5 transition-all cursor-pointer ${
              activeRoom === 'kitchen' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Kitchen</span>
          </button>

          <button
            onClick={() => handleSelectRoom('bathroom')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeRoom === 'bathroom' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            <Bath className="w-3.5 h-3.5" />
            <span>Bathroom</span>
          </button>

          <div className="h-4 w-px bg-white/20 mx-1" />

          {onToggle2DBlueprint && (
            <button
              onClick={onToggle2DBlueprint}
              className="px-2.5 py-1.5 rounded-xl text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              2D CAD Plan
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

        {/* Safety Hotspot Markers floating on left in non-fullscreen */}
        {!isFullscreen && (
          <div className="absolute left-4 bottom-16 sm:bottom-20 z-20 flex flex-col gap-2 max-w-xs pointer-events-auto">
            <span className="text-[10px] font-mono uppercase text-[#C58F58] tracking-widest px-1 font-bold">
              Senior Safety Features ({activeRoom.toUpperCase()}):
            </span>

            {SAFETY_HOTSPOTS.filter((h) => h.room === activeRoom).map((hs) => (
              <div
                key={hs.id}
                onClick={() => setActiveHotspot(activeHotspot?.id === hs.id ? null : hs)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md shadow-lg ${
                  activeHotspot?.id === hs.id
                    ? 'bg-[#2C5E50] border-emerald-400 text-white shadow-xl'
                    : 'bg-[#071519]/85 border-white/15 text-white/85 hover:bg-[#14353E]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-serif-heading">{hs.title}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />
                </div>
                {activeHotspot?.id === hs.id && (
                  <div className="pt-2 text-[11px] text-white/80 space-y-1.5 border-t border-white/15 mt-2">
                    <p>{hs.detail}</p>
                    <div className="text-[9px] font-mono text-[#E0AB77] font-semibold">
                      Standard: {hs.standard}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bottom HUD */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/60 pointer-events-none z-10 px-2">
          <div className="flex items-center gap-2 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
            <span className="hidden sm:inline">Drag to Orbit • Scroll to Zoom • Select Room Buttons Above</span>
            <span className="sm:hidden">Drag to Orbit • Tap Room Buttons</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Threshold Level Access Floor Plan</span>
          </div>
        </div>
      </div>

      {/* ─── FULLSCREEN STUDIO INSPECTOR SIDEBAR (Right 30% on Laptop/Desktop) ─── */}
      {isFullscreen && (
        <aside className="w-full lg:w-[420px] xl:w-[460px] shrink-0 h-full bg-[#0A1C22]/98 border-t lg:border-t-0 lg:border-l border-white/15 p-6 overflow-y-auto flex flex-col justify-between backdrop-blur-2xl z-30 shadow-2xl text-white space-y-6">
          <div className="space-y-5">
            {/* Sidebar Top Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#2C5E50]/40 border border-emerald-400/40 text-[#C58F58] flex items-center justify-center">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-heading font-bold text-base text-[#FAF8F5]">
                    Interior Studio Inspector
                  </h3>
                  <span className="text-[10px] font-mono text-[#C58F58] uppercase tracking-wider block">
                    Elder Ergonomics • NBC 2016 Annex D
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

            {/* Active Room Specification Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase">
                  Active Room: {activeRoom.toUpperCase()}
                </span>
                <span className="text-xs text-[#C58F58] font-mono font-bold">{unitType.toUpperCase()} Suite</span>
              </div>
              <h4 className="text-xl font-serif-heading font-bold text-[#FAF8F5]">
                {currentRoomSpec.title}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                  <span className="text-[10px] text-white/50 block font-mono">Room Dimensions</span>
                  <span className="font-bold text-white mt-0.5 block">{currentRoomSpec.imperial}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                  <span className="text-[10px] text-white/50 block font-mono">Metric Dimension</span>
                  <span className="font-bold text-white mt-0.5 block">{currentRoomSpec.metric}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                  <span className="text-[10px] text-white/50 block font-mono">Doorway Clearance</span>
                  <span className="font-bold text-emerald-300 mt-0.5 block">1200mm (Wheelchair)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                  <span className="text-[10px] text-white/50 block font-mono">Turning Diameter</span>
                  <span className="font-bold text-emerald-300 mt-0.5 block">1500mm ADA Pass</span>
                </div>
              </div>
            </div>

            {/* Synchronized 2D Interior CAD Layout Zoom */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60 font-mono">2D Architectural Suite Layout</span>
                <span className="text-[#C58F58] font-bold">Synchronized</span>
              </div>

              <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/20 bg-black/40 shadow-inner group">
                <img
                  src="/project-assets/architecture/cad/previews/typical-floor-cad.jpg"
                  alt="Typical Floor CAD Layout"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full border-2 border-[#C58F58] animate-ping opacity-75" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#C58F58] text-[8px] font-bold text-black flex items-center justify-center shadow-lg absolute">
                    ★
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] text-white/80 flex items-center justify-between">
                  <span>Room: {currentRoomSpec.title}</span>
                  <span className="font-mono text-[#C58F58]">Universal CAD Layout</span>
                </div>
              </div>
            </div>

            {/* Active Room Safety Hotspots Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C58F58] font-bold">
                Room Safety Inclusions ({activeRoom.toUpperCase()}):
              </span>
              <div className="space-y-2">
                {SAFETY_HOTSPOTS.filter((h) => h.room === activeRoom).map((hs) => (
                  <div key={hs.id} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{hs.title}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-white/70 text-[11px] leading-relaxed">{hs.detail}</p>
                    <span className="text-[9px] font-mono text-[#C58F58] block">Standard: {hs.standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Bottom CTA Actions */}
          <div className="pt-4 border-t border-white/15 space-y-2.5">
            <button
              onClick={() =>
                openWhatsApp({
                  actionType: 'reserve-unit',
                  unitType: unitType === '1-bhk' ? '1 BHK Senior Suite' : '1 RK Care Suite',
                  message: `Hello, I am inspecting the 3D Interior Walkthrough for ${currentRoomSpec.title} (${unitType.toUpperCase()} Suite) at Senior Living Citizen Foundation. Please share complete interior floor plans and specification sheet.`
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
                  title: `Schedule Experience Centre Visit for ${currentRoomSpec.title}`,
                  unitType: unitType === '1-bhk' ? '1 BHK Senior Suite' : '1 RK Care Suite',
                  actionType: 'book-site-visit'
                })
              }
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#C58F58]" />
              Schedule Experience Walkthrough
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
