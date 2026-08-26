'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';
import { FloorLevel } from '@/types';
import { buildingUnits } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import {
  Layers,
  Rotate3d,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sparkles,
  Building2,
  Lock,
  Eye,
  ShieldCheck,
  Compass,
  ArrowRight,
  Sun,
  Car,
  Home,
  X,
  CheckCircle2,
  MessageSquare,
  Phone,
  Sliders
} from 'lucide-react';

interface Building3DViewerProps {
  initialFloor?: FloorLevel;
  onSelectUnit?: (unitId: string) => void;
  onToggle2DFallback?: () => void;
}

// ─── High-Fidelity Procedural Architectural Texture Generators ───────────────

function createLimestoneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Warm travertine limestone base
  ctx.fillStyle = '#E6DCB8';
  ctx.fillRect(0, 0, 512, 512);

  // Organic limestone porous grain & mineral micro-flecks
  for (let i = 0; i < 22000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const l = 210 + Math.random() * 42;
    const tone = Math.random() > 0.6 ? 24 : 14;
    ctx.fillStyle = `rgb(${l}, ${l - 8}, ${l - tone})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Subtle horizontal ashlar stone joint reveals (1.2m spacing)
  ctx.strokeStyle = 'rgba(165, 150, 128, 0.45)';
  ctx.lineWidth = 1.5;
  for (let y = 0; y < 512; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y + (Math.random() * 1.5 - 0.75));
    ctx.lineTo(512, y + (Math.random() * 1.5 - 0.75));
    ctx.stroke();
  }

  // Staggered vertical stone joints
  for (let y = 0; y < 512; y += 64) {
    const offset = (y / 64) % 2 === 0 ? 0 : 64;
    for (let x = offset; x < 512; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x + (Math.random() * 1.5 - 0.75), y);
      ctx.lineTo(x + (Math.random() * 1.5 - 0.75), y + 64);
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 4);
  return tex;
}

function createTerracottaLouverTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Warm terracotta brick / clay base
  ctx.fillStyle = '#A85A3C';
  ctx.fillRect(0, 0, 256, 256);

  // Vertical fluted louver slats with deep ambient occlusion shadow channels
  for (let x = 0; x < 256; x += 16) {
    // Slat face with subtle highlight
    const grad = ctx.createLinearGradient(x, 0, x + 16, 0);
    grad.addColorStop(0, '#BF6B4A');
    grad.addColorStop(0.7, '#A35436');
    grad.addColorStop(1, '#5E2814'); // shadow gap
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, 14, 256);

    // Deep shadow slot
    ctx.fillStyle = '#3A1408';
    ctx.fillRect(x + 14, 0, 2, 256);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 2);
  return tex;
}

function createTeakWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Warm golden-brown teak base
  ctx.fillStyle = '#8B5A2B';
  ctx.fillRect(0, 0, 512, 512);

  // Directional wood grain
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const len = 40 + Math.random() * 120;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(70, 40, 15, 0.25)' : 'rgba(160, 110, 60, 0.25)';
    ctx.fillRect(x, y, len, 1.2);
  }

  // Linear plank groove dividers
  ctx.strokeStyle = 'rgba(40, 20, 5, 0.5)';
  ctx.lineWidth = 1.5;
  for (let y = 0; y < 512; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

function createCobblestonePaverTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Charcoal granite paver base
  ctx.fillStyle = '#3E464A';
  ctx.fillRect(0, 0, 512, 512);

  // Granite aggregate flecks
  for (let i = 0; i < 18000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const v = 50 + Math.random() * 45;
    ctx.fillStyle = `rgb(${v}, ${v + 4}, ${v + 8})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Interlocking grid lines with mortar
  ctx.strokeStyle = 'rgba(25, 30, 32, 0.7)';
  ctx.lineWidth = 2;
  for (let y = 0; y < 512; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }
  for (let y = 0; y < 512; y += 32) {
    const offset = (y / 32) % 2 === 0 ? 0 : 32;
    for (let x = offset; x < 512; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 32);
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  return tex;
}

function createLushLawnTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Deep emerald meadow green
  ctx.fillStyle = '#22482E';
  ctx.fillRect(0, 0, 512, 512);

  // Multitone grass tufts & clover flecks
  for (let i = 0; i < 28000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const g = 60 + Math.random() * 70;
    ctx.fillStyle = `rgb(${g - 35}, ${g + 20}, ${g - 25})`;
    ctx.fillRect(x, y, 1.2, 2.5 + Math.random() * 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(12, 12);
  return tex;
}

function createSmoothConcreteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#6E767A';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const v = 100 + Math.random() * 30;
    ctx.fillStyle = `rgb(${v}, ${v + 2}, ${v + 4})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
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
    if (obj instanceof THREE.LineSegments) {
      obj.geometry?.dispose();
      if (obj.material instanceof THREE.Material) obj.material.dispose();
    }
  });
  scene.clear();
}

// ─── Main Component ──────────────────────────────────────────────────────────

export const Building3DViewer: React.FC<Building3DViewerProps> = ({
  initialFloor = 'ground',
  onSelectUnit,
  onToggle2DFallback
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openWhatsApp, openLeadDrawer } = useModal();

  const [activeFloor, setActiveFloor] = useState<FloorLevel>(initialFloor);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('unit-01');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [cameraPreset, setCameraPreset] = useState<'hero' | 'front' | 'entrance' | 'stilt' | 'exploded' | 'top'>('hero');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // CAD Overlay QA Mode
  const [isCadOverlay, setIsCadOverlay] = useState<boolean>(false);
  const [cadOpacity, setCadOpacity] = useState<number>(0.75);
  const [modelOpacity, setModelOpacity] = useState<number>(0.85);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const floorGroupsRef = useRef<{ [key in FloorLevel]?: THREE.Group }>({});
  const floorHighlightRimsRef = useRef<{ [key in FloorLevel]?: THREE.Mesh }>({});
  const cadOverlayMeshRef = useRef<THREE.Mesh | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Active state refs for animation loop
  const activeFloorRef = useRef<FloorLevel>(initialFloor);
  const isExplodedRef = useRef<boolean>(false);
  const onSelectUnitRef = useRef(onSelectUnit);

  useEffect(() => {
    activeFloorRef.current = activeFloor;
  }, [activeFloor]);

  useEffect(() => {
    isExplodedRef.current = isExploded;
  }, [isExploded]);

  useEffect(() => {
    onSelectUnitRef.current = onSelectUnit;
  }, [onSelectUnit]);

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
    radius: 34,
    theta: Math.PI / 4.2,
    phi: Math.PI / 3.4,
    target: new THREE.Vector3(0, 5.0, 0),
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRadius: 34,
    targetTheta: Math.PI / 4.2,
    targetPhi: Math.PI / 3.4,
    targetLookAt: new THREE.Vector3(0, 5.0, 0)
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
    // Elegant warm architectural twilight-sky backdrop
    scene.background = new THREE.Color(0x0a1c22);
    scene.fog = new THREE.FogExp2(0x0a1c22, 0.007);

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

    // 1. Sky / Ground Hemisphere Light (Soft natural fill)
    const hemiLight = new THREE.HemisphereLight(0xdce8f0, 0x303e34, 0.85);
    scene.add(hemiLight);

    // 2. Ambient Warm Fill
    const ambientLight = new THREE.AmbientLight(0xf8f4ec, 0.55);
    scene.add(ambientLight);

    // 3. Primary Solar Directional Light (Warm Golden Hour Angle)
    const sunLight = new THREE.DirectionalLight(0xfffaee, 2.3);
    sunLight.position.set(28, 48, 32);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = isMobile ? 1024 : 2048;
    sunLight.shadow.mapSize.height = isMobile ? 1024 : 2048;
    sunLight.shadow.camera.left = -22;
    sunLight.shadow.camera.right = 22;
    sunLight.shadow.camera.top = 22;
    sunLight.shadow.camera.bottom = -22;
    sunLight.shadow.camera.near = 5;
    sunLight.shadow.camera.far = 120;
    sunLight.shadow.bias = -0.00025;
    sunLight.shadow.radius = 2.0;
    scene.add(sunLight);

    // 4. Secondary Cool Sky Rim Light
    const skyRimLight = new THREE.DirectionalLight(0x8cb8a8, 0.65);
    skyRimLight.position.set(-28, 24, -28);
    scene.add(skyRimLight);

    // 5. Warm Ground Bounce Light
    const groundBounce = new THREE.DirectionalLight(0xe8d0b0, 0.35);
    groundBounce.position.set(0, -10, 20);
    scene.add(groundBounce);

    // ─── PBR Material Library ───────────────────────────────────────────────

    const limestoneTex = createLimestoneTexture();
    const terracottaTex = createTerracottaLouverTexture();
    const teakTex = createTeakWoodTexture();
    const paverTex = createCobblestonePaverTexture();
    const lawnTex = createLushLawnTexture();
    const concreteTex = createSmoothConcreteTexture();

    // 1. Facade Limestone Wall Material
    const limestoneMat = new THREE.MeshStandardMaterial({
      map: limestoneTex,
      color: 0xf0e6d2,
      roughness: 0.72,
      metalness: 0.04
    });

    // 2. Terracotta Screen Louvers
    const terracottaMat = new THREE.MeshStandardMaterial({
      map: terracottaTex,
      color: 0xb86242,
      roughness: 0.65,
      metalness: 0.08
    });

    // 3. Teakwood Ceiling Soffits & Trims
    const teakWoodMat = new THREE.MeshStandardMaterial({
      map: teakTex,
      color: 0x9c6838,
      roughness: 0.55,
      metalness: 0.06
    });

    // 4. Champagne Bronze Anodized Aluminum (Mullions, Railings, Fascias)
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0x48382c,
      roughness: 0.28,
      metalness: 0.85
    });

    // 5. High-Clarity Double Glazing Glass
    const windowGlassMat = new THREE.MeshStandardMaterial({
      color: 0x98c4d4,
      roughness: 0.08,
      metalness: 0.18,
      transparent: true,
      opacity: 0.45
    });

    // 6. Balcony Tinted Tempered Glass
    const balustradeGlassMat = new THREE.MeshStandardMaterial({
      color: 0x80b4c8,
      roughness: 0.06,
      metalness: 0.25,
      transparent: true,
      opacity: 0.52
    });

    // 7. Reinforced Concrete Columns & Coffer Beams
    const concreteMat = new THREE.MeshStandardMaterial({
      map: concreteTex,
      color: 0x6e767c,
      roughness: 0.78,
      metalness: 0.05
    });

    // 8. Ground Driveway Cobblestone Pavers
    const paverMat = new THREE.MeshStandardMaterial({
      map: paverTex,
      color: 0x454c50,
      roughness: 0.85,
      metalness: 0.08
    });

    // 9. Manicured Lawn Grass
    const grassMat = new THREE.MeshStandardMaterial({
      map: lawnTex,
      color: 0x244c32,
      roughness: 0.92,
      metalness: 0.02
    });

    // 10. Floor Slab Highlight Glow Material (Subtle Architectural Accent)
    const highlightRimMat = new THREE.MeshStandardMaterial({
      color: 0xc58f58,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0xc58f58,
      emissiveIntensity: 0.4
    });

    // ─── Environment Ground Plane ───────────────────────────────────────────

    // Large Manicured Site Ground (110m × 110m)
    const siteGround = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), grassMat);
    siteGround.rotation.x = -Math.PI / 2;
    siteGround.position.y = -0.05;
    siteGround.receiveShadow = true;
    scene.add(siteGround);

    // Stilt Entrance Driveway Apron (28m × 22m)
    const driveway = new THREE.Mesh(new THREE.PlaneGeometry(28, 22), paverMat);
    driveway.rotation.x = -Math.PI / 2;
    driveway.position.set(0, 0.01, 1.5);
    driveway.receiveShadow = true;
    scene.add(driveway);

    // Front Paved Pedestrian Walkway with Wheelchair Ramp
    const walkway = new THREE.Mesh(new THREE.BoxGeometry(26, 0.08, 3.5), paverMat);
    walkway.position.set(0, 0.04, 13.5);
    walkway.receiveShadow = true;
    scene.add(walkway);

    // Curb Stone Borders
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x90989c, roughness: 0.6 });
    [-14, 14].forEach((cx) => {
      const curb = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 22), curbMat);
      curb.position.set(cx, 0.09, 1.5);
      curb.castShadow = true;
      curb.receiveShadow = true;
      scene.add(curb);
    });

    // Landscaped Planters with Low Flowering Shrubs along front
    const planterMat = new THREE.MeshStandardMaterial({ color: 0x3d2818, roughness: 0.8 });
    const shrubLeafMat = new THREE.MeshStandardMaterial({ color: 0x2a5438, roughness: 0.7 });
    [-10, 10].forEach((px) => {
      const box = new THREE.Mesh(new THREE.BoxGeometry(6, 0.45, 1.2), planterMat);
      box.position.set(px, 0.22, 12.0);
      box.castShadow = true;
      scene.add(box);

      // Shrub clusters
      for (let s = -2.2; s <= 2.2; s += 0.9) {
        const shrub = new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 8), shrubLeafMat);
        shrub.position.set(px + s, 0.65, 12.0);
        shrub.castShadow = true;
        scene.add(shrub);
      }
    });

    // Illuminated Garden Bollards
    const bollardGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.85, 8);
    [-12, -6, 6, 12].forEach((bx) => {
      const bollard = new THREE.Mesh(bollardGeo, bronzeMat);
      bollard.position.set(bx, 0.42, 14.5);
      bollard.castShadow = true;
      scene.add(bollard);

      const lightHead = new THREE.Mesh(
        new THREE.CylinderGeometry(0.082, 0.082, 0.12, 8),
        new THREE.MeshStandardMaterial({ color: 0xffeedd, emissive: 0xffeedd, emissiveIntensity: 0.8 })
      );
      lightHead.position.set(bx, 0.85, 14.5);
      scene.add(lightHead);
    });

    // ─── 4-Tier Building Geometry (Stilt + G + 1 + 2 + Roof) ─────────────────
    // CAD Dimensions: Width = 46'-0" (14.02m), Depth = 50'-6" (15.39m), Projection = 3'-6" (1.07m), Floor Height = 3.2m
    const CAD_WIDTH = 14.02;
    const CAD_DEPTH = 15.39;
    const CAD_PROJECTION = 1.07;
    const SLAB_THICKNESS = 0.32;
    const FLOOR_HEIGHT = 3.2;

    const floorGroups: { [key in FloorLevel]?: THREE.Group } = {};
    const floorRims: { [key in FloorLevel]?: THREE.Mesh } = {};

    // ─── CAD Vector Blueprint Overlay Plane ─────────────────────────────────
    const cadOverlayTexLoader = new THREE.TextureLoader();
    const cadOverlayGeo = new THREE.PlaneGeometry(CAD_WIDTH, CAD_DEPTH);
    const cadOverlayMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const cadOverlayMesh = new THREE.Mesh(cadOverlayGeo, cadOverlayMat);
    cadOverlayMesh.rotation.x = -Math.PI / 2;
    cadOverlayMesh.position.set(0, 0.035, 0);
    cadOverlayMesh.visible = false;
    scene.add(cadOverlayMesh);
    cadOverlayMeshRef.current = cadOverlayMesh;

    cadOverlayTexLoader.load('/project-assets/architecture/cad/previews/stilt-floor-cad.jpg', (tex) => {
      tex.anisotropy = 8;
      cadOverlayMat.map = tex;
      cadOverlayMat.needsUpdate = true;
    });

    // ─── 1. STILT PARKING LEVEL (Height: 0.0 to 3.2m) ───────────────────────
    const stiltGroup = new THREE.Group();
    stiltGroup.name = 'floor-stilt';

    // Stilt Finished Ceiling Slab
    const stiltCeiling = new THREE.Mesh(
      new THREE.BoxGeometry(CAD_WIDTH + 0.4, SLAB_THICKNESS, CAD_DEPTH + 0.4),
      limestoneMat
    );
    stiltCeiling.position.set(0, FLOOR_HEIGHT - SLAB_THICKNESS / 2, 0);
    stiltCeiling.castShadow = true;
    stiltCeiling.receiveShadow = true;
    stiltGroup.add(stiltCeiling);

    // 16 Reinforced Concrete Structural Columns (4 rows × 4 columns matching CAD grid)
    const colGeo = new THREE.BoxGeometry(0.45, FLOOR_HEIGHT - SLAB_THICKNESS, 0.45);
    const colGuardMat = new THREE.MeshStandardMaterial({ color: 0xf5b82e, roughness: 0.4 }); // yellow hazard bumper
    const colXPositions = [-5.9, -1.95, 1.95, 5.9];
    const colZPositions = [-6.5, -2.15, 2.15, 6.5];

    colXPositions.forEach((cx) => {
      colZPositions.forEach((cz) => {
        const colMesh = new THREE.Mesh(colGeo, concreteMat);
        colMesh.position.set(cx, (FLOOR_HEIGHT - SLAB_THICKNESS) / 2, cz);
        colMesh.castShadow = true;
        colMesh.receiveShadow = true;
        stiltGroup.add(colMesh);

        // Steel yellow protective bumper collar at column base
        const collar = new THREE.Mesh(new THREE.BoxGeometry(0.49, 0.45, 0.49), colGuardMat);
        collar.position.set(cx, 0.22, cz);
        stiltGroup.add(collar);
      });
    });

    // 14 Stilt Parking Bays (6 North Row, 2 Center Row, 6 South Row as in CAD)
    const bayLineMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const bayPlaqueMat = new THREE.MeshStandardMaterial({ color: 0xc58f58, metalness: 0.6, roughness: 0.3 });

    // North Row: 6 Bays (Bays 01-06)
    const northBayXs = [-5.0, -3.0, -1.0, 1.0, 3.0, 5.0];
    northBayXs.forEach((bx, idx) => {
      const bayStrip = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 4.4), bayLineMat);
      bayStrip.rotation.x = -Math.PI / 2;
      bayStrip.position.set(bx, 0.02, -4.5);
      stiltGroup.add(bayStrip);

      const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.02, 0.3), bayPlaqueMat);
      plaque.position.set(bx, 0.03, -6.6);
      stiltGroup.add(plaque);
    });

    // Center Row: 2 Bays between columns (Bays 07-08)
    const centerBayXs = [-1.0, 1.0];
    centerBayXs.forEach((bx) => {
      const bayStrip = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 4.2), bayLineMat);
      bayStrip.rotation.x = -Math.PI / 2;
      bayStrip.position.set(bx, 0.02, 0.0);
      stiltGroup.add(bayStrip);
    });

    // South Row: 6 Bays (Bays 09-14)
    northBayXs.forEach((bx) => {
      const bayStrip = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 4.4), bayLineMat);
      bayStrip.rotation.x = -Math.PI / 2;
      bayStrip.position.set(bx, 0.02, 4.5);
      stiltGroup.add(bayStrip);
    });

    // 3 Entry Gates on South Facade (West Gate, Center Gate, East Gate)
    [-4.5, 0.0, 4.5].forEach((gx) => {
      const gatePillarL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.6, 0.35), concreteMat);
      gatePillarL.position.set(gx - 1.2, 1.3, 7.2);
      stiltGroup.add(gatePillarL);

      const gatePillarR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.6, 0.35), concreteMat);
      gatePillarR.position.set(gx + 1.2, 1.3, 7.2);
      stiltGroup.add(gatePillarR);

      const gateLintel = new THREE.Mesh(new THREE.BoxGeometry(2.75, 0.25, 0.35), bronzeMat);
      gateLintel.position.set(gx, 2.6, 7.2);
      stiltGroup.add(gateLintel);
    });

    // Central Circulation Core on Stilt: Left Stairwell + Right Elevator Shaft
    const coreMat = new THREE.MeshStandardMaterial({
      map: concreteTex,
      color: 0x3d484c,
      roughness: 0.65
    });

    // Left Stairwell Enclosure (4'-0" / 1.22m stairwell)
    const stiltStairCore = new THREE.Mesh(new THREE.BoxGeometry(2.8, 3.0, 3.8), coreMat);
    stiltStairCore.position.set(-3.8, 1.5, 0);
    stiltStairCore.castShadow = true;
    stiltGroup.add(stiltStairCore);

    // Right Elevator Shaft (5'-6" × 8'-0" / 1.68m × 2.44m)
    const stiltLiftCore = new THREE.Mesh(new THREE.BoxGeometry(2.8, 3.0, 3.8), coreMat);
    stiltLiftCore.position.set(3.8, 1.5, 0);
    stiltLiftCore.castShadow = true;
    stiltGroup.add(stiltLiftCore);

    // Central Glazed Stilt Entry Lobby
    const stiltLobbyGlass = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, 0.08), windowGlassMat);
    stiltLobbyGlass.position.set(0, 1.3, 0.22);
    stiltGroup.add(stiltLobbyGlass);

    // Recessed Ceiling Downlights in Stilt
    const downlightMat = new THREE.MeshStandardMaterial({
      color: 0xffeedd,
      emissive: 0xffd8aa,
      emissiveIntensity: 0.9
    });
    [-4.5, 0, 4.5].forEach((dx) => {
      [-4, 4].forEach((dz) => {
        const dl = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 12), downlightMat);
        dl.position.set(dx, 2.95, dz);
        stiltGroup.add(dl);
      });
    });

    // Parked Senior Electric Golf Cart in Stilt Bay
    const carMat = new THREE.MeshStandardMaterial({ color: 0x2c5e50, roughness: 0.3, metalness: 0.6 });
    const carBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 3.2), carMat);
    carBody.position.set(-3.0, 0.6, -4.5);
    carBody.castShadow = true;
    stiltGroup.add(carBody);

    const carGlass = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 1.6), windowGlassMat);
    carGlass.position.set(-3.0, 1.15, -4.7);
    stiltGroup.add(carGlass);

    scene.add(stiltGroup);
    floorGroups['stilt'] = stiltGroup;

    // Helper to build a complete CAD-faithful detailed residential floor
    function buildResidentialFloor(
      floorId: FloorLevel,
      baseY: number,
      floorLabel: string,
      units: { u1: string; u2: string; u3: string }
    ): THREE.Group {
      const group = new THREE.Group();
      group.name = `floor-${floorId}`;

      // 1. Floor Concrete Structural Slab with Wood Soffit Underside
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(CAD_WIDTH + 0.4, SLAB_THICKNESS, CAD_DEPTH + 0.4),
        limestoneMat
      );
      slab.position.set(0, baseY, 0);
      slab.castShadow = true;
      slab.receiveShadow = true;
      group.add(slab);

      // Wood soffit cladding underside
      const soffit = new THREE.Mesh(
        new THREE.PlaneGeometry(CAD_WIDTH + 0.2, CAD_DEPTH + 0.2),
        teakWoodMat
      );
      soffit.rotation.x = Math.PI / 2;
      soffit.position.set(0, baseY - SLAB_THICKNESS / 2 - 0.01, 0);
      group.add(soffit);

      // Highlight perimeter accent band for active state
      const rim = new THREE.Mesh(
        new THREE.BoxGeometry(CAD_WIDTH + 0.6, 0.08, CAD_DEPTH + 0.6),
        highlightRimMat.clone()
      );
      rim.position.set(0, baseY, 0);
      rim.visible = floorId === 'ground';
      group.add(rim);
      floorRims[floorId] = rim;

      // 2. Unit 01 (West / Left Wing — 1 BHK Type A, 400 sq.ft. Super / 276 sq.ft. Carpet)
      const u1Wall = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.7, CAD_DEPTH), limestoneMat);
      u1Wall.position.set(-4.6, baseY + 1.45, 0);
      u1Wall.castShadow = true;
      u1Wall.receiveShadow = true;
      group.add(u1Wall);

      // Unit 01 Front Corner Window Box with Bronze Framing
      const u1Window = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.8, 0.12), windowGlassMat);
      u1Window.position.set(-4.6, baseY + 1.55, CAD_DEPTH / 2 + 0.05);
      group.add(u1Window);

      const u1Frame = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.0, 0.25), bronzeMat);
      u1Frame.position.set(-4.6, baseY + 1.55, CAD_DEPTH / 2 + 0.02);
      u1Frame.castShadow = true;
      group.add(u1Frame);

      // Unit 01 Front Cantilevered Balcony (3'-6" / 1.07m Projection)
      const u1BalcSlab = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.22, CAD_PROJECTION), limestoneMat);
      u1BalcSlab.position.set(-4.6, baseY + 0.11, CAD_DEPTH / 2 + CAD_PROJECTION / 2);
      u1BalcSlab.castShadow = true;
      group.add(u1BalcSlab);

      const u1GlassRail = new THREE.Mesh(new THREE.BoxGeometry(4.1, 1.0, 0.06), balustradeGlassMat);
      u1GlassRail.position.set(-4.6, baseY + 0.65, CAD_DEPTH / 2 + CAD_PROJECTION);
      group.add(u1GlassRail);

      const u1TopRail = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.06, 0.08), bronzeMat);
      u1TopRail.position.set(-4.6, baseY + 1.15, CAD_DEPTH / 2 + CAD_PROJECTION);
      group.add(u1TopRail);

      // Vertical terracotta sun louver screen on west elevation
      const u1Louvers = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.4, 3.8), terracottaMat);
      u1Louvers.position.set(-CAD_WIDTH / 2 - 0.2, baseY + 1.45, 2.5);
      u1Louvers.castShadow = true;
      group.add(u1Louvers);

      // 3. Central Core & Unit 02 (Center Residence — 1 RK Type C Studio, 240 sq.ft. Super / 195 sq.ft. Carpet)
      const u2Wall = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.7, CAD_DEPTH), limestoneMat);
      u2Wall.position.set(0, baseY + 1.45, 0);
      u2Wall.castShadow = true;
      u2Wall.receiveShadow = true;
      group.add(u2Wall);

      // Unit 02 Central Balcony & Sliding Glass Doors
      const u2Window = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.1, 0.12), windowGlassMat);
      u2Window.position.set(0, baseY + 1.45, CAD_DEPTH / 2 + 0.05);
      group.add(u2Window);

      const u2BalcSlab = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.22, CAD_PROJECTION), limestoneMat);
      u2BalcSlab.position.set(0, baseY + 0.11, CAD_DEPTH / 2 + CAD_PROJECTION / 2);
      u2BalcSlab.castShadow = true;
      group.add(u2BalcSlab);

      const u2GlassRail = new THREE.Mesh(new THREE.BoxGeometry(3.9, 1.0, 0.06), balustradeGlassMat);
      u2GlassRail.position.set(0, baseY + 0.65, CAD_DEPTH / 2 + CAD_PROJECTION);
      group.add(u2GlassRail);

      const u2TopRail = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.06, 0.08), bronzeMat);
      u2TopRail.position.set(0, baseY + 1.15, CAD_DEPTH / 2 + CAD_PROJECTION);
      group.add(u2TopRail);

      // Central Common Lobby (9'-8" × 25'-1" / 2.95m × 7.65m) & Core
      const coreTower = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.7, 3.8), coreMat);
      coreTower.position.set(0, baseY + 1.45, -2.0);
      coreTower.castShadow = true;
      group.add(coreTower);

      // 4. Unit 03 (East / Right Wing — 1 BHK Type B Suite, 400 sq.ft. Super / 276 sq.ft. Carpet)
      const u3Wall = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.7, CAD_DEPTH), limestoneMat);
      u3Wall.position.set(4.6, baseY + 1.45, 0);
      u3Wall.castShadow = true;
      u3Wall.receiveShadow = true;
      group.add(u3Wall);

      const u3Window = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.8, 0.12), windowGlassMat);
      u3Window.position.set(4.6, baseY + 1.55, CAD_DEPTH / 2 + 0.05);
      group.add(u3Window);

      const u3Frame = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.0, 0.25), bronzeMat);
      u3Frame.position.set(4.6, baseY + 1.55, CAD_DEPTH / 2 + 0.02);
      u3Frame.castShadow = true;
      group.add(u3Frame);

      const u3BalcSlab = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.22, CAD_PROJECTION), limestoneMat);
      u3BalcSlab.position.set(4.6, baseY + 0.11, CAD_DEPTH / 2 + CAD_PROJECTION / 2);
      u3BalcSlab.castShadow = true;
      group.add(u3BalcSlab);

      const u3GlassRail = new THREE.Mesh(new THREE.BoxGeometry(4.1, 1.0, 0.06), balustradeGlassMat);
      u3GlassRail.position.set(4.6, baseY + 0.65, CAD_DEPTH / 2 + CAD_PROJECTION);
      group.add(u3GlassRail);

      const u3TopRail = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.06, 0.08), bronzeMat);
      u3TopRail.position.set(4.6, baseY + 1.15, CAD_DEPTH / 2 + CAD_PROJECTION);
      group.add(u3TopRail);

      const u3Louvers = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.4, 3.8), terracottaMat);
      u3Louvers.position.set(CAD_WIDTH / 2 + 0.2, baseY + 1.45, 2.5);
      u3Louvers.castShadow = true;
      group.add(u3Louvers);

      // Rear Bedroom Windows & Ventilation Shaft on North Facade (Z = -CAD_DEPTH / 2)
      [-4.6, 0, 4.6].forEach((rx) => {
        const rearWin = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.5, 0.12), windowGlassMat);
        rearWin.position.set(rx, baseY + 1.55, -CAD_DEPTH / 2 - 0.05);
        group.add(rearWin);

        const rearLouver = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.35, 0.22), terracottaMat);
        rearLouver.position.set(rx, baseY + 2.4, -CAD_DEPTH / 2 - 0.08);
        group.add(rearLouver);
      });

      return group;
    }

    // ─── 2. GROUND FLOOR (Units 01, 02, 03 — Phase 1 Priority) ───────────────
    const groundGroup = buildResidentialFloor('ground', 3.2, 'Ground Floor', {
      u1: 'Unit 01',
      u2: 'Unit 02',
      u3: 'Unit 03'
    });
    scene.add(groundGroup);
    floorGroups['ground'] = groundGroup;

    // ─── 3. FIRST FLOOR (Units 04, 05, 06 — Phase 2 Waitlist) ────────────────
    const firstGroup = buildResidentialFloor('first', 6.4, 'First Floor', {
      u1: 'Unit 04',
      u2: 'Unit 05',
      u3: 'Unit 06'
    });
    scene.add(firstGroup);
    floorGroups['first'] = firstGroup;

    // ─── 4. SECOND FLOOR (Units 07, 08, 09 — Phase 3 Waitlist) ───────────────
    const secondGroup = buildResidentialFloor('second', 9.6, 'Second Floor', {
      u1: 'Unit 07',
      u2: 'Unit 08',
      u3: 'Unit 09'
    });
    scene.add(secondGroup);
    floorGroups['second'] = secondGroup;

    // ─── 5. ROOF & TERRACE PARAPET (Y = 12.8m) ──────────────────────────────
    const roofGroup = new THREE.Group();
    roofGroup.name = 'floor-roof';

    // Roof Slab
    const roofSlab = new THREE.Mesh(
      new THREE.BoxGeometry(CAD_WIDTH + 0.4, SLAB_THICKNESS, CAD_DEPTH + 0.4),
      limestoneMat
    );
    roofSlab.position.set(0, 12.8, 0);
    roofSlab.castShadow = true;
    roofSlab.receiveShadow = true;
    roofGroup.add(roofSlab);

    // 1.1m Safety Parapet Wall around terrace perimeter
    const parapetFront = new THREE.Mesh(new THREE.BoxGeometry(CAD_WIDTH + 0.4, 1.1, 0.28), limestoneMat);
    parapetFront.position.set(0, 13.4, CAD_DEPTH / 2 + 0.05);
    parapetFront.castShadow = true;
    roofGroup.add(parapetFront);

    const parapetRear = new THREE.Mesh(new THREE.BoxGeometry(CAD_WIDTH + 0.4, 1.1, 0.28), limestoneMat);
    parapetRear.position.set(0, 13.4, -CAD_DEPTH / 2 - 0.05);
    parapetRear.castShadow = true;
    roofGroup.add(parapetRear);

    const parapetLeft = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.1, CAD_DEPTH + 0.4), limestoneMat);
    parapetLeft.position.set(-CAD_WIDTH / 2 - 0.05, 13.4, 0);
    parapetLeft.castShadow = true;
    roofGroup.add(parapetLeft);

    const parapetRight = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.1, CAD_DEPTH + 0.4), limestoneMat);
    parapetRight.position.set(CAD_WIDTH / 2 + 0.05, 13.4, 0);
    parapetRight.castShadow = true;
    roofGroup.add(parapetRight);

    // Elevator Machine Room Core Overrun Tower
    const liftTower = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.6, 3.8), coreMat);
    liftTower.position.set(0, 14.1, -2.0);
    liftTower.castShadow = true;
    roofGroup.add(liftTower);

    // Solar Pergola Canopy on Terrace for Common Senior Yoga & Morning Walks
    const pergolaMat = new THREE.MeshStandardMaterial({ color: 0x362c24, metalness: 0.85, roughness: 0.3 });
    const pergolaBeam = new THREE.Mesh(new THREE.BoxGeometry(8.0, 0.18, 4.2), pergolaMat);
    pergolaBeam.position.set(-2.5, 15.2, 1.5);
    pergolaBeam.castShadow = true;
    roofGroup.add(pergolaBeam);

    [-6.0, 1.0].forEach((px) => {
      const pCol = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.4, 8), bronzeMat);
      pCol.position.set(px, 14.0, 1.5);
      pCol.castShadow = true;
      roofGroup.add(pCol);
    });

    scene.add(roofGroup);

    floorGroupsRef.current = floorGroups;
    floorHighlightRimsRef.current = floorRims;

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
        16,
        Math.min(58, orbitRef.current.targetRadius + e.deltaY * 0.03)
      );
    };

    // Touch support for Mobile
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
        orbitRef.current.targetPhi = Math.max(
          0.18,
          Math.min(Math.PI / 2 - 0.04, orbitRef.current.targetPhi - dy * 0.007)
        );
      } else if (e.touches.length === 2) {
        const newDist = Math.hypot(
          e.touches[1].clientX - e.touches[0].clientX,
          e.touches[1].clientY - e.touches[0].clientY
        );
        const delta = touchStartDist - newDist;
        orbitRef.current.targetRadius = Math.max(16, Math.min(58, orbitRef.current.targetRadius + delta * 0.04));
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

    // ─── Animation Loop (Transforms via Ref with Zero Scene Recreation) ──────

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      // Subtle slow architectural orbit rotation when idle
      if (!orbitRef.current.isDragging) {
        orbitRef.current.targetTheta += 0.0006;
      }

      // Smooth Exploded Floor Animation (Y-offsets)
      const exploded = isExplodedRef.current;
      const currentActive = activeFloorRef.current;

      const stiltY = 0;
      const groundY = exploded ? 2.5 : 0;
      const firstY = exploded ? 5.8 : 0;
      const secondY = exploded ? 9.2 : 0;
      const roofY = exploded ? 12.6 : 0;

      if (floorGroups['stilt']) {
        floorGroups['stilt'].position.y += (stiltY - floorGroups['stilt'].position.y) * 0.08;
      }
      if (floorGroups['ground']) {
        floorGroups['ground'].position.y += (groundY - floorGroups['ground'].position.y) * 0.08;
      }
      if (floorGroups['first']) {
        floorGroups['first'].position.y += (firstY - floorGroups['first'].position.y) * 0.08;
      }
      if (floorGroups['second']) {
        floorGroups['second'].position.y += (secondY - floorGroups['second'].position.y) * 0.08;
      }
      if (roofGroup) {
        roofGroup.position.y += (roofY - roofGroup.position.y) * 0.08;
      }

      // Update active floor rim visibility
      Object.keys(floorRims).forEach((fKey) => {
        const rimMesh = floorRims[fKey as FloorLevel];
        if (rimMesh) {
          rimMesh.visible = fKey === currentActive;
        }
      });

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

  // CAD Overlay Visibility & Opacity Effect
  useEffect(() => {
    const cadMesh = cadOverlayMeshRef.current;
    if (!cadMesh) return;
    cadMesh.visible = isCadOverlay;
    if (cadMesh.material && 'opacity' in cadMesh.material) {
      const mat = cadMesh.material as THREE.MeshBasicMaterial;
      mat.opacity = cadOpacity;
      mat.needsUpdate = true;

      const url =
        activeFloor === 'stilt'
          ? '/project-assets/architecture/cad/previews/stilt-floor-cad.jpg'
          : '/project-assets/architecture/cad/previews/typical-floor-cad.jpg';

      const loader = new THREE.TextureLoader();
      loader.load(url, (tex) => {
        tex.anisotropy = 8;
        mat.map = tex;
        mat.needsUpdate = true;
      });
    }
  }, [isCadOverlay, cadOpacity, activeFloor]);

  // ─── Camera Preset Switchers ──────────────────────────────────────────────

  const handleApplyPreset = (preset: 'hero' | 'front' | 'entrance' | 'stilt' | 'exploded' | 'top') => {
    setCameraPreset(preset);
    if (preset === 'hero') {
      setIsExploded(false);
      orbitRef.current.targetTheta = Math.PI / 4.2;
      orbitRef.current.targetPhi = Math.PI / 3.4;
      orbitRef.current.targetRadius = 34;
      orbitRef.current.targetLookAt.set(0, 5.0, 0);
    } else if (preset === 'front') {
      setIsExploded(false);
      orbitRef.current.targetTheta = 0;
      orbitRef.current.targetPhi = Math.PI / 2.05; // almost eye-level front
      orbitRef.current.targetRadius = 32;
      orbitRef.current.targetLookAt.set(0, 6.0, 0);
    } else if (preset === 'entrance') {
      setIsExploded(false);
      orbitRef.current.targetTheta = Math.PI / 5.5;
      orbitRef.current.targetPhi = Math.PI / 2.08; // eye level ground entrance
      orbitRef.current.targetRadius = 24;
      orbitRef.current.targetLookAt.set(0, 2.0, 0);
    } else if (preset === 'stilt') {
      setIsExploded(false);
      setActiveFloor('stilt');
      orbitRef.current.targetTheta = -Math.PI / 4;
      orbitRef.current.targetPhi = Math.PI / 2.15;
      orbitRef.current.targetRadius = 22;
      orbitRef.current.targetLookAt.set(-3.0, 1.2, 0);
    } else if (preset === 'exploded') {
      setIsExploded(true);
      orbitRef.current.targetTheta = Math.PI / 3.8;
      orbitRef.current.targetPhi = Math.PI / 3.6;
      orbitRef.current.targetRadius = 46;
      orbitRef.current.targetLookAt.set(0, 8.0, 0);
    } else if (preset === 'top') {
      setIsExploded(false);
      orbitRef.current.targetTheta = 0;
      orbitRef.current.targetPhi = 0.12; // top-down roof plan
      orbitRef.current.targetRadius = 40;
      orbitRef.current.targetLookAt.set(0, 0, 0);
    }
  };

  const handleSelectFloor = (floor: FloorLevel) => {
    setActiveFloor(floor);
    if (floor === 'stilt') {
      orbitRef.current.targetLookAt.set(0, 1.5, 0);
      orbitRef.current.targetRadius = 24;
      orbitRef.current.targetPhi = Math.PI / 2.15;
    } else if (floor === 'ground') {
      orbitRef.current.targetLookAt.set(0, 4.5, 0);
      orbitRef.current.targetRadius = 28;
      orbitRef.current.targetPhi = Math.PI / 2.3;
    } else if (floor === 'first') {
      orbitRef.current.targetLookAt.set(0, 7.8, 0);
      orbitRef.current.targetRadius = 29;
      orbitRef.current.targetPhi = Math.PI / 2.35;
    } else if (floor === 'second') {
      orbitRef.current.targetLookAt.set(0, 11.0, 0);
      orbitRef.current.targetRadius = 30;
      orbitRef.current.targetPhi = Math.PI / 2.4;
    }
  };

  const handleSelectUnit = (unitId: string) => {
    setSelectedUnitId(unitId);
    if (onSelectUnitRef.current) {
      onSelectUnitRef.current(unitId);
    }
  };

  const selectedUnit = buildingUnits.find((u) => u.id === selectedUnitId) || buildingUnits[0];

  // Determine CAD Floor Plan image based on active floor
  const cadFloorPlanImage =
    activeFloor === 'stilt'
      ? '/project-assets/architecture/cad/previews/stilt-floor-cad.jpg'
      : activeFloor === 'ground'
      ? '/project-assets/architecture/cad/previews/ground-floor-preview.jpg'
      : '/project-assets/architecture/cad/previews/typical-floor-cad.jpg';

  const floorUnits = buildingUnits.filter((u) => u.floorLevel === activeFloor);

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
              Rendering Architectural CGI Model...
            </span>
          </div>
        )}

        {/* Top Left Status & Proposed Badge */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2329]/90 border border-white/15 text-[11px] font-mono text-[#E0AB77] uppercase tracking-widest backdrop-blur-md shadow-lg pointer-events-auto">
            <Building2 className="w-3.5 h-3.5 text-[#C58F58]" />
            <span>PROPOSED G+2 RESIDENCE CGI</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold backdrop-blur-md shadow-lg pointer-events-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CAD Proportions · 46'-0" × 50'-6" (Plots 63 & 64)</span>
          </div>
        </div>

        {/* Top Right Architectural Camera View Presets */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#0D2329]/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/15 shadow-xl pointer-events-auto">
          <button
            onClick={() => handleApplyPreset('hero')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              cameraPreset === 'hero' && !isExploded
                ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md'
                : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
            title="3/4 Architectural Perspective View"
          >
            Hero 3/4
          </button>

          <button
            onClick={() => handleApplyPreset('front')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              cameraPreset === 'front' && !isExploded
                ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md'
                : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
            title="Front Elevation"
          >
            Elevation
          </button>

          <button
            onClick={() => handleApplyPreset('entrance')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              cameraPreset === 'entrance'
                ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md'
                : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
            title="Ground Entrance Eye-Level View"
          >
            Entrance
          </button>

          <button
            onClick={() => handleApplyPreset('exploded')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isExploded
                ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md'
                : 'text-[#E0AB77] hover:bg-white/10'
            }`}
            title="Exploded Vertical Tiers"
          >
            <Layers className="w-3.5 h-3.5 inline mr-1" />
            Exploded
          </button>

          <button
            onClick={() => handleApplyPreset('top')}
            className={`hidden sm:block px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              cameraPreset === 'top'
                ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md'
                : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
            title="Top-Down Plan View"
          >
            Top Plan
          </button>

          <div className="h-4 w-px bg-white/20 mx-1" />

          {onToggle2DFallback && (
            <button
              onClick={onToggle2DFallback}
              className="px-2.5 py-1.5 rounded-xl text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Switch to 2D CAD Drawings"
            >
              2D CAD
            </button>
          )}

          {/* Residence CAD Overlay QA Toggle */}
          <button
            onClick={() => setIsCadOverlay(!isCadOverlay)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
              isCadOverlay
                ? 'bg-[#C58F58] text-[#071519] border-[#C58F58] shadow-md'
                : 'bg-white/5 text-[#E0AB77] border-[#C58F58]/40 hover:bg-[#C58F58]/20'
            }`}
            title="Toggle Residence CAD blueprint semi-transparent overlay alignment mode"
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

        {/* Residence CAD Overlay QA Sliders Floating Bar */}
        {isCadOverlay && (
          <div className="absolute top-20 right-4 z-20 pointer-events-auto bg-[#071519]/95 backdrop-blur-md p-4 rounded-2xl border border-[#C58F58]/60 shadow-2xl space-y-3 max-w-sm">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
              <span className="text-[11px] font-mono text-[#E0AB77] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Residence CAD Overlay QA
              </span>
              <button
                onClick={() => handleApplyPreset('top')}
                className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[#C58F58]/20 hover:bg-[#C58F58] hover:text-[#071519] text-[#E0AB77] transition-all font-bold cursor-pointer"
              >
                Snap Top View
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-white/70 font-mono text-[10px]">
                <span>CAD Floor Plan Opacity:</span>
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
                <span>3D Slabs &amp; Walls Opacity:</span>
                <span className="text-[#E0AB77] font-bold">{Math.round(modelOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={modelOpacity}
                onChange={(e) => setModelOpacity(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C58F58]"
              />
            </div>
          </div>
        )}

        {/* Left 4-Tier Interactive Floor Selector */}
        <div className="absolute left-4 top-20 z-20 flex flex-col gap-2 w-44 sm:w-52 pointer-events-auto">
          <span className="text-[10px] font-mono uppercase text-[#C58F58] tracking-widest px-1 font-bold">
            Select Floor Level:
          </span>

          <button
            onClick={() => handleSelectFloor('second')}
            className={`p-3 rounded-2xl border text-left transition-all backdrop-blur-md shadow-lg cursor-pointer ${
              activeFloor === 'second'
                ? 'bg-[#2C5E50] border-[#CDE0D7] text-white scale-105 shadow-xl ring-2 ring-[#C58F58]'
                : 'bg-[#071519]/80 border-white/10 text-white/75 hover:bg-[#14353E]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-serif-heading">Second Floor</span>
              <Lock className="w-3 h-3 text-[#C58F58]" />
            </div>
            <p className="text-[10px] text-white/60 mt-0.5">Units 07–09 • Phase 3 Waitlist</p>
          </button>

          <button
            onClick={() => handleSelectFloor('first')}
            className={`p-3 rounded-2xl border text-left transition-all backdrop-blur-md shadow-lg cursor-pointer ${
              activeFloor === 'first'
                ? 'bg-[#2C5E50] border-[#CDE0D7] text-white scale-105 shadow-xl ring-2 ring-[#C58F58]'
                : 'bg-[#071519]/80 border-white/10 text-white/75 hover:bg-[#14353E]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-serif-heading">First Floor</span>
              <Lock className="w-3 h-3 text-[#C58F58]" />
            </div>
            <p className="text-[10px] text-white/60 mt-0.5">Units 04–06 • Phase 2 Waitlist</p>
          </button>

          <button
            onClick={() => handleSelectFloor('ground')}
            className={`p-3 rounded-2xl border text-left transition-all backdrop-blur-md shadow-xl cursor-pointer ${
              activeFloor === 'ground'
                ? 'bg-gradient-to-r from-[#2C5E50] to-[#1F483D] border-emerald-400 text-white ring-2 ring-emerald-400/40 scale-105'
                : 'bg-[#071519]/90 border-emerald-500/30 text-white hover:bg-[#14353E]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-serif-heading text-emerald-300">Ground Floor</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-emerald-100 font-medium mt-0.5">Units 01–03 • Phase 1 Priority</p>
          </button>

          <button
            onClick={() => handleSelectFloor('stilt')}
            className={`p-3 rounded-2xl border text-left transition-all backdrop-blur-md shadow-lg cursor-pointer ${
              activeFloor === 'stilt'
                ? 'bg-[#2C5E50] border-[#CDE0D7] text-white scale-105 shadow-xl ring-2 ring-[#C58F58]'
                : 'bg-[#071519]/80 border-white/10 text-white/75 hover:bg-[#14353E]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-serif-heading">Stilt Parking</span>
              <Car className="w-3.5 h-3.5 text-[#C58F58]" />
            </div>
            <p className="text-[10px] text-white/60 mt-0.5">Covered Bays • Dual Lift Lobby</p>
          </button>
        </div>

        {/* Non-Fullscreen Floating Unit Card */}
        {!isFullscreen && activeFloor === 'ground' && (
          <div className="absolute right-4 top-20 max-w-xs w-full bg-[#071519]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-5 text-white shadow-2xl z-20 space-y-4 pointer-events-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                  Phase 1 Priority
                </span>
                <span className="text-xs text-white/70 font-mono">Ground Floor</span>
              </div>
              <span className="text-xs font-bold text-[#C58F58]">From ₹25L*</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {buildingUnits.slice(0, 3).map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => handleSelectUnit(unit.id)}
                  className={`py-2 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                    selectedUnitId === unit.id
                      ? 'bg-[#C58F58] text-[#0D2329] border-[#E0AB77] font-bold shadow-md'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-serif font-bold">{unit.code}</div>
                  <div className="text-[9px] uppercase tracking-tight text-current opacity-80">
                    {unit.type === '1-bhk' ? '1 BHK' : '1 RK'}
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-1.5">
              <h4 className="font-serif-heading text-base font-bold text-[#FAF8F5]">
                {selectedUnit.typeName}
              </h4>
              <p className="text-xs text-white/75 font-light leading-relaxed">
                ~{selectedUnit.superAreaSqFt} sq. ft. super area (~{selectedUnit.carpetAreaSqFt} sq. ft. carpet). {selectedUnit.facing}. Single-floor barrier-free layout.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() =>
                  openWhatsApp({
                    actionType: 'reserve-unit',
                    unitName: selectedUnit.unitNumber,
                    unitType: selectedUnit.typeName,
                    floorLevel: selectedUnit.floorName,
                    message: `Hello, I am inspecting the 3D Building Model for ${selectedUnit.unitNumber} (${selectedUnit.typeName}) on Ground Floor at Senior Living Citizens Foundation. Please share CAD drawings and priority allotment terms.`
                  })
                }
                className="w-full py-3 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C58F58]" />
                Inquire {selectedUnit.unitNumber} on WhatsApp →
              </button>

              <button
                onClick={() => setIsFullscreen(true)}
                className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#C58F58]" />
                Open Full Studio Inspector
              </button>
            </div>
          </div>
        )}

        {/* Bottom HUD */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/60 pointer-events-none z-10 px-2">
          <div className="flex items-center gap-2 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
            <span className="hidden sm:inline">Drag to Orbit • Scroll to Zoom • Tap Floor Buttons to Isolate Levels</span>
            <span className="sm:hidden">Drag to Orbit • Pinch to Zoom</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Architectural Blueprints by The Vision Architects</span>
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
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-heading font-bold text-base text-[#FAF8F5]">
                    Residence Studio Inspector
                  </h3>
                  <span className="text-[10px] font-mono text-[#C58F58] uppercase tracking-wider block">
                    G+2 Care Suites • CAD Aligned
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

            {/* Active Floor & Unit Details */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase">
                  {selectedUnit.floorName}
                </span>
                <span className="text-xs text-[#C58F58] font-mono font-bold">{selectedUnit.typeName}</span>
              </div>
              <h4 className="text-xl font-serif-heading font-bold text-[#FAF8F5]">
                {selectedUnit.unitNumber}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                  <span className="text-[10px] text-white/50 block font-mono">Carpet Area</span>
                  <span className="font-bold text-white mt-0.5 block">{selectedUnit.carpetAreaSqFt} sq. ft.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                  <span className="text-[10px] text-white/50 block font-mono">Super Area</span>
                  <span className="font-bold text-white mt-0.5 block">{selectedUnit.superAreaSqFt} sq. ft.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                  <span className="text-[10px] text-white/50 block font-mono">Balcony</span>
                  <span className="font-bold text-white mt-0.5 block">55 sq. ft.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
                  <span className="text-[10px] text-white/50 block font-mono">Facing</span>
                  <span className="font-bold text-[#C58F58] mt-0.5 block">{selectedUnit.facing}</span>
                </div>
              </div>
            </div>

            {/* Synchronized 2D CAD Floor Plan Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60 font-mono">2D CAD Floor Blueprint ({selectedUnit.floorName})</span>
                <span className="text-[#C58F58] font-bold">Synchronized</span>
              </div>

              <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/20 bg-black/40 shadow-inner group">
                <img
                  src={cadFloorPlanImage}
                  alt="CAD Floor Plan Preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full border-2 border-[#C58F58] animate-ping opacity-75" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#C58F58] text-[8px] font-bold text-black flex items-center justify-center shadow-lg absolute">
                    ★
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] text-white/80 flex items-center justify-between">
                  <span>Unit: {selectedUnit.unitNumber}</span>
                  <span className="font-mono text-[#C58F58]">The Vision Architects</span>
                </div>
              </div>
            </div>

            {/* Senior Safety Specifications Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C58F58] font-bold">
                Elder-Friendly Structural Inclusions:
              </span>
              <div className="space-y-1.5 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>8-Passenger Stretcher-Compliant Elevator Core</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>1:12 Barrier-Free Entrance Ramp with Dual Railings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>1200mm Wide Doorways for Wheelchair Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Rooftop Solar Array &amp; Bougainvillea Walking Garden</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Bottom CTA Actions */}
          <div className="pt-4 border-t border-white/15 space-y-2.5">
            <button
              onClick={() =>
                openWhatsApp({
                  actionType: 'reserve-unit',
                  unitName: selectedUnit.unitNumber,
                  unitType: selectedUnit.typeName,
                  floorLevel: selectedUnit.floorName,
                  message: `Hello, I am inspecting ${selectedUnit.unitNumber} (${selectedUnit.typeName}) on ${selectedUnit.floorName} in the 3D Building Viewer for Senior Living Citizens Foundation. Please share complete CAD floor dossier and priority allotment terms.`
                })
              }
              className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Inquire {selectedUnit.unitNumber} on WhatsApp (+91 99999 55847) →
            </button>

            <button
              onClick={() =>
                openLeadDrawer({
                  title: `Schedule Blueprint Walkthrough for ${selectedUnit.unitNumber}`,
                  unitName: selectedUnit.unitNumber,
                  unitType: selectedUnit.typeName,
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
