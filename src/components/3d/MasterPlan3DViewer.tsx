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

// ─── High-Fidelity Masterplan Texture Generators ─────────────────────────────

function createMasterGroundTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Natural countryside meadow base
  ctx.fillStyle = '#2A4D34';
  ctx.fillRect(0, 0, 512, 512);

  // Field texture & organic agricultural grain
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

  // Asphalt base
  ctx.fillStyle = '#262A2C';
  ctx.fillRect(0, 0, 512, 128);

  // Asphalt aggregate flecks
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 128;
    const v = 38 + Math.random() * 25;
    ctx.fillStyle = `rgb(${v}, ${v + 2}, ${v + 4})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  // Yellow shoulder edge lines
  ctx.strokeStyle = '#D9A74A';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(512, 10);
  ctx.moveTo(0, 118);
  ctx.lineTo(512, 118);
  ctx.stroke();

  // Dashed white center line
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

  // Linear street block joints
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
  const [viewPreset, setViewPreset] = useState<'isometric' | 'top' | 'hospital' | 'highway' | 'residence' | 'mandir'>('isometric');
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
  const onSelectPlotRef = useRef(onSelectPlot);

  useEffect(() => {
    onSelectPlotRef.current = onSelectPlot;
  }, [onSelectPlot]);

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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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

    const curbStoneMat = new THREE.MeshStandardMaterial({ color: 0x9fa8ad, roughness: 0.6 });
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

    // Highway Signage Monolith
    const signGroup = new THREE.Group();
    const signPillar = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3.2, 0.6), bronzeAccentMat);
    signPillar.position.set(24, 1.6, 30);
    signGroup.add(signPillar);

    const signBoard = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.6, 0.25), new THREE.MeshStandardMaterial({ color: 0x0d2329, roughness: 0.4 }));
    signBoard.position.set(24, 3.2, 30);
    signBoard.castShadow = true;
    signGroup.add(signBoard);
    scene.add(signGroup);

    // ─── 3. Grand Entrance Gateway with Security Post ───────────────────────
    const gateGroup = new THREE.Group();
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

    // Security Gatehouse
    const guardHouse = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.8, 3.6), buildingWallMat);
    guardHouse.position.set(9.2, 1.4, 28);
    guardHouse.castShadow = true;
    guardHouse.receiveShadow = true;
    gateGroup.add(guardHouse);
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
    // CAD Dimensions: L-Shaped G+2, 117'-10" × 138' (approx 36m × 42m footprint)
    const hospitalGroup = new THREE.Group();
    hospitalGroup.name = 'proposed-hospital';

    // Main Hospital West Wing
    const hospMainWing = new THREE.Mesh(new THREE.BoxGeometry(26, 8.5, 16), buildingWallMat);
    hospMainWing.position.set(38, 4.25, -12);
    hospMainWing.castShadow = true;
    hospMainWing.receiveShadow = true;
    hospitalGroup.add(hospMainWing);

    // Hospital North OPD Wing (L-Shape extension)
    const hospOpdWing = new THREE.Mesh(new THREE.BoxGeometry(16, 8.5, 20), buildingWallMat);
    hospOpdWing.position.set(43, 4.25, 6);
    hospOpdWing.castShadow = true;
    hospOpdWing.receiveShadow = true;
    hospitalGroup.add(hospOpdWing);

    // Glazed Curtain Wall Atrium
    const hospAtriumGlass = new THREE.Mesh(new THREE.BoxGeometry(18, 7.5, 0.15), glassFacadeMat);
    hospAtriumGlass.position.set(38, 4.25, -3.9);
    hospitalGroup.add(hospAtriumGlass);

    // Covered Drop-off Canopy (Ambulance & Patient Portico)
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

    // Rooftop Red Crescent / Ayurvedic Emblem Signage
    const hospSign = new THREE.Mesh(new THREE.BoxGeometry(5.0, 1.2, 0.2), new THREE.MeshStandardMaterial({ color: 0x2c5e50, roughness: 0.3 }));
    hospSign.position.set(38, 9.2, -12);
    hospitalGroup.add(hospSign);
    scene.add(hospitalGroup);

    // ─── 6. Proposed Community Mandir ───────────────────────────────────────
    const mandirGroup = new THREE.Group();
    mandirGroup.name = 'community-mandir';

    // Stepped Sandstone Plinth
    const mandirPlinthMat = new THREE.MeshStandardMaterial({ color: 0xd8c8b0, roughness: 0.65 });
    const plinth1 = new THREE.Mesh(new THREE.BoxGeometry(14, 0.4, 14), mandirPlinthMat);
    plinth1.position.set(-44, 0.2, 16);
    mandirGroup.add(plinth1);

    const plinth2 = new THREE.Mesh(new THREE.BoxGeometry(11.5, 0.4, 11.5), mandirPlinthMat);
    plinth2.position.set(-44, 0.6, 16);
    mandirGroup.add(plinth2);

    // Mandapa Sanctum Hall
    const mandirHall = new THREE.Mesh(new THREE.BoxGeometry(9, 3.8, 9), mandirPlinthMat);
    mandirHall.position.set(-44, 2.7, 16);
    mandirHall.castShadow = true;
    mandirGroup.add(mandirHall);

    // Mandapa Pillars
    [-3.2, -1.1, 1.1, 3.2].forEach((cx) => {
      const pCol = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 3.2, 8), mandirPlinthMat);
      pCol.position.set(-44 + cx, 2.3, 20.8);
      pCol.castShadow = true;
      mandirGroup.add(pCol);
    });

    // Carved Shikhara Tower
    const shikhara = new THREE.Mesh(
      new THREE.ConeGeometry(4.4, 6.8, 8),
      new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.35, metalness: 0.55 })
    );
    shikhara.position.set(-44, 8.0, 16);
    shikhara.castShadow = true;
    mandirGroup.add(shikhara);

    // Gold Kalasha & Dhwaja Flag
    const kalasha = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.15, metalness: 0.9 })
    );
    kalasha.position.set(-44, 11.6, 16);
    mandirGroup.add(kalasha);
    scene.add(mandirGroup);

    // ─── 7. Proposed 9-Unit G+2 Residential Building (Plots 63 & 64) ────────
    const residenceGroup = new THREE.Group();
    residenceGroup.name = 'proposed-residence-building';
    residenceGroup.position.set(31.5, 0, -22); // Sited on Plots 63 & 64

    // Stilt Level with open column bays
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

    // Ground Floor (Units 01-03)
    const gf = new THREE.Mesh(new THREE.BoxGeometry(13.6, 1.6, 9.4), buildingWallMat);
    gf.position.set(0, 2.7, 0);
    gf.castShadow = true;
    residenceGroup.add(gf);

    // First Floor (Units 04-06)
    const ff = new THREE.Mesh(new THREE.BoxGeometry(13.6, 1.6, 9.4), buildingWallMat);
    ff.position.set(0, 4.3, 0);
    ff.castShadow = true;
    residenceGroup.add(ff);

    // Second Floor (Units 07-09)
    const sf = new THREE.Mesh(new THREE.BoxGeometry(13.6, 1.6, 9.4), buildingWallMat);
    sf.position.set(0, 5.9, 0);
    sf.castShadow = true;
    residenceGroup.add(sf);

    // Roof Parapet & Lift Headroom
    const rf = new THREE.Mesh(new THREE.BoxGeometry(14, 0.3, 9.8), buildingWallMat);
    rf.position.set(0, 6.85, 0);
    rf.castShadow = true;
    residenceGroup.add(rf);

    const liftCore = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.2, 2.8), bronzeAccentMat);
    liftCore.position.set(0, 7.6, -2.5);
    liftCore.castShadow = true;
    residenceGroup.add(liftCore);

    scene.add(residenceGroup);

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

      // Flat Ground Plot Slab (0.08m height)
      const plotGeo = new THREE.BoxGeometry(width, 0.08, depth);
      const plotMesh = new THREE.Mesh(plotGeo, plotBaseMat.clone());
      plotMesh.position.set(posX, 0.04, posZ);
      plotMesh.receiveShadow = true;
      plotMesh.userData = { plot };

      // 4 White Demarcation Corner Boundary Stones
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

    // ─── 9. Surrounding Green Buffer Canopy Trees ───────────────────────────
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1f4a2c, roughness: 0.8 });
    const treeGeo = new THREE.SphereGeometry(1.6, 8, 8);
    const trunkGeo = new THREE.CylinderGeometry(0.18, 0.25, 2.8, 6);

    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      const r = 62 + (i % 3) * 6;
      const tx = Math.cos(angle) * r;
      const tz = Math.sin(angle) * r;

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(tx, 1.4, tz);
      trunk.castShadow = true;
      scene.add(trunk);

      const crown = new THREE.Mesh(treeGeo, foliageMat);
      crown.position.set(tx, 3.6, tz);
      crown.scale.set(1.0, 1.2 + (i % 3) * 0.2, 1.0);
      crown.castShadow = true;
      scene.add(crown);
    }

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
            if (onSelectPlotRef.current) onSelectPlotRef.current(hitPlot);

            orbitRef.current.targetLookAt.set(
              hitMesh.position.x,
              0,
              hitMesh.position.z
            );
            orbitRef.current.targetRadius = 42;
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
        orbitRef.current.targetTheta -= dx * 0.006;
        orbitRef.current.targetPhi = Math.max(0.15, Math.min(Math.PI / 2 - 0.06, orbitRef.current.targetPhi - dy * 0.006));
      } else if (e.touches.length === 2) {
        const newDist = Math.hypot(
          e.touches[1].clientX - e.touches[0].clientX,
          e.touches[1].clientY - e.touches[0].clientY
        );
        const delta = touchStartDist - newDist;
        orbitRef.current.targetRadius = Math.max(25, Math.min(120, orbitRef.current.targetRadius + delta * 0.08));
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
        orbitRef.current.targetTheta += 0.0004;
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

  // ─── Camera Preset Views ──────────────────────────────────────────────────

  const handlePresetView = (preset: 'isometric' | 'top' | 'hospital' | 'highway' | 'residence' | 'mandir') => {
    setViewPreset(preset);
    if (preset === 'isometric') {
      orbitRef.current.targetTheta = Math.PI / 4.2;
      orbitRef.current.targetPhi = Math.PI / 3.4;
      orbitRef.current.targetRadius = 78;
      orbitRef.current.targetLookAt.set(0, 0, 0);
    } else if (preset === 'top') {
      orbitRef.current.targetTheta = 0;
      orbitRef.current.targetPhi = 0.12;
      orbitRef.current.targetRadius = 95;
      orbitRef.current.targetLookAt.set(0, 0, 0);
    } else if (preset === 'hospital') {
      orbitRef.current.targetTheta = -Math.PI / 3;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 48;
      orbitRef.current.targetLookAt.set(38, 4, -4);
    } else if (preset === 'mandir') {
      orbitRef.current.targetTheta = Math.PI / 3;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 45;
      orbitRef.current.targetLookAt.set(-44, 4, 16);
    } else if (preset === 'highway') {
      orbitRef.current.targetTheta = Math.PI / 2.05;
      orbitRef.current.targetPhi = Math.PI / 2.6;
      orbitRef.current.targetRadius = 55;
      orbitRef.current.targetLookAt.set(0, 2, 32);
    } else if (preset === 'residence') {
      orbitRef.current.targetTheta = -Math.PI / 3.5;
      orbitRef.current.targetPhi = Math.PI / 3.2;
      orbitRef.current.targetRadius = 40;
      orbitRef.current.targetLookAt.set(31.5, 4, -22);
    }
  };

  const selectedPlot = allPlots.find((p) => p.id === selectedPlotId) || allPlots[0];

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden bg-[#071519] border border-[#163942] shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[620px] sm:h-[720px]'
      }`}
    >
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
          <span>PROPOSED 64-PLOT MASTER PLAN CGI</span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold backdrop-blur-md shadow-lg pointer-events-auto">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>64 Plots · 6 Blocks (A to F)</span>
        </div>
      </div>

      {/* Top Right View Preset Toolbar */}
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
          SH-22 Entry
        </button>

        <button
          onClick={() => handlePresetView('top')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            viewPreset === 'top' ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
          }`}
        >
          Top View
        </button>

        <div className="h-4 w-px bg-white/20 mx-1" />

        {onToggle2DView && (
          <button
            onClick={onToggle2DView}
            className="px-2.5 py-1.5 rounded-xl text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            2D Grid
          </button>
        )}

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Selected Plot Floating Card */}
      {selectedPlot && (
        <div className="absolute right-4 bottom-16 sm:bottom-20 max-w-xs w-full bg-[#071519]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-5 text-white shadow-2xl z-20 space-y-3 pointer-events-auto">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
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
              onClick={() =>
                openLeadDrawer({
                  title: `Schedule Site Walk for ${selectedPlot.plotNumber}`,
                  plotNumber: selectedPlot.plotNumber,
                  plotBlock: selectedPlot.block,
                  actionType: 'book-site-visit'
                })
              }
              className="w-full py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition-all text-center cursor-pointer"
            >
              Book Ground Site Walk
            </button>
          </div>
        </div>
      )}

      {/* Bottom HUD */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/60 pointer-events-none z-10 px-2">
        <div className="flex items-center gap-2 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
          <span className="hidden sm:inline">Click Any Plot on 3D Ground to Inspect Dimensions &amp; Inquire</span>
          <span className="sm:hidden">Tap Any Plot to Inspect</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white/60">
          <MapPin className="w-3.5 h-3.5 text-[#C58F58]" />
          <span>Kheri Asra, SH-22 Jhajjar</span>
        </div>
      </div>
    </div>
  );
};
