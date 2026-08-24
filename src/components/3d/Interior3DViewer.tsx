'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  ArrowRight
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

// ─── Procedural Canvas Texture Generators ────────────────────────────────────

function createWoodPlankTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#845B3E';
  ctx.fillRect(0, 0, 256, 256);

  // Planks
  const plankH = 32;
  for (let y = 0; y < 256; y += plankH) {
    const shift = (y / plankH) % 2 === 0 ? 0 : 64;
    for (let x = -64; x < 320; x += 128) {
      const px = x + shift;
      const shade = 120 + Math.random() * 25;
      ctx.fillStyle = `rgb(${shade + 10}, ${shade - 25}, ${shade - 50})`;
      ctx.fillRect(px + 1, y + 1, 126, plankH - 2);

      // Fine grain inside plank
      for (let gy = 0; gy < plankH - 2; gy += 3) {
        ctx.strokeStyle = `rgba(60, 35, 15, 0.15)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px + 1, y + 1 + gy);
        ctx.lineTo(px + 127, y + 1 + gy + (Math.random() * 2 - 1));
        ctx.stroke();
      }
    }
    // Horizontal seam
    ctx.strokeStyle = 'rgba(40, 25, 10, 0.6)';
    ctx.lineWidth = 1.5;
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

function createFabricTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#DCD3C4';
  ctx.fillRect(0, 0, 128, 128);

  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const v = 200 + Math.random() * 35;
    ctx.fillStyle = `rgb(${v}, ${v - 5}, ${v - 15})`;
    ctx.fillRect(x, y, 1, 1);
  }

  // Cross-weave pattern
  ctx.strokeStyle = 'rgba(160, 145, 130, 0.2)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 128; i += 4) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 128);
    ctx.moveTo(0, i);
    ctx.lineTo(128, i);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  return tex;
}

function createMarbleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#ECE9E2';
  ctx.fillRect(0, 0, 256, 256);

  // Soft subtle veins
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i++) {
    ctx.strokeStyle = 'rgba(160, 155, 145, 0.25)';
    ctx.beginPath();
    let cx = Math.random() * 256;
    let cy = 0;
    ctx.moveTo(cx, cy);
    while (cy < 256) {
      cx += (Math.random() - 0.5) * 30;
      cy += 20 + Math.random() * 30;
      ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createBathTileTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#A0A8A6';
  ctx.fillRect(0, 0, 128, 128);

  // Anti-skid stipple noise
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const g = 145 + Math.random() * 30;
    ctx.fillStyle = `rgb(${g - 10}, ${g + 5}, ${g})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Tile grout grid (300mm x 300mm scale)
  ctx.strokeStyle = 'rgba(70, 80, 80, 0.45)';
  ctx.lineWidth = 1.5;
  for (let p = 0; p <= 128; p += 32) {
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, 128);
    ctx.moveTo(0, p);
    ctx.lineTo(128, p);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

// ─── Disposal Helper ─────────────────────────────────────────────────────────

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

// ─── Main Component ──────────────────────────────────────────────────────────

export const Interior3DViewer: React.FC<Interior3DViewerProps> = ({
  unitType = '1-bhk',
  initialRoom = 'bedroom',
  onToggle2DBlueprint,
  onToggle2DPlans
}) => {
  const handleToggle2D = onToggle2DBlueprint || onToggle2DPlans;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openWhatsApp } = useModal();

  const [activeRoom, setActiveRoom] = useState<'bedroom' | 'living' | 'kitchen' | 'bathroom'>(initialRoom);
  const [selectedHotspot, setSelectedHotspot] = useState<SafetyHotspot | null>(SAFETY_HOTSPOTS[3]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const roomGroupsRef = useRef<{ [key: string]: THREE.Group }>({});
  const activeRoomRef = useRef<'bedroom' | 'living' | 'kitchen' | 'bathroom'>(initialRoom);
  const animationFrameId = useRef<number | null>(null);
  const hotspotMarkersRef = useRef<THREE.Group[]>([]);

  const orbitRef = useRef({
    radius: 4.8,
    theta: Math.PI / 4,
    phi: Math.PI / 2.3, // Eye level human height (~1.45m)
    target: new THREE.Vector3(0, 1.45, 0),
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRadius: 4.8,
    targetTheta: Math.PI / 4,
    targetPhi: Math.PI / 2.3,
    targetLookAt: new THREE.Vector3(0, 1.45, 0)
  });

  useEffect(() => {
    activeRoomRef.current = activeRoom;
    // Immediate visibility toggle
    Object.keys(roomGroupsRef.current).forEach((key) => {
      const grp = roomGroupsRef.current[key];
      if (grp) grp.visible = key === activeRoom;
    });
  }, [activeRoom]);

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

  // Single mount effect — NO activeRoom dependency to eliminate re-renders on room switch
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0c1e24);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
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

    // ─── Textures ──────────────────────────────────────────────────────────
    const woodTex = createWoodPlankTexture();
    const fabricTex = createFabricTexture();
    const marbleTex = createMarbleTexture();
    const bathTileTex = createBathTileTexture();

    // ─── Lighting ──────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xfff5e8, 0.9);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffeedd, 0x3d3025, 0.6);
    scene.add(hemiLight);

    // Warm central chandelier/downlight
    const ceilingPendant = new THREE.PointLight(0xffeedd, 2.0, 10);
    ceilingPendant.position.set(0, 2.7, 0);
    ceilingPendant.castShadow = true;
    ceilingPendant.shadow.bias = -0.002;
    ceilingPendant.shadow.mapSize.width = isMobile ? 512 : 1024;
    ceilingPendant.shadow.mapSize.height = isMobile ? 512 : 1024;
    scene.add(ceilingPendant);

    // Bedside accent warm light
    const bedsideWarm = new THREE.PointLight(0xffbb66, 1.2, 5);
    bedsideWarm.position.set(-1.8, 1.3, -1.0);
    scene.add(bedsideWarm);

    // Daylight through window
    const windowLight = new THREE.DirectionalLight(0xd9ecf2, 1.5);
    windowLight.position.set(-5, 4, 3);
    windowLight.castShadow = true;
    windowLight.shadow.bias = -0.001;
    scene.add(windowLight);

    // ─── Base Materials ────────────────────────────────────────────────────
    const woodFloorMat = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.35,
      bumpMap: woodTex,
      bumpScale: 0.015
    });
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf5f0e6, roughness: 0.85 });
    const accentWallMat = new THREE.MeshStandardMaterial({ color: 0x1f3c36, roughness: 0.8 });
    const skirtingMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x3d281a, roughness: 0.5 });
    const bronzeMat = new THREE.MeshStandardMaterial({ color: 0xc58f58, metalness: 0.85, roughness: 0.25 });
    const fabricMat = new THREE.MeshStandardMaterial({
      map: fabricTex,
      roughness: 0.85,
      bumpMap: fabricTex,
      bumpScale: 0.02
    });

    // ─── Room Enclosure Envelope (6.2m x 3.0m x 6.2m) ──────────────────────
    const roomEnclosure = new THREE.Group();

    // Floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 6.2), woodFloorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomEnclosure.add(floor);

    // Ceiling
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0xfbf9f5, roughness: 0.9 });
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 6.2), ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 3.0;
    roomEnclosure.add(ceiling);

    // Back accent wall
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 3.0), accentWallMat);
    backWall.position.set(0, 1.5, -3.1);
    backWall.receiveShadow = true;
    roomEnclosure.add(backWall);

    // Left wall with window opening
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 3.0), wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-3.1, 1.5, 0);
    leftWall.receiveShadow = true;
    roomEnclosure.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 3.0), wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(3.1, 1.5, 0);
    rightWall.receiveShadow = true;
    roomEnclosure.add(rightWall);

    // Skirting baseboards (100mm height around base)
    const baseboardGeoH = new THREE.BoxGeometry(6.2, 0.1, 0.04);
    const baseboardGeoV = new THREE.BoxGeometry(0.04, 0.1, 6.2);

    const bbBack = new THREE.Mesh(baseboardGeoH, skirtingMat);
    bbBack.position.set(0, 0.05, -3.08);
    roomEnclosure.add(bbBack);

    const bbLeft = new THREE.Mesh(baseboardGeoV, skirtingMat);
    bbLeft.position.set(-3.08, 0.05, 0);
    roomEnclosure.add(bbLeft);

    const bbRight = new THREE.Mesh(baseboardGeoV, skirtingMat);
    bbRight.position.set(3.08, 0.05, 0);
    roomEnclosure.add(bbRight);

    // Window frame on left wall
    const windowFrameMat = new THREE.MeshStandardMaterial({ color: 0x142024, roughness: 0.35 });
    const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.8, 2.4), windowFrameMat);
    windowFrame.position.set(-3.05, 1.6, 0.4);
    roomEnclosure.add(windowFrame);

    // Sheer daylight curtain
    const curtainMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.65,
      roughness: 0.9
    });
    const curtain = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.4), curtainMat);
    curtain.rotation.y = Math.PI / 2;
    curtain.position.set(-2.98, 1.5, 0.4);
    roomEnclosure.add(curtain);

    scene.add(roomEnclosure);

    // ─── Hotspot Visual Markers ────────────────────────────────────────────
    const hotspotGroups: THREE.Group[] = [];
    SAFETY_HOTSPOTS.forEach((hs) => {
      const hsGroup = new THREE.Group();
      hsGroup.position.set(...hs.position);
      hsGroup.userData = { hotspot: hs };

      // Glowing pulsing ring
      const ringGeo = new THREE.RingGeometry(0.08, 0.12, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xc58f58,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.lookAt(camera.position);
      hsGroup.add(ring);

      const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xffe0b2 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      hsGroup.add(dot);

      scene.add(hsGroup);
      hotspotGroups.push(hsGroup);
    });
    hotspotMarkersRef.current = hotspotGroups;

    // ─── ROOM-SPECIFIC 3D FURNITURE GROUPS ─────────────────────────────────
    const roomGroups: { [key: string]: THREE.Group } = {};

    // 1. MASTER BEDROOM
    const bedGroup = new THREE.Group();

    // Area Rug
    const rug = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 3.2),
      new THREE.MeshStandardMaterial({ map: fabricTex, color: 0xb8aaa0, roughness: 0.95 })
    );
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.02, -0.4);
    rug.receiveShadow = true;
    bedGroup.add(rug);

    // Headboard with fabric upholstery & wood trim
    const headboard = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.2, 0.18),
      fabricMat
    );
    headboard.position.set(0, 0.8, -2.95);
    headboard.castShadow = true;
    bedGroup.add(headboard);

    const headboardTrim = new THREE.Mesh(
      new THREE.BoxGeometry(2.46, 1.26, 0.04),
      bronzeMat
    );
    headboardTrim.position.set(0, 0.8, -2.98);
    bedGroup.add(headboardTrim);

    // Bed Base & Orthopaedic Mattress (Senior-friendly 500mm height)
    const bedBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.35, 2.3),
      darkWoodMat
    );
    bedBase.position.set(0, 0.2, -1.7);
    bedBase.castShadow = true;
    bedBase.receiveShadow = true;
    bedGroup.add(bedBase);

    const mattress = new THREE.Mesh(
      new THREE.BoxGeometry(1.92, 0.25, 2.22),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 })
    );
    mattress.position.set(0, 0.45, -1.7);
    mattress.castShadow = true;
    bedGroup.add(mattress);

    // Pillows & Duvet with Fabric Texture
    const duvet = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.15, 1.6),
      fabricMat
    );
    duvet.position.set(0, 0.55, -1.35);
    duvet.castShadow = true;
    bedGroup.add(duvet);

    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.85 });
    const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.14, 0.45), pillowMat);
    p1.position.set(-0.55, 0.62, -2.5);
    bedGroup.add(p1);
    const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.14, 0.45), pillowMat);
    p2.position.set(0.55, 0.62, -2.5);
    bedGroup.add(p2);

    // Nightstands & Bedside Lamps (Low reach)
    const nightstandGeo = new THREE.BoxGeometry(0.55, 0.55, 0.5);
    const nsLeft = new THREE.Mesh(nightstandGeo, darkWoodMat);
    nsLeft.position.set(-1.45, 0.28, -2.7);
    nsLeft.castShadow = true;
    bedGroup.add(nsLeft);

    const nsRight = new THREE.Mesh(nightstandGeo, darkWoodMat);
    nsRight.position.set(1.45, 0.28, -2.7);
    nsRight.castShadow = true;
    bedGroup.add(nsRight);

    // Bedside table lamps
    [-1.45, 1.45].forEach((lx) => {
      const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.25, 8), bronzeMat);
      lampBase.position.set(lx, 0.68, -2.7);
      bedGroup.add(lampBase);

      const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 0.25, 12), new THREE.MeshStandardMaterial({ color: 0xffeedd, roughness: 0.5 }));
      shade.position.set(lx, 0.9, -2.7);
      bedGroup.add(shade);
    });

    // Wardrobe on Right Wall
    const wardrobe = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 2.5, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x3d2c20, roughness: 0.5, map: woodTex })
    );
    wardrobe.position.set(2.65, 1.25, 0.8);
    wardrobe.castShadow = true;
    bedGroup.add(wardrobe);

    // Wall Artwork above bed
    const artFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.8, 0.04),
      bronzeMat
    );
    artFrame.position.set(0, 1.9, -3.06);
    bedGroup.add(artFrame);

    const artCanvas = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 0.7),
      new THREE.MeshStandardMaterial({ color: 0xd0c4b0, roughness: 0.8 })
    );
    artCanvas.position.set(0, 1.9, -3.03);
    bedGroup.add(artCanvas);

    scene.add(bedGroup);
    roomGroups.bedroom = bedGroup;

    // 2. LIVING SALON
    const livingGroup = new THREE.Group();

    // Living Rug
    const livingRug = new THREE.Mesh(
      new THREE.PlaneGeometry(3.8, 3.4),
      new THREE.MeshStandardMaterial({ map: fabricTex, color: 0xa89f92, roughness: 0.95 })
    );
    livingRug.rotation.x = -Math.PI / 2;
    livingRug.position.set(0, 0.02, 0);
    livingRug.receiveShadow = true;
    livingGroup.add(livingRug);

    // 3-Seater Premium Sofa with Cushions
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0x244e43, roughness: 0.7, map: fabricTex });
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 0.95), sofaMat);
    sofaBase.position.set(0, 0.25, -2.2);
    sofaBase.castShadow = true;
    livingGroup.add(sofaBase);

    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.55, 0.3), sofaMat);
    sofaBack.position.set(0, 0.65, -2.55);
    sofaBack.castShadow = true;
    livingGroup.add(sofaBack);

    // Sofa arms
    [-1.25, 1.25].forEach((ax) => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.45, 0.95), sofaMat);
      arm.position.set(ax, 0.45, -2.2);
      arm.castShadow = true;
      livingGroup.add(arm);
    });

    // Accent Cushions
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.8 });
    const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.15), cushionMat);
    c1.position.set(-0.8, 0.6, -2.35);
    livingGroup.add(c1);
    const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.15), cushionMat);
    c2.position.set(0.8, 0.6, -2.35);
    livingGroup.add(c2);

    // Coffee Table with Marble Top and Bronze Legs
    const coffeeTableTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.06, 0.7),
      new THREE.MeshStandardMaterial({ map: marbleTex, roughness: 0.2, metalness: 0.1 })
    );
    coffeeTableTop.position.set(0, 0.42, -1.0);
    coffeeTableTop.castShadow = true;
    livingGroup.add(coffeeTableTop);

    // Table legs
    [[-0.6, -0.28], [0.6, -0.28], [-0.6, 0.28], [0.6, 0.28]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8), bronzeMat);
      leg.position.set(lx, 0.2, -1.0 + lz);
      livingGroup.add(leg);
    });

    // Media Console on Front Wall
    const mediaConsole = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.5, 0.45),
      new THREE.MeshStandardMaterial({ map: woodTex, color: 0x2a3d42, roughness: 0.45 })
    );
    mediaConsole.position.set(0, 0.25, 2.6);
    mediaConsole.castShadow = true;
    livingGroup.add(mediaConsole);

    // Wall TV with Slim Bezel
    const tv = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 1.0, 0.04),
      new THREE.MeshBasicMaterial({ color: 0x071519 })
    );
    tv.position.set(0, 1.5, 2.96);
    livingGroup.add(tv);

    const tvFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.84, 1.04, 0.02),
      new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.2 })
    );
    tvFrame.position.set(0, 1.5, 2.97);
    livingGroup.add(tvFrame);

    scene.add(livingGroup);
    roomGroups.living = livingGroup;

    // 3. MODULAR KITCHEN
    const kitchenGroup = new THREE.Group();

    // Quartz Countertops (L-Shaped with bevel edge)
    const counterMat = new THREE.MeshStandardMaterial({ map: marbleTex, roughness: 0.25, metalness: 0.1 });
    const cabMat = new THREE.MeshStandardMaterial({ color: 0x2a4045, roughness: 0.55 });

    // Main Counter
    const counter1 = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.85, 0.7), cabMat);
    counter1.position.set(-0.8, 0.425, -2.4);
    counter1.castShadow = true;
    kitchenGroup.add(counter1);

    const top1 = new THREE.Mesh(new THREE.BoxGeometry(2.84, 0.06, 0.74), counterMat);
    top1.position.set(-0.8, 0.88, -2.4);
    top1.castShadow = true;
    kitchenGroup.add(top1);

    // Return Counter
    const counter2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.85, 2.2), cabMat);
    counter2.position.set(-2.55, 0.425, -1.3);
    counter2.castShadow = true;
    kitchenGroup.add(counter2);

    const top2 = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.06, 2.24), counterMat);
    top2.position.set(-2.55, 0.88, -1.3);
    top2.castShadow = true;
    kitchenGroup.add(top2);

    // Stainless Undermount Sink & Gooseneck Mixer
    const sink = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.02, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.15 })
    );
    sink.position.set(-0.8, 0.915, -2.4);
    kitchenGroup.add(sink);

    const tap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.35, 8),
      bronzeMat
    );
    tap.position.set(-0.8, 1.05, -2.6);
    kitchenGroup.add(tap);

    // Induction Hob (Smooth glass surface with rings)
    const hob = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.02, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0.2 })
    );
    hob.position.set(-2.55, 0.915, -1.3);
    kitchenGroup.add(hob);

    // Upper Low-Reach Wall Cabinets (900mm mounting height)
    const upperCab = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.7, 0.38), cabMat);
    upperCab.position.set(-0.8, 1.85, -2.6);
    upperCab.castShadow = true;
    kitchenGroup.add(upperCab);

    // Cabinet Handles
    for (let hx = -1.8; hx <= 0.2; hx += 0.7) {
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.03), bronzeMat);
      handle.position.set(hx, 1.55, -2.4);
      kitchenGroup.add(handle);
    }

    scene.add(kitchenGroup);
    roomGroups.kitchen = kitchenGroup;

    // 4. SENIOR-SAFE BATHROOM
    const bathGroup = new THREE.Group();

    // R11 Anti-Skid Floor Finish
    const bathFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(6.0, 6.0),
      new THREE.MeshStandardMaterial({ map: bathTileTex, roughness: 0.85, bumpMap: bathTileTex, bumpScale: 0.02 })
    );
    bathFloor.rotation.x = -Math.PI / 2;
    bathFloor.position.y = 0.01;
    bathFloor.receiveShadow = true;
    bathGroup.add(bathFloor);

    // Zero-Threshold Shower Glass Screen
    const showerGlass = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 2.1, 1.6),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.88,
        opacity: 0.9,
        transparent: true,
        roughness: 0.08,
        ior: 1.5
      })
    );
    showerGlass.position.set(-1.0, 1.05, -1.8);
    showerGlass.castShadow = true;
    bathGroup.add(showerGlass);

    // Shower Glass Bronze Clamp/Header
    const showerHeader = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.04, 1.62),
      bronzeMat
    );
    showerHeader.position.set(-1.0, 2.12, -1.8);
    bathGroup.add(showerHeader);

    // Wall-Mounted Foldable Shower Seat
    const seatMat = new THREE.MeshStandardMaterial({ color: 0xFAF8F5, roughness: 0.45 });
    const showerSeat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.45), seatMat);
    showerSeat.position.set(-2.6, 0.45, -2.4);
    showerSeat.castShadow = true;
    bathGroup.add(showerSeat);

    // 32mm Continuous Stainless Steel Grab Rails (flanged)
    const createGrabRail = (gx: number, gy: number, gz: number, rotY = 0) => {
      const railGroup = new THREE.Group();
      railGroup.position.set(gx, gy, gz);
      railGroup.rotation.y = rotY;

      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.9, 8), bronzeMat);
      rail.rotation.z = Math.PI / 2;
      rail.castShadow = true;
      railGroup.add(rail);

      // Flanges at both ends
      [-0.45, 0.45].forEach((fx) => {
        const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 8), bronzeMat);
        flange.rotation.x = Math.PI / 2;
        flange.position.set(fx, 0, -0.03);
        railGroup.add(flange);
      });

      bathGroup.add(railGroup);
    };

    createGrabRail(-2.5, 0.9, -2.0, 0); // Shower rail
    createGrabRail(1.8, 0.85, -2.8, 0); // Toilet rail

    // Wall-Hung Commode with Soft-Close Lid
    const commode = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.38, 0.62),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 })
    );
    commode.position.set(1.8, 0.42, -2.6);
    commode.castShadow = true;
    bathGroup.add(commode);

    // Emergency Red Pull SOS Cord
    const cord = new THREE.Mesh(
      new THREE.CylinderGeometry(0.006, 0.006, 1.8, 6),
      new THREE.MeshBasicMaterial({ color: 0xff3333 })
    );
    cord.position.set(1.8, 1.8, -2.2);
    bathGroup.add(cord);

    const pullHandle = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xff1111 })
    );
    pullHandle.position.set(1.8, 0.9, -2.2);
    bathGroup.add(pullHandle);

    // Bathroom Vanity & Mirror
    const vanity = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.85, 0.55),
      new THREE.MeshStandardMaterial({ color: 0x2f454a, roughness: 0.5 })
    );
    vanity.position.set(0, 0.425, -2.7);
    bathGroup.add(vanity);

    const mirror = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 1.1),
      new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.95, roughness: 0.05 })
    );
    mirror.position.set(0, 1.6, -3.05);
    bathGroup.add(mirror);

    scene.add(bathGroup);
    roomGroups.bathroom = bathGroup;

    roomGroupsRef.current = roomGroups;

    // Apply initial room visibility
    Object.keys(roomGroups).forEach((key) => {
      roomGroups[key].visible = key === activeRoomRef.current;
    });

    // ─── Mouse & Touch Handlers ────────────────────────────────────────────
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
        0.3,
        Math.min(Math.PI / 2 + 0.1, orbitRef.current.targetPhi - deltaY * 0.007)
      );
    };

    const handleMouseUp = () => {
      orbitRef.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRef.current.targetRadius = Math.max(
        2.5,
        Math.min(8.5, orbitRef.current.targetRadius + e.deltaY * 0.01)
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
        orbitRef.current.targetPhi = Math.max(0.3, Math.min(Math.PI / 2 + 0.1, orbitRef.current.targetPhi - dy * 0.007));
      } else if (e.touches.length === 2) {
        const newDist = Math.hypot(
          e.touches[1].clientX - e.touches[0].clientX,
          e.touches[1].clientY - e.touches[0].clientY
        );
        const delta = touchStartDist - newDist;
        orbitRef.current.targetRadius = Math.max(2.5, Math.min(8.5, orbitRef.current.targetRadius + delta * 0.02));
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

    // ─── Animation Loop ────────────────────────────────────────────────────
    let pulseTime = 0;
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      pulseTime += 0.04;
      // Pulse hotspot rings
      hotspotMarkersRef.current.forEach((marker) => {
        const hs = marker.userData.hotspot as SafetyHotspot;
        marker.visible = hs.room === activeRoomRef.current;
        if (marker.visible) {
          const s = 1.0 + Math.sin(pulseTime) * 0.15;
          marker.scale.set(s, s, s);
          marker.lookAt(camera.position);
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

  const handleSelectRoom = (room: 'bedroom' | 'living' | 'kitchen' | 'bathroom') => {
    setActiveRoom(room);
    if (room === 'bedroom') {
      orbitRef.current.targetTheta = Math.PI / 4;
      orbitRef.current.targetPhi = Math.PI / 2.3;
      orbitRef.current.targetRadius = 4.8;
      orbitRef.current.targetLookAt.set(0, 1.45, 0);
    } else if (room === 'living') {
      orbitRef.current.targetTheta = Math.PI / 3;
      orbitRef.current.targetPhi = Math.PI / 2.3;
      orbitRef.current.targetRadius = 5.0;
      orbitRef.current.targetLookAt.set(0, 1.45, 0);
    } else if (room === 'kitchen') {
      orbitRef.current.targetTheta = -Math.PI / 4;
      orbitRef.current.targetPhi = Math.PI / 2.4;
      orbitRef.current.targetRadius = 4.2;
      orbitRef.current.targetLookAt.set(-0.8, 1.3, -1.8);
    } else if (room === 'bathroom') {
      orbitRef.current.targetTheta = Math.PI / 2.8;
      orbitRef.current.targetPhi = Math.PI / 2.2;
      orbitRef.current.targetRadius = 4.0;
      orbitRef.current.targetLookAt.set(0, 1.3, -1.5);
    }
  };

  const handleSelectHotspot = (hs: SafetyHotspot) => {
    setSelectedHotspot(hs);
    orbitRef.current.targetLookAt.set(hs.position[0], hs.position[1], hs.position[2]);
    orbitRef.current.targetRadius = 3.5;
  };

  const visibleHotspots = SAFETY_HOTSPOTS.filter((h) => h.room === activeRoom);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl bg-[#0C1E24] border border-[#14353E] shadow-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[580px] sm:h-[680px]'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none block touch-none"
      />

      {isLoading && (
        <div className="absolute inset-0 bg-[#0C1E24] flex items-center justify-center text-white">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-[#C58F58]" />
            <span className="text-sm font-mono uppercase tracking-widest text-[#FAF8F5]">
              Loading 360° Interior Room Walk...
            </span>
          </div>
        </div>
      )}

      {/* Top Header HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071519]/90 backdrop-blur-md border border-[#C58F58]/30 text-xs text-white pointer-events-auto shadow-lg">
          <Sparkles className="w-4 h-4 text-[#C58F58]" />
          <span className="font-bold font-mono tracking-wider text-xs">
            360° Interior CGI • Eye-Level Human Perspective
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono uppercase">
            Indicative Decor
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {handleToggle2D && (
            <button
              onClick={handleToggle2D}
              className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs text-white font-medium transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#C58F58]" />
              <span className="hidden sm:inline">2D CAD</span> Floor Plan
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-2xl bg-[#071519]/90 hover:bg-[#14353E] backdrop-blur-md border border-white/10 text-white transition-all shadow-lg cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Top Room Navigation Bar */}
      <div className="absolute top-18 left-4 right-4 flex items-center justify-center gap-2 pointer-events-auto z-20">
        <div className="flex items-center bg-[#071519]/90 p-1 rounded-2xl border border-white/15 backdrop-blur-md shadow-xl text-xs font-bold">
          <button
            onClick={() => handleSelectRoom('bedroom')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeRoom === 'bedroom'
                ? 'bg-[#2C5E50] text-white shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Master Bedroom
          </button>
          <button
            onClick={() => handleSelectRoom('living')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeRoom === 'living'
                ? 'bg-[#2C5E50] text-white shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Living Salon
          </button>
          <button
            onClick={() => handleSelectRoom('kitchen')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeRoom === 'kitchen'
                ? 'bg-[#2C5E50] text-white shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Modular Kitchen
          </button>
          <button
            onClick={() => handleSelectRoom('bathroom')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeRoom === 'bathroom'
                ? 'bg-[#2C5E50] text-white shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Senior-Safe Bath
          </button>
        </div>
      </div>

      {/* Floating Hotspots Tray on Right */}
      {visibleHotspots.length > 0 && (
        <div className="absolute right-4 top-32 max-w-xs w-full bg-[#071519]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-5 text-white shadow-2xl z-20 space-y-3 pointer-events-auto">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold font-serif-heading text-[#FAF8F5]">
              Senior Ergonomic Highlights
            </span>
          </div>

          <div className="space-y-1.5">
            {visibleHotspots.map((hs) => (
              <button
                key={hs.id}
                onClick={() => handleSelectHotspot(hs)}
                className={`w-full text-left p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedHotspot?.id === hs.id
                    ? 'bg-[#2C5E50] border-emerald-400 text-white font-bold shadow-md'
                    : 'bg-white/5 border-white/10 text-white/75 hover:bg-white/10'
                }`}
              >
                <div className="text-xs">{hs.name}</div>
              </button>
            ))}
          </div>

          {selectedHotspot && (
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs animate-in fade-in duration-200">
              <h5 className="font-bold text-[#C58F58]">{selectedHotspot.title}</h5>
              <p className="text-white/80 text-[11px] leading-relaxed font-light">
                {selectedHotspot.detail}
              </p>
              <div className="pt-1 text-[10px] text-emerald-400 font-mono">
                Standard: {selectedHotspot.standard}
              </div>
            </div>
          )}

          <button
            onClick={() =>
              openWhatsApp({
                actionType: 'reserve-unit',
                unitType: '1 BHK Senior Residence',
                message: `Hello, I am reviewing the 360° Interior Design for the senior residence. Please share the detailed interior specifications schedule and fitting brands.`
              })
            }
            className="w-full py-2.5 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            Enquire About Fittings on WhatsApp →
          </button>
        </div>
      )}

      {/* Bottom Controls Legend HUD */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/60 pointer-events-none z-10 px-2">
        <div className="flex items-center gap-2 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
          <span className="hidden sm:inline">Click &amp; Drag for 360° Room Walk • Scroll to Zoom In/Out</span>
          <span className="sm:hidden">Drag for 360° Room Walk • Pinch to Zoom</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Proposed Interior Layout &amp; Safety Ergonomics</span>
        </div>
      </div>
    </div>
  );
};
