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
  const animationFrameId = useRef<number | null>(null);

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

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0c1e24);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Warm Interior Ambient & Task Lighting
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 1.3);
    scene.add(ambientLight);

    const ceilingPendant = new THREE.PointLight(0xffeedd, 2.2, 12);
    ceilingPendant.position.set(0, 2.7, 0);
    ceilingPendant.castShadow = true;
    ceilingPendant.shadow.bias = -0.002;
    scene.add(ceilingPendant);

    const bedsideWarm = new THREE.PointLight(0xffaa55, 1.4, 6);
    bedsideWarm.position.set(-1.8, 1.3, -1.0);
    scene.add(bedsideWarm);

    const windowLight = new THREE.DirectionalLight(0xd9ecf2, 1.6);
    windowLight.position.set(-5, 4, 3);
    windowLight.castShadow = true;
    scene.add(windowLight);

    // Common Room Enclosure (5.5m × 3m × 5m room envelope)
    const roomEnclosure = new THREE.Group();

    // Floor
    const floorGeo = new THREE.PlaneGeometry(6.2, 6.2);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x6e4e37, roughness: 0.4 }); // Warm wood plank
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomEnclosure.add(floor);

    // Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf5f0e6, roughness: 0.85 }); // Warm off-white
    const accentWallMat = new THREE.MeshStandardMaterial({ color: 0x1f3c36, roughness: 0.8 }); // Forest green accent

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 3.0), accentWallMat);
    backWall.position.set(0, 1.5, -3.1);
    backWall.receiveShadow = true;
    roomEnclosure.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 3.0), wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-3.1, 1.5, 0);
    leftWall.receiveShadow = true;
    roomEnclosure.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 3.0), wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(3.1, 1.5, 0);
    rightWall.receiveShadow = true;
    roomEnclosure.add(rightWall);

    // Large Daylight Window on Left Wall
    const windowFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 1.8, 2.4),
      new THREE.MeshStandardMaterial({ color: 0x142024, roughness: 0.4 })
    );
    windowFrame.position.set(-3.05, 1.6, 0.4);
    roomEnclosure.add(windowFrame);

    // Sheer Curtains
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

    // ROOM-SPECIFIC 3D FURNITURE GROUPS
    const roomGroups: { [key: string]: THREE.Group } = {};

    // 1. MASTER BEDROOM (Fabric Bed, Headboard, Nightstands, Wardrobe, Rug)
    const bedGroup = new THREE.Group();

    // Area Rug
    const rug = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 3.2),
      new THREE.MeshStandardMaterial({ color: 0xc8baaa, roughness: 0.95 })
    );
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.02, -0.4);
    rug.receiveShadow = true;
    bedGroup.add(rug);

    // Headboard
    const headboard = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.2, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x8f7259, roughness: 0.7 })
    );
    headboard.position.set(0, 0.8, -2.95);
    headboard.castShadow = true;
    bedGroup.add(headboard);

    // Bed Base & Mattress
    const bedBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.45, 2.3),
      new THREE.MeshStandardMaterial({ color: 0x22353b, roughness: 0.8 })
    );
    bedBase.position.set(0, 0.25, -1.7);
    bedBase.castShadow = true;
    bedBase.receiveShadow = true;
    bedGroup.add(bedBase);

    // Pillows & Duvet
    const duvet = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.15, 1.6),
      new THREE.MeshStandardMaterial({ color: 0xf5eedc, roughness: 0.8 })
    );
    duvet.position.set(0, 0.52, -1.35);
    duvet.castShadow = true;
    bedGroup.add(duvet);

    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
    const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.15, 0.45), pillowMat);
    p1.position.set(-0.55, 0.58, -2.5);
    bedGroup.add(p1);
    const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.15, 0.45), pillowMat);
    p2.position.set(0.55, 0.58, -2.5);
    bedGroup.add(p2);

    // Nightstands & Bedside Lamps
    const nightstandGeo = new THREE.BoxGeometry(0.55, 0.55, 0.5);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.6 });

    const nsLeft = new THREE.Mesh(nightstandGeo, woodMat);
    nsLeft.position.set(-1.45, 0.28, -2.7);
    nsLeft.castShadow = true;
    bedGroup.add(nsLeft);

    const nsRight = new THREE.Mesh(nightstandGeo, woodMat);
    nsRight.position.set(1.45, 0.28, -2.7);
    nsRight.castShadow = true;
    bedGroup.add(nsRight);

    // Wardrobe on Right Wall
    const wardrobe = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 2.5, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x3d2c20, roughness: 0.5 })
    );
    wardrobe.position.set(2.65, 1.25, 0.8);
    wardrobe.castShadow = true;
    bedGroup.add(wardrobe);

    scene.add(bedGroup);
    roomGroups.bedroom = bedGroup;

    // 2. LIVING SALON (3-Seater Sofa, Coffee Table, Armchair, TV Console)
    const livingGroup = new THREE.Group();

    // 3-Seater Sofa
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0x2c5e50, roughness: 0.7 });
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 0.9), sofaMat);
    sofaBase.position.set(0, 0.25, -2.2);
    sofaBase.castShadow = true;
    livingGroup.add(sofaBase);

    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 0.3), sofaMat);
    sofaBack.position.set(0, 0.65, -2.55);
    sofaBack.castShadow = true;
    livingGroup.add(sofaBack);

    // Coffee Table with Warm Wood
    const table = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.35, 0.7), woodMat);
    table.position.set(0, 0.2, -1.0);
    table.castShadow = true;
    livingGroup.add(table);

    // Media Console on Front Wall
    const mediaConsole = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.5, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x1f2e33, roughness: 0.5 })
    );
    mediaConsole.position.set(0, 0.25, 2.6);
    mediaConsole.castShadow = true;
    livingGroup.add(mediaConsole);

    // Flat Screen TV on Wall
    const tv = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 1.0, 0.08),
      new THREE.MeshBasicMaterial({ color: 0x071519 })
    );
    tv.position.set(0, 1.5, 2.9);
    livingGroup.add(tv);

    scene.add(livingGroup);
    roomGroups.living = livingGroup;

    // 3. MODULAR KITCHEN (Quartz Counter, Cabinets, Sink, Hob)
    const kitchenGroup = new THREE.Group();

    // L-Shaped Quartz Counter
    const counterMat = new THREE.MeshStandardMaterial({ color: 0xdedede, roughness: 0.2, metalness: 0.1 });
    const counter1 = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.85, 0.7), counterMat);
    counter1.position.set(-0.8, 0.425, -2.4);
    counter1.castShadow = true;
    kitchenGroup.add(counter1);

    const counter2 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.85, 2.2), counterMat);
    counter2.position.set(-2.55, 0.425, -1.3);
    counter2.castShadow = true;
    kitchenGroup.add(counter2);

    // Undermount Stainless Sink & Chrome Tap
    const sink = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.05, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.8, roughness: 0.2 })
    );
    sink.position.set(-0.8, 0.86, -2.4);
    kitchenGroup.add(sink);

    const tap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8),
      new THREE.MeshStandardMaterial({ color: 0xc58f58, metalness: 0.9, roughness: 0.1 })
    );
    tap.position.set(-0.8, 1.0, -2.6);
    kitchenGroup.add(tap);

    // Upper Low-Reach Cabinets
    const cabinetMat = new THREE.MeshStandardMaterial({ color: 0x3d4f54, roughness: 0.6 });
    const upperCab = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.7, 0.4), cabinetMat);
    upperCab.position.set(-0.8, 1.9, -2.6);
    upperCab.castShadow = true;
    kitchenGroup.add(upperCab);

    scene.add(kitchenGroup);
    roomGroups.kitchen = kitchenGroup;

    // 4. SENIOR-SAFE BATHROOM (Zero-Threshold Shower, Grab Bars, Anti-Skid Floor)
    const bathGroup = new THREE.Group();

    // R11 Anti-Skid Bathroom Tile Floor
    const bathFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(6.0, 6.0),
      new THREE.MeshStandardMaterial({ color: 0x88989b, roughness: 0.9 })
    );
    bathFloor.rotation.x = -Math.PI / 2;
    bathFloor.position.y = 0.01;
    bathFloor.receiveShadow = true;
    bathGroup.add(bathFloor);

    // Zero-Threshold Shower Glass Partition
    const showerGlass = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 2.1, 1.5),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.85,
        opacity: 0.9,
        transparent: true,
        roughness: 0.1
      })
    );
    showerGlass.position.set(-1.0, 1.05, -1.8);
    showerGlass.castShadow = true;
    bathGroup.add(showerGlass);

    // Wall-Mounted Shower Seat
    const seatMat = new THREE.MeshStandardMaterial({ color: 0xFAF8F5, roughness: 0.5 });
    const showerSeat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.45), seatMat);
    showerSeat.position.set(-2.6, 0.45, -2.4);
    showerSeat.castShadow = true;
    bathGroup.add(showerSeat);

    // 32mm Stainless Steel Grab Rails (Heavy-Duty)
    const grabRailMat = new THREE.MeshStandardMaterial({
      color: 0xc58f58,
      metalness: 0.85,
      roughness: 0.2
    });
    const createGrabRail = (gx: number, gy: number, gz: number, rotY = 0) => {
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.9, 8), grabRailMat);
      rail.position.set(gx, gy, gz);
      rail.rotation.z = Math.PI / 2;
      rail.rotation.y = rotY;
      rail.castShadow = true;
      bathGroup.add(rail);
    };

    createGrabRail(-2.5, 0.9, -2.0); // Shower rail
    createGrabRail(1.8, 0.85, -2.8); // Toilet rail

    // Wall-Hung Commode
    const commode = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.4, 0.65),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
    );
    commode.position.set(1.8, 0.4, -2.6);
    commode.castShadow = true;
    bathGroup.add(commode);

    // Emergency Pull Cord (Red drop cord)
    const cord = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.008, 1.8, 6),
      new THREE.MeshBasicMaterial({ color: 0xff4444 })
    );
    cord.position.set(1.8, 1.8, -2.2);
    bathGroup.add(cord);

    const pullHandle = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xff2222 })
    );
    pullHandle.position.set(1.8, 0.9, -2.2);
    bathGroup.add(pullHandle);

    scene.add(bathGroup);
    roomGroups.bathroom = bathGroup;

    roomGroupsRef.current = roomGroups;

    // Mouse & Touch Handlers
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
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      // Room visibility switching
      Object.keys(roomGroupsRef.current).forEach((key) => {
        const grp = roomGroupsRef.current[key];
        if (grp) grp.visible = key === activeRoom;
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
      window.removeEventListener('resize', handleResize);

      scene.clear();
      renderer.dispose();
    };
  }, [updateCameraPosition, activeRoom]);

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
                onClick={() => setSelectedHotspot(hs)}
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
          <span>Click &amp; Drag for 360° Room Walk • Scroll to Zoom In/Out</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Proposed Interior Layout &amp; Safety Ergonomics</span>
        </div>
      </div>
    </div>
  );
};
