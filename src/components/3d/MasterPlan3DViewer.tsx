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
  ArrowRight
} from 'lucide-react';

interface MasterPlan3DViewerProps {
  onSelectPlot?: (plot: PlotItem) => void;
  onToggle2DView?: () => void;
}

export const MasterPlan3DViewer: React.FC<MasterPlan3DViewerProps> = ({
  onSelectPlot,
  onToggle2DView
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openWhatsApp, openLeadDrawer } = useModal();

  const [selectedBlock, setSelectedBlock] = useState<string>('All');
  const [selectedPlotId, setSelectedPlotId] = useState<string>('plot-1');
  const [hoveredPlotNumber, setHoveredPlotNumber] = useState<number | null>(null);
  const [viewPreset, setViewPreset] = useState<'isometric' | 'top' | 'hospital' | 'highway'>('isometric');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const plotMeshesRef = useRef<{ [plotNumber: number]: THREE.Mesh }>({});
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const animationFrameId = useRef<number | null>(null);

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

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x071519);
    scene.fog = new THREE.FogExp2(0x071519, 0.008);

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 650;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
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

    // Environmental Lighting
    const ambient = new THREE.AmbientLight(0xf5eedc, 1.2);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff5e6, 2.0);
    sun.position.set(45, 65, 50);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 180;
    sun.shadow.camera.left = -60;
    sun.shadow.camera.right = 60;
    sun.shadow.camera.top = 60;
    sun.shadow.camera.bottom = -60;
    sun.shadow.bias = -0.0003;
    scene.add(sun);

    const skyFill = new THREE.DirectionalLight(0x7da494, 0.75);
    skyFill.position.set(-45, 35, -45);
    scene.add(skyFill);

    // Site Ground Terrain
    const siteGroundGeo = new THREE.PlaneGeometry(180, 150);
    const siteGroundMat = new THREE.MeshStandardMaterial({
      color: 0x0a1c22,
      roughness: 0.95
    });
    const siteGround = new THREE.Mesh(siteGroundGeo, siteGroundMat);
    siteGround.rotation.x = -Math.PI / 2;
    siteGround.position.y = -0.1;
    siteGround.receiveShadow = true;
    scene.add(siteGround);

    const grid = new THREE.GridHelper(140, 45, 0x2c5e50, 0x14353e);
    grid.position.y = 0.01;
    scene.add(grid);

    // Peripheral Stone Boundary Walls (11+ Acres Demarcation)
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x3d4f54, roughness: 0.8 });
    const createPerimeterWall = (x: number, z: number, w: number, d: number) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(w, 1.2, d), wallMat);
      wall.position.set(x, 0.6, z);
      wall.castShadow = true;
      wall.receiveShadow = true;
      scene.add(wall);
    };

    createPerimeterWall(0, 40, 120, 0.6); // North boundary
    createPerimeterWall(0, -40, 120, 0.6); // South boundary
    createPerimeterWall(-60, 0, 0.6, 80); // West boundary
    createPerimeterWall(60, 0, 0.6, 80); // East boundary

    // Green Buffer Belts (North & South 5ft-6ft bands)
    const greenBufferMat = new THREE.MeshStandardMaterial({ color: 0x184034, roughness: 0.9 });
    const northGreen = new THREE.Mesh(new THREE.BoxGeometry(118, 0.35, 7), greenBufferMat);
    northGreen.position.set(0, 0.18, 36);
    northGreen.receiveShadow = true;
    scene.add(northGreen);

    const southGreen = new THREE.Mesh(new THREE.BoxGeometry(118, 0.35, 7), greenBufferMat);
    southGreen.position.set(0, 0.18, -36);
    southGreen.receiveShadow = true;
    scene.add(southGreen);

    // Main 33ft Arterial Highway Road (State Highway 22 Frontage)
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x182428, roughness: 0.7 });
    const mainRoad = new THREE.Mesh(new THREE.BoxGeometry(120, 0.15, 7.5), roadMat);
    mainRoad.position.set(0, 0.08, 0);
    mainRoad.receiveShadow = true;
    scene.add(mainRoad);

    // Central Dashed White Demarcation Line
    for (let x = -55; x <= 55; x += 5) {
      const dash = new THREE.Mesh(
        new THREE.PlaneGeometry(2.5, 0.22),
        new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.9, transparent: true })
      );
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(x, 0.17, 0);
      scene.add(dash);
    }

    // Sidewalk Curbs
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x3d4a4e, roughness: 0.6 });
    const curbNorth = new THREE.Mesh(new THREE.BoxGeometry(120, 0.25, 0.6), curbMat);
    curbNorth.position.set(0, 0.12, 4.0);
    scene.add(curbNorth);

    const curbSouth = new THREE.Mesh(new THREE.BoxGeometry(120, 0.25, 0.6), curbMat);
    curbSouth.position.set(0, 0.12, -4.0);
    scene.add(curbSouth);

    // Proposed 30,000 sq. ft. Ayurvedic Hospital 3D Model
    const hospitalGroup = new THREE.Group();
    hospitalGroup.name = 'hospital-landmark';

    const hospMain = new THREE.Mesh(
      new THREE.BoxGeometry(24, 7.0, 15),
      new THREE.MeshStandardMaterial({ color: 0x223d37, roughness: 0.6 })
    );
    hospMain.position.set(42, 3.5, -18);
    hospMain.castShadow = true;
    hospMain.receiveShadow = true;
    hospitalGroup.add(hospMain);

    const hospWing = new THREE.Mesh(
      new THREE.BoxGeometry(14, 7.0, 18),
      new THREE.MeshStandardMaterial({ color: 0x2c5e50, roughness: 0.5 })
    );
    hospWing.position.set(47, 3.5, -2);
    hospWing.castShadow = true;
    hospWing.receiveShadow = true;
    hospitalGroup.add(hospWing);

    // Entrance Portico / Canopy
    const canopy = new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.4, 6),
      new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.4, metalness: 0.5 })
    );
    canopy.position.set(38, 2.8, -10);
    canopy.castShadow = true;
    hospitalGroup.add(canopy);

    // Hospital Red Cross Marker
    const crossMat = new THREE.MeshBasicMaterial({ color: 0xc58f58 });
    const c1 = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.8, 0.3), crossMat);
    c1.position.set(42, 7.5, -10.4);
    hospitalGroup.add(c1);
    const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.8, 0.3), crossMat);
    c2.position.set(42, 7.5, -10.4);
    hospitalGroup.add(c2);

    scene.add(hospitalGroup);

    // Community Mandir 3D Landmark (Western Edge)
    const mandirGroup = new THREE.Group();
    mandirGroup.name = 'mandir-landmark';

    const mandirBase = new THREE.Mesh(
      new THREE.BoxGeometry(9, 2.5, 9),
      new THREE.MeshStandardMaterial({ color: 0x4a3a2a, roughness: 0.6 })
    );
    mandirBase.position.set(-46, 1.25, 18);
    mandirBase.castShadow = true;
    mandirGroup.add(mandirBase);

    // Traditional Shikhara Pyramid Roof
    const shikhara = new THREE.Mesh(
      new THREE.ConeGeometry(5.0, 5.5, 4),
      new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.3, metalness: 0.7 })
    );
    shikhara.position.set(-46, 5.5, 18);
    shikhara.rotation.y = Math.PI / 4;
    shikhara.castShadow = true;
    mandirGroup.add(shikhara);

    // Kalasha Gold Pinnacle
    const kalasha = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.9 })
    );
    kalasha.position.set(-46, 8.5, 18);
    mandirGroup.add(kalasha);

    scene.add(mandirGroup);

    // 64 RESIDENTIAL PLOTS GENERATION (Blocks A to F)
    const plotMeshes: { [plotNumber: number]: THREE.Mesh } = {};
    const plotMatAvailable = new THREE.MeshStandardMaterial({
      color: 0x245447,
      roughness: 0.5,
      metalness: 0.2,
      emissive: 0x102821,
      emissiveIntensity: 0.2
    });

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

      const plotGeo = new THREE.BoxGeometry(width, 0.7, depth);
      const plotMesh = new THREE.Mesh(plotGeo, plotMatAvailable.clone());
      plotMesh.position.set(posX, 0.35, posZ);
      plotMesh.castShadow = true;
      plotMesh.receiveShadow = true;
      plotMesh.userData = { plot };

      // Perimeter Boundary Lines
      const edges = new THREE.EdgesGeometry(plotGeo);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0xe0ab77, transparent: true, opacity: 0.4 })
      );
      plotMesh.add(line);

      // Low Demarcation Corner Boundary Stones
      const stoneGeo = new THREE.BoxGeometry(0.3, 0.9, 0.3);
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0xFAF8F5, roughness: 0.8 });
      [
        [-width / 2, 0.45, -depth / 2],
        [width / 2, 0.45, -depth / 2],
        [-width / 2, 0.45, depth / 2],
        [width / 2, 0.45, depth / 2]
      ].forEach(([sx, sy, sz]) => {
        const stone = new THREE.Mesh(stoneGeo, stoneMat);
        stone.position.set(sx, sy, sz);
        plotMesh.add(stone);
      });

      scene.add(plotMesh);
      plotMeshes[plot.number] = plotMesh;
    });

    plotMeshesRef.current = plotMeshes;

    // Landscaping: Avenue Trees along Highway and Buffers
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x1f483d, roughness: 0.9, flatShading: true });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3221, roughness: 0.8 });
    const createAvenueTree = (tx: number, tz: number) => {
      const tree = new THREE.Group();
      tree.position.set(tx, 0.1, tz);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 1.5, 8), trunkMat);
      trunk.position.set(0, 0.75, 0);
      trunk.castShadow = true;
      tree.add(trunk);

      const foliage = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), treeMat);
      foliage.position.set(0, 2.0, 0);
      foliage.castShadow = true;
      tree.add(foliage);

      scene.add(tree);
    };

    for (let x = -50; x <= 50; x += 10) {
      createAvenueTree(x, 6.0);
      createAvenueTree(x, -6.0);
      createAvenueTree(x, 37.0);
      createAvenueTree(x, -37.0);
    }

    // Mouse Raycasting & Orbit Handlers
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
            setSelectedPlotId(hitPlot.id);
            if (onSelectPlot) onSelectPlot(hitPlot);

            orbitRef.current.targetLookAt.set(
              intersects[0].object.position.x,
              0,
              intersects[0].object.position.z
            );
            orbitRef.current.targetRadius = 45;
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
        orbitRef.current.targetTheta += 0.0008; // Ambient rotation
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
  }, [updateCameraPosition, onSelectPlot]);

  const handlePresetView = (preset: 'isometric' | 'top' | 'hospital' | 'highway') => {
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
    }
  };

  const selectedPlot = allPlots.find((p) => p.id === selectedPlotId) || allPlots[0];

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl bg-[#071519] border border-[#14353E] shadow-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[620px] sm:h-[720px]'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none block touch-none"
      />

      {isLoading && (
        <div className="absolute inset-0 bg-[#071519] flex items-center justify-center text-white">
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

      {/* Right Selected Plot Floating Card */}
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
            Phase 1 Allotment
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
          <span>Click any 3D Plot Parcel to Select • Drag to Orbit • Scroll to Zoom</span>
        </div>

        <div className="hidden md:flex items-center gap-4 bg-[#0D2329]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <span className="flex items-center gap-1.5 text-white/80">
            <Activity className="w-3.5 h-3.5 text-[#C58F58]" /> 30k Sq. Ft. Hospital
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
