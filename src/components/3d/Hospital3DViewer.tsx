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
  Sliders,
  Eye,
  EyeOff
} from "lucide-react";

export type HospitalFloorView = "all" | "ground" | "first" | "second" | "roof";

interface Hospital3DViewerProps {
  initialFloor?: HospitalFloorView;
  selectedRoomId?: string | null;
  onSelectRoom?: (room: ArchitecturalRoom | null) => void;
  className?: string;
}

export const Hospital3DViewer: React.FC<Hospital3DViewerProps> = ({
  initialFloor = "all",
  selectedRoomId,
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

  // CAD Overlay QA Mode
  const [isCadOverlay, setIsCadOverlay] = useState<boolean>(false);
  const [cadOpacity, setCadOpacity] = useState<number>(0.75);
  const [modelOpacity, setModelOpacity] = useState<number>(0.85);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const floorGroupsRef = useRef<{ [key in HospitalFloorView]?: THREE.Group }>({});
  const interactiveMeshesRef = useRef<THREE.Mesh[]>([]);
  const cadOverlayMeshRef = useRef<THREE.Mesh | null>(null);
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

    // Front Highway / Access Road (33'-0\" Wide)
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

    // Ground Floor Slab (117'-10\" × 138'-0\" / 35.9m × 42.1m)
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

    // Main Entrance Portico (10'-0\" Wide Main Gates)
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
      const isPool = room.id.includes("POOL");
      const isOpenRoof = room.id.includes("OPENROOF") || room.zone === "recreation" && room.name.includes("Roof");
      const isSemiShade = room.id.includes("SEMISHADE") || room.name.includes("Shaded");

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

      if (room.id.includes("AUDITORIUM")) {
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

    // 16 Reinforced Concrete Structural Column Grid
    const colMat = new THREE.MeshStandardMaterial({ color: 0xbdb3a4, roughness: 0.7 });
    for (let cx = -15; cx <= 15; cx += 10) {
      for (let cz = -18; cz <= 18; cz += 12) {
        const col = new THREE.Mesh(new THREE.BoxGeometry(0.5, 11.5, 0.5), colMat);
        col.position.set(cx, 5.75, cz);
        col.castShadow = true;
        allGroup.add(col);
      }
    }

    scene.add(allGroup);
    floorGroups.all = allGroup;

    floorGroupsRef.current = floorGroups;
    interactiveMeshesRef.current = interactiveMeshes;

    // ─── 5. CAD OVERLAY PLANE MESH ──────────────────────────────────────────
    const cadLoader = new THREE.TextureLoader();
    const cadGeo = new THREE.PlaneGeometry(HOSPITAL_FOOTPRINT.widthM, HOSPITAL_FOOTPRINT.depthM);
    const cadMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const cadMesh = new THREE.Mesh(cadGeo, cadMat);
    cadMesh.rotation.x = -Math.PI / 2;
    cadMesh.position.set(0, 0.25, 0);
    cadMesh.visible = false;
    scene.add(cadMesh);
    cadOverlayMeshRef.current = cadMesh;

    // Load initial texture
    cadLoader.load("/project-assets/architecture/cad/previews/ground-floor-preview.jpg", (tex) => {
      tex.anisotropy = 8;
      cadMat.map = tex;
      cadMat.needsUpdate = true;
    });

    setIsLoading(false);

    // Render loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      updateCameraPosition();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
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
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      renderer.dispose();
    };
  }, [updateCameraPosition]);

  // CAD Overlay update when activeFloor / isCadOverlay / opacity changes
  useEffect(() => {
    const cadMesh = cadOverlayMeshRef.current;
    if (!cadMesh) return;

    if (!isCadOverlay) {
      cadMesh.visible = false;
      return;
    }

    cadMesh.visible = true;
    const mat = cadMesh.material as THREE.MeshBasicMaterial;
    mat.opacity = cadOpacity;
    mat.needsUpdate = true;

    // Determine preview image based on floor
    let cadUrl = "/project-assets/architecture/cad/previews/ground-floor-preview.jpg";
    let yPos = 0.25;

    if (activeFloor === "first") {
      cadUrl = "/project-assets/architecture/cad/previews/first-floor-preview.jpg";
      yPos = 3.85;
    } else if (activeFloor === "second" || activeFloor === "roof") {
      cadUrl = "/project-assets/architecture/cad/previews/second-floor-preview.jpg";
      yPos = 7.45;
    }

    cadMesh.position.y = yPos;

    const loader = new THREE.TextureLoader();
    loader.load(cadUrl, (tex) => {
      tex.anisotropy = 8;
      mat.map = tex;
      mat.needsUpdate = true;
    });
  }, [isCadOverlay, cadOpacity, activeFloor]);

  // Adjust 3D model opacity based on modelOpacity slider
  useEffect(() => {
    interactiveMeshesRef.current.forEach((mesh) => {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => {
          if ('opacity' in m) m.opacity = modelOpacity;
        });
      } else if (mesh.material && 'opacity' in mesh.material) {
        mesh.material.opacity = modelOpacity;
      }
    });
  }, [modelOpacity]);

  // Floor Isolation Visibility Logic
  useEffect(() => {
    const groups = floorGroupsRef.current;
    if (!groups) return;

    if (activeFloor === "all") {
      if (groups.ground) groups.ground.visible = true;
      if (groups.first) groups.first.visible = true;
      if (groups.second) groups.second.visible = true;
      if (groups.all) groups.all.visible = true;
    } else if (activeFloor === "ground") {
      if (groups.ground) groups.ground.visible = true;
      if (groups.first) groups.first.visible = false;
      if (groups.second) groups.second.visible = false;
      if (groups.all) groups.all.visible = false;
    } else if (activeFloor === "first") {
      if (groups.ground) groups.ground.visible = false;
      if (groups.first) groups.first.visible = true;
      if (groups.second) groups.second.visible = false;
      if (groups.all) groups.all.visible = false;
    } else if (activeFloor === "second" || activeFloor === "roof") {
      if (groups.ground) groups.ground.visible = false;
      if (groups.first) groups.first.visible = false;
      if (groups.second) groups.second.visible = true;
      if (groups.all) groups.all.visible = false;
    }
  }, [activeFloor]);

  // Handle selectedRoomId prop from parent
  useEffect(() => {
    if (!selectedRoomId) return;

    const allRooms = [...HOSPITAL_ROOMS_GROUND, ...HOSPITAL_ROOMS_FIRST, ...HOSPITAL_ROOMS_SECOND];
    const match = allRooms.find((r) => r.id === selectedRoomId);
    if (match) {
      setSelectedRoom(match);
      if (match.floor === "ground" && activeFloor !== "ground") setActiveFloor("ground");
      if (match.floor === "first" && activeFloor !== "first") setActiveFloor("first");
      if (match.floor === "second" && activeFloor !== "second") setActiveFloor("second");

      orbitRef.current.targetLookAt.set(match.position[0], match.position[1], match.position[2]);
      orbitRef.current.targetRadius = 35;
    }
  }, [selectedRoomId, activeFloor]);

  // Raycasting & Room Selection Interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    orbitRef.current.isDragging = true;
    orbitRef.current.prevMouseX = e.clientX;
    orbitRef.current.prevMouseY = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const camera = cameraRef.current;
    if (!canvas || !camera) return;

    if (orbitRef.current.isDragging) {
      const deltaX = e.clientX - orbitRef.current.prevMouseX;
      const deltaY = e.clientY - orbitRef.current.prevMouseY;

      orbitRef.current.targetTheta -= deltaX * 0.006;
      orbitRef.current.targetPhi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, orbitRef.current.targetPhi - deltaY * 0.006));

      orbitRef.current.prevMouseX = e.clientX;
      orbitRef.current.prevMouseY = e.clientY;
      return;
    }

    // Raycast hover
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const visibleMeshes = interactiveMeshesRef.current.filter((m) => m.parent && m.parent.visible);
    const intersects = raycaster.intersectObjects(visibleMeshes, false);

    if (intersects.length > 0) {
      const hit = intersects[0].object as THREE.Mesh;
      if (hit.userData?.room) {
        setHoveredRoom(hit.userData.room);
        canvas.style.cursor = "pointer";
        return;
      }
    }

    setHoveredRoom(null);
    canvas.style.cursor = "grab";
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const wasDragging = Math.abs(e.clientX - orbitRef.current.prevMouseX) > 4 || Math.abs(e.clientY - orbitRef.current.prevMouseY) > 4;
    orbitRef.current.isDragging = false;

    if (wasDragging) return;

    const canvas = canvasRef.current;
    const camera = cameraRef.current;
    if (!canvas || !camera) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const visibleMeshes = interactiveMeshesRef.current.filter((m) => m.parent && m.parent.visible);
    const intersects = raycaster.intersectObjects(visibleMeshes, false);

    if (intersects.length > 0) {
      const hit = intersects[0].object as THREE.Mesh;
      if (hit.userData?.room) {
        const room = hit.userData.room as ArchitecturalRoom;
        setSelectedRoom(room);
        if (onSelectRoomRef.current) {
          onSelectRoomRef.current(room);
        }
        orbitRef.current.targetLookAt.set(room.position[0], room.position[1], room.position[2]);
        orbitRef.current.targetRadius = 38;
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    orbitRef.current.targetRadius = Math.max(15, Math.min(130, orbitRef.current.targetRadius + e.deltaY * 0.05));
  };

  // Camera Presets
  const handlePresetView = (preset: "hero" | "top" | "front" | "ayurveda" | "diagnostics" | "roof") => {
    setViewPreset(preset);
    const orbit = orbitRef.current;

    switch (preset) {
      case "hero":
        orbit.targetRadius = 65;
        orbit.targetTheta = Math.PI / 3.8;
        orbit.targetPhi = Math.PI / 3.2;
        orbit.targetLookAt.set(0, 4.5, 0);
        break;
      case "top":
        orbit.targetRadius = 68;
        orbit.targetTheta = 0;
        orbit.targetPhi = 0.01;
        orbit.targetLookAt.set(0, 0, 0);
        break;
      case "front":
        orbit.targetRadius = 55;
        orbit.targetTheta = 0;
        orbit.targetPhi = Math.PI / 2.3;
        orbit.targetLookAt.set(0, 3, 15);
        break;
      case "ayurveda":
        setActiveFloor("ground");
        orbit.targetRadius = 40;
        orbit.targetTheta = -Math.PI / 4;
        orbit.targetPhi = Math.PI / 3.0;
        orbit.targetLookAt.set(10, 1.8, 5);
        break;
      case "diagnostics":
        setActiveFloor("first");
        orbit.targetRadius = 42;
        orbit.targetTheta = Math.PI / 2.5;
        orbit.targetPhi = Math.PI / 3.1;
        orbit.targetLookAt.set(-10, 5.4, -5);
        break;
      case "roof":
        setActiveFloor("second");
        orbit.targetRadius = 42;
        orbit.targetTheta = -Math.PI / 5;
        orbit.targetPhi = Math.PI / 3.2;
        orbit.targetLookAt.set(6, 9.0, 8);
        break;
    }
  };

  const handleReset = () => {
    setSelectedRoom(null);
    handlePresetView("hero");
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[640px] sm:h-[720px] rounded-3xl overflow-hidden bg-[#071519] border border-white/10 select-none shadow-2xl ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen w-screen" : ""
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

        {/* View Presets & Actions */}
        <div className="pointer-events-auto flex items-center gap-2 flex-wrap">
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

          {/* CAD Overlay Mode Toggle Button */}
          <button
            onClick={() => setIsCadOverlay(!isCadOverlay)}
            className={`px-3 py-2 rounded-2xl text-xs font-mono font-bold transition-all border backdrop-blur-md flex items-center gap-1.5 ${
              isCadOverlay
                ? "bg-[#C58F58] text-[#071519] border-[#C58F58] shadow-lg shadow-[#C58F58]/20"
                : "bg-[#0A1D24]/80 text-[#E0AB77] border-[#C58F58]/40 hover:bg-[#C58F58]/20"
            }`}
            title="Toggle CAD Blueprint semi-transparent overlay alignment mode"
          >
            {isCadOverlay ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            CAD Overlay QA
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-2xl bg-[#0A1D24]/80 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-all backdrop-blur-md"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Floating Floor Isolator Controls */}
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

      {/* CAD Overlay QA Controls Bar (when active) */}
      {isCadOverlay && (
        <div className="absolute bottom-20 left-4 sm:left-6 z-20 pointer-events-auto bg-[#0A1D24]/95 backdrop-blur-md p-4 rounded-2xl border border-[#C58F58]/60 shadow-2xl space-y-3 max-w-sm">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
            <span className="text-[11px] font-mono text-[#E0AB77] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" /> CAD 2D ↔ 3D Alignment QA
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  orbitRef.current.targetTheta = 0;
                  orbitRef.current.targetPhi = 0.001;
                  orbitRef.current.targetRadius = 60;
                  orbitRef.current.targetLookAt.set(0, 0, 0);
                }}
                className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[#C58F58]/20 hover:bg-[#C58F58] hover:text-[#071519] text-[#E0AB77] transition-all font-bold cursor-pointer"
                title="Fit to CAD Footprint (Orthographic North-Up)"
              >
                Fit To CAD
              </button>
              <button
                onClick={() => {
                  orbitRef.current.targetTheta = 0;
                }}
                className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-all font-bold cursor-pointer"
                title="Reset North-Up"
              >
                North Up
              </button>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-white/70 font-mono text-[10px]">
              <span>CAD 2D Blueprint Opacity:</span>
              <span className="text-[#E0AB77] font-bold">{Math.round(cadOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={cadOpacity}
              onChange={(e) => setCadOpacity(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C58F58]"
            />

            <div className="flex items-center justify-between text-white/70 font-mono text-[10px] pt-1">
              <span>3D Geometry Walls Opacity:</span>
              <span className="text-[#E0AB77] font-bold">{Math.round(modelOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={modelOpacity}
              onChange={(e) => setModelOpacity(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C58F58]"
            />

            <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-white/60">
              <span>Scale: 1 Three.js unit = 1.0 meter</span>
              <button
                onClick={() => {
                  setCadOpacity(0.65);
                  setModelOpacity(0.85);
                  orbitRef.current.targetTheta = 0;
                  orbitRef.current.targetPhi = 0.001;
                  orbitRef.current.targetRadius = 60;
                  orbitRef.current.targetLookAt.set(0, 0, 0);
                }}
                className="text-[#C58F58] hover:underline cursor-pointer"
              >
                Reset Alignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hovered / Active Room Tooltip */}
      {hoveredRoom && !selectedRoom && (
        <div className="absolute top-24 right-4 sm:right-6 z-20 pointer-events-none bg-[#0D2329]/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#C58F58]/50 shadow-xl max-w-xs space-y-1">
          <div className="text-[10px] font-mono text-[#E0AB77] uppercase tracking-wider font-bold">
            {hoveredRoom.id} · {hoveredRoom.floor.toUpperCase()} FLOOR · {hoveredRoom.zone.toUpperCase()}
          </div>
          <div className="text-sm font-bold text-white">{hoveredRoom.name}</div>
          <div className="text-xs font-mono text-white/80">CAD Dimension: {hoveredRoom.cadDimension}</div>
          {hoveredRoom.areaSqFt && (
            <div className="text-[10px] font-mono text-white/60">Area: ~{hoveredRoom.areaSqFt} sq.ft.</div>
          )}
          <div className="text-[10px] font-mono text-[#C58F58] pt-1">Click room to inspect clinical details â</div>
        </div>
      )}

      {/* Selected Room Details Drawer */}
      {selectedRoom && (
        <div className="absolute top-24 right-4 sm:right-6 z-30 pointer-events-auto bg-[#071519]/95 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-[#C58F58]/60 shadow-2xl max-w-sm w-[90vw] space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
            <div className="space-y-0.5">
              <span className="px-2 py-0.5 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] text-[10px] font-mono uppercase font-bold tracking-wider">
                {selectedRoom.id} · {selectedRoom.floor.toUpperCase()} FLOOR
              </span>
              <h4 className="text-base sm:text-lg font-serif-heading font-bold text-white pt-1">
                {selectedRoom.name}
              </h4>
              <div className="text-xs font-mono text-[#E0AB77]">CAD Dim: {selectedRoom.cadDimension}</div>
            </div>
            <button
              onClick={() => setSelectedRoom(null)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-white/80 leading-relaxed">{selectedRoom.description}</p>

          {/* Key Architectural & Clinical Specs */}
          <div className="space-y-2 bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#C58F58] font-bold">
              Key Specifications &amp; Equipment
            </div>
            <ul className="space-y-1.5">
              {selectedRoom.keyFeatures.map((feat, idx) => (
                <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C58F58] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Trigger to 2D CAD Blueprint Modal */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => openFloorPlanModal(selectedRoom.cadPlanTab)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" /> View 2D CAD Blueprint
            </button>

            <button
              onClick={() =>
                openWhatsApp({
                  title: `Inquiry: ${selectedRoom.name} (${selectedRoom.cadDimension})`,
                  actionType: "brochure",
                  message: `Hello SLCF team, I am interested in the ${selectedRoom.name} located on the ${selectedRoom.floor} floor of the Ayurvedic Hospital.`
                })
              }
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/10 flex items-center justify-center gap-2"
            >
              Inquire About Clinical Wing
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Legend & Navigation Tips */}
      <div className="absolute bottom-4 inset-x-4 sm:inset-x-6 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-3 text-xs text-white/60 font-mono">
        <div className="pointer-events-auto bg-[#071519]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-white/80">
            <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" /> Drag to Orbit
          </span>
          <span className="hidden sm:inline text-white/30">·</span>
          <span className="hidden sm:inline">Scroll to Zoom</span>
          <span className="hidden sm:inline text-white/30">·</span>
          <span className="hidden sm:inline">Click Room to Inspect</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-[#0A1D24]/80 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 backdrop-blur-md"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#C58F58]" /> Reset View
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};
