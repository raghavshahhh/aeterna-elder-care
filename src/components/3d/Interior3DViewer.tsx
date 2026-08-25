'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { UnitType } from '@/types';
import { useModal } from '@/context/ModalContext';
import { Unit2DCadBlueprint } from '@/components/property/Unit2DCadBlueprint';
import {
  Rotate3d,
  Maximize2,
  Minimize2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Home,
  Bed,
  Sofa,
  Utensils,
  Bath,
  X,
  MessageSquare,
  Phone,
  Layers,
  Info
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
  unit: 'all' | '1-bhk' | '1-rk';
  title: string;
  detail: string;
  standard: string;
}

const SAFETY_HOTSPOTS: SafetyHotspot[] = [
  {
    id: 'hs-1',
    name: '32mm Continuous Grab Rails',
    room: 'bathroom',
    unit: 'all',
    title: '32mm Stainless Steel Grab Rails',
    detail: 'Continuous heavy-duty 150kg-rated wall grab bars flanking the toilet and shower zones for slip prevention.',
    standard: 'NBC 2016 Senior Living Annex D'
  },
  {
    id: 'hs-2',
    name: 'Zero-Threshold Barrier-Free Shower',
    room: 'bathroom',
    unit: 'all',
    title: 'Zero-Threshold Flush Drain Shower',
    detail: 'Complete elimination of step-over curbs to permit seamless wheelchair and walker roll-in access.',
    standard: 'Barrier-Free ADA Accessibility Guidelines'
  },
  {
    id: 'hs-3',
    name: 'Ceiling-Drop Emergency SOS Cord',
    room: 'bathroom',
    unit: 'all',
    title: 'Dual Emergency Pull Cord',
    detail: 'Floor-to-ceiling pull cord reachable even if a resident is on the floor, alerting the nurse station immediately.',
    standard: 'Smart Health Monitoring Spec'
  },
  {
    id: 'hs-4',
    name: 'Low-Reach Master Controls',
    room: 'bedroom',
    unit: 'all',
    title: 'Ergonomic Bedside Switch Console',
    detail: 'Switches placed at 900mm height from floor level, allowing effortless operation without getting out of bed.',
    standard: 'Universal Design Standard'
  },
  {
    id: 'hs-5',
    name: 'R11 Slip-Resistant Vitrified Tiles',
    room: 'bedroom',
    unit: 'all',
    title: 'R11 Anti-Skid Floor Finish',
    detail: 'Matte vitrified tiles with high wet-friction coefficient across all circulation corridors and wet zones.',
    standard: 'DIN 51130 R11 Certification'
  },
  {
    id: 'hs-6',
    name: 'Ergonomic Work Triangle & Low Cabinets',
    room: 'kitchen',
    unit: 'all',
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

  ctx.fillStyle = '#E8E1D5';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 16000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const v = 225 + Math.random() * 25;
    ctx.fillStyle = `rgb(${v}, ${v - 5}, ${v - 12})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

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

  ctx.fillStyle = '#4A3425';
  ctx.fillRect(0, 0, 512, 512);

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

  ctx.fillStyle = '#384248';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const v = 50 + Math.random() * 40;
    ctx.fillStyle = `rgb(${v}, ${v + 4}, ${v + 8})`;
    ctx.fillRect(x, y, 2, 2);
  }

  ctx.strokeStyle = 'rgba(20, 25, 30, 0.7)';
  ctx.lineWidth = 2;
  for (let y = 0; y <= 256; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }
  for (let x = 0; x <= 256; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function createCalacattaQuartzTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#F8F8F5';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(180, 160, 140, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(10, 50);
  ctx.bezierCurveTo(150, 120, 300, 80, 500, 420);
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

// ─── Disposal Helper ─────────────────────────────────────────────────────────

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
  const is1RK = unitType === '1-rk';
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openWhatsApp, openLeadDrawer } = useModal();

  const [activeRoom, setActiveRoom] = useState<'bedroom' | 'living' | 'kitchen' | 'bathroom'>(initialRoom);
  const [activeHotspot, setActiveHotspot] = useState<SafetyHotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  // Orbit state
  const orbitRef = useRef({
    radius: is1RK ? 9.5 : 12,
    theta: Math.PI / 4,
    phi: Math.PI / 3.2,
    target: new THREE.Vector3(0, 1.1, 0),
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRadius: is1RK ? 9.5 : 12,
    targetTheta: Math.PI / 4,
    targetPhi: Math.PI / 3.2,
    targetLookAt: new THREE.Vector3(0, 1.1, 0)
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

  // ─── Build WebGL Scene (Reacts to unitType) ───────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    setIsLoading(true);
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

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xdcebf5, 0x3d352b, 0.85);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xfcf8ee, 0.5);
    scene.add(ambientLight);

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

    const coveLight = new THREE.PointLight(0xffe8c8, 1.2, 18, 1.2);
    coveLight.position.set(0, 2.8, 0);
    scene.add(coveLight);

    // Material Library
    const tileTex = createPorcelainTileTexture();
    const walnutTex = createWalnutVeneerTexture();
    const boucleTex = createBoucleFabricTexture();
    const bathTex = createAntiSkidBathroomTexture();
    const quartzTex = createCalacattaQuartzTexture();

    const plasterWallMat = new THREE.MeshStandardMaterial({ color: 0xf5f0eb, roughness: 0.85 });
    const porcelainFloorMat = new THREE.MeshStandardMaterial({ map: tileTex, color: 0xf0ece4, roughness: 0.35, metalness: 0.08 });
    const walnutWoodMat = new THREE.MeshStandardMaterial({ map: walnutTex, color: 0x5a3e2b, roughness: 0.55, metalness: 0.05 });
    const boucleMat = new THREE.MeshStandardMaterial({ map: boucleTex, color: 0xd8cebe, roughness: 0.85 });
    const bathFloorMat = new THREE.MeshStandardMaterial({ map: bathTex, color: 0x485055, roughness: 0.82 });
    const quartzCounterMat = new THREE.MeshStandardMaterial({ map: quartzTex, color: 0xf8f8f4, roughness: 0.22, metalness: 0.1 });
    const bronzeMetalMat = new THREE.MeshStandardMaterial({ color: 0x3d3024, metalness: 0.88, roughness: 0.28 });

    if (unitType === '1-rk') {
      // ═════════════════════════════════════════════════════════════════════════
      // 1 RK SENIOR STUDIO SUITE (~240 sq. ft. super / ~195 sq. ft. carpet)
      // Proportions: 6.6m width (X: -3.3 to 3.3) × 5.2m depth (Z: -2.6 to 2.6)
      // ═════════════════════════════════════════════════════════════════════════

      // 1. Studio Floor Slab
      const floorSlab = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.25, 5.2), porcelainFloorMat);
      floorSlab.position.set(0, -0.12, 0);
      floorSlab.receiveShadow = true;
      scene.add(floorSlab);

      // Bathroom Floor Slab (Anti-Skid Dark Slate)
      const bathFloor = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.02, 2.2), bathFloorMat);
      bathFloor.position.set(1.9, 0.01, -1.3);
      bathFloor.receiveShadow = true;
      scene.add(bathFloor);

      // 2. Perimeter Enclosure Walls
      // North Back Wall with Scenic Window Frame
      const backWall = new THREE.Mesh(new THREE.BoxGeometry(6.6, 3.0, 0.2), plasterWallMat);
      backWall.position.set(0, 1.5, -2.6);
      backWall.castShadow = true;
      backWall.receiveShadow = true;
      scene.add(backWall);

      // West Wall
      const westWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.0, 5.2), plasterWallMat);
      westWall.position.set(-3.3, 1.5, 0);
      westWall.castShadow = true;
      westWall.receiveShadow = true;
      scene.add(westWall);

      // East Wall
      const eastWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.0, 5.2), plasterWallMat);
      eastWall.position.set(3.3, 1.5, 0);
      eastWall.castShadow = true;
      eastWall.receiveShadow = true;
      scene.add(eastWall);

      // Bathroom Privacy Partition (dividing bathroom from Studio Living with 1200mm door opening)
      const bathPartition = new THREE.Mesh(new THREE.BoxGeometry(0.18, 3.0, 2.3), plasterWallMat);
      bathPartition.position.set(0.7, 1.5, -1.35);
      bathPartition.castShadow = true;
      scene.add(bathPartition);

      const bathFrontWall = new THREE.Mesh(new THREE.BoxGeometry(1.4, 3.0, 0.18), plasterWallMat);
      bathFrontWall.position.set(2.5, 1.5, -0.2);
      bathFrontWall.castShadow = true;
      scene.add(bathFrontWall);

      // ─── 3. INTEGRATED STUDIO LIVING & SLEEPING SUITE (Left Area) ─────────
      const studioGroup = new THREE.Group();

      // Senior Orthopaedic Bed (500mm rise)
      const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.35, 2.1), walnutWoodMat);
      bedFrame.position.set(-1.8, 0.2, -1.0);
      bedFrame.castShadow = true;
      bedFrame.receiveShadow = true;
      studioGroup.add(bedFrame);

      const mattress = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.28, 2.0), boucleMat);
      mattress.position.set(-1.8, 0.48, -1.0);
      mattress.castShadow = true;
      studioGroup.add(mattress);

      const headboard = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.1, 0.1), walnutWoodMat);
      headboard.position.set(-1.8, 0.85, -2.05);
      headboard.castShadow = true;
      studioGroup.add(headboard);

      // Bedside Nightstand & Panic Switch
      const nightstand = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.45, 0.42), walnutWoodMat);
      nightstand.position.set(-0.45, 0.23, -1.9);
      nightstand.castShadow = true;
      studioGroup.add(nightstand);

      const bedLamp = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.14, 0.25, 12),
        new THREE.MeshStandardMaterial({ color: 0xfff0dc, emissive: 0xffd8aa, emissiveIntensity: 0.8 })
      );
      bedLamp.position.set(-0.45, 0.6, -1.9);
      studioGroup.add(bedLamp);

      // Cozy 2-Seater Reading Loveseat & Coffee Table
      const settee = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.8), boucleMat);
      settee.position.set(-1.8, 0.23, 1.4);
      settee.castShadow = true;
      studioGroup.add(settee);

      const setteeBack = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 0.2), boucleMat);
      setteeBack.position.set(-1.8, 0.65, 1.0);
      setteeBack.castShadow = true;
      studioGroup.add(setteeBack);

      const coffeeTable = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.36, 16), walnutWoodMat);
      coffeeTable.position.set(-0.6, 0.18, 1.5);
      coffeeTable.castShadow = true;
      studioGroup.add(coffeeTable);

      // OLED TV Console
      const mediaConsole = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.35, 0.35), walnutWoodMat);
      mediaConsole.position.set(-3.0, 0.18, 1.4);
      mediaConsole.rotation.y = Math.PI / 2;
      mediaConsole.castShadow = true;
      studioGroup.add(mediaConsole);

      const tvScreen = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.8, 0.04),
        new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.15, metalness: 0.85 })
      );
      tvScreen.position.set(-3.15, 1.5, 1.4);
      tvScreen.rotation.y = Math.PI / 2;
      studioGroup.add(tvScreen);

      scene.add(studioGroup);

      // ─── 4. KITCHENETTE PANTRY CORNER (Right Front Area) ──────────────────
      const kitchenGroup = new THREE.Group();

      const kitchenBase = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.86, 0.6), walnutWoodMat);
      kitchenBase.position.set(2.0, 0.43, 1.8);
      kitchenBase.castShadow = true;
      kitchenGroup.add(kitchenBase);

      const kitchenTop = new THREE.Mesh(new THREE.BoxGeometry(2.24, 0.06, 0.64), quartzCounterMat);
      kitchenTop.position.set(2.0, 0.89, 1.8);
      kitchenTop.castShadow = true;
      kitchenGroup.add(kitchenTop);

      const sinkMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.02, 0.4),
        new THREE.MeshStandardMaterial({ color: 0x909498, metalness: 0.9, roughness: 0.2 })
      );
      sinkMesh.position.set(1.4, 0.92, 1.8);
      kitchenGroup.add(sinkMesh);

      const faucet = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.3, 8), bronzeMetalMat);
      faucet.position.set(1.4, 1.08, 1.65);
      kitchenGroup.add(faucet);

      const hob = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.015, 0.38),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.1, metalness: 0.8 })
      );
      hob.position.set(2.4, 0.92, 1.8);
      kitchenGroup.add(hob);

      const upperCabinets = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.6, 0.35), walnutWoodMat);
      upperCabinets.position.set(2.0, 2.1, 1.95);
      upperCabinets.castShadow = true;
      kitchenGroup.add(upperCabinets);

      const ledStrip = new THREE.Mesh(
        new THREE.BoxGeometry(2.0, 0.02, 0.04),
        new THREE.MeshStandardMaterial({ color: 0xffeedd, emissive: 0xffd8aa, emissiveIntensity: 0.9 })
      );
      ledStrip.position.set(2.0, 1.78, 1.95);
      kitchenGroup.add(ledStrip);

      scene.add(kitchenGroup);

      // ─── 5. ATTACHED BARRIER-FREE ACCESSIBLE BATHROOM (Right Rear Area) ───
      const bathGroup = new THREE.Group();

      // Wall-Hung Toilet with Grab Bars
      const toilet = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.44, 0.58),
        new THREE.MeshStandardMaterial({ color: 0xfdfdfd, roughness: 0.2 })
      );
      toilet.position.set(1.4, 0.25, -2.15);
      toilet.castShadow = true;
      bathGroup.add(toilet);

      [-0.32, 0.32].forEach((gx) => {
        const grabRail = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.7, 8), bronzeMetalMat);
        grabRail.position.set(1.4 + gx, 0.8, -2.15);
        grabRail.rotation.x = Math.PI / 2;
        bathGroup.add(grabRail);
      });

      // Zero-Threshold Roll-In Shower with Teak Folding Bench
      const showerChannel = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.01, 0.9),
        new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8 })
      );
      showerChannel.position.set(2.8, 0.015, -1.3);
      bathGroup.add(showerChannel);

      const showerHead = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.03, 16), bronzeMetalMat);
      showerHead.position.set(2.8, 2.3, -1.3);
      bathGroup.add(showerHead);

      const teakBench = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.06, 0.35), walnutWoodMat);
      teakBench.position.set(2.8, 0.48, -2.1);
      bathGroup.add(teakBench);

      // Floating Vanity & Mirror
      const vanityTop = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.1, 0.45), quartzCounterMat);
      vanityTop.position.set(1.4, 0.85, -0.6);
      vanityTop.castShadow = true;
      bathGroup.add(vanityTop);

      const mirror = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.8, 0.03),
        new THREE.MeshStandardMaterial({ color: 0xeef4f8, roughness: 0.05, metalness: 0.95 })
      );
      mirror.position.set(1.4, 1.6, -0.6);
      bathGroup.add(mirror);

      // SOS Pull Ring Cord
      const sosRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.05, 0.012, 8, 16),
        new THREE.MeshStandardMaterial({ color: 0xff3b30, emissive: 0xff3b30, emissiveIntensity: 0.8 })
      );
      sosRing.position.set(2.2, 0.6, -1.2);
      bathGroup.add(sosRing);

      scene.add(bathGroup);
    } else {
      // ═════════════════════════════════════════════════════════════════════════
      // 1 BHK SENIOR RESIDENCE (~400 sq. ft. super / ~276 sq. ft. carpet)
      // Proportions: 9.0m width (X: -4.5 to 4.5) × 8.0m depth (Z: -4.0 to 4.0)
      // ═════════════════════════════════════════════════════════════════════════

      // 1. Floor Slab
      const floorSlab = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.25, 8.0), porcelainFloorMat);
      floorSlab.position.set(0, -0.12, 0);
      floorSlab.receiveShadow = true;
      scene.add(floorSlab);

      const bathFloor = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.02, 3.4), bathFloorMat);
      bathFloor.position.set(2.4, 0.01, -2.1);
      bathFloor.receiveShadow = true;
      scene.add(bathFloor);

      // 2. Perimeter Enclosure Walls
      const backWall = new THREE.Mesh(new THREE.BoxGeometry(9.0, 3.2, 0.22), plasterWallMat);
      backWall.position.set(0, 1.6, -4.0);
      backWall.castShadow = true;
      backWall.receiveShadow = true;
      scene.add(backWall);

      const westWall = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.2, 8.0), plasterWallMat);
      westWall.position.set(-4.5, 1.6, 0);
      westWall.castShadow = true;
      westWall.receiveShadow = true;
      scene.add(westWall);

      const eastWall = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.2, 8.0), plasterWallMat);
      eastWall.position.set(4.5, 1.6, 0);
      eastWall.castShadow = true;
      eastWall.receiveShadow = true;
      scene.add(eastWall);

      // Central Dividing Wall (Left Living/Kitchen, Right Bedroom/Bath)
      const partitionWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 3.2, 5.2), plasterWallMat);
      partitionWall.position.set(0.2, 1.6, -1.4);
      partitionWall.castShadow = true;
      partitionWall.receiveShadow = true;
      scene.add(partitionWall);

      // ─── 3. DEDICATED LIVING LOUNGE (Left Front Area) ─────────────────────
      const livingGroup = new THREE.Group();

      const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 0.9), boucleMat);
      sofaBase.position.set(-2.4, 0.25, 1.8);
      sofaBase.castShadow = true;
      sofaBase.receiveShadow = true;
      livingGroup.add(sofaBase);

      const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.55, 0.25), boucleMat);
      sofaBack.position.set(-2.4, 0.65, 1.35);
      sofaBack.castShadow = true;
      livingGroup.add(sofaBack);

      const coffeeTable = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.38, 0.7), walnutWoodMat);
      coffeeTable.position.set(-2.4, 0.19, 2.9);
      coffeeTable.castShadow = true;
      coffeeTable.receiveShadow = true;
      livingGroup.add(coffeeTable);

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

      const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8, 8), bronzeMetalMat);
      lampStem.position.set(-4.0, 0.9, 1.5);
      livingGroup.add(lampStem);

      const lampShade = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.32, 0.35, 16),
        new THREE.MeshStandardMaterial({ color: 0xfff2dc, emissive: 0xffd8aa, emissiveIntensity: 0.8 })
      );
      lampShade.position.set(-4.0, 1.8, 1.5);
      livingGroup.add(lampShade);

      scene.add(livingGroup);

      // ─── 4. DEDICATED MODULAR KITCHEN (Left Rear Area) ────────────────────
      const kitchenGroup = new THREE.Group();

      const kitchenBase = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.86, 0.65), walnutWoodMat);
      kitchenBase.position.set(-2.4, 0.43, -3.6);
      kitchenBase.castShadow = true;
      kitchenBase.receiveShadow = true;
      kitchenGroup.add(kitchenBase);

      const kitchenTop = new THREE.Mesh(new THREE.BoxGeometry(3.64, 0.06, 0.68), quartzCounterMat);
      kitchenTop.position.set(-2.4, 0.89, -3.6);
      kitchenTop.castShadow = true;
      kitchenGroup.add(kitchenTop);

      const sinkMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.02, 0.45),
        new THREE.MeshStandardMaterial({ color: 0x909498, metalness: 0.9, roughness: 0.2 })
      );
      sinkMesh.position.set(-3.2, 0.92, -3.6);
      kitchenGroup.add(sinkMesh);

      const faucet = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8), bronzeMetalMat);
      faucet.position.set(-3.2, 1.1, -3.8);
      kitchenGroup.add(faucet);

      const hob = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.015, 0.45),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.1, metalness: 0.8 })
      );
      hob.position.set(-1.6, 0.92, -3.6);
      kitchenGroup.add(hob);

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

      // ─── 5. PRIVATE MASTER BEDROOM (Right Front Area) ─────────────────────
      const bedGroup = new THREE.Group();

      const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.35, 2.2), walnutWoodMat);
      bedFrame.position.set(2.4, 0.2, 1.8);
      bedFrame.castShadow = true;
      bedFrame.receiveShadow = true;
      bedGroup.add(bedFrame);

      const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.3, 2.1), boucleMat);
      mattress.position.set(2.4, 0.5, 1.8);
      mattress.castShadow = true;
      bedGroup.add(mattress);

      const headboard = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.2, 0.12), walnutWoodMat);
      headboard.position.set(2.4, 0.9, 0.72);
      headboard.castShadow = true;
      bedGroup.add(headboard);

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

      scene.add(bedGroup);

      // ─── 6. SENIOR-SAFE ACCESSIBLE BATHROOM (Right Rear Area) ─────────────
      const bathGroup = new THREE.Group();

      const toilet = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 0.46, 0.65),
        new THREE.MeshStandardMaterial({ color: 0xfdfdfd, roughness: 0.2 })
      );
      toilet.position.set(3.4, 0.25, -3.2);
      toilet.castShadow = true;
      bathGroup.add(toilet);

      [-0.38, 0.38].forEach((gx) => {
        const grabRail = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8), bronzeMetalMat);
        grabRail.position.set(3.4 + gx, 0.85, -3.2);
        grabRail.rotation.x = Math.PI / 2;
        bathGroup.add(grabRail);
      });

      const showerChannel = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.01, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8 })
      );
      showerChannel.position.set(1.4, 0.015, -2.4);
      bathGroup.add(showerChannel);

      const teakBench = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.06, 0.4), walnutWoodMat);
      teakBench.position.set(1.4, 0.48, -3.6);
      bathGroup.add(teakBench);

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

      const sosRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.06, 0.015, 8, 16),
        new THREE.MeshStandardMaterial({ color: 0xff3b30, emissive: 0xff3b30, emissiveIntensity: 0.8 })
      );
      sosRing.position.set(3.4, 0.6, -1.2);
      bathGroup.add(sosRing);

      scene.add(bathGroup);
    }

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
        5,
        Math.min(22, orbitRef.current.targetRadius + e.deltaY * 0.02)
      );
    };

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
        orbitRef.current.targetRadius = Math.max(5, Math.min(22, orbitRef.current.targetRadius + delta * 0.03));
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
  }, [unitType, updateCameraPosition]);

  // ─── Camera Targeting on Room Selection ───────────────────────────────────
  const handleSelectRoom = (room: 'bedroom' | 'living' | 'kitchen' | 'bathroom') => {
    setActiveRoom(room);
    if (is1RK) {
      if (room === 'living' || room === 'bedroom') {
        orbitRef.current.targetLookAt.set(-1.2, 1.0, 0.4);
        orbitRef.current.targetRadius = 7.0;
        orbitRef.current.targetPhi = Math.PI / 3.4;
        orbitRef.current.targetTheta = Math.PI / 4.0;
      } else if (room === 'kitchen') {
        orbitRef.current.targetLookAt.set(1.8, 1.0, 1.4);
        orbitRef.current.targetRadius = 5.5;
        orbitRef.current.targetPhi = Math.PI / 3.2;
        orbitRef.current.targetTheta = Math.PI / 2.8;
      } else if (room === 'bathroom') {
        orbitRef.current.targetLookAt.set(1.8, 1.0, -1.2);
        orbitRef.current.targetRadius = 5.5;
        orbitRef.current.targetPhi = Math.PI / 3.0;
        orbitRef.current.targetTheta = Math.PI / 2.5;
      }
    } else {
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
    }
  };

  // Metrics Specs
  const ROOM_SPECS_1RK = {
    bedroom: {
      title: 'Studio Living & Bed Area',
      imperial: "12'-0\" × 14'-0\" (168 sq. ft.)",
      metric: '3.65m × 4.25m',
      features: ['Integrated 500mm low-rise orthopaedic bed', 'Cozy 2-seater reading settee and coffee table', 'Low-reach 900mm panic SOS switch panel', 'R11 anti-skid warm vitrified flooring'],
      cadCoords: 'Central Studio Sector'
    },
    living: {
      title: 'Studio Living & Bed Area',
      imperial: "12'-0\" × 14'-0\" (168 sq. ft.)",
      metric: '3.65m × 4.25m',
      features: ['Integrated 500mm low-rise orthopaedic bed', 'Cozy 2-seater reading settee and coffee table', 'Low-reach 900mm panic SOS switch panel', 'R11 anti-skid warm vitrified flooring'],
      cadCoords: 'Central Studio Sector'
    },
    kitchen: {
      title: 'Kitchenette Pantry Corner',
      imperial: "5'-0\" × 6'-0\" (30 sq. ft.)",
      metric: '1.5m × 1.8m',
      features: ['Low-height calacatta quartz countertop', 'Induction safety single-burner cooktop', 'Stainless sink with swivel faucet', 'Under-counter slide drawers'],
      cadCoords: 'South-East Pantry Sector'
    },
    bathroom: {
      title: 'Barrier-Free Accessible Bathroom',
      imperial: "8'-0\" × 6'-0\" (48 sq. ft.)",
      metric: '2.4m × 1.8m',
      features: ['Zero-threshold flush drain walk-in shower', '32mm stainless steel grab rails (150kg tested)', 'Teak folding shower seat', 'Emergency ceiling pull cord linked to nurse station'],
      cadCoords: 'North-East Wet Core'
    }
  };

  const ROOM_SPECS_1BHK = {
    bedroom: {
      title: 'Master Bedroom Sanctuary',
      imperial: "10'-0\" × 10'-10\" (108 sq. ft.)",
      metric: '3.05m × 3.30m',
      features: ['Low-reach 900mm master switch panel', 'Anti-glare warm cove perimeter lighting', 'Wide 1200mm doorway for walker clearance', 'R11 slip-resistant vitrified flooring'],
      cadCoords: 'North-East Suite Sector'
    },
    living: {
      title: 'Sunlit Living Salon',
      imperial: "9'-0\" × 9'-10\" (88.5 sq. ft.)",
      metric: '2.74m × 3.00m',
      features: ['Zero-threshold flush balcony sliding track', 'Continuous 1500mm wheelchair turning diameter', 'Ergonomic firm-cushioned armchairs', 'Panic SOS pull station at 400mm & 1200mm'],
      cadCoords: 'South-West Lounge Sector'
    },
    kitchen: {
      title: 'Modular Kitchen Facility',
      imperial: "5'-0\" × 9'-0\" (45 sq. ft.)",
      metric: '1.52m × 2.74m',
      features: ['800mm low-reach calacatta quartz countertop', '2-burner induction cooktop with auto cut-off', 'Under-counter pull-out drawers (no high stretch)', 'Single-lever high-neck swivel faucet'],
      cadCoords: 'North-West Kitchen Sector'
    },
    bathroom: {
      title: 'Senior-Safe Accessible Toilet',
      imperial: "4'-0\" × 7'-2\" (28.6 sq. ft.)",
      metric: '1.22m × 2.18m',
      features: ['Zero-threshold flush linear shower channel', '32mm stainless steel grab bars (150kg tested)', 'Wall-mounted fold-down shower seat', 'Emergency ceiling pull cord linked to nurse desk'],
      cadCoords: 'North-East Wet Core'
    }
  };

  const currentRoomSpec = is1RK ? ROOM_SPECS_1RK[activeRoom] : ROOM_SPECS_1BHK[activeRoom];

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
              Rendering {is1RK ? '1 RK Studio' : '1 BHK Residence'} 3D Model...
            </span>
          </div>
        )}

        {/* Top Left Header & Badge */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2329]/90 border border-white/15 text-[11px] font-mono text-[#E0AB77] uppercase tracking-widest backdrop-blur-md shadow-lg pointer-events-auto">
            <Home className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>{is1RK ? '1 RK STUDIO SUITE (240 SQFT)' : '1 BHK SENIOR RESIDENCE (400 SQFT)'}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold backdrop-blur-md shadow-lg pointer-events-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NBC 2016 Annex D Universal Access</span>
          </div>
        </div>

        {/* Top Right Room Navigation Toolbar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#0D2329]/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 shadow-xl pointer-events-auto">
          {is1RK ? (
            /* 1 RK Room Navigation: Studio Suite, Kitchenette, Bathroom */
            <>
              <button
                onClick={() => handleSelectRoom('bedroom')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeRoom === 'bedroom' || activeRoom === 'living' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                <Bed className="w-3.5 h-3.5" />
                <span>Studio Suite</span>
              </button>

              <button
                onClick={() => handleSelectRoom('kitchen')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeRoom === 'kitchen' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Kitchenette</span>
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
            </>
          ) : (
            /* 1 BHK Room Navigation: Living, Bedroom, Kitchen, Bathroom */
            <>
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
            </>
          )}

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
        <aside className="w-full lg:w-[440px] xl:w-[480px] shrink-0 h-full bg-[#0A1C22]/98 border-t lg:border-t-0 lg:border-l border-white/15 p-6 overflow-y-auto flex flex-col justify-between backdrop-blur-2xl z-30 shadow-2xl text-white space-y-6">
          <div className="space-y-5">
            {/* Sidebar Top Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#2C5E50]/40 border border-emerald-400/40 text-[#C58F58] flex items-center justify-center">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-heading font-bold text-base text-[#FAF8F5]">
                    {is1RK ? '1 RK Studio Suite Visualizer' : '1 BHK Residence Visualizer'}
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
                <span className="text-xs text-[#C58F58] font-mono font-bold">
                  {is1RK ? '1 RK Studio (~240 sq.ft.)' : '1 BHK Suite (~400 sq.ft.)'}
                </span>
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

            {/* Synchronized 2D Architectural CAD Layout */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60 font-mono">2D Architectural CAD Floor Map</span>
                <span className="text-[#C58F58] font-bold">Live Synchronized</span>
              </div>

              <Unit2DCadBlueprint
                unitType={unitType}
                activeRoom={activeRoom}
                onSelectRoom={(rm) => handleSelectRoom(rm)}
                interactive={true}
              />
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
                  unitType: is1RK ? '1 RK Senior Studio Suite' : '1 BHK Senior Suite',
                  message: `Hello, I am inspecting the 3D Interior & 2D CAD Floor Plan for ${currentRoomSpec.title} (${is1RK ? '1 RK Studio Suite' : '1 BHK Senior Suite'}) at Senior Living Citizen Foundation. Please share complete interior floor plans and specification sheet.`
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
                  unitType: is1RK ? '1 RK Senior Studio Suite' : '1 BHK Senior Suite',
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
