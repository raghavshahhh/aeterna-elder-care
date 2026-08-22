'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  ArrowRight
} from 'lucide-react';

interface Building3DViewerProps {
  initialFloor?: FloorLevel;
  onSelectUnit?: (unitId: string) => void;
  onToggle2DFallback?: () => void;
}

// ─── Procedural Canvas Texture Generators ────────────────────────────────────

function createSandstoneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  // Warm sandstone base
  ctx.fillStyle = '#E2DAC7';
  ctx.fillRect(0, 0, 256, 256);
  // Subtle grain noise
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const l = 200 + Math.random() * 40;
    ctx.fillStyle = `rgb(${l}, ${l - 8}, ${l - 20})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }
  // Horizontal mortar joints
  ctx.strokeStyle = 'rgba(180, 170, 150, 0.35)';
  ctx.lineWidth = 1;
  for (let y = 0; y < 256; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y + (Math.random() * 2 - 1));
    ctx.lineTo(256, y + (Math.random() * 2 - 1));
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 3);
  return tex;
}

function createConcreteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#3A4A50';
  ctx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const v = 50 + Math.random() * 30;
    ctx.fillStyle = `rgb(${v}, ${v + 6}, ${v + 10})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  return tex;
}

function createGrassTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#1A3D2A';
  ctx.fillRect(0, 0, 256, 256);
  // Grass blades variation
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const g = 40 + Math.random() * 50;
    ctx.fillStyle = `rgb(${g - 15}, ${g + 20}, ${g - 10})`;
    ctx.fillRect(x, y, 1, 2 + Math.random() * 2);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  return tex;
}

function createPavingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#C8BCA8';
  ctx.fillRect(0, 0, 128, 128);
  // Paving stones grid
  ctx.strokeStyle = 'rgba(100, 90, 75, 0.4)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x < 128; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 128);
    ctx.stroke();
  }
  for (let y = 0; y < 128; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(128, y);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

function createWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#6B4423';
  ctx.fillRect(0, 0, 128, 128);
  // Wood grain lines
  for (let y = 0; y < 128; y += 3) {
    const brightness = 90 + Math.sin(y * 0.3) * 15 + Math.random() * 10;
    ctx.strokeStyle = `rgb(${brightness}, ${brightness - 20}, ${brightness - 35})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(128, y + (Math.random() * 3 - 1.5));
    ctx.stroke();
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
    if (obj instanceof THREE.LineSegments) {
      obj.geometry?.dispose();
      if (obj.material instanceof THREE.Material) obj.material.dispose();
    }
  });
  scene.clear();
}

// ─── Component ───────────────────────────────────────────────────────────────

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
  const [viewAngle, setViewAngle] = useState<'perspective' | 'top' | 'front'>('perspective');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const floorGroupsRef = useRef<{ [key in FloorLevel]?: THREE.Group }>({});
  const animationFrameId = useRef<number | null>(null);
  // Refs to read state inside animation loop without re-creating the scene
  const activeFloorRef = useRef<FloorLevel>(initialFloor);
  const isExplodedRef = useRef<boolean>(false);

  const orbitRef = useRef({
    radius: 30,
    theta: Math.PI / 4.2,
    phi: Math.PI / 3.2,
    target: new THREE.Vector3(0, 4.5, 0),
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRadius: 30,
    targetTheta: Math.PI / 4.2,
    targetPhi: Math.PI / 3.2,
    targetLookAt: new THREE.Vector3(0, 4.5, 0)
  });

  // Keep refs in sync with state
  useEffect(() => {
    activeFloorRef.current = activeFloor;
  }, [activeFloor]);
  useEffect(() => {
    isExplodedRef.current = isExploded;
  }, [isExploded]);

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

  // ─── Single scene creation useEffect (no dependencies on activeFloor/isExploded) ───
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a1c22);
    scene.fog = new THREE.FogExp2(0x0a1c22, 0.008);

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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // ─── Lighting ──────────────────────────────────────────────────────────

    // Hemisphere light for sky/ground ambient fill
    const hemiLight = new THREE.HemisphereLight(0xc4d8e0, 0x3a4a30, 0.9);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xf5eedc, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    sunLight.position.set(25, 45, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = isMobile ? 1024 : 2048;
    sunLight.shadow.mapSize.height = isMobile ? 1024 : 2048;
    sunLight.shadow.camera.left = -25;
    sunLight.shadow.camera.right = 25;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    sunLight.shadow.camera.near = 5;
    sunLight.shadow.camera.far = 120;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x7da494, 0.7);
    rimLight.position.set(-25, 20, -25);
    scene.add(rimLight);

    // Subtle warm fill from front
    const fillLight = new THREE.DirectionalLight(0xfde8c8, 0.4);
    fillLight.position.set(0, 10, 35);
    scene.add(fillLight);

    // ─── Procedural Textures ───────────────────────────────────────────────

    const sandTex = createSandstoneTexture();
    const concreteTex = createConcreteTexture();
    const grassTex = createGrassTexture();
    const pavingTex = createPavingTexture();
    const woodTex = createWoodTexture();

    // ─── Materials Palette ─────────────────────────────────────────────────

    const stoneWallMat = new THREE.MeshStandardMaterial({
      map: sandTex,
      roughness: 0.72,
      bumpMap: sandTex,
      bumpScale: 0.03
    });
    const darkAccentMat = new THREE.MeshStandardMaterial({
      map: concreteTex,
      roughness: 0.6
    });
    const warmBronzeMat = new THREE.MeshStandardMaterial({
      color: 0xc58f58,
      roughness: 0.3,
      metalness: 0.7
    });
    const windowFrameMat = new THREE.MeshStandardMaterial({ color: 0x0c1518, roughness: 0.35, metalness: 0.3 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e3a40,
      roughness: 0.08,
      metalness: 0.05,
      transmission: 0.75,
      transparent: true,
      opacity: 0.85,
      ior: 1.5,
      thickness: 0.3
    });
    const lockedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x41545c,
      roughness: 0.3,
      transmission: 0.5,
      transparent: true,
      opacity: 0.6
    });
    const woodPergolaMat = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.45,
      bumpMap: woodTex,
      bumpScale: 0.02
    });
    const grassMat = new THREE.MeshStandardMaterial({
      map: grassTex,
      roughness: 0.92
    });
    const pavingMat = new THREE.MeshStandardMaterial({
      map: pavingTex,
      roughness: 0.7
    });
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x2c2c2c, roughness: 0.3, metalness: 0.6 });

    // ─── Helpers ───────────────────────────────────────────────────────────

    const addWindow = (parent: THREE.Group, x: number, y: number, z: number, w: number, h: number, rotY = 0, useLockedGlass = false) => {
      const frameGeo = new THREE.BoxGeometry(w, h, 0.15);
      const frame = new THREE.Mesh(frameGeo, windowFrameMat);
      frame.position.set(x, y, z);
      frame.rotation.y = rotY;
      frame.castShadow = true;

      // Window reveal (recessed frame depth)
      const revealGeo = new THREE.BoxGeometry(w + 0.12, h + 0.12, 0.06);
      const revealMat = new THREE.MeshStandardMaterial({ color: 0xc8c0ae, roughness: 0.65 });
      const reveal = new THREE.Mesh(revealGeo, revealMat);
      reveal.position.set(0, 0, -0.05);
      frame.add(reveal);

      // Glass pane
      const paneGeo = new THREE.PlaneGeometry(w - 0.15, h - 0.15);
      const pane = new THREE.Mesh(paneGeo, useLockedGlass ? lockedGlassMat : glassMat);
      pane.position.set(0, 0, 0.08);
      frame.add(pane);

      // Mullion cross
      const mullionH = new THREE.Mesh(new THREE.BoxGeometry(w - 0.15, 0.04, 0.04), windowFrameMat);
      mullionH.position.set(0, 0, 0.08);
      frame.add(mullionH);
      const mullionV = new THREE.Mesh(new THREE.BoxGeometry(0.04, h - 0.15, 0.04), windowFrameMat);
      mullionV.position.set(0, 0, 0.08);
      frame.add(mullionV);

      // Window sill
      const sillGeo = new THREE.BoxGeometry(w + 0.2, 0.06, 0.25);
      const sill = new THREE.Mesh(sillGeo, warmBronzeMat);
      sill.position.set(0, -h / 2 - 0.02, 0.1);
      frame.add(sill);

      parent.add(frame);
    };

    const addBalconyRailing = (parent: THREE.Group, x: number, y: number, z: number, w: number, rotY = 0) => {
      const railGroup = new THREE.Group();
      railGroup.position.set(x, y, z);
      railGroup.rotation.y = rotY;

      const topRail = new THREE.Mesh(new THREE.BoxGeometry(w, 0.06, 0.08), warmBronzeMat);
      topRail.position.set(0, 0.9, 0);
      railGroup.add(topRail);

      const botRail = new THREE.Mesh(new THREE.BoxGeometry(w, 0.04, 0.06), warmBronzeMat);
      botRail.position.set(0, 0.05, 0);
      railGroup.add(botRail);

      const balusterCount = Math.floor(w / 0.25);
      const spacing = w / (balusterCount + 1);
      const balusterGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.82, 8);
      for (let i = 1; i <= balusterCount; i++) {
        const bal = new THREE.Mesh(balusterGeo, warmBronzeMat);
        bal.position.set(-w / 2 + i * spacing, 0.47, 0);
        railGroup.add(bal);
      }

      // Balcony floor slab
      const balFloorGeo = new THREE.BoxGeometry(w + 0.3, 0.08, 0.6);
      const balFloor = new THREE.Mesh(balFloorGeo, new THREE.MeshStandardMaterial({ color: 0xd4cbb8, roughness: 0.65 }));
      balFloor.position.set(0, -0.02, -0.3);
      balFloor.receiveShadow = true;
      railGroup.add(balFloor);

      parent.add(railGroup);
    };

    const addDoorPanel = (parent: THREE.Group, x: number, y: number, z: number, rotY = 0) => {
      const doorGroup = new THREE.Group();
      doorGroup.position.set(x, y, z);
      doorGroup.rotation.y = rotY;

      const doorGeo = new THREE.BoxGeometry(1.0, 2.2, 0.1);
      const doorMat = new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.5, metalness: 0.1 });
      const door = new THREE.Mesh(doorGeo, doorMat);
      door.castShadow = true;
      doorGroup.add(door);

      // Door frame
      const frameTop = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.15), windowFrameMat);
      frameTop.position.set(0, 1.12, 0);
      doorGroup.add(frameTop);

      // Handle
      const handleGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.12, 8);
      const handle = new THREE.Mesh(handleGeo, warmBronzeMat);
      handle.position.set(0.35, -0.1, 0.07);
      handle.rotation.z = Math.PI / 2;
      doorGroup.add(handle);

      parent.add(doorGroup);
    };

    // ─── Environment: Ground, Driveway, Compound Wall ──────────────────────

    // Large ground plane with grass
    const terrainGeo = new THREE.PlaneGeometry(100, 100);
    const terrain = new THREE.Mesh(terrainGeo, grassMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -0.02;
    terrain.receiveShadow = true;
    scene.add(terrain);

    // Paved compound area around building
    const compoundGeo = new THREE.PlaneGeometry(28, 24);
    const compound = new THREE.Mesh(compoundGeo, pavingMat);
    compound.rotation.x = -Math.PI / 2;
    compound.position.set(0, 0.01, 0);
    compound.receiveShadow = true;
    scene.add(compound);

    // Foundation podium
    const podiumGeo = new THREE.BoxGeometry(22, 0.35, 20);
    const podiumMat = new THREE.MeshStandardMaterial({ color: 0x1a2e35, roughness: 0.65, map: concreteTex });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.set(0, 0.175, 0);
    podium.receiveShadow = true;
    podium.castShadow = true;
    scene.add(podium);

    // Compound wall (low boundary)
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xb8ad98, roughness: 0.65 });
    const wallHeight = 1.2;
    const wallThick = 0.2;
    [
      { geo: [34, wallHeight, wallThick], pos: [0, wallHeight / 2, -16] },
      { geo: [34, wallHeight, wallThick], pos: [0, wallHeight / 2, 16] },
      { geo: [wallThick, wallHeight, 32], pos: [-17, wallHeight / 2, 0] },
      { geo: [wallThick, wallHeight, 32], pos: [17, wallHeight / 2, 0] },
    ].forEach(({ geo, pos }) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(geo[0], geo[1], geo[2]), wallMat);
      wall.position.set(pos[0], pos[1], pos[2]);
      wall.castShadow = true;
      wall.receiveShadow = true;
      scene.add(wall);
    });

    // Wall coping (top trim)
    const copingMat = new THREE.MeshStandardMaterial({ color: 0xd4cbb8, roughness: 0.55 });
    [
      { geo: [34.4, 0.08, 0.35], pos: [0, wallHeight + 0.04, -16] },
      { geo: [34.4, 0.08, 0.35], pos: [0, wallHeight + 0.04, 16] },
      { geo: [0.35, 0.08, 32.4], pos: [-17, wallHeight + 0.04, 0] },
      { geo: [0.35, 0.08, 32.4], pos: [17, wallHeight + 0.04, 0] },
    ].forEach(({ geo, pos }) => {
      const coping = new THREE.Mesh(new THREE.BoxGeometry(geo[0], geo[1], geo[2]), copingMat);
      coping.position.set(pos[0], pos[1], pos[2]);
      scene.add(coping);
    });

    // Entry gate pillars
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xc8bea6, roughness: 0.55 });
    [-2.5, 2.5].forEach((gx) => {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.45, 2.0, 0.45), pillarMat);
      pillar.position.set(gx, 1.0, -16);
      pillar.castShadow = true;
      scene.add(pillar);
      // Pillar cap
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.6), warmBronzeMat);
      cap.position.set(gx, 2.06, -16);
      scene.add(cap);
    });

    // Driveway approach
    const drivewayGeo = new THREE.PlaneGeometry(5, 10);
    const driveway = new THREE.Mesh(drivewayGeo, new THREE.MeshStandardMaterial({ color: 0x3a3a38, roughness: 0.75 }));
    driveway.rotation.x = -Math.PI / 2;
    driveway.position.set(0, 0.02, -20);
    driveway.receiveShadow = true;
    scene.add(driveway);

    // Lamp posts
    const createLampPost = (lx: number, lz: number) => {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 3.5, 8), lampMat);
      pole.position.set(lx, 1.75, lz);
      pole.castShadow = true;
      scene.add(pole);

      const lampHead = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshStandardMaterial({
        color: 0xffeedd,
        emissive: 0xffd599,
        emissiveIntensity: 0.6,
        roughness: 0.3
      }));
      lampHead.position.set(lx, 3.6, lz);
      scene.add(lampHead);

      // Subtle point light
      const lampLight = new THREE.PointLight(0xffeedd, 0.4, 8);
      lampLight.position.set(lx, 3.5, lz);
      scene.add(lampLight);
    };

    if (!isMobile) {
      createLampPost(-14, -12);
      createLampPost(14, -12);
      createLampPost(-14, 12);
      createLampPost(14, 12);
    }

    // Garden bench
    const createBench = (bx: number, bz: number, rotY: number) => {
      const benchGroup = new THREE.Group();
      benchGroup.position.set(bx, 0.2, bz);
      benchGroup.rotation.y = rotY;

      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.5), new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.5 }));
      seat.position.set(0, 0.45, 0);
      benchGroup.add(seat);

      const backrest = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 0.06), new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.5 }));
      backrest.position.set(0, 0.7, -0.22);
      benchGroup.add(backrest);

      // Legs
      [-0.6, 0.6].forEach((lx) => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.45), lampMat);
        leg.position.set(lx, 0.225, 0);
        benchGroup.add(leg);
      });

      scene.add(benchGroup);
    };

    if (!isMobile) {
      createBench(13, 5, Math.PI / 2);
      createBench(-13, -5, -Math.PI / 2);
    }

    // ─── 4-TIER BUILDING FLOORS ────────────────────────────────────────────

    const floorGroups: { [key in FloorLevel]?: THREE.Group } = {};

    // ─ STILT PARKING LEVEL ─
    const stiltGroup = new THREE.Group();
    stiltGroup.name = 'stilt';

    const stiltFloor = new THREE.Mesh(new THREE.BoxGeometry(18, 0.25, 16), darkAccentMat);
    stiltFloor.position.set(0, 0.35, 0);
    stiltFloor.receiveShadow = true;
    stiltGroup.add(stiltFloor);

    // Parking bay markings
    for (let pz = -6; pz <= 6; pz += 3) {
      const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.8, transparent: true });
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 4.2), lineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(4.5, 0.49, pz);
      stiltGroup.add(line);

      const line2 = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 4.2), lineMat);
      line2.rotation.x = -Math.PI / 2;
      line2.position.set(-4.5, 0.49, pz);
      stiltGroup.add(line2);
    }

    // Heavy structural columns (10 bays)
    const colGeo = new THREE.BoxGeometry(0.65, 2.3, 0.65);
    [
      [-7.5, 1.5, -6.5], [-2.5, 1.5, -6.5], [2.5, 1.5, -6.5], [7.5, 1.5, -6.5],
      [-7.5, 1.5, 0], [7.5, 1.5, 0],
      [-7.5, 1.5, 6.5], [-2.5, 1.5, 6.5], [2.5, 1.5, 6.5], [7.5, 1.5, 6.5]
    ].forEach(([cx, cy, cz]) => {
      const col = new THREE.Mesh(colGeo, stoneWallMat);
      col.position.set(cx, cy, cz);
      col.castShadow = true;
      col.receiveShadow = true;
      stiltGroup.add(col);
    });

    // Central elevator & stair lobby core
    const stiltCore = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.3, 4.5), darkAccentMat);
    stiltCore.position.set(0, 1.5, 0);
    stiltCore.castShadow = true;
    stiltGroup.add(stiltCore);

    // Double entry doors in lobby
    addDoorPanel(stiltGroup, -0.6, 1.3, 2.3);
    addDoorPanel(stiltGroup, 0.6, 1.3, 2.3);

    scene.add(stiltGroup);
    floorGroups.stilt = stiltGroup;

    // ─ RESIDENTIAL FLOOR BUILDER ─
    const createResidentialFloor = (
      floorKey: FloorLevel,
      baseY: number,
      isPhase1Available: boolean,
      isTopFloor = false,
      floorNum = 0
    ) => {
      const group = new THREE.Group();
      group.name = floorKey;
      const locked = !isPhase1Available;

      // Floor slab
      const slab = new THREE.Mesh(new THREE.BoxGeometry(18.4, 0.35, 16.4), stoneWallMat);
      slab.position.set(0, baseY + 0.175, 0);
      slab.castShadow = true;
      slab.receiveShadow = true;
      group.add(slab);

      // Cornice band
      const cornice = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.1, 16.6), warmBronzeMat);
      cornice.position.set(0, baseY + 0.32, 0);
      group.add(cornice);

      // Drip edge (slight overhang at slab edge)
      const dripGeo = new THREE.BoxGeometry(18.8, 0.04, 16.8);
      const drip = new THREE.Mesh(dripGeo, new THREE.MeshStandardMaterial({ color: 0xa09588, roughness: 0.6 }));
      drip.position.set(0, baseY + 0.01, 0);
      group.add(drip);

      const wallMaterial = locked ? lockedGlassMat : stoneWallMat;
      const useLockedGlass = locked;

      // East Residence Wing (1 BHK - Unit 01 equivalent)
      const u1 = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.5, 7.2), wallMaterial);
      u1.position.set(5.5, baseY + 1.6, -3.8);
      u1.castShadow = true;
      u1.receiveShadow = true;
      group.add(u1);

      // Windows for east wing
      addWindow(group, 5.5, baseY + 1.6, -7.45, 2.2, 1.4, 0, useLockedGlass);
      addWindow(group, 8.75, baseY + 1.6, -3.8, 1.8, 1.4, Math.PI / 2, useLockedGlass);
      addWindow(group, 5.5, baseY + 1.6, -0.15, 1.6, 1.2, 0, useLockedGlass);

      // Balcony for east wing
      addBalconyRailing(group, 5.5, baseY + 0.35, -7.5, 3.2, 0);

      // AC unit (small box on exterior)
      if (!isMobile) {
        const acUnit = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 0.3), new THREE.MeshStandardMaterial({ color: 0x9a9a9a, roughness: 0.4, metalness: 0.3 }));
        acUnit.position.set(8.85, baseY + 0.7, -6);
        group.add(acUnit);
      }

      // West Residence Wing (1 BHK - Unit 02 equivalent)
      const u2 = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.5, 7.2), wallMaterial);
      u2.position.set(-5.5, baseY + 1.6, -3.8);
      u2.castShadow = true;
      u2.receiveShadow = true;
      group.add(u2);

      addWindow(group, -5.5, baseY + 1.6, -7.45, 2.2, 1.4, 0, useLockedGlass);
      addWindow(group, -8.75, baseY + 1.6, -3.8, 1.8, 1.4, Math.PI / 2, useLockedGlass);
      addWindow(group, -5.5, baseY + 1.6, -0.15, 1.6, 1.2, 0, useLockedGlass);
      addBalconyRailing(group, -5.5, baseY + 0.35, -7.5, 3.2, 0);

      if (!isMobile) {
        const acUnit2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 0.3), new THREE.MeshStandardMaterial({ color: 0x9a9a9a, roughness: 0.4, metalness: 0.3 }));
        acUnit2.position.set(-8.85, baseY + 0.7, -6);
        group.add(acUnit2);
      }

      // North Studio Wing (1 RK - Unit 03 equivalent)
      const u3 = new THREE.Mesh(new THREE.BoxGeometry(12.0, 2.5, 5.8), wallMaterial);
      u3.position.set(0, baseY + 1.6, 4.4);
      u3.castShadow = true;
      u3.receiveShadow = true;
      group.add(u3);

      addWindow(group, -3.5, baseY + 1.6, 7.35, 2.0, 1.4, 0, useLockedGlass);
      addWindow(group, 0, baseY + 1.6, 7.35, 1.6, 1.2, 0, useLockedGlass);
      addWindow(group, 3.5, baseY + 1.6, 7.35, 2.0, 1.4, 0, useLockedGlass);
      addBalconyRailing(group, 0, baseY + 0.35, 7.4, 4.2, 0);

      // Unit entry doors (from central corridor)
      addDoorPanel(group, -3.2, baseY + 1.4, -0.15);
      addDoorPanel(group, 3.2, baseY + 1.4, -0.15);

      // Central lift & stair tower core
      const core = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, 4.5), darkAccentMat);
      core.position.set(0, baseY + 1.6, 0);
      core.castShadow = true;
      group.add(core);

      // Vertical window strip on core
      addWindow(group, 0, baseY + 1.6, -2.3, 1.2, 2.0, 0, useLockedGlass);

      // Floor number badge (subtle)
      if (!isMobile && floorNum > 0) {
        const badgePlane = new THREE.Mesh(
          new THREE.PlaneGeometry(0.8, 0.4),
          new THREE.MeshBasicMaterial({ color: 0xc58f58, opacity: 0.7, transparent: true })
        );
        badgePlane.position.set(9.22, baseY + 2.4, -1);
        badgePlane.rotation.y = Math.PI / 2;
        group.add(badgePlane);
      }

      // ROOFTOP FEATURES
      if (isTopFloor) {
        const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.35, 16.6), stoneWallMat);
        roofSlab.position.set(0, baseY + 2.9, 0);
        roofSlab.castShadow = true;
        group.add(roofSlab);

        // Safety parapet walls
        const parapetFront = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.9, 0.2), stoneWallMat);
        parapetFront.position.set(0, baseY + 3.4, -8.2);
        group.add(parapetFront);

        const parapetBack = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.9, 0.2), stoneWallMat);
        parapetBack.position.set(0, baseY + 3.4, 8.2);
        group.add(parapetBack);

        const parapetLeft = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.9, 16.4), stoneWallMat);
        parapetLeft.position.set(-9.2, baseY + 3.4, 0);
        group.add(parapetLeft);

        const parapetRight = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.9, 16.4), stoneWallMat);
        parapetRight.position.set(9.2, baseY + 3.4, 0);
        group.add(parapetRight);

        // Penthouse pergola wooden beams
        for (let px = -6.5; px <= 6.5; px += 1.4) {
          const beam = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.3, 10.0), woodPergolaMat);
          beam.position.set(px, baseY + 4.6, 0);
          beam.castShadow = true;
          group.add(beam);
        }

        // Lift machine room tower overrun
        const liftTower = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.0, 4.8), darkAccentMat);
        liftTower.position.set(0, baseY + 4.0, 0);
        liftTower.castShadow = true;
        group.add(liftTower);

        // Water tank (typical Indian building rooftop)
        if (!isMobile) {
          const tank = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 1.5, 12), new THREE.MeshStandardMaterial({ color: 0x2a5a5a, roughness: 0.4 }));
          tank.position.set(6, baseY + 4.5, 4);
          tank.castShadow = true;
          group.add(tank);
        }
      }

      scene.add(group);
      return group;
    };

    floorGroups.ground = createResidentialFloor('ground', 2.6, true, false, 0);
    floorGroups.first = createResidentialFloor('first', 5.5, false, false, 1);
    floorGroups.second = createResidentialFloor('second', 8.4, false, true, 2);
    floorGroupsRef.current = floorGroups;

    // ─── LANDSCAPING ───────────────────────────────────────────────────────

    const createTree = (tx: number, tz: number, scale = 1, variant: 'evergreen' | 'round' | 'palm' = 'evergreen') => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(tx, 0.2, tz);
      treeGroup.scale.set(scale, scale, scale);

      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.8 });
      const foliageMat = new THREE.MeshStandardMaterial({
        color: variant === 'palm' ? 0x2d6b3f : 0x255243,
        roughness: 0.82,
        flatShading: true
      });

      if (variant === 'evergreen') {
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.2, 1.8, 8), trunkMat);
        trunk.position.set(0, 0.9, 0);
        trunk.castShadow = true;
        treeGroup.add(trunk);

        const f1 = new THREE.Mesh(new THREE.ConeGeometry(1.5, 2.0, 7), foliageMat);
        f1.position.set(0, 2.5, 0);
        f1.castShadow = true;
        treeGroup.add(f1);

        const f2 = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.6, 7), foliageMat);
        f2.position.set(0, 3.4, 0);
        f2.castShadow = true;
        treeGroup.add(f2);
      } else if (variant === 'round') {
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.18, 2.5, 8), trunkMat);
        trunk.position.set(0, 1.25, 0);
        trunk.castShadow = true;
        treeGroup.add(trunk);

        const canopy = new THREE.Mesh(new THREE.SphereGeometry(1.6, 8, 8), foliageMat);
        canopy.position.set(0, 3.3, 0);
        canopy.castShadow = true;
        treeGroup.add(canopy);
      } else {
        // Palm
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 3.5, 8), trunkMat);
        trunk.position.set(0, 1.75, 0);
        trunk.castShadow = true;
        treeGroup.add(trunk);

        // Simple palm frond representation
        for (let i = 0; i < 5; i++) {
          const frond = new THREE.Mesh(new THREE.ConeGeometry(0.8, 2.0, 4), foliageMat);
          frond.position.set(0, 3.8, 0);
          frond.rotation.z = Math.PI / 4;
          frond.rotation.y = (i * Math.PI * 2) / 5;
          treeGroup.add(frond);
        }
      }

      scene.add(treeGroup);
    };

    // Varied species around the compound
    createTree(-12, -10, 1.1, 'evergreen');
    createTree(12, -10, 1.0, 'round');
    createTree(-12, 10, 0.9, 'round');
    createTree(12, 10, 1.1, 'evergreen');
    createTree(13, 0, 1.2, 'evergreen');
    createTree(-13, 0, 1.0, 'round');
    if (!isMobile) {
      createTree(0, -13, 0.8, 'palm');
      createTree(-6, -13, 0.9, 'evergreen');
      createTree(6, -13, 0.85, 'round');
      createTree(-10, -13, 1.0, 'evergreen');
    }

    // Hedge row along compound wall
    if (!isMobile) {
      const hedgeMat = new THREE.MeshStandardMaterial({ color: 0x1e4a32, roughness: 0.9 });
      for (let hx = -15; hx <= 15; hx += 2) {
        const hedge = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.6, 0.8), hedgeMat);
        hedge.position.set(hx, 0.5, -14.5);
        hedge.castShadow = true;
        scene.add(hedge);
      }
    }

    // Human scale silhouettes
    const createHumanFigure = (hx: number, hz: number) => {
      const figure = new THREE.Group();
      figure.position.set(hx, 0.35, hz);

      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x8a7560, roughness: 0.7 });
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 1.2, 8), bodyMat);
      torso.position.set(0, 0.9, 0);
      figure.add(torso);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), bodyMat);
      head.position.set(0, 1.65, 0);
      figure.add(head);

      scene.add(figure);
    };

    createHumanFigure(7, -8.5);
    createHumanFigure(0, 8.8);
    if (!isMobile) {
      createHumanFigure(-5, -10);
    }

    // ─── Contact Shadow (dark plane under building) ────────────────────────
    const contactShadowGeo = new THREE.PlaneGeometry(20, 18);
    const contactShadow = new THREE.Mesh(contactShadowGeo, new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.15
    }));
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.set(0, 0.03, 0);
    scene.add(contactShadow);

    // ─── Interaction Handlers ──────────────────────────────────────────────

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
        0.15,
        Math.min(Math.PI / 2 - 0.05, orbitRef.current.targetPhi - deltaY * 0.007)
      );
    };

    const handleMouseUp = () => {
      orbitRef.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRef.current.targetRadius = Math.max(
        14,
        Math.min(55, orbitRef.current.targetRadius + e.deltaY * 0.02)
      );
    };

    // Touch support
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
        orbitRef.current.targetPhi = Math.max(0.15, Math.min(Math.PI / 2 - 0.05, orbitRef.current.targetPhi - dy * 0.007));
      } else if (e.touches.length === 2) {
        const newDist = Math.hypot(
          e.touches[1].clientX - e.touches[0].clientX,
          e.touches[1].clientY - e.touches[0].clientY
        );
        const delta = touchStartDist - newDist;
        orbitRef.current.targetRadius = Math.max(14, Math.min(55, orbitRef.current.targetRadius + delta * 0.05));
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

    // ─── Animation Loop (reads state from refs, no scene rebuild) ──────────

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (!orbitRef.current.isDragging) {
        orbitRef.current.targetTheta += 0.0008; // Subtle ambient rotation
      }

      // Vertical floor offsets for exploded & isolated modes — reads from REFS
      const groups = floorGroupsRef.current;
      const exploded = isExplodedRef.current;
      const floor = activeFloorRef.current;

      const targetOffsets: { [key in FloorLevel]?: number } = {
        stilt: 0,
        ground: exploded ? 3.0 : floor === 'ground' ? 0.35 : 0,
        first: exploded ? 6.5 : floor === 'first' ? 0.35 : 0,
        second: exploded ? 10.0 : floor === 'second' ? 0.35 : 0
      };

      if (groups.ground && targetOffsets.ground !== undefined) {
        groups.ground.position.y += (targetOffsets.ground - groups.ground.position.y) * 0.1;
      }
      if (groups.first && targetOffsets.first !== undefined) {
        groups.first.position.y += (targetOffsets.first - groups.first.position.y) * 0.1;
      }
      if (groups.second && targetOffsets.second !== undefined) {
        groups.second.position.y += (targetOffsets.second - groups.second.position.y) * 0.1;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCameraPosition]);

  // ─── State-driven handlers (no scene rebuild) ───────────────────────────

  const handleSelectFloor = (floor: FloorLevel) => {
    setActiveFloor(floor);
    if (floor === 'ground') {
      orbitRef.current.targetLookAt.set(0, 4.0, 0);
      orbitRef.current.targetRadius = 26;
      orbitRef.current.targetPhi = Math.PI / 3.4;
    } else if (floor === 'stilt') {
      orbitRef.current.targetLookAt.set(0, 1.5, 0);
      orbitRef.current.targetRadius = 24;
      orbitRef.current.targetPhi = Math.PI / 2.8;
    } else if (floor === 'first') {
      orbitRef.current.targetLookAt.set(0, 6.8, 0);
      orbitRef.current.targetRadius = 26;
      orbitRef.current.targetPhi = Math.PI / 3.4;
    } else if (floor === 'second') {
      orbitRef.current.targetLookAt.set(0, 10.0, 0);
      orbitRef.current.targetRadius = 28;
      orbitRef.current.targetPhi = Math.PI / 3.6;
    }
  };

  const handleSetViewAngle = (angle: 'perspective' | 'top' | 'front') => {
    setViewAngle(angle);
    if (angle === 'perspective') {
      orbitRef.current.targetTheta = Math.PI / 4.2;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 30;
      orbitRef.current.targetLookAt.set(0, 4.5, 0);
    } else if (angle === 'top') {
      orbitRef.current.targetTheta = 0;
      orbitRef.current.targetPhi = 0.12;
      orbitRef.current.targetRadius = 35;
      orbitRef.current.targetLookAt.set(0, 4.5, 0);
    } else if (angle === 'front') {
      orbitRef.current.targetTheta = 0;
      orbitRef.current.targetPhi = Math.PI / 2 - 0.05;
      orbitRef.current.targetRadius = 32;
      orbitRef.current.targetLookAt.set(0, 5.5, 0);
    }
  };

  const handleSelectUnit = (unitId: string) => {
    setSelectedUnitId(unitId);
    if (onSelectUnit) onSelectUnit(unitId);

    if (unitId === 'unit-01') {
      orbitRef.current.targetTheta = Math.PI / 4;
      orbitRef.current.targetLookAt.set(4.5, 4.0, -2);
      orbitRef.current.targetRadius = 20;
    } else if (unitId === 'unit-02') {
      orbitRef.current.targetTheta = -Math.PI / 4;
      orbitRef.current.targetLookAt.set(-4.5, 4.0, -2);
      orbitRef.current.targetRadius = 20;
    } else if (unitId === 'unit-03') {
      orbitRef.current.targetTheta = Math.PI;
      orbitRef.current.targetLookAt.set(0, 4.0, 3.5);
      orbitRef.current.targetRadius = 20;
    }
  };

  const selectedUnit = buildingUnits.find((u) => u.id === selectedUnitId) || buildingUnits[0];

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl bg-[#0A1C22] border border-[#14353E] shadow-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[620px] sm:h-[720px]'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none block touch-none"
      />

      {isLoading && (
        <div className="absolute inset-0 bg-[#0A1C22] flex items-center justify-center text-white">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-[#C58F58]" />
            <span className="text-sm font-mono uppercase tracking-widest text-[#FAF8F5]">
              Loading Architectural Visualization...
            </span>
          </div>
        </div>
      )}

      {/* Top Header HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071519]/85 backdrop-blur-md border border-[#C58F58]/30 text-xs text-white pointer-events-auto shadow-lg">
          <Building2 className="w-4 h-4 text-[#C58F58]" />
          <span className="font-bold font-mono tracking-wider text-xs">
            G+2 + Stilt Proposed Building (CAD Spatial Model)
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono uppercase">
            Artist Impression
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="hidden sm:flex items-center bg-[#071519]/85 backdrop-blur-md border border-white/15 rounded-2xl p-1 shadow-lg text-xs font-semibold">
            <button
              onClick={() => handleSetViewAngle('perspective')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewAngle === 'perspective' ? 'bg-[#2C5E50] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              3D Orbit
            </button>
            <button
              onClick={() => handleSetViewAngle('top')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewAngle === 'top' ? 'bg-[#2C5E50] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Top Plan
            </button>
            <button
              onClick={() => handleSetViewAngle('front')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewAngle === 'front' ? 'bg-[#2C5E50] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Elevation
            </button>
          </div>

          {onToggle2DFallback && (
            <button
              onClick={onToggle2DFallback}
              className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs text-white font-medium transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#C58F58]" />
              <span className="hidden sm:inline">2D CAD</span> Blueprint
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-2xl bg-[#071519]/85 hover:bg-[#14353E] backdrop-blur-md border border-white/15 text-white transition-all shadow-lg cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Left 4-Tier Interactive Floor Selector HUD */}
      <div className="absolute left-4 top-20 bottom-24 flex flex-col justify-center gap-2 pointer-events-auto z-20 max-w-[190px]">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C58F58] font-bold px-1">
          Select Floor
        </span>

        <button
          onClick={() => handleSelectFloor('second')}
          className={`p-3 rounded-2xl border text-left transition-all backdrop-blur-md shadow-lg cursor-pointer ${
            activeFloor === 'second'
              ? 'bg-[#2C5E50] border-[#CDE0D7] text-white scale-105'
              : 'bg-[#071519]/80 border-white/10 text-white/75 hover:bg-[#14353E]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-serif-heading">Second Floor</span>
            <Lock className="w-3 h-3 text-[#C58F58]" />
          </div>
          <p className="text-[10px] text-white/60 mt-0.5">Units 07–09 • Phase 3</p>
        </button>

        <button
          onClick={() => handleSelectFloor('first')}
          className={`p-3 rounded-2xl border text-left transition-all backdrop-blur-md shadow-lg cursor-pointer ${
            activeFloor === 'first'
              ? 'bg-[#2C5E50] border-[#CDE0D7] text-white scale-105'
              : 'bg-[#071519]/80 border-white/10 text-white/75 hover:bg-[#14353E]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-serif-heading">First Floor</span>
            <Lock className="w-3 h-3 text-[#C58F58]" />
          </div>
          <p className="text-[10px] text-white/60 mt-0.5">Units 04–06 • Phase 2</p>
        </button>

        <button
          onClick={() => handleSelectFloor('ground')}
          className={`p-3 rounded-2xl border text-left transition-all backdrop-blur-md shadow-xl cursor-pointer ${
            activeFloor === 'ground'
              ? 'bg-gradient-to-r from-[#2C5E50] to-[#1F483D] border-emerald-400 text-white ring-2 ring-emerald-400/30 scale-105'
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
              ? 'bg-[#2C5E50] border-[#CDE0D7] text-white scale-105'
              : 'bg-[#071519]/80 border-white/10 text-white/75 hover:bg-[#14353E]'
          }`}
        >
          <span className="text-xs font-bold font-serif-heading block">Stilt Parking</span>
          <p className="text-[10px] text-white/60 mt-0.5">10+ Covered Bays • 3 Gates</p>
        </button>

        <button
          onClick={() => setIsExploded(!isExploded)}
          className={`mt-2 p-2.5 rounded-2xl border text-center transition-all backdrop-blur-md flex items-center justify-center gap-2 text-xs font-bold shadow-lg cursor-pointer ${
            isExploded
              ? 'bg-[#C58F58] text-[#071519] border-[#E0AB77]'
              : 'bg-[#071519]/80 border-white/15 text-[#E0AB77] hover:bg-[#14353E]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          {isExploded ? 'Collapse Floors' : 'Explode 3D Tiers'}
        </button>
      </div>

      {/* Right Unit Floating Card */}
      {activeFloor === 'ground' && (
        <div className="absolute right-4 top-20 max-w-xs w-full bg-[#071519]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-5 text-white shadow-2xl z-20 space-y-4 pointer-events-auto">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                Phase 1 Priority
              </span>
              <span className="text-xs text-white/70 font-mono">Ground Floor</span>
            </div>
            <span className="text-xs font-bold text-[#C58F58]">₹25L* Indicative</span>
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
              ~{selectedUnit.superAreaSqFt} sq. ft. super area (~{selectedUnit.carpetAreaSqFt} sq. ft. carpet). {selectedUnit.facing}.
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
                  message: `Hello, I am inspecting the 3D Building Model for ${selectedUnit.unitNumber} (${selectedUnit.typeName}) on Ground Floor. Please share CAD drawings and booking terms.`
                })
              }
              className="w-full py-3 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C58F58]" />
              Reserve {selectedUnit.unitNumber} on WhatsApp →
            </button>

            <button
              onClick={() =>
                openLeadDrawer({
                  title: `Schedule Blueprint Walkthrough for ${selectedUnit.unitNumber}`,
                  unitName: selectedUnit.unitNumber,
                  unitType: selectedUnit.typeName
                })
              }
              className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition-all text-center cursor-pointer"
            >
              Request Blueprint Walkthrough
            </button>
          </div>
        </div>
      )}

      {/* Bottom Architectural Source of Truth HUD */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/60 pointer-events-none z-10 px-2">
        <div className="flex items-center gap-2 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
          <span>Click &amp; Drag to Orbit • Scroll to Zoom • Select Floors &amp; Units</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>CAD Proportions by The Vision Architects &amp; Consultants</span>
        </div>
      </div>
    </div>
  );
};
