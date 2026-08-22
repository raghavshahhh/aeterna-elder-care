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
    scene.fog = new THREE.FogExp2(0x0a1c22, 0.012);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 580;
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

    // Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0xf5eedc, 1.1);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.0);
    sunLight.position.set(25, 45, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x7da494, 0.8);
    rimLight.position.set(-25, 20, -25);
    scene.add(rimLight);

    // 1. Site Terrain & Landscaped Podium
    const terrainGeo = new THREE.PlaneGeometry(90, 90);
    const terrainMat = new THREE.MeshStandardMaterial({ color: 0x071519, roughness: 0.95 });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -0.05;
    terrain.receiveShadow = true;
    scene.add(terrain);

    const gridHelper = new THREE.GridHelper(60, 30, 0x2c5e50, 0x14353e);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Stone Paved Foundation Apron
    const podiumGeo = new THREE.BoxGeometry(22, 0.35, 20);
    const podiumMat = new THREE.MeshStandardMaterial({ color: 0x162c33, roughness: 0.7 });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.set(0, 0.175, 0);
    podium.receiveShadow = true;
    scene.add(podium);

    // Curb Boundary
    const curbGeo = new THREE.BoxGeometry(22.6, 0.15, 20.6);
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x243e47, roughness: 0.5 });
    const curb = new THREE.Mesh(curbGeo, curbMat);
    curb.position.set(0, 0.075, 0);
    scene.add(curb);

    // Materials Palette
    const stoneWallMat = new THREE.MeshStandardMaterial({ color: 0xe5dfd3, roughness: 0.75 });
    const darkAccentMat = new THREE.MeshStandardMaterial({ color: 0x24363d, roughness: 0.6 });
    const warmBronzeMat = new THREE.MeshStandardMaterial({ color: 0xc58f58, roughness: 0.35, metalness: 0.65 });
    const windowFrameMat = new THREE.MeshStandardMaterial({ color: 0x142024, roughness: 0.4 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e3a40,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.8
    });
    const lockedGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x41545c,
      roughness: 0.3,
      transmission: 0.5,
      transparent: true,
      opacity: 0.6
    });
    const woodPergolaMat = new THREE.MeshStandardMaterial({ color: 0x82542a, roughness: 0.5 });

    // Helper: Add Detailed Window Frame with Glass
    const addWindow = (parent: THREE.Group, x: number, y: number, z: number, w: number, h: number, rotY = 0) => {
      const frameGeo = new THREE.BoxGeometry(w, h, 0.15);
      const frame = new THREE.Mesh(frameGeo, windowFrameMat);
      frame.position.set(x, y, z);
      frame.rotation.y = rotY;
      frame.castShadow = true;

      const paneGeo = new THREE.PlaneGeometry(w - 0.15, h - 0.15);
      const pane = new THREE.Mesh(paneGeo, glassMat);
      pane.position.set(0, 0, 0.08);
      frame.add(pane);

      // Mullion cross
      const mullionH = new THREE.Mesh(new THREE.BoxGeometry(w - 0.15, 0.04, 0.04), windowFrameMat);
      mullionH.position.set(0, 0, 0.08);
      frame.add(mullionH);

      parent.add(frame);
    };

    // Helper: Add Balcony Railing with Vertical Balusters
    const addBalconyRailing = (parent: THREE.Group, x: number, y: number, z: number, w: number, rotY = 0) => {
      const railGroup = new THREE.Group();
      railGroup.position.set(x, y, z);
      railGroup.rotation.y = rotY;

      // Top Handrail
      const topRail = new THREE.Mesh(new THREE.BoxGeometry(w, 0.06, 0.08), warmBronzeMat);
      topRail.position.set(0, 0.9, 0);
      railGroup.add(topRail);

      // Bottom Base Rail
      const botRail = new THREE.Mesh(new THREE.BoxGeometry(w, 0.04, 0.06), warmBronzeMat);
      botRail.position.set(0, 0.05, 0);
      railGroup.add(botRail);

      // Vertical Balusters
      const balusterCount = Math.floor(w / 0.25);
      const spacing = w / (balusterCount + 1);
      const balusterGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.82, 8);
      for (let i = 1; i <= balusterCount; i++) {
        const bal = new THREE.Mesh(balusterGeo, warmBronzeMat);
        bal.position.set(-w / 2 + i * spacing, 0.47, 0);
        railGroup.add(bal);
      }

      parent.add(railGroup);
    };

    // 4-TIER FLOORS
    const floorGroups: { [key in FloorLevel]?: THREE.Group } = {};

    // STILT PARKING LEVEL (Ground contact)
    const stiltGroup = new THREE.Group();
    stiltGroup.name = 'stilt';

    const stiltFloor = new THREE.Mesh(new THREE.BoxGeometry(18, 0.25, 16), darkAccentMat);
    stiltFloor.position.set(0, 0.35, 0);
    stiltFloor.receiveShadow = true;
    stiltGroup.add(stiltFloor);

    // Parking Bay Markings (White painted strips)
    for (let pz = -6; pz <= 6; pz += 3) {
      const line = new THREE.Mesh(
        new THREE.PlaneGeometry(0.12, 4.5),
        new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.85, transparent: true })
      );
      line.rotation.x = -Math.PI / 2;
      line.position.set(4.5, 0.49, pz);
      stiltGroup.add(line);

      const line2 = new THREE.Mesh(
        new THREE.PlaneGeometry(0.12, 4.5),
        new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.85, transparent: true })
      );
      line2.rotation.x = -Math.PI / 2;
      line2.position.set(-4.5, 0.49, pz);
      stiltGroup.add(line2);
    }

    // Heavy Concrete Support Columns (10 bays)
    const colGeo = new THREE.BoxGeometry(0.7, 2.3, 0.7);
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

    // Central Elevator & Stair Lobby Core
    const stiltCore = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.3, 4.5), darkAccentMat);
    stiltCore.position.set(0, 1.5, 0);
    stiltCore.castShadow = true;
    stiltGroup.add(stiltCore);

    // Double Entry Doors in Lobby
    addWindow(stiltGroup, 0, 1.2, 2.3, 2.0, 1.8, 0);

    scene.add(stiltGroup);
    floorGroups.stilt = stiltGroup;

    // Helper for Residential Tiers (Ground, First, Second)
    const createResidentialFloor = (
      floorKey: FloorLevel,
      baseY: number,
      isPhase1Available: boolean,
      isTopFloor = false
    ) => {
      const group = new THREE.Group();
      group.name = floorKey;

      // Floor Slab
      const slab = new THREE.Mesh(new THREE.BoxGeometry(18.4, 0.35, 16.4), stoneWallMat);
      slab.position.set(0, baseY + 0.175, 0);
      slab.castShadow = true;
      slab.receiveShadow = true;
      group.add(slab);

      // Cornice band
      const cornice = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.1, 16.6), warmBronzeMat);
      cornice.position.set(0, baseY + 0.32, 0);
      group.add(cornice);

      // East Residence Wing (1 BHK - Unit 01)
      const u1Mat = isPhase1Available ? stoneWallMat : lockedGlassMat;
      const u1 = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.5, 7.2), u1Mat);
      u1.position.set(5.5, baseY + 1.6, -3.8);
      u1.castShadow = true;
      u1.receiveShadow = true;
      group.add(u1);

      // Windows for East Wing
      addWindow(group, 5.5, baseY + 1.6, -7.45, 2.2, 1.4, 0);
      addWindow(group, 8.75, baseY + 1.6, -3.8, 1.8, 1.4, Math.PI / 2);

      // Balcony Recess & Railing for East Wing
      addBalconyRailing(group, 5.5, baseY + 0.35, -7.5, 3.2, 0);

      // West Residence Wing (1 BHK - Unit 02)
      const u2 = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.5, 7.2), u1Mat);
      u2.position.set(-5.5, baseY + 1.6, -3.8);
      u2.castShadow = true;
      u2.receiveShadow = true;
      group.add(u2);

      addWindow(group, -5.5, baseY + 1.6, -7.45, 2.2, 1.4, 0);
      addWindow(group, -8.75, baseY + 1.6, -3.8, 1.8, 1.4, Math.PI / 2);
      addBalconyRailing(group, -5.5, baseY + 0.35, -7.5, 3.2, 0);

      // North Studio Wing (1 RK - Unit 03)
      const u3 = new THREE.Mesh(new THREE.BoxGeometry(12.0, 2.5, 5.8), u1Mat);
      u3.position.set(0, baseY + 1.6, 4.4);
      u3.castShadow = true;
      u3.receiveShadow = true;
      group.add(u3);

      addWindow(group, -3.5, baseY + 1.6, 7.35, 2.0, 1.4, 0);
      addWindow(group, 3.5, baseY + 1.6, 7.35, 2.0, 1.4, 0);
      addBalconyRailing(group, 0, baseY + 0.35, 7.4, 4.2, 0);

      // Central Lift & Stair Tower Core
      const core = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, 4.5), darkAccentMat);
      core.position.set(0, baseY + 1.6, 0);
      core.castShadow = true;
      group.add(core);

      // Vertical Window strip on Core
      addWindow(group, 0, baseY + 1.6, -2.3, 1.2, 2.0, 0);

      // ROOFTOP FEATURES (On top floor only)
      if (isTopFloor) {
        const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.35, 16.6), stoneWallMat);
        roofSlab.position.set(0, baseY + 2.9, 0);
        roofSlab.castShadow = true;
        group.add(roofSlab);

        // Safety Parapet Wall
        const parapet = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.9, 0.2), stoneWallMat);
        parapet.position.set(0, baseY + 3.4, -8.2);
        group.add(parapet);

        const parapetBack = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.9, 0.2), stoneWallMat);
        parapetBack.position.set(0, baseY + 3.4, 8.2);
        group.add(parapetBack);

        // Penthouse Pergola Wooden Beams
        for (let x = -6.5; x <= 6.5; x += 1.4) {
          const beam = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.3, 10.0), woodPergolaMat);
          beam.position.set(x, baseY + 4.6, 0);
          beam.castShadow = true;
          group.add(beam);
        }

        // Lift Machine Room Tower Overrun
        const liftTower = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.0, 4.8), darkAccentMat);
        liftTower.position.set(0, baseY + 4.0, 0);
        liftTower.castShadow = true;
        group.add(liftTower);
      }

      scene.add(group);
      return group;
    };

    floorGroups.ground = createResidentialFloor('ground', 2.6, true, false);
    floorGroups.first = createResidentialFloor('first', 5.5, false, false);
    floorGroups.second = createResidentialFloor('second', 8.4, false, true);
    floorGroupsRef.current = floorGroups;

    // LANDSCAPING & HUMAN SCALE
    // 3D Evergreen Trees Around Foundation
    const createTree = (tx: number, tz: number, scale = 1) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(tx, 0.2, tz);
      treeGroup.scale.set(scale, scale, scale);

      // Trunk
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.22, 1.8, 8),
        new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.8 })
      );
      trunk.position.set(0, 0.9, 0);
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Multi-layer foliage
      const foliageMat = new THREE.MeshStandardMaterial({
        color: 0x255243,
        roughness: 0.85,
        flatShading: true
      });

      const f1 = new THREE.Mesh(new THREE.ConeGeometry(1.6, 2.2, 7), foliageMat);
      f1.position.set(0, 2.5, 0);
      f1.castShadow = true;
      treeGroup.add(f1);

      const f2 = new THREE.Mesh(new THREE.ConeGeometry(1.3, 1.8, 7), foliageMat);
      f2.position.set(0, 3.4, 0);
      f2.castShadow = true;
      treeGroup.add(f2);

      scene.add(treeGroup);
    };

    createTree(-12, -10, 1.1);
    createTree(12, -10, 1.1);
    createTree(-12, 10, 0.9);
    createTree(12, 10, 0.9);
    createTree(13, 0, 1.2);

    // Architectural Human Scale Silhouette
    const createHumanFigure = (hx: number, hz: number) => {
      const figure = new THREE.Group();
      figure.position.set(hx, 0.35, hz);

      const bodyMat = new THREE.MeshBasicMaterial({ color: 0xc58f58 });
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

    // Mouse & Touch Orbit Handlers
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
        orbitRef.current.targetTheta += 0.0012; // Slow ambient rotation
      }

      // Vertical Floor offsets for Exploded & Isolated modes
      const groups = floorGroupsRef.current;
      const targetOffsets: { [key in FloorLevel]?: number } = {
        stilt: 0,
        ground: isExploded ? 3.0 : activeFloor === 'ground' ? 0.35 : 0,
        first: isExploded ? 6.5 : activeFloor === 'first' ? 0.35 : 0,
        second: isExploded ? 10.0 : activeFloor === 'second' ? 0.35 : 0
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
