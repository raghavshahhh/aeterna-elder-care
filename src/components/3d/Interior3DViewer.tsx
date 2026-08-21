'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useModal } from '@/context/ModalContext';
import {
  Rotate3d,
  Sparkles,
  Maximize2,
  Minimize2,
  RefreshCw,
  Eye,
  ShieldCheck,
  Building2,
  Info,
  CheckCircle2,
  Layers
} from 'lucide-react';

interface Interior3DViewerProps {
  unitType?: '1-bhk' | '1-rk';
  onToggle2DPlans?: () => void;
}

interface SafetyHotspot {
  id: string;
  title: string;
  description: string;
  category: 'Bathroom Safety' | 'Ergonomics' | 'Emergency' | 'Accessibility';
  position: [number, number, number];
}

export const Interior3DViewer: React.FC<Interior3DViewerProps> = ({
  unitType = '1-bhk',
  onToggle2DPlans
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openWhatsApp, openLeadDrawer } = useModal();

  const [activeUnitType, setActiveUnitType] = useState<'1-bhk' | '1-rk'>(unitType);
  const [activeRoom, setActiveRoom] = useState<'bedroom' | 'living' | 'kitchen' | 'bathroom'>('bedroom');
  const [selectedHotspot, setSelectedHotspot] = useState<SafetyHotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const orbitRef = useRef({
    radius: 9.0,
    theta: Math.PI / 4,
    phi: Math.PI / 3.2,
    target: new THREE.Vector3(0, 1.4, 0),
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRadius: 9.0,
    targetTheta: Math.PI / 4,
    targetPhi: Math.PI / 3.2,
    targetLookAt: new THREE.Vector3(0, 1.4, 0)
  });

  const hotspots: SafetyHotspot[] = [
    {
      id: 'hs-grab-rails',
      title: 'Continuous 32mm Stainless Grab Rails',
      description: 'Firm wall-mounted support rails alongside the commode and shower zone, engineered to support 150kg load.',
      category: 'Bathroom Safety',
      position: [-2.2, 1.3, -2.4]
    },
    {
      id: 'hs-zero-threshold',
      title: 'Zero-Step Barrier-Free Shower Floor',
      description: 'Continuous flush matte tile flooring with zero threshold lip, eliminating tripping hazards in wet areas.',
      category: 'Accessibility',
      position: [-1.8, 0.2, -1.8]
    },
    {
      id: 'hs-low-switch',
      title: 'Ergonomic Low-Reach Light Controls (800mm)',
      description: 'Large rocker switches positioned at bedside reach level for effortless nighttime operation without straining.',
      category: 'Ergonomics',
      position: [2.4, 1.1, 0.5]
    },
    {
      id: 'hs-emergency-pull',
      title: '24x7 Emergency SOS Pull Cord',
      description: 'Waterproof ceiling-hung emergency pull cord connected directly to building security and nursing concierge.',
      category: 'Emergency',
      position: [-2.4, 1.8, -1.5]
    },
    {
      id: 'hs-anti-skid',
      title: 'R11 Anti-Skid Vitrified Matte Flooring',
      description: 'High-traction matte finish floor tiles designed specifically for elderly gait stability and walker traction.',
      category: 'Accessibility',
      position: [0, 0.1, 0]
    }
  ];

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

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
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
    rendererRef.current = renderer;

    // Interior Warm Lighting
    const ambient = new THREE.AmbientLight(0xfff8ee, 1.2);
    scene.add(ambient);

    const windowLight = new THREE.DirectionalLight(0xffecd2, 1.8);
    windowLight.position.set(6, 6, 4);
    windowLight.castShadow = true;
    scene.add(windowLight);

    const softCeiling = new THREE.PointLight(0xffdfba, 0.8, 12);
    softCeiling.position.set(0, 2.8, 0);
    scene.add(softCeiling);

    // Materials Palette (Warm Scandinavian / Vedic Modern)
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf5efe6, roughness: 0.9 });
    const woodFloorMat = new THREE.MeshStandardMaterial({ color: 0x96714c, roughness: 0.5 });
    const bathFloorMat = new THREE.MeshStandardMaterial({ color: 0x3d4a4e, roughness: 0.4 });
    const furnitureMat = new THREE.MeshStandardMaterial({ color: 0x3d3024, roughness: 0.6 });
    const fabricMat = new THREE.MeshStandardMaterial({ color: 0xd8cfc4, roughness: 0.8 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.3, metalness: 0.8 });

    // ROOM ARCHITECTURAL SHELL (10ft × 10ft × 9ft box)
    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      activeRoom === 'bathroom' ? bathFloorMat : woodFloorMat
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Back Wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 0.1), wallMat);
    backWall.position.set(0, 1.5, -3);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left Wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3, 6), wallMat);
    leftWall.position.set(-3, 1.5, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Room-Specific Furniture & Layout
    if (activeRoom === 'bedroom') {
      // Orthopaedic Bed
      const bedBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 2.0), furnitureMat);
      bedBase.position.set(0.8, 0.225, -1.8);
      bedBase.castShadow = true;
      scene.add(bedBase);

      const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 1.9), fabricMat);
      mattress.position.set(0.8, 0.55, -1.8);
      scene.add(mattress);

      // Nightstand with Lamp
      const nightstand = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), furnitureMat);
      nightstand.position.set(2.4, 0.3, -2.5);
      scene.add(nightstand);

      // Wardrobe
      const wardrobe = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.4, 0.6), furnitureMat);
      wardrobe.position.set(-2.0, 1.2, -2.6);
      scene.add(wardrobe);
    } else if (activeRoom === 'living') {
      // Sofa Lounge
      const sofa = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 1.0), fabricMat);
      sofa.position.set(0, 0.35, -1.8);
      scene.add(sofa);

      // Coffee Table
      const table = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 0.7), furnitureMat);
      table.position.set(0, 0.2, -0.6);
      scene.add(table);

      // Armchair
      const chair = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 0.8), fabricMat);
      chair.position.set(-1.8, 0.35, -0.6);
      chair.rotation.y = Math.PI / 4;
      scene.add(chair);
    } else if (activeRoom === 'kitchen') {
      // L-Shaped Kitchen Counter
      const counter1 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.85, 0.7), darkConcreteMat);
      counter1.position.set(-0.5, 0.425, -2.6);
      scene.add(counter1);

      // Overhead Low-Reach Cabinets
      const cab = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.7, 0.4), furnitureMat);
      cab.position.set(-0.5, 1.8, -2.75);
      scene.add(cab);
    } else if (activeRoom === 'bathroom') {
      // Vanity Sink
      const vanity = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.85, 0.6), furnitureMat);
      vanity.position.set(1.6, 0.425, -2.6);
      scene.add(vanity);

      // Grab Rails (3D tubes)
      const railGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.2, 16);
      const rail1 = new THREE.Mesh(railGeo, goldMat);
      rail1.rotation.z = Math.PI / 2;
      rail1.position.set(-1.8, 1.0, -2.9);
      scene.add(rail1);

      const rail2 = new THREE.Mesh(railGeo, goldMat);
      rail2.position.set(-2.4, 1.0, -1.8);
      scene.add(rail2);
    }

    // 3D Hotspot Visual Markers
    hotspots.forEach((hs) => {
      const markerGroup = new THREE.Group();
      markerGroup.position.set(hs.position[0], hs.position[1], hs.position[2]);

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xc58f58 })
      );
      markerGroup.add(sphere);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.12, 0.16, 16),
        new THREE.MeshBasicMaterial({ color: 0xe0ab77, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })
      );
      ring.rotation.x = -Math.PI / 2;
      markerGroup.add(ring);

      scene.add(markerGroup);
    });

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
        5.0,
        Math.min(15.0, orbitRef.current.targetRadius + e.deltaY * 0.01)
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
        orbitRef.current.targetTheta += 0.001;
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
  }, [updateCameraPosition, activeRoom, activeUnitType]);

  const darkConcreteMat = new THREE.MeshStandardMaterial({ color: 0x2c3b40, roughness: 0.7 });

  const roomDimensions = {
    bedroom: '10\'0" × 10\'10" Master Bedroom',
    living: '9\'0" × 9\'10" Living Salon',
    kitchen: '5\'0" × 9\'0" Modular Kitchen',
    bathroom: '4\'0" × 7\'2" Senior-Safe Bath'
  };

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
        <div className="absolute inset-0 bg-[#0A1C22] flex items-center justify-center text-white">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-[#C58F58]" />
            <span className="text-sm font-mono uppercase tracking-widest text-[#FAF8F5]">
              Loading 3D Interior...
            </span>
          </div>
        </div>
      )}

      {/* Top Header HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071519]/80 backdrop-blur-md border border-white/10 text-xs text-white pointer-events-auto shadow-lg">
          <Sparkles className="w-4 h-4 text-[#C58F58]" />
          <span className="font-bold font-mono tracking-wider text-xs">
            {activeUnitType === '1-bhk' ? '1 BHK Senior Residence (~400 sq. ft.)' : '1 RK Senior Studio (~240 sq. ft.)'}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
            Artist Impression
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {onToggle2DPlans && (
            <button
              onClick={onToggle2DPlans}
              className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs text-white font-medium transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#C58F58]" />
              <span className="hidden sm:inline">View</span> 2D CAD Plans
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

      {/* Top Center Room Selector Tabs */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 flex items-center bg-[#071519]/85 backdrop-blur-md border border-white/15 rounded-2xl p-1 shadow-2xl z-20 pointer-events-auto text-xs">
        {[
          { id: 'bedroom', label: 'Master Bedroom' },
          { id: 'living', label: 'Living Salon' },
          { id: 'kitchen', label: 'Modular Kitchen' },
          { id: 'bathroom', label: 'Senior-Safe Bath' }
        ].map((rm) => (
          <button
            key={rm.id}
            onClick={() => setActiveRoom(rm.id as any)}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeRoom === rm.id
                ? 'bg-[#2C5E50] text-white font-bold shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {rm.label}
          </button>
        ))}
      </div>

      {/* Left Safety Hotspots List */}
      <div className="absolute left-4 top-28 bottom-20 flex flex-col justify-center gap-2 pointer-events-auto z-20 max-w-[200px]">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C58F58] font-bold px-1">
          Senior Ergonomics
        </span>
        {hotspots.map((hs) => (
          <button
            key={hs.id}
            onClick={() => setSelectedHotspot(hs)}
            className={`p-2.5 rounded-2xl border text-left transition-all backdrop-blur-md shadow-md cursor-pointer ${
              selectedHotspot?.id === hs.id
                ? 'bg-[#C58F58] text-[#071519] border-[#E0AB77] font-bold scale-105'
                : 'bg-[#071519]/80 border-white/10 text-white/80 hover:bg-[#14353E]'
            }`}
          >
            <span className="text-[10px] uppercase font-mono tracking-tight block opacity-70">
              {hs.category}
            </span>
            <span className="text-xs font-serif-heading font-bold block leading-snug mt-0.5">
              {hs.title}
            </span>
          </button>
        ))}
      </div>

      {/* Right Selected Hotspot Card */}
      {selectedHotspot && (
        <div className="absolute right-4 top-28 max-w-xs w-full bg-[#071519]/95 backdrop-blur-xl border border-[#C58F58]/40 rounded-3xl p-5 text-white shadow-2xl z-20 space-y-3 pointer-events-auto animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-[10px] font-mono uppercase text-[#C58F58] font-bold tracking-widest">
              {selectedHotspot.category}
            </span>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-xs text-white/50 hover:text-white"
            >
              ✕
            </button>
          </div>

          <h4 className="text-base font-serif-heading font-bold text-[#FAF8F5]">
            {selectedHotspot.title}
          </h4>
          <p className="text-xs text-white/75 font-light leading-relaxed">
            {selectedHotspot.description}
          </p>

          <div className="pt-2">
            <button
              onClick={() =>
                openWhatsApp({
                  actionType: 'reserve-unit',
                  message: `Hello, I am reviewing the 3D Interior Visualizer and senior safety feature: "${selectedHotspot.title}". Please share complete turnkey fixtures catalog.`
                })
              }
              className="w-full py-2.5 rounded-xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all shadow-md text-center cursor-pointer"
            >
              Inquire on WhatsApp →
            </button>
          </div>
        </div>
      )}

      {/* Bottom Room Dimension HUD */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/60 pointer-events-none z-10 px-2">
        <div className="flex items-center gap-2 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
          <span>360° Orbit • Measured Room: <strong>{roomDimensions[activeRoom]}</strong></span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 bg-[#071519]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white/50">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Proposed Design • Subject to Turnkey Selection</span>
        </div>
      </div>
    </div>
  );
};
