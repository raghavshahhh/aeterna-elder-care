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
  ShieldCheck
} from 'lucide-react';

interface Building3DViewerProps {
  initialFloor?: FloorLevel;
  onSelectUnit?: (unitId: string) => void;
  onToggle2DFallback?: () => void;
}

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

  const orbitRef = useRef({
    radius: 28,
    theta: Math.PI / 4,
    phi: Math.PI / 3,
    target: new THREE.Vector3(0, 4, 0),
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRadius: 28,
    targetTheta: Math.PI / 4,
    targetPhi: Math.PI / 3,
    targetLookAt: new THREE.Vector3(0, 4, 0)
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
    scene.background = new THREE.Color(0x0a1c22);
    scene.fog = new THREE.FogExp2(0x0a1c22, 0.015);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
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

    const ambientLight = new THREE.AmbientLight(0xf2eada, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff6e6, 1.8);
    sunLight.position.set(20, 35, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x7da494, 0.75);
    rimLight.position.set(-20, 15, -20);
    scene.add(rimLight);

    // Ground & Grid
    const groundGeo = new THREE.PlaneGeometry(80, 80);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x071519, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(50, 25, 0x2c5e50, 0x14353e);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    const podium = new THREE.Mesh(
      new THREE.BoxGeometry(18, 0.2, 16),
      new THREE.MeshStandardMaterial({ color: 0x1a2e35, roughness: 0.6 })
    );
    podium.position.set(0, 0.1, 0);
    podium.receiveShadow = true;
    scene.add(podium);

    // Materials Palette
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0xe8e2d8, roughness: 0.8 });
    const darkConcreteMat = new THREE.MeshStandardMaterial({ color: 0x2c3b40, roughness: 0.7 });
    const goldAccentMat = new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.3, metalness: 0.7 });
    const emeraldAvailableMat = new THREE.MeshStandardMaterial({
      color: 0x2c5e50,
      roughness: 0.4,
      metalness: 0.3,
      emissive: 0x1a3d34,
      emissiveIntensity: 0.3
    });
    const lockedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x53676e,
      roughness: 0.2,
      transmission: 0.6,
      transparent: true,
      opacity: 0.65
    });
    const woodPergolaMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.6 });

    // 4-TIER FLOORS
    const floorGroups: { [key in FloorLevel]?: THREE.Group } = {};

    // Stilt Level
    const stiltGroup = new THREE.Group();
    stiltGroup.name = 'stilt';
    const stiltSlab = new THREE.Mesh(new THREE.BoxGeometry(16, 0.3, 14), darkConcreteMat);
    stiltSlab.position.set(0, 0.25, 0);
    stiltSlab.receiveShadow = true;
    stiltGroup.add(stiltSlab);

    const pillarGeo = new THREE.BoxGeometry(0.6, 2.0, 0.6);
    [
      [-6.5, 1.3, -5.5], [0, 1.3, -5.5], [6.5, 1.3, -5.5],
      [-6.5, 1.3, 0], [6.5, 1.3, 0],
      [-6.5, 1.3, 5.5], [0, 1.3, 5.5], [6.5, 1.3, 5.5]
    ].forEach(([px, py, pz]) => {
      const pillar = new THREE.Mesh(pillarGeo, concreteMat);
      pillar.position.set(px, py, pz);
      pillar.castShadow = true;
      stiltGroup.add(pillar);
    });

    const stiltCore = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.0, 4.0), new THREE.MeshStandardMaterial({ color: 0x14353e }));
    stiltCore.position.set(0, 1.3, 0);
    stiltGroup.add(stiltCore);
    scene.add(stiltGroup);
    floorGroups.stilt = stiltGroup;

    // Helper for Residential Tiers
    const createResidentialFloor = (
      floorKey: FloorLevel,
      baseY: number,
      isAvailable: boolean,
      isTop: boolean = false
    ) => {
      const group = new THREE.Group();
      group.name = floorKey;

      const slab = new THREE.Mesh(new THREE.BoxGeometry(16.4, 0.35, 14.4), concreteMat);
      slab.position.set(0, baseY + 0.175, 0);
      slab.castShadow = true;
      group.add(slab);

      const core = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.5, 4.0), darkConcreteMat);
      core.position.set(0, baseY + 1.5, 0);
      group.add(core);

      // East Wing (1 BHK)
      const u1 = new THREE.Mesh(new THREE.BoxGeometry(5.8, 2.4, 6.2), isAvailable ? emeraldAvailableMat.clone() : lockedGlassMat.clone());
      u1.position.set(5.0, baseY + 1.45, -3.2);
      u1.castShadow = true;
      group.add(u1);

      // West Wing (1 BHK)
      const u2 = new THREE.Mesh(new THREE.BoxGeometry(5.8, 2.4, 6.2), isAvailable ? emeraldAvailableMat.clone() : lockedGlassMat.clone());
      u2.position.set(-5.0, baseY + 1.45, -3.2);
      u2.castShadow = true;
      group.add(u2);

      // North Wing (1 RK Studio)
      const u3 = new THREE.Mesh(new THREE.BoxGeometry(10.0, 2.4, 5.0), isAvailable ? emeraldAvailableMat.clone() : lockedGlassMat.clone());
      u3.position.set(0, baseY + 1.45, 3.8);
      u3.castShadow = true;
      group.add(u3);

      // Balcony Railings
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.9, 0.1), goldAccentMat);
      b1.position.set(5.0, baseY + 0.8, -6.35);
      group.add(b1);

      const b2 = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.9, 0.1), goldAccentMat);
      b2.position.set(-5.0, baseY + 0.8, -6.35);
      group.add(b2);

      if (isTop) {
        const roof = new THREE.Mesh(new THREE.BoxGeometry(16.6, 0.4, 14.6), concreteMat);
        roof.position.set(0, baseY + 2.8, 0);
        group.add(roof);

        for (let x = -5; x <= 5; x += 1.2) {
          const beam = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 8.0), woodPergolaMat);
          beam.position.set(x, baseY + 4.2, 0);
          group.add(beam);
        }
      }

      scene.add(group);
      return group;
    };

    floorGroups.ground = createResidentialFloor('ground', 2.3, true, false);
    floorGroups.first = createResidentialFloor('first', 5.1, false, false);
    floorGroups.second = createResidentialFloor('second', 7.9, false, true);
    floorGroupsRef.current = floorGroups;

    // Event Handlers
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

      orbitRef.current.targetTheta -= deltaX * 0.008;
      orbitRef.current.targetPhi = Math.max(
        0.1,
        Math.min(Math.PI / 2 - 0.05, orbitRef.current.targetPhi - deltaY * 0.008)
      );
    };

    const handleMouseUp = () => {
      orbitRef.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRef.current.targetRadius = Math.max(
        12,
        Math.min(50, orbitRef.current.targetRadius + e.deltaY * 0.02)
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

      if (!orbitRef.current.isDragging) {
        orbitRef.current.targetTheta += 0.0015;
      }

      const groups = floorGroupsRef.current;
      const targetOffsets: { [key in FloorLevel]?: number } = {
        stilt: 0,
        ground: isExploded ? 2.5 : activeFloor === 'ground' ? 0.3 : 0,
        first: isExploded ? 5.5 : activeFloor === 'first' ? 0.3 : 0,
        second: isExploded ? 8.5 : activeFloor === 'second' ? 0.3 : 0
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
      window.removeEventListener('resize', handleResize);

      scene.clear();
      renderer.dispose();
    };
  }, [updateCameraPosition, isExploded, activeFloor]);

  const handleSelectFloor = (floor: FloorLevel) => {
    setActiveFloor(floor);
    if (floor === 'ground') {
      orbitRef.current.targetLookAt.set(0, 3.5, 0);
      orbitRef.current.targetRadius = 26;
      orbitRef.current.targetPhi = Math.PI / 3.2;
    } else if (floor === 'stilt') {
      orbitRef.current.targetLookAt.set(0, 1.2, 0);
      orbitRef.current.targetRadius = 24;
      orbitRef.current.targetPhi = Math.PI / 2.8;
    } else if (floor === 'first') {
      orbitRef.current.targetLookAt.set(0, 6.0, 0);
      orbitRef.current.targetRadius = 26;
      orbitRef.current.targetPhi = Math.PI / 3.2;
    } else if (floor === 'second') {
      orbitRef.current.targetLookAt.set(0, 9.0, 0);
      orbitRef.current.targetRadius = 28;
      orbitRef.current.targetPhi = Math.PI / 3.5;
    }
  };

  const handleSetViewAngle = (angle: 'perspective' | 'top' | 'front') => {
    setViewAngle(angle);
    if (angle === 'perspective') {
      orbitRef.current.targetTheta = Math.PI / 4;
      orbitRef.current.targetPhi = Math.PI / 3;
      orbitRef.current.targetRadius = 28;
      orbitRef.current.targetLookAt.set(0, 4, 0);
    } else if (angle === 'top') {
      orbitRef.current.targetTheta = 0;
      orbitRef.current.targetPhi = 0.12;
      orbitRef.current.targetRadius = 32;
      orbitRef.current.targetLookAt.set(0, 4, 0);
    } else if (angle === 'front') {
      orbitRef.current.targetTheta = 0;
      orbitRef.current.targetPhi = Math.PI / 2 - 0.05;
      orbitRef.current.targetRadius = 30;
      orbitRef.current.targetLookAt.set(0, 5, 0);
    }
  };

  const handleSelectUnit = (unitId: string) => {
    setSelectedUnitId(unitId);
    if (onSelectUnit) onSelectUnit(unitId);

    if (unitId === 'unit-01') {
      orbitRef.current.targetTheta = Math.PI / 4;
      orbitRef.current.targetLookAt.set(4, 3.5, -2);
      orbitRef.current.targetRadius = 18;
    } else if (unitId === 'unit-02') {
      orbitRef.current.targetTheta = -Math.PI / 4;
      orbitRef.current.targetLookAt.set(-4, 3.5, -2);
      orbitRef.current.targetRadius = 18;
    } else if (unitId === 'unit-03') {
      orbitRef.current.targetTheta = Math.PI;
      orbitRef.current.targetLookAt.set(0, 3.5, 3);
      orbitRef.current.targetRadius = 18;
    }
  };

  const selectedUnit = buildingUnits.find((u) => u.id === selectedUnitId) || buildingUnits[0];

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl bg-[#0A1C22] border border-[#14353E] shadow-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[600px] sm:h-[700px]'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none block touch-none"
      />

      {isLoading && (
        <div className="absolute inset-0 bg-[#0D2329] flex items-center justify-center text-white">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-[#C58F58]" />
            <span className="text-sm font-mono uppercase tracking-widest text-[#FAF8F5]">
              Initializing 3D Building...
            </span>
          </div>
        </div>
      )}

      {/* Top Header HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071519]/80 backdrop-blur-md border border-white/10 text-xs text-white pointer-events-auto shadow-lg">
          <Building2 className="w-4 h-4 text-[#C58F58]" />
          <span className="font-bold font-mono tracking-wider text-xs">
            G+2 + Stilt Proposed Building (9 Units)
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="hidden sm:flex items-center bg-[#071519]/80 backdrop-blur-md border border-white/10 rounded-2xl p-1 shadow-lg text-xs">
            <button
              onClick={() => handleSetViewAngle('perspective')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                viewAngle === 'perspective' ? 'bg-[#2C5E50] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Perspective 3D
            </button>
            <button
              onClick={() => handleSetViewAngle('top')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                viewAngle === 'top' ? 'bg-[#2C5E50] text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Top Plan
            </button>
            <button
              onClick={() => handleSetViewAngle('front')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
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
              <span className="hidden sm:inline">Switch to</span> 2D CAD
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-2xl bg-[#071519]/80 hover:bg-[#14353E] backdrop-blur-md border border-white/10 text-white transition-all shadow-lg cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Left 4-Tier Interactive Floor Selector HUD */}
      <div className="absolute left-4 top-20 bottom-24 flex flex-col justify-center gap-2 pointer-events-auto z-20 max-w-[190px]">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C58F58] font-bold px-1">
          Select Level
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
          <p className="text-[10px] text-emerald-100 font-medium mt-0.5">Units 01–03 • Available</p>
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
          <p className="text-[10px] text-white/60 mt-0.5">10+ Bays • 3 Gates</p>
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

      {/* Right Unit Card */}
      {activeFloor === 'ground' && (
        <div className="absolute right-4 top-20 max-w-xs w-full bg-[#071519]/90 backdrop-blur-xl border border-white/15 rounded-3xl p-5 text-white shadow-2xl z-20 space-y-4 pointer-events-auto">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                Phase 1 Priority
              </span>
              <span className="text-xs text-white/70 font-mono">3D Spatial Model</span>
            </div>
            <span className="text-xs font-bold text-[#C58F58]">₹25L* Indicative DP</span>
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
              {selectedUnit.superAreaSqFt} sq. ft. super area ({selectedUnit.carpetAreaSqFt} sq. ft. carpet). {selectedUnit.facing}.
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
                  message: `Hello, I am inspecting the 3D Building Viewer for ${selectedUnit.unitNumber} (${selectedUnit.typeName}) on Ground Floor. Please share CAD drawings and booking procedure.`
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

      {/* Bottom Hint Banner */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/60 pointer-events-none z-10 px-2">
        <div className="flex items-center gap-2 bg-[#071519]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
          <span>Click &amp; Drag to Orbit • Scroll / Pinch to Zoom • Click Tiers to Explode</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 bg-[#071519]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white/50">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>CAD Proportions by The Vision Architects</span>
        </div>
      </div>
    </div>
  );
};
