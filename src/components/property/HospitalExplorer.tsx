'use client';

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  HOSPITAL_FOOTPRINT,
  HOSPITAL_ROOMS_GROUND,
  HOSPITAL_ROOMS_FIRST,
  HOSPITAL_ROOMS_SECOND,
  ArchitecturalRoom
} from "@/data/architecturalData";
import { useModal } from "@/context/ModalContext";
import {
  Building2,
  Layers,
  Rotate3d,
  FileText,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Activity,
  Heart,
  Maximize2,
  Download,
  CheckCircle2,
  MessageSquare,
  Calendar,
  ChevronRight,
  Info,
  Compass
} from "lucide-react";

const Hospital3DViewer = dynamic(
  () => import("@/components/3d/Hospital3DViewer").then((mod) => mod.Hospital3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[640px] bg-[#071519] rounded-3xl flex flex-col items-center justify-center gap-3 border border-white/10 text-white">
        <div className="w-8 h-8 border-2 border-[#C58F58] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-white/60">Loading CAD-Faithful 3D Hospital Reconstruction...</span>
      </div>
    )
  }
);

export const HospitalExplorer: React.FC = () => {
  const { openFloorPlanModal, openWhatsApp, openLeadDrawer } = useModal();
  const [viewMode, setViewMode] = useState<"3d-model" | "2d-cad" | "departments">("3d-model");
  const [activeFloor, setActiveFloor] = useState<"ground" | "first" | "second">("ground");
  const [selectedRoom, setSelectedRoom] = useState<ArchitecturalRoom | null>(null);

  const getRoomsForFloor = () => {
    switch (activeFloor) {
      case "ground":
        return HOSPITAL_ROOMS_GROUND;
      case "first":
        return HOSPITAL_ROOMS_FIRST;
      case "second":
        return HOSPITAL_ROOMS_SECOND;
    }
  };

  const getCadImageForFloor = () => {
    switch (activeFloor) {
      case "ground":
        return {
          src: "/project-assets/architecture/cad/previews/ground-floor-preview.jpg",
          tab: "hospital-ground" as const,
          title: "Hospital Ground Floor CAD Plan — OPD, Panchakarma & Emergency"
        };
      case "first":
        return {
          src: "/project-assets/architecture/cad/previews/first-floor-preview.jpg",
          tab: "hospital-first" as const,
          title: "Hospital First Floor CAD Plan — Modular OT, ICU, Cathlab & Wards"
        };
      case "second":
        return {
          src: "/project-assets/architecture/cad/previews/second-floor-preview.jpg",
          tab: "hospital-second" as const,
          title: "Hospital Second Floor CAD Plan — 50-Seat Auditorium, Pool & Open Roof"
        };
    }
  };

  const currentCad = getCadImageForFloor();
  const currentRooms = getRoomsForFloor();

  return (
    <section id="hospital-explorer" className="py-16 sm:py-24 bg-[#0A1D24] text-white border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C58F58]/20 border border-[#C58F58]/40 text-[#E0AB77] text-xs font-mono font-bold uppercase tracking-widest">
              <Stethoscope className="w-3.5 h-3.5 text-[#C58F58]" />
              Architectural CAD &amp; 3D Reconstruction
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal text-white tracking-tight">
              30,000 sq.ft. Ayurvedic &amp; Multi-Speciality <span className="italic font-serif text-[#C58F58]">Hospital</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Explore the G+2 hospital blueprint and 3D architectural model reconstructed from authoritative drawings by <strong>The Vision Architects &amp; Interiors (Ar. Yash Garg)</strong>. Dimensions: 117'-10" × 138'-0".
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
            <button
              onClick={() => setViewMode("3d-model")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                viewMode === "3d-model"
                  ? "bg-[#C58F58] text-[#071519] shadow-lg"
                  : "text-white/75 hover:text-white hover:bg-white/10"
              }`}
            >
              <Rotate3d className="w-4 h-4" />
              Interactive 3D
            </button>
            <button
              onClick={() => setViewMode("2d-cad")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                viewMode === "2d-cad"
                  ? "bg-[#C58F58] text-[#071519] shadow-lg"
                  : "text-white/75 hover:text-white hover:bg-white/10"
              }`}
            >
              <FileText className="w-4 h-4" />
              2D CAD Plans
            </button>
            <button
              onClick={() => setViewMode("departments")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                viewMode === "departments"
                  ? "bg-[#C58F58] text-[#071519] shadow-lg"
                  : "text-white/75 hover:text-white hover:bg-white/10"
              }`}
            >
              <Layers className="w-4 h-4" />
              Space Inventory
            </button>
          </div>
        </div>

        {/* Floor Selection Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: "ground", label: "Ground Floor", sub: "OPD · Panchakarma · Emergency" },
                { id: "first", label: "First Floor", sub: "Modular OT · ICU · Cathlab · Wards" },
                { id: "second", label: "Second Floor & Roof", sub: "50-Seat Auditorium · Pool · Open Deck" }
              ] as const
            ).map((fl) => (
              <button
                key={fl.id}
                onClick={() => setActiveFloor(fl.id)}
                className={`px-4 py-2.5 rounded-xl text-left transition-all ${
                  activeFloor === fl.id
                    ? "bg-white/15 text-[#E0AB77] font-bold border border-[#C58F58]/50 shadow-md"
                    : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="text-xs font-semibold">{fl.label}</div>
                <div className="text-[10px] font-mono opacity-60">{fl.sub}</div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3">
            <button
              onClick={() => openFloorPlanModal(currentCad.tab)}
              className="text-xs font-mono text-[#E0AB77] hover:text-[#f3c89c] flex items-center gap-1.5 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Fullscreen CAD Viewer
            </button>
          </div>
        </div>

        {/* Primary Content View */}
        {viewMode === "3d-model" && (
          <div className="space-y-4">
            <Hospital3DViewer
              initialFloor={activeFloor}
              onSelectRoom={(room) => setSelectedRoom(room)}
            />
          </div>
        )}

        {viewMode === "2d-cad" && (
          <div className="bg-[#071519] rounded-3xl p-6 border border-white/10 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#E0AB77] uppercase tracking-wider font-bold">
                  High-Resolution Vector CAD Blueprint
                </span>
                <h3 className="text-xl font-serif-heading font-bold text-white">{currentCad.title}</h3>
                <p className="text-xs text-white/60">
                  Architectural Drawing: The Vision Architects · Ar. Yash Garg · Footprint 117'-10" × 138'-0"
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openFloorPlanModal(currentCad.tab)}
                  className="px-4 py-2.5 rounded-xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <Maximize2 className="w-4 h-4" /> Open Fullscreen CAD Modal
                </button>
              </div>
            </div>

            {/* CAD Image Display with Interactive Zoom Trigger */}
            <div
              onClick={() => openFloorPlanModal(currentCad.tab)}
              className="relative w-full h-[480px] sm:h-[580px] rounded-2xl overflow-hidden bg-[#0A1D24] border border-white/10 group cursor-pointer"
            >
              <Image
                src={currentCad.src}
                alt={currentCad.title}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071519]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="px-4 py-2 rounded-xl bg-[#071519]/90 text-[#E0AB77] text-xs font-mono font-bold border border-[#C58F58]/50 flex items-center gap-2">
                  <Maximize2 className="w-4 h-4" /> Click to Zoom &amp; Pan Vector Drawing
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === "departments" && (
          <div className="bg-[#071519] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-serif-heading font-bold text-white">
                  {activeFloor.toUpperCase()} FLOOR — Space &amp; Clinical Specification Registry
                </h3>
                <p className="text-xs text-white/60">
                  Extracted directly from authoritative CAD files with dimension fidelity.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentRooms.map((room) => (
                <div
                  key={room.id}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C58F58]/50 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#C58F58]/20 text-[#E0AB77] font-bold">
                      {room.zone}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {room.cadDimension}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{room.name}</h4>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">{room.description}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-mono">
                    <span>Area: ~{room.areaSqFt} sq.ft.</span>
                    <button
                      onClick={() => openFloorPlanModal(room.cadPlanTab as any)}
                      className="text-[#E0AB77] hover:text-white font-semibold flex items-center gap-1"
                    >
                      Locate in CAD →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="bg-[#0D2329] rounded-3xl p-6 sm:p-8 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-lg font-serif-heading font-bold text-white">
              Need the Official Statutory Blueprint Dossier?
            </h4>
            <p className="text-xs text-white/70">
              Download high-resolution architectural PDF drawings stamped by The Vision Architects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openWhatsApp({ actionType: "general", message: "Hello, please provide the complete 30,000 sq.ft. Hospital CAD Architectural Dossier..." })}
              className="px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Request Hospital Blueprints (PDF)
            </button>
            <button
              onClick={() => openLeadDrawer({ title: "Book Site Visit & CAD Inspection", actionType: "book-site-visit" })}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
            >
              Book Site Walk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
