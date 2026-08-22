'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  Home
} from 'lucide-react';

interface MasterPlan3DViewerProps {
  onSelectPlot?: (plot: PlotItem) => void;
  onToggle2DView?: () => void;
}

// ─── Procedural Textures ──────────────────────────────────────────────────────

function createEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#3D5A3A';
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const g = 45 + Math.random() * 40;
    ctx.fillStyle = `rgb(${g - 10}, ${g + 15}, ${g - 15})`;
    ctx.fillRect(x, y, 1.2, 1.8 + Math.random() * 1.5);
  }
  // Subtle earth patches
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const b = 100 + Math.random() * 40;
    ctx.fillStyle = `rgba(${b}, ${b - 15}, ${b - 30}, 0.25)`;
    ctx.fillRect(x, y, 3 + Math.random() * 6, 3 + Math.random() * 4);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(12, 10);
  return tex;
}

function createAsphaltTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#2A2E30';
  ctx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const v = 35 + Math.random() * 25;
    ctx.fillStyle = `rgb(${v}, ${v + 2}, ${v + 4})`;
    ctx.fillRect(x, y, 1, 1);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 2);
  return tex;
}

function createPlotGrassTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#2A5040';
  ctx.fillRect(0, 0, 64, 64);
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * 64;
    const y = Math.random() * 64;
    const g = 35 + Math.random() * 40;
    ctx.fillStyle = `rgb(${g - 8}, ${g + 20}, ${g - 5})`;
    ctx.fillRect(x, y, 1, 1.5);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createSidewalkTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#9A9080';
  ctx.fillRect(0, 0, 64, 64);
  ctx.strokeStyle = 'rgba(80, 75, 65, 0.3)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 64; x += 8) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 64);
    ctx.stroke();
  }
  for (let y = 0; y < 64; y += 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(64, y);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(10, 1);
  return tex;
}

// ─── Disposal ─────────────────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

export const MasterPlan3DViewer: React.FC<MasterPlan3DViewerProps> = ({
  onSelectPlot,
  onToggle2DView
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openWhatsApp, openLeadDrawer } = useModal();

  const [selectedBlock, setSelectedBlock] = useState<string>('All');
  const [selectedPlotId, setSelectedPlotId] = useState<string>('plot-1');
  const [viewPreset, setViewPreset] = useState<'isometric' | 'top' | 'hospital' | 'highway' | 'residence'>('isometric');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const plotMeshesRef = useRef<{ [plotNumber: number]: THREE.Mesh }>({});
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const animationFrameId = useRef<number | null>(null);
  const selectedPlotMeshRef = useRef<THREE.Mesh | null>(null);

  const orbitRef = useRef({
    radius: 75,
    theta: Math.PI / 4.2,
    phi: Math.PI / 3.4,
    target: new THREE.Vector3(0, 0, 0),
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRadius: 75,
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

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0b1e24);
    scene.fog = new THREE.FogExp2(0x0b1e24, 0.005);

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 650;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
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
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    // ─── Lighting ─────────────────────────────────────────────────────────

    const hemiLight = new THREE.HemisphereLight(0xa8c4d0, 0x2a4a28, 0.85);
    scene.add(hemiLight);

    const ambient = new THREE.AmbientLight(0xf5eedc, 0.55);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff5e6, 2.2);
    sun.position.set(45, 65, 50);
    sun.castShadow = true;
    sun.shadow.mapSize.width = isMobile ? 1024 : 2048;
    sun.shadow.mapSize.height = isMobile ? 1024 : 2048;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 180;
    sun.shadow.camera.left = -65;
    sun.shadow.camera.right = 65;
    sun.shadow.camera.top = 55;
    sun.shadow.camera.bottom = -55;
    sun.shadow.bias = -0.0003;
    scene.add(sun);

    const skyFill = new THREE.DirectionalLight(0x7da494, 0.65);
    skyFill.position.set(-45, 35, -45);
    scene.add(skyFill);

    // ─── Procedural Textures ──────────────────────────────────────────────

    const earthTex = createEarthTexture();
    const asphaltTex = createAsphaltTexture();
    const plotGrassTex = createPlotGrassTexture();
    const sidewalkTex = createSidewalkTexture();

    // ─── Site Ground Terrain ──────────────────────────────────────────────

    const siteGroundGeo = new THREE.PlaneGeometry(200, 160);
    const siteGround = new THREE.Mesh(siteGroundGeo, new THREE.MeshStandardMaterial({
      map: earthTex,
      roughness: 0.92
    }));
    siteGround.rotation.x = -Math.PI / 2;
    siteGround.position.y = -0.05;
    siteGround.receiveShadow = true;
    scene.add(siteGround);

    // ─── Boundary Walls ───────────────────────────────────────────────────

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xb8ad98, roughness: 0.7 });
    const wallCopingMat = new THREE.MeshStandardMaterial({ color: 0xd4cbb8, roughness: 0.55 });
    const wallH = 1.8;

    const createBoundaryWall = (x: number, z: number, w: number, d: number) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(w, wallH, d), wallMat);
      wall.position.set(x, wallH / 2, z);
      wall.castShadow = true;
      wall.receiveShadow = true;
      scene.add(wall);

      // Coping
      const coping = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, 0.08, d + 0.3), wallCopingMat);
      coping.position.set(x, wallH + 0.04, z);
      scene.add(coping);
    };

    createBoundaryWall(0, 42, 124, 0.5);
    createBoundaryWall(0, -42, 124, 0.5);
    createBoundaryWall(-62, 0, 0.5, 84);
    createBoundaryWall(62, 0, 0.5, 84);

    // Gate pillars (main entrance from SH-22)
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xc8bea6, roughness: 0.55 });
    const bronzeMat = new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.3, metalness: 0.7 });
    [-3, 3].forEach((gx) => {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.8, 0.8), pillarMat);
      pillar.position.set(gx, 1.4, -42);
      pillar.castShadow = true;
      scene.add(pillar);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.12, 1.0), bronzeMat);
      cap.position.set(gx, 2.86, -42);
      scene.add(cap);
    });

    // Highway Entrance Signboard
    const signPost1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.2, 8), bronzeMat);
    signPost1.position.set(-4.5, 1.6, -40.5);
    scene.add(signPost1);
    const signPost2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.2, 8), bronzeMat);
    signPost2.position.set(4.5, 1.6, -40.5);
    scene.add(signPost2);

    const signBoard = new THREE.Mesh(
      new THREE.BoxGeometry(9.4, 1.2, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x071519, roughness: 0.3, metalness: 0.4 })
    );
    signBoard.position.set(0, 2.8, -40.5);
    scene.add(signBoard);

    // ─── Green Buffer Belts ───────────────────────────────────────────────

    const greenMat = new THREE.MeshStandardMaterial({
      map: plotGrassTex,
      color: 0x1e5a3a,
      roughness: 0.88
    });
    [36, -36].forEach((bz) => {
      const buffer = new THREE.Mesh(new THREE.BoxGeometry(118, 0.2, 6), greenMat);
      buffer.position.set(0, 0.1, bz);
      buffer.receiveShadow = true;
      scene.add(buffer);
    });

    // ─── Main 33ft Arterial Road (SH-22 Frontage) ─────────────────────────

    const mainRoad = new THREE.Mesh(
      new THREE.BoxGeometry(124, 0.12, 8),
      new THREE.MeshStandardMaterial({ map: asphaltTex, roughness: 0.72 })
    );
    mainRoad.position.set(0, 0.06, 0);
    mainRoad.receiveShadow = true;
    scene.add(mainRoad);

    // Center dashed line
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.85, transparent: true });
    for (let x = -58; x <= 58; x += 5) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.18), dashMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(x, 0.14, 0);
      scene.add(dash);
    }

    // Edge lane markings
    [-3.6, 3.6].forEach((lz) => {
      for (let x = -58; x <= 58; x += 4) {
        const edgeLine = new THREE.Mesh(
          new THREE.PlaneGeometry(3.2, 0.08),
          new THREE.MeshBasicMaterial({ color: 0xffdd88, opacity: 0.6, transparent: true })
        );
        edgeLine.rotation.x = -Math.PI / 2;
        edgeLine.position.set(x, 0.14, lz);
        scene.add(edgeLine);
      }
    });

    // Sidewalk curbs with paver texture
    const sidewalkMat = new THREE.MeshStandardMaterial({ map: sidewalkTex, roughness: 0.65 });
    [4.5, -4.5].forEach((cz) => {
      const curb = new THREE.Mesh(new THREE.BoxGeometry(124, 0.3, 1.2), sidewalkMat);
      curb.position.set(0, 0.15, cz);
      curb.receiveShadow = true;
      scene.add(curb);
    });

    // ─── Proposed 30,000 sq. ft. Hospital ─────────────────────────────────

    const hospitalGroup = new THREE.Group();
    hospitalGroup.name = 'hospital-landmark';

    const hospWallMat = new THREE.MeshStandardMaterial({ color: 0xd8d2c4, roughness: 0.65 });

    // Main block
    const hospMain = new THREE.Mesh(new THREE.BoxGeometry(24, 7.0, 15), hospWallMat);
    hospMain.position.set(42, 3.5, -18);
    hospMain.castShadow = true;
    hospMain.receiveShadow = true;
    hospitalGroup.add(hospMain);

    // Side wing
    const hospWing = new THREE.Mesh(new THREE.BoxGeometry(14, 7.0, 18), hospWallMat);
    hospWing.position.set(47, 3.5, -2);
    hospWing.castShadow = true;
    hospWing.receiveShadow = true;
    hospitalGroup.add(hospWing);

    // Windows on main block
    const hospGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x2a5a6a,
      roughness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.75
    });
    for (let wx = 33; wx <= 51; wx += 4.5) {
      for (let wy = 1.5; wy <= 5.5; wy += 2.5) {
        const win = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.8), hospGlassMat);
        win.position.set(wx, wy, -10.55);
        hospitalGroup.add(win);
      }
    }

    // Windows on side wing
    for (let wz = -8; wz <= 6; wz += 4) {
      for (let wy = 1.5; wy <= 5.5; wy += 2.5) {
        const win = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), hospGlassMat);
        win.position.set(54.05, wy, wz);
        win.rotation.y = Math.PI / 2;
        hospitalGroup.add(win);
      }
    }

    // Entrance portico with pillars
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.35, metalness: 0.5 });
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(10, 0.35, 6), canopyMat);
    canopy.position.set(38, 3.2, -10);
    canopy.castShadow = true;
    hospitalGroup.add(canopy);

    const hospPillarMat = new THREE.MeshStandardMaterial({ color: 0xe0d8c8, roughness: 0.5 });
    [[-2.5, -2.5], [-2.5, 2.5], [2.5, -2.5], [2.5, 2.5]].forEach(([px, pz]) => {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 3.2, 8), hospPillarMat);
      pillar.position.set(38 + px, 1.6, -10 + pz);
      pillar.castShadow = true;
      hospitalGroup.add(pillar);
    });

    // Cross symbol
    const crossMat = new THREE.MeshStandardMaterial({ color: 0xc58f58, emissive: 0xc58f58, emissiveIntensity: 0.3 });
    const c1 = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.8, 0.15), crossMat);
    c1.position.set(42, 7.3, -10.55);
    hospitalGroup.add(c1);
    const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.8, 0.15), crossMat);
    c2.position.set(42, 7.3, -10.55);
    hospitalGroup.add(c2);

    // Roof
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x8a7a68, roughness: 0.6 });
    const hospRoof = new THREE.Mesh(new THREE.BoxGeometry(24.5, 0.3, 15.5), roofMat);
    hospRoof.position.set(42, 7.15, -18);
    hospitalGroup.add(hospRoof);
    const wingRoof = new THREE.Mesh(new THREE.BoxGeometry(14.5, 0.3, 18.5), roofMat);
    wingRoof.position.set(47, 7.15, -2);
    hospitalGroup.add(wingRoof);

    scene.add(hospitalGroup);

    // ─── G+2 + Stilt Senior Residence Building Massing ────────────────────

    const resBuildingGroup = new THREE.Group();
    resBuildingGroup.name = 'residence-building-massing';
    resBuildingGroup.position.set(-22, 0, -22);

    const bldWallMat = new THREE.MeshStandardMaterial({ color: 0xe5dfd3, roughness: 0.65 });
    const bldAccentMat = new THREE.MeshStandardMaterial({ color: 0x24363d, roughness: 0.6 });

    // Stilt parking base & columns
    const stiltBase = new THREE.Mesh(new THREE.BoxGeometry(14, 0.3, 12), bldAccentMat);
    stiltBase.position.set(0, 0.15, 0);
    resBuildingGroup.add(stiltBase);

    // Stilt support columns
    [[-5.5, -4.5], [5.5, -4.5], [-5.5, 4.5], [5.5, 4.5], [0, 0]].forEach(([cx, cz]) => {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.2, 0.5), bldWallMat);
      col.position.set(cx, 1.25, cz);
      col.castShadow = true;
      resBuildingGroup.add(col);
    });

    // 3 Residential Floors Massing (G+2)
    const upperFloors = new THREE.Mesh(new THREE.BoxGeometry(14.2, 6.2, 12.2), bldWallMat);
    upperFloors.position.set(0, 5.5, 0);
    upperFloors.castShadow = true;
    upperFloors.receiveShadow = true;
    resBuildingGroup.add(upperFloors);

    // Glazed window ribbons
    for (let wy = 3.5; wy <= 7.5; wy += 2.0) {
      const winFront = new THREE.Mesh(new THREE.PlaneGeometry(10, 0.9), hospGlassMat);
      winFront.position.set(0, wy, 6.12);
      resBuildingGroup.add(winFront);
    }

    // Lift overrun core
    const liftCore = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.8, 3.5), bldAccentMat);
    liftCore.position.set(0, 9.5, 0);
    resBuildingGroup.add(liftCore);

    scene.add(resBuildingGroup);

    // ─── Community Mandir (Western Edge) ──────────────────────────────────

    const mandirGroup = new THREE.Group();
    mandirGroup.name = 'mandir-landmark';

    // Stepped plinth
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0xc8b898, roughness: 0.6 });
    const plinth1 = new THREE.Mesh(new THREE.BoxGeometry(12, 0.4, 12), plinthMat);
    plinth1.position.set(-46, 0.2, 18);
    mandirGroup.add(plinth1);
    const plinth2 = new THREE.Mesh(new THREE.BoxGeometry(10, 0.4, 10), plinthMat);
    plinth2.position.set(-46, 0.6, 18);
    mandirGroup.add(plinth2);

    // Main sanctum
    const mandirWallMat = new THREE.MeshStandardMaterial({ color: 0xd8c8a8, roughness: 0.55 });
    const sanctum = new THREE.Mesh(new THREE.BoxGeometry(8, 3.5, 8), mandirWallMat);
    sanctum.position.set(-46, 2.55, 18);
    sanctum.castShadow = true;
    mandirGroup.add(sanctum);

    // Mandapa columns (front)
    const colMat = new THREE.MeshStandardMaterial({ color: 0xd4c4a4, roughness: 0.5 });
    [-3, -1, 1, 3].forEach((cx) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 3.0, 8), colMat);
      col.position.set(-46 + cx, 2.3, 22.2);
      col.castShadow = true;
      mandirGroup.add(col);
    });

    // Shikhara (curved tower)
    const shikhara = new THREE.Mesh(
      new THREE.ConeGeometry(4.2, 6.0, 8),
      new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.3, metalness: 0.65 })
    );
    shikhara.position.set(-46, 7.3, 18);
    shikhara.castShadow = true;
    mandirGroup.add(shikhara);

    // Kalasha gold pinnacle
    const kalasha = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.15, metalness: 0.9 })
    );
    kalasha.position.set(-46, 10.5, 18);
    mandirGroup.add(kalasha);

    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.25, 0.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.15, metalness: 0.9 })
    );
    neck.position.set(-46, 10.05, 18);
    mandirGroup.add(neck);

    scene.add(mandirGroup);

    // ─── 64 Residential Plots (Blocks A–F) ────────────────────────────────

    const plotMeshes: { [plotNumber: number]: THREE.Mesh } = {};
    const plotGrassBaseMat = new THREE.MeshStandardMaterial({
      map: plotGrassTex,
      color: 0x2a5447,
      roughness: 0.85
    });
    const plotBorderMat = new THREE.LineBasicMaterial({ color: 0xe0ab77, transparent: true, opacity: 0.5 });
    const cornerStoneMat = new THREE.MeshStandardMaterial({ color: 0xf5f0e6, roughness: 0.75 });
    const cornerStoneGeo = new THREE.BoxGeometry(0.25, 0.5, 0.25);

    allPlots.forEach((plot) => {
      const blockIndex = ['Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F'].indexOf(plot.block);
      const indexInBlock = (plot.number - 1) % 11;
      const isNorthRow = indexInBlock < 6;

      const width = Math.min(8.2, 4.0 + plot.sizeSqYd / 95);
      const depth = Math.min(9.2, 5.2 + plot.sizeSqYd / 80);

      const blockStartX = -44 + blockIndex * 15.5;
      const posX = blockStartX + (indexInBlock % 3) * 4.8;
      const posZ = isNorthRow
        ? 15 + Math.floor(indexInBlock / 3) * 8.0
        : -15 - Math.floor((indexInBlock - 6) / 3) * 8.0;

      // Flat ground-level plot (height 0.06 instead of 0.7)
      const plotGeo = new THREE.BoxGeometry(width, 0.06, depth);
      const plotMesh = new THREE.Mesh(plotGeo, plotGrassBaseMat.clone());
      plotMesh.position.set(posX, 0.03, posZ);
      plotMesh.receiveShadow = true;
      plotMesh.userData = { plot };

      // Subtle gold border
      const edges = new THREE.EdgesGeometry(plotGeo);
      const line = new THREE.LineSegments(edges, plotBorderMat.clone());
      plotMesh.add(line);

      // Corner boundary stone posts
      [
        [-width / 2, 0.25, -depth / 2],
        [width / 2, 0.25, -depth / 2],
        [-width / 2, 0.25, depth / 2],
        [width / 2, 0.25, depth / 2]
      ].forEach(([sx, sy, sz]) => {
        const stone = new THREE.Mesh(cornerStoneGeo, cornerStoneMat);
        stone.position.set(sx, sy, sz);
        stone.castShadow = true;
        plotMesh.add(stone);
      });

      scene.add(plotMesh);
      plotMeshes[plot.number] = plotMesh;
    });

    plotMeshesRef.current = plotMeshes;

    // ─── Internal Roads (11ft lanes between blocks) ───────────────────────

    const intRoadMat = new THREE.MeshStandardMaterial({ color: 0x3a3e40, roughness: 0.7 });
    for (let bi = 0; bi < 5; bi++) {
      const rx = -44 + (bi + 1) * 15.5 - 7.75;
      const road = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.08, 26), intRoadMat);
      road.position.set(rx, 0.04, 18);
      road.receiveShadow = true;
      scene.add(road);
    }

    // ─── Landscaping ──────────────────────────────────────────────────────

    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.8 });

    const createTree = (tx: number, tz: number, variant: 'round' | 'conifer' = 'round', s = 1.0) => {
      const tree = new THREE.Group();
      tree.position.set(tx, 0.05, tz);
      tree.scale.set(s, s, s);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 1.5, 8), treeTrunkMat);
      trunk.position.set(0, 0.75, 0);
      trunk.castShadow = true;
      tree.add(trunk);

      if (variant === 'round') {
        const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1f5a3d, roughness: 0.85, flatShading: true });
        const foliage = new THREE.Mesh(new THREE.SphereGeometry(1.3, 8, 8), foliageMat);
        foliage.position.set(0, 2.1, 0);
        foliage.castShadow = true;
        tree.add(foliage);
      } else {
        const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1e4a32, roughness: 0.85, flatShading: true });
        const f1 = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.8, 7), foliageMat);
        f1.position.set(0, 2.2, 0);
        f1.castShadow = true;
        tree.add(f1);
        const f2 = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.4, 7), foliageMat);
        f2.position.set(0, 3.0, 0);
        tree.add(f2);
      }

      scene.add(tree);
    };

    // Avenue trees along main road
    for (let x = -55; x <= 55; x += 10) {
      createTree(x, 6.5, 'round', 0.9);
      createTree(x, -6.5, 'round', 0.9);
    }

    // Trees along green buffers
    for (let x = -50; x <= 50; x += 8) {
      createTree(x, 37.5, 'conifer', 0.7);
      createTree(x, -37.5, 'conifer', 0.7);
    }

    if (!isMobile) {
      createTree(34, -22, 'round', 1.1);
      createTree(55, -14, 'round', 1.0);
      createTree(55, 6, 'conifer', 0.9);
      createTree(-52, 12, 'round', 0.8);
      createTree(-52, 24, 'conifer', 0.9);
      createTree(-40, 25, 'round', 0.8);
    }

    // ─── Contact Shadow under plots area ──────────────────────────────────

    const contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(120, 80),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.08 })
    );
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.set(0, 0.01, 0);
    scene.add(contactShadow);

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
          Math.min(Math.PI / 2 - 0.08, orbitRef.current.targetPhi - deltaY * 0.006)
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
            mat.emissiveIntensity = 0.4;
            selectedPlotMeshRef.current = hitMesh;

            setSelectedPlotId(hitPlot.id);
            if (onSelectPlot) onSelectPlot(hitPlot);

            orbitRef.current.targetLookAt.set(
              hitMesh.position.x,
              0,
              hitMesh.position.z
            );
            orbitRef.current.targetRadius = 40;
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRef.current.targetRadius = Math.max(
        25,
        Math.min(115, orbitRef.current.targetRadius + e.deltaY * 0.04)
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
        orbitRef.current.targetTheta -= dx * 0.006;
        orbitRef.current.targetPhi = Math.max(0.15, Math.min(Math.PI / 2 - 0.08, orbitRef.current.targetPhi - dy * 0.006));
      } else if (e.touches.length === 2) {
        const newDist = Math.hypot(
          e.touches[1].clientX - e.touches[0].clientX,
          e.touches[1].clientY - e.touches[0].clientY
        );
        const delta = touchStartDist - newDist;
        orbitRef.current.targetRadius = Math.max(25, Math.min(115, orbitRef.current.targetRadius + delta * 0.08));
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
  }, [updateCameraPosition, onSelectPlot]);

  const handlePresetView = (preset: 'isometric' | 'top' | 'hospital' | 'highway' | 'residence') => {
    setViewPreset(preset);
    if (preset === 'isometric') {
      orbitRef.current.targetTheta = Math.PI / 4.2;
      orbitRef.current.targetPhi = Math.PI / 3.4;
      orbitRef.current.targetRadius = 75;
      orbitRef.current.targetLookAt.set(0, 0, 0);
    } else if (preset === 'top') {
      orbitRef.current.targetTheta = 0;
      orbitRef.current.targetPhi = 0.12;
      orbitRef.current.targetRadius = 90;
      orbitRef.current.targetLookAt.set(0, 0, 0);
    } else if (preset === 'hospital') {
      orbitRef.current.targetTheta = -Math.PI / 3;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 45;
      orbitRef.current.targetLookAt.set(42, 3, -10);
    } else if (preset === 'highway') {
      orbitRef.current.targetTheta = 0;
      orbitRef.current.targetPhi = Math.PI / 2.8;
      orbitRef.current.targetRadius = 55;
      orbitRef.current.targetLookAt.set(0, 1, 0);
    } else if (preset === 'residence') {
      orbitRef.current.targetTheta = Math.PI / 3;
      orbitRef.current.targetPhi = Math.PI / 3.0;
      orbitRef.current.targetRadius = 42;
      orbitRef.current.targetLookAt.set(-22, 3, -22);
    }
  };

  const selectedPlot = allPlots.find((p) => p.id === selectedPlotId) || allPlots[0];

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl bg-[#0B1E24] border border-[#14353E] shadow-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[620px] sm:h-[720px]'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none block touch-none"
      />

      {isLoading && (
        <div className="absolute inset-0 bg-[#0B1E24] flex items-center justify-center text-white">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-[#C58F58]" />
            <span className="text-sm font-mono uppercase tracking-widest text-[#FAF8F5]">
              Loading 3D Master Plan...
            </span>
          </div>
        </div>
      )}

      {/* Top Header HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2329]/90 backdrop-blur-md border border-[#C58F58]/30 text-xs text-white pointer-events-auto shadow-lg">
          <Compass className="w-4 h-4 text-[#C58F58]" />
          <span className="font-bold font-mono tracking-wider text-xs">
            64 Freehold Plots Master Plan (CAD-Derived)
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono uppercase">
            Proposed Vision
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="hidden sm:flex items-center bg-[#0D2329]/90 backdrop-blur-md border border-white/10 rounded-2xl p-1 shadow-lg text-xs font-semibold">
            <button
              onClick={() => handlePresetView('isometric')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewPreset === 'isometric' ? 'bg-[#2C5E50] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              3D Orbit
            </button>
            <button
              onClick={() => handlePresetView('top')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewPreset === 'top' ? 'bg-[#2C5E50] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Site Layout
            </button>
            <button
              onClick={() => handlePresetView('hospital')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewPreset === 'hospital' ? 'bg-[#2C5E50] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Hospital Zone
            </button>
            <button
              onClick={() => handlePresetView('residence')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewPreset === 'residence' ? 'bg-[#2C5E50] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Residence Building
            </button>
            <button
              onClick={() => handlePresetView('highway')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                viewPreset === 'highway' ? 'bg-[#2C5E50] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              SH-22 Highway
            </button>
          </div>

          {onToggle2DView && (
            <button
              onClick={onToggle2DView}
              className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs text-white font-medium transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#C58F58]" />
              <span className="hidden sm:inline">2D CAD</span> Grid
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-2xl bg-[#0D2329]/90 hover:bg-[#14353E] backdrop-blur-md border border-white/10 text-white transition-all shadow-lg cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Left Block Filter Bar */}
      <div className="absolute left-4 top-20 flex flex-col gap-1.5 pointer-events-auto z-20 max-w-[140px]">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C58F58] font-bold px-1">
          Filter Block
        </span>
        {['All', 'Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F'].map((blk) => (
          <button
            key={blk}
            onClick={() => setSelectedBlock(blk)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium text-left border transition-all backdrop-blur-md shadow-md cursor-pointer ${
              selectedBlock === blk
                ? 'bg-[#2C5E50] text-white border-emerald-400 font-bold'
                : 'bg-[#0D2329]/80 border-white/10 text-white/70 hover:bg-[#14353E]'
            }`}
          >
            {blk}
          </button>
        ))}
      </div>

      {/* Right Selected Plot Card */}
      <div className="absolute right-4 top-20 max-w-xs w-full bg-[#0D2329]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-5 text-white shadow-2xl z-20 space-y-4 pointer-events-auto">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#C58F58] font-bold tracking-widest block">
              {selectedPlot.block}
            </span>
            <h4 className="text-xl font-serif-heading font-bold text-[#FAF8F5]">
              {selectedPlot.plotNumber}
            </h4>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            Phase 1 Priority
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-white/50 block">Plot Size</span>
            <strong className="text-sm text-[#FAF8F5]">{selectedPlot.sizeSqYd} sq. yd.</strong>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-white/50 block">Dimensions</span>
            <strong className="text-sm text-[#FAF8F5]">{selectedPlot.dimensions}</strong>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-white/50 block">Facing</span>
            <strong className="text-sm text-[#FAF8F5]">{selectedPlot.facing}</strong>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-white/50 block">Road Frontage</span>
            <strong className="text-sm text-[#C58F58]">{selectedPlot.roadWidth.split(' ')[0]} ft</strong>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs">
          <span className="text-[10px] text-white/50 uppercase font-mono block">Indicative Pricing Note</span>
          <p className="text-white/80 leading-relaxed font-light text-[11px]">
            Final pricing, exact boundary stones, and registration terms are confirmed during private on-site walk.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() =>
              openWhatsApp({
                actionType: 'reserve-plot',
                plotNumber: selectedPlot.plotNumber,
                plotBlock: selectedPlot.block,
                plotSize: `${selectedPlot.sizeSqYd} sq. yd.`,
                message: `Hello, I am interested in ${selectedPlot.plotNumber} (${selectedPlot.block}, ${selectedPlot.sizeSqYd} sq. yd.) from the 3D Master Plan. Please share site demarcation map and booking procedure.`
              })
            }
            className="w-full py-3 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C58F58]" />
            Enquire for {selectedPlot.plotNumber} on WhatsApp →
          </button>

          <button
            onClick={() =>
              openLeadDrawer({
                title: `Schedule Site Walk for ${selectedPlot.plotNumber}`,
                plotNumber: selectedPlot.plotNumber,
                plotBlock: selectedPlot.block,
                plotSize: `${selectedPlot.sizeSqYd} sq. yd.`
              })
            }
            className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition-all text-center cursor-pointer"
          >
            Book Physical Land Walk
          </button>
        </div>
      </div>

      {/* Bottom Landmark & Orientation Banner */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/60 pointer-events-none z-10 px-2">
        <div className="flex items-center gap-2 bg-[#0D2329]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
          <span>Click any Plot Parcel to Select • Drag to Orbit • Scroll to Zoom</span>
        </div>

        <div className="hidden md:flex items-center gap-4 bg-[#0D2329]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <span className="flex items-center gap-1.5 text-white/80">
            <Activity className="w-3.5 h-3.5 text-[#C58F58]" /> 30k Sq. Ft. Hospital
          </span>
          <span className="flex items-center gap-1.5 text-white/80">
            <Home className="w-3.5 h-3.5 text-emerald-400" /> Residence Building
          </span>
          <span className="flex items-center gap-1.5 text-white/80">
            <Heart className="w-3.5 h-3.5 text-[#C58F58]" /> Community Mandir
          </span>
          <span className="flex items-center gap-1.5 text-white/80">
            <Trees className="w-3.5 h-3.5 text-emerald-400" /> Green Buffers
          </span>
        </div>
      </div>
    </div>
  );
};
