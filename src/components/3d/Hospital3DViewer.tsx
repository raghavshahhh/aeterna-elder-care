'use client';

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  HOSPITAL_FOOTPRINT,
  HOSPITAL_ROOMS_GROUND,
  HOSPITAL_ROOMS_FIRST,
  HOSPITAL_ROOMS_SECOND,
  ArchitecturalRoom
} from "@/data/architecturalData";
import { useModal } from "@/context/ModalContext";
import {
  Layers,
  Rotate3d,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sparkles,
  Building2,
  Compass,
  FileText,
  Activity,
  Heart,
  Stethoscope,
  X,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Info,
  Sliders
} from "lucide-react";

export type HospitalFloorView = "all" | "ground" | "first" | "second" | "roof";

interface Hospital3DViewerProps {
  initialFloor?: HospitalFloorView;
  onSelectRoom?: (room: ArchitecturalRoom) => void;
  className?: string;
}

export const Hospital3DViewer: React.FC<Hospital3DViewerProps> = ({
  initialFloor = "all",
  onSelectRoom,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openFloorPlanModal, openWhatsApp } = useModal();

  const [activeFloor, setActiveFloor] = useState<HospitalFloorView>(initialFloor);
  const [selectedRoom, setSelectedRoom] = useState<ArchitecturalRoom | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<ArchitecturalRoom | null>(null);
  const [viewPreset, setViewPreset] = useState<"hero" | "top" | "front" | "ayurveda" | "diagnostics" | "roof">("hero");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showWireframe, setShowWireframe] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const floorGroupsRef = useRef<{ [key in HospitalFloorView]?: THREE.Group }>({});
  const interactiveMeshesRef = useRef<THREE.Mesh[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const activeFloorRef = useRef<HospitalFloorView>(initialFloor);
  const onSelectRoomRef = useRef(onSelectRoom);

  useEffect(() => {
    activeFloorRef.current = activeFloor;
  }, [activeFloor]);

  useEffect(() => {
    onSelectRoomRef.current = onSelectRoom;
  }, [onSelectRoom]);

  // Orbit camera state
  const orbitRef = useRef({
    radius: 65,
    theta: Math.PI / 3.8,
    phi: Math.PI / 3.2,
    target: new THREE.Vector3(0, 4.5, 0),
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    targetRadius: 65,
    targetTheta: Math.PI / 3.8,
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

  // WebGL Initialization
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x071519);
    scene.fog = new THREE.FogExp2(0x071519, 0.005);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      powerPreference: "high-performance",
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xe8f2f5, 0x243328, 0.9);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xfff8ed, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e0, 2.4);
    sunLight.position.set(45, 75, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = isMobile ? 1024 : 2048;
    sunLight.shadow.mapSize.height = isMobile ? 1024 : 2048;
    sunLight.shadow.camera.left = -40;
    sunLight.shadow.camera.right = 40;
    sunLight.shadow.camera.top = 40;
    sunLight.shadow.camera.bottom = -40;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 200;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    const skyFill = new THREE.DirectionalLight(0x7fb2a0, 0.7);
    skyFill.position.set(-45, 35, -45);
    scene.add(skyFill);

    // Ground Plane & Road
    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x142822, roughness: 0.95 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    scene.add(ground);

    // Front Highway / Access Road (33'-0" Wide)
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x2b3338, roughness: 0.8 });
    const road = new THREE.Mesh(new THREE.PlaneGeometry(140, 14), roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.01, 28);
    road.receiveShadow = true;
    scene.add(road);

    // Road Divider Lines
    const roadLineMat = new THREE.MeshStandardMaterial({ color: 0xe5c158, roughness: 0.5 });
    for (let x = -60; x <= 60; x += 6) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 0.25), roadLineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(x, 0.02, 28);
      scene.add(line);
    }

    // Paved Front Drop-Off Porch & Ambulance Bay
    const paverMat = new THREE.MeshStandardMaterial({ color: 0x485258, roughness: 0.7 });
    const porchPavement = new THREE.Mesh(new THREE.BoxGeometry(38, 0.1, 8), paverMat);
    porchPavement.position.set(0, 0.05, 23);
    porchPavement.receiveShadow = true;
    scene.add(porchPavement);

    // Materials Library
    const facadeWallMat = new THREE.MeshStandardMaterial({ color: 0xede4d3, roughness: 0.65 });
    const interiorWallMat = new THREE.MeshStandardMaterial({ color: 0xf4eee4, roughness: 0.85 });
    const slabMat = new THREE.MeshStandardMaterial({ color: 0xd8d0c2, roughness: 0.7 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x88c4d8,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.8,
      transparent: true,
      opacity: 0.65
    });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.6 });
    const bronzeMat = new THREE.MeshStandardMaterial({ color: 0x6e4e37, metalness: 0.6, roughness: 0.3 });
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x2b8ea8, roughness: 0.2, metalness: 0.3, transparent: true, opacity: 0.85 });
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x2d593c, roughness: 0.9 });
    const emergencyRedMat = new THREE.MeshStandardMaterial({ color: 0xb83838, roughness: 0.5 });

    // Zone Color Mapping for Interactive Rooms
    const zoneColors: Record<string, number> = {
      wellness: 0x3d8b68,
      opd: 0x3a78a6,
      ayurveda: 0xc48c46,
      emergency: 0xc43b3b,
      diagnostics: 0x5a5eb0,
      surgical: 0x8e4296,
      inpatient: 0x2e8b82,
      academic: 0x50758a,
      recreation: 0xb87333,
      service: 0x687880,
      circulation: 0x909fa8
    };

    const interactiveMeshes: THREE.Mesh[] = [];
    const floorGroups: { [key in HospitalFloorView]?: THREE.Group } = {};

    // ─── 1. GROUND FLOOR (Ayurveda, OPD, Emergency, Reception) ──────────────
    const groundGroup = new THREE.Group();
    groundGroup.name = "hospital-ground";

    // Ground Floor Slab (117'-10" × 138'-0" / 35.9m × 42.1m)
    const gSlab = new THREE.Mesh(
      new THREE.BoxGeometry(HOSPITAL_FOOTPRINT.widthM, 0.4, HOSPITAL_FOOTPRINT.depthM),
      slabMat
    );
    gSlab.position.set(0, 0.2, 0);
    gSlab.receiveShadow = true;
    groundGroup.add(gSlab);

    // Ground Floor Ceiling Slab
    const gCeiling = new THREE.Mesh(
      new THREE.BoxGeometry(HOSPITAL_FOOTPRINT.widthM, 0.3, HOSPITAL_FOOTPRINT.depthM),
      slabMat
    );
    gCeiling.position.set(0, 3.6, 0);
    gCeiling.castShadow = true;
    groundGroup.add(gCeiling);

    // Ground Rooms
    HOSPITAL_ROOMS_GROUND.forEach((room) => {
      const roomMat = new THREE.MeshStandardMaterial({
        color: zoneColors[room.zone] || 0x4a7a8c,
        roughness: 0.5,
        metalness: 0.1,
        transparent: true,
        opacity: 0.88
      });
      const roomMesh = new THREE.Mesh(
        new THREE.BoxGeometry(room.size[0], room.size[1], room.size[2]),
        roomMat
      );
      roomMesh.position.set(room.position[0], room.position[1], room.position[2]);
      roomMesh.castShadow = true;
      roomMesh.receiveShadow = true;
      roomMesh.userData = { room };
      groundGroup.add(roomMesh);
      interactiveMeshes.push(roomMesh);

      // Floor boundary wireframe outline
      const edges = new THREE.EdgesGeometry(roomMesh.geometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 }));
      roomMesh.add(line);
    });

    // Main Entrance Portico (10'-0" Wide Main Gates)
    const portico = new THREE.Mesh(new THREE.BoxGeometry(14, 0.35, 6), bronzeMat);
    portico.position.set(0, 3.6, 22);
    groundGroup.add(portico);

    [-5, 5].forEach((px) => {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 3.6, 12), facadeWallMat);
      pillar.position.set(px, 1.8, 24);
      pillar.castShadow = true;
      groundGroup.add(pillar);
    });

    // Emergency Red Signage Canopy
    const emgCanopy = new THREE.Mesh(new THREE.BoxGeometry(8, 0.25, 4), emergencyRedMat);
    emgCanopy.position.set(10, 3.6, -19);
    groundGroup.add(emgCanopy);

    scene.add(groundGroup);
    floorGroups.ground = groundGroup;

    // ─── 2. FIRST FLOOR (OT, ICU, MRI, CT, Dialysis, Wards) ─────────────────
    const firstGroup = new THREE.Group();
    firstGroup.name = "hospital-first";

    // First Floor Ceiling Slab
    const fCeiling = new THREE.Mesh(
      new THREE.BoxGeometry(HOSPITAL_FOOTPRINT.widthM, 0.3, HOSPITAL_FOOTPRINT.depthM),
      slabMat
    );
    fCeiling.position.set(0, 7.2, 0);
    fCeiling.castShadow = true;
    firstGroup.add(fCeiling);

    // First Floor Rooms
    HOSPITAL_ROOMS_FIRST.forEach((room) => {
      const roomMat = new THREE.MeshStandardMaterial({
        color: zoneColors[room.zone] || 0x5a6a7a,
        roughness: 0.5,
        metalness: 0.1,
        transparent: true,
        opacity: 0.88
      });
      const roomMesh = new THREE.Mesh(
        new THREE.BoxGeometry(room.size[0], room.size[1], room.size[2]),
        roomMat
      );
      roomMesh.position.set(room.position[0], room.position[1], room.position[2]);
      roomMesh.castShadow = true;
      roomMesh.receiveShadow = true;
      roomMesh.userData = { room };
      firstGroup.add(roomMesh);
      interactiveMeshes.push(roomMesh);

      const edges = new THREE.EdgesGeometry(roomMesh.geometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 }));
      roomMesh.add(line);
    });

    // Glazed Corridor Windows along Facade
    const fCurtainWall = new THREE.Mesh(new THREE.BoxGeometry(32, 2.8, 0.1), glassMat);
    fCurtainWall.position.set(0, 5.4, 20.8);
    firstGroup.add(fCurtainWall);

    scene.add(firstGroup);
    floorGroups.first = firstGroup;

    // ─── 3. SECOND FLOOR (Auditorium, Pool, Open Roof Deck, Library) ────────
    const secondGroup = new THREE.Group();
    secondGroup.name = "hospital-second";

    // Second Floor Rooms
    HOSPITAL_ROOMS_SECOND.forEach((room) => {
      const isPool = room.id === "hosp-2f-pool";
      const isOpenRoof = room.id === "hosp-2f-openroof";
      const isSemiShade = room.id === "hosp-2f-semishade";

      let mat = new THREE.MeshStandardMaterial({
        color: zoneColors[room.zone] || 0x6a7a8a,
        roughness: 0.5,
        metalness: 0.1,
        transparent: true,
        opacity: 0.88
      });

      if (isPool) {
        mat = waterMat;
      } else if (isOpenRoof) {
        mat = new THREE.MeshStandardMaterial({ color: 0xd2b588, roughness: 0.8 }); // terracotta paving
      }

      const roomMesh = new THREE.Mesh(
        new THREE.BoxGeometry(room.size[0], room.size[1], room.size[2]),
        mat
      );
      roomMesh.position.set(room.position[0], room.position[1], room.position[2]);
      roomMesh.castShadow = true;
      roomMesh.receiveShadow = true;
      roomMesh.userData = { room };
      secondGroup.add(roomMesh);
      interactiveMeshes.push(roomMesh);

      // Add architectural details for special rooftop zones
      if (isOpenRoof) {
        // 3.5ft safety glass & steel parapet railing around open roof deck
        const parapetMat = new THREE.MeshStandardMaterial({ color: 0x90a4ae, metalness: 0.8, roughness: 0.2 });
        const pRailing = new THREE.Mesh(
          new THREE.BoxGeometry(room.size[0] + 0.2, 1.1, room.size[2] + 0.2),
          new THREE.MeshStandardMaterial({ color: 0x33444c, wireframe: true })
        );
        pRailing.position.set(0, 0.6, 0);
        roomMesh.add(pRailing);

        // Herb planter boxes along terrace
        [-4, 0, 4].forEach((px) => {
          const planter = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 0.8), woodMat);
          planter.position.set(px, 0.6, 7.5);
          roomMesh.add(planter);

          const shrub = new THREE.Mesh(new THREE.SphereGeometry(0.35, 6, 6), grassMat);
          shrub.position.set(px, 0.9, 7.5);
          roomMesh.add(shrub);
        });
      }

      if (isSemiShade) {
        // Louvered wooden pergola overhead
        for (let lz = -5; lz <= 5; lz += 0.8) {
          const louver = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.12, 0.15), woodMat);
          louver.position.set(0, 1.6, lz);
          roomMesh.add(louver);
        }
      }

      if (room.id === "hosp-2f-auditorium") {
        // Concentric stepped tiers
        [0.8, 0.5, 0.2].forEach((h, idx) => {
          const tier = new THREE.Mesh(new THREE.CylinderGeometry(4.5 - idx * 0.9, 4.5 - idx * 0.9, 0.3, 16, 1, false, 0, Math.PI), woodMat);
          tier.position.set(0, -1.0 + idx * 0.35, -1.0);
          roomMesh.add(tier);
        });
      }

      const edges = new THREE.EdgesGeometry(roomMesh.geometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 }));
      roomMesh.add(line);
    });

    scene.add(secondGroup);
    floorGroups.second = secondGroup;
    floorGroups.roof = secondGroup;

    // ─── 4. COMPLETE BUILDING ENVELOPE (for "ALL" view) ────────────────────
    const allGroup = new THREE.Group();
    allGroup.name = "hospital-envelope";

    // Roof Parapet
    const roofParapet = new THREE.Mesh(
      new THREE.BoxGeometry(HOSPITAL_FOOTPRINT.widthM + 0.3, 1.1, HOSPITAL_FOOTPRINT.depthM + 0.3),
      new THREE.MeshStandardMaterial({ color: 0xc4b9a6, roughness: 0.7 })
    );
    roofParapet.position.set(0, 11.2, 0);
    allGroup.add(roofParapet);

    // Decorative Top Golden Signage Header
    const signBox = new THREE.Mesh(new THREE.BoxGeometry(16, 1.2, 0.4), bronzeMat);
    signBox.position.set(0, 12.0, 20.8);
    allGroup.add(signBox);

    scene.add(allGroup);
    floorGroups.all = allGroup;

    floorGroupsRef.current = floorGroups;
    interactiveMeshesRef.current = interactiveMeshes;

    // Mouse / Touch Interaction for Orbit and Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: PointerEvent) => {
      orbitRef.current.isDragging = true;
      orbitRef.current.prevMouseX = e.clientX;
      orbitRef.current.prevMouseY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (orbitRef.current.isDragging) {
        const deltaX = e.clientX - orbitRef.current.prevMouseX;
        const deltaY = e.clientY - orbitRef.current.prevMouseY;
        orbitRef.current.targetTheta -= deltaX * 0.007;
        orbitRef.current.targetPhi = Math.max(0.1, Math.min(Math.PI / 2.05, orbitRef.current.targetPhi - deltaY * 0.007));
        orbitRef.current.prevMouseX = e.clientX;
        orbitRef.current.prevMouseY = e.clientY;
      } else {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveMeshesRef.current);
        if (intersects.length > 0) {
          const hitRoom = intersects[0].object.userData.room as ArchitecturalRoom;
          setHoveredRoom(hitRoom);
          canvas.style.cursor = "pointer";
        } else {
          setHoveredRoom(null);
          canvas.style.cursor = "grab";
        }
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (orbitRef.current.isDragging) {
        const dist = Math.hypot(e.clientX - orbitRef.current.prevMouseX, e.clientY - orbitRef.current.prevMouseY);
        orbitRef.current.isDragging = false;
        if (dist < 4) {
          // Click selection
          const rect = canvas.getBoundingClientRect();
          mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(interactiveMeshesRef.current);
          if (intersects.length > 0) {
            const hitRoom = intersects[0].object.userData.room as ArchitecturalRoom;
            setSelectedRoom(hitRoom);
            if (onSelectRoomRef.current) {
              onSelectRoomRef.current(hitRoom);
            }
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitRef.current.targetRadius = Math.max(25, Math.min(110, orbitRef.current.targetRadius + e.deltaY * 0.05));
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    // Render loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      updateCameraPosition();
      renderer.render(scene, camera);
    };
    animate();
    setIsLoading(false);

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [updateCameraPosition]);

  // Handle floor isolation visibility
  useEffect(() => {
    const floorGroups = floorGroupsRef.current;
    if (!floorGroups) return;

    if (activeFloor === "all") {
      if (floorGroups.ground) floorGroups.ground.visible = true;
      if (floorGroups.first) floorGroups.first.visible = true;
      if (floorGroups.second) floorGroups.second.visible = true;
      if (floorGroups.all) floorGroups.all.visible = true;
    } else if (activeFloor === "ground") {
      if (floorGroups.ground) floorGroups.ground.visible = true;
      if (floorGroups.first) floorGroups.first.visible = false;
      if (floorGroups.second) floorGroups.second.visible = false;
      if (floorGroups.all) floorGroups.all.visible = false;
    } else if (activeFloor === "first") {
      if (floorGroups.ground) floorGroups.ground.visible = false;
      if (floorGroups.first) floorGroups.first.visible = true;
      if (floorGroups.second) floorGroups.second.visible = false;
      if (floorGroups.all) floorGroups.all.visible = false;
    } else if (activeFloor === "second" || activeFloor === "roof") {
      if (floorGroups.ground) floorGroups.ground.visible = false;
      if (floorGroups.first) floorGroups.first.visible = false;
      if (floorGroups.second) floorGroups.second.visible = true;
      if (floorGroups.all) floorGroups.all.visible = false;
    }
  }, [activeFloor]);

  // Preset Views
  const handlePresetView = (preset: "hero" | "top" | "front" | "ayurveda" | "diagnostics" | "roof") => {
    setViewPreset(preset);
    const orbit = orbitRef.current;

    if (preset === "hero") {
      orbit.targetRadius = 65;
      orbit.targetTheta = Math.PI / 3.8;
      orbit.targetPhi = Math.PI / 3.2;
      orbit.targetLookAt.set(0, 4.5, 0);
    } else if (preset === "top") {
      orbit.targetRadius = 55;
      orbit.targetTheta = 0;
      orbit.targetPhi = 0.05;
      orbit.targetLookAt.set(0, 4.0, 0);
    } else if (preset === "front") {
      orbit.targetRadius = 60;
      orbit.targetTheta = 0;
      orbit.targetPhi = Math.PI / 2.2;
      orbit.targetLookAt.set(0, 4.5, 0);
    } else if (preset === "ayurveda") {
      orbit.targetRadius = 42;
      orbit.targetTheta = Math.PI / 2.5;
      orbit.targetPhi = Math.PI / 3.0;
      orbit.targetLookAt.set(10.0, 3.0, 2.0);
    } else if (preset === "diagnostics") {
      orbit.targetRadius = 42;
      orbit.targetTheta = -Math.PI / 2.5;
      orbit.targetPhi = Math.PI / 3.0;
      orbit.targetLookAt.set(-10.0, 5.0, 0.0);
    } else if (preset === "roof") {
      orbit.targetRadius = 48;
      orbit.targetTheta = Math.PI / 4.0;
      orbit.targetPhi = Math.PI / 4.0;
      orbit.targetLookAt.set(6.0, 9.0, 6.0);
    }
  };

  const handleOpenCAD = (tab: "hospital-ground" | "hospital-first" | "hospital-second") => {
    openFloorPlanModal(tab);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden bg-[#071519] border border-white/10 shadow-2xl flex flex-col ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen" : "h-[640px] sm:h-[720px]"
      } ${className}`}
    >
      {/* Top Architectural HUD Header */}
      <div className="absolute top-0 inset-x-0 z-20 p-4 sm:p-6 bg-gradient-to-b from-[#071519]/90 via-[#071519]/50 to-transparent pointer-events-none flex flex-wrap items-center justify-between gap-4">
        <div className="pointer-events-auto space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] text-[10px] font-mono uppercase tracking-widest font-bold">
              CAD Faithful 3D Reconstruction
            </span>
            <span className="text-white/60 text-xs font-mono">117&apos;-10&quot; &times; 138&apos;-0&quot; · G+2</span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif-heading font-bold text-white tracking-wide">
            Ayurvedic &amp; Multi-Speciality Hospital (30,000 sq.ft.)
          </h3>
          <p className="text-xs text-white/60 flex items-center gap-1.5">
            <span>Authoritative Source: Ar. Yash Garg (The Vision Architects)</span>
          </p>
        </div>

        {/* View Presets & Fullscreen */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-[#0A1D24]/80 backdrop-blur-md p-1 rounded-2xl border border-white/10">
            {(
              [
                { key: "hero", label: "Perspective" },
                { key: "top", label: "CAD Top" },
                { key: "front", label: "Front Facade" },
                { key: "ayurveda", label: "Ayurveda Wing" },
                { key: "diagnostics", label: "OT/ICU Wing" },
                { key: "roof", label: "Open Roof" }
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                onClick={() => handlePresetView(item.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  viewPreset === item.key
                    ? "bg-[#C58F58] text-[#071519] font-bold shadow-md"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-2xl bg-[#0A1D24]/80 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-all backdrop-blur-md"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />

      {/* Floating Floor Selector Tabs */}
      <div className="absolute top-24 left-4 sm:left-6 z-20 pointer-events-auto flex flex-col gap-1.5 bg-[#071519]/85 backdrop-blur-md p-2 rounded-2xl border border-white/15 shadow-xl">
        <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest px-2 py-1 flex items-center gap-1.5">
          <Layers className="w-3 h-3 text-[#C58F58]" /> Floor Isolator
        </div>
        {(
          [
            { id: "all", label: "Complete G+2 Building", sub: "All Floors" },
            { id: "ground", label: "Ground Floor", sub: "OPD · Panchakarma · Emergency" },
            { id: "first", label: "First Floor", sub: "Cathlab · OT · ICU · Wards" },
            { id: "second", label: "Second Floor", sub: "Auditorium · Pool · Library" },
            { id: "roof", label: "Open Roof Deck", sub: '39\'-2" × 56\'-11" Sky Deck' }
          ] as const
        ).map((fl) => (
          <button
            key={fl.id}
            onClick={() => setActiveFloor(fl.id)}
            className={`px-3 py-2 rounded-xl text-left transition-all ${
              activeFloor === fl.id
                ? "bg-[#C58F58] text-[#071519] font-bold shadow-lg"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <div className="text-xs font-semibold">{fl.label}</div>
            <div className={`text-[10px] font-mono ${activeFloor === fl.id ? "text-[#071519]/80" : "text-white/40"}`}>
              {fl.sub}
            </div>
          </button>
        ))}
      </div>

      {/* Hovered / Active Room Tooltip */}
      {hoveredRoom && !selectedRoom && (
        <div className="absolute top-24 right-4 sm:right-6 z-20 pointer-events-none bg-[#0D2329]/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#C58F58]/50 shadow-xl max-w-xs space-y-1">
          <div className="text-[10px] font-mono text-[#E0AB77] uppercase tracking-wider font-bold">
            {hoveredRoom.floor.toUpperCase()} FLOOR · {hoveredRoom.zone.toUpperCase()}
          </div>
          <div className="text-sm font-bold text-white leading-tight">{hoveredRoom.name}</div>
          <div className="text-xs text-white/70 font-mono">CAD: {hoveredRoom.cadDimension} ({hoveredRoom.areaSqFt} sq.ft.)</div>
          <div className="text-[10px] text-emerald-400 font-medium">Click to inspect architectural details →</div>
        </div>
      )}

      {/* Selected Room Detailed Bottom Drawer */}
      {selectedRoom && (
        <div className="absolute bottom-4 inset-x-4 sm:inset-x-6 z-30 pointer-events-auto bg-[#071519]/95 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-[#C58F58]/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#C58F58]/20 text-[#E0AB77] text-[10px] font-mono uppercase font-bold">
                {selectedRoom.floor.toUpperCase()} FLOOR · {selectedRoom.zone.toUpperCase()}
              </span>
              <span className="text-xs text-white/50 font-mono">
                CAD Dim: <strong className="text-white">{selectedRoom.cadDimension}</strong>
              </span>
              {selectedRoom.areaSqFt && (
                <span className="text-xs text-white/50 font-mono">
                  Area: <strong className="text-emerald-400">~{selectedRoom.areaSqFt} sq.ft.</strong>
                </span>
              )}
            </div>
            <h4 className="text-xl sm:text-2xl font-serif-heading font-bold text-white">
              {selectedRoom.name}
            </h4>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {selectedRoom.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {selectedRoom.keyFeatures.map((feat, idx) => (
                <span key={idx} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/10 text-white/90 font-medium">
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => handleOpenCAD(selectedRoom.cadPlanTab as any)}
              className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View 2D CAD Blueprint →
            </button>
            <button
              onClick={() => setSelectedRoom(null)}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-4 left-4 sm:left-6 z-20 pointer-events-auto flex items-center gap-2 text-xs text-white/60">
        <button
          onClick={() => handlePresetView("hero")}
          className="px-3 py-1.5 rounded-xl bg-[#0A1D24]/80 hover:bg-white/10 text-white/80 border border-white/10 flex items-center gap-1.5 backdrop-blur-md"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset View
        </button>
        <span className="hidden sm:inline font-mono text-[11px] text-white/40">
          • Left click + drag to orbit • Scroll to zoom • Click room for CAD specs
        </span>
      </div>
    </div>
  );
};
