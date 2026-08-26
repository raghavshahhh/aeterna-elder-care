'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { buildingUnits, residenceUnits, allPlots, projectOverview } from '@/data/propertyData';
import { useModal } from '@/context/ModalContext';
import { MasterPlan3DViewer } from '@/components/3d/MasterPlan3DViewer';
import { Building3DViewer } from '@/components/3d/Building3DViewer';
import { Interior3DViewer } from '@/components/3d/Interior3DViewer';
import { RealityBadge } from '@/components/ui/RealityBadge';
import { ProposedBadge } from '@/components/ui/ProposedBadge';
import {
  Compass,
  Building2,
  Home,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Rotate3d,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  MapPin,
  Lock,
  Eye,
  Info
} from 'lucide-react';

type JourneyStep = 'land' | 'masterplan' | 'building' | 'floor' | 'unit' | 'interior';

export const FutureHomeJourney: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<JourneyStep>('land');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('unit-01');
  const [selectedRoom, setSelectedRoom] = useState<'living' | 'bedroom' | 'kitchen' | 'bathroom'>('bedroom');
  const [viewMode2D, setViewMode2D] = useState<boolean>(false);

  const { openWhatsApp, openLeadDrawer } = useModal();

  const selectedUnit = buildingUnits.find((u) => u.id === selectedUnitId) || buildingUnits[0];

  const steps: { id: JourneyStep; label: string; number: string }[] = [
    { id: 'land', label: '1. Real Land', number: '01' },
    { id: 'masterplan', label: '2. 3D Master Plan', number: '02' },
    { id: 'building', label: '3. 3D Building', number: '03' },
    { id: 'floor', label: '4. Ground Floor', number: '04' },
    { id: 'unit', label: '5. Select Unit', number: '05' },
    { id: 'interior', label: '6. 3D Interior Walk', number: '06' }
  ];

  const stepIndex = steps.findIndex((s) => s.id === currentStep);

  const goToNextStep = () => {
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id);
    }
  };

  const goToPrevStep = () => {
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id);
    }
  };

  return (
    <section id="guided-journey" className="py-20 sm:py-28 bg-[#071519] text-white relative overflow-hidden border-b border-[#14353E]">
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#2C5E50]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#C58F58]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Header Bar */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-[#C58F58] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#C58F58]" />
            Walk Into Your Future Home • Guided 3D Journey
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            From Real Land to <span className="italic font-serif text-[#C58F58]">Your Future Living Room.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/75 leading-relaxed">
            Experience the complete spatial sequence before physical construction begins. Step seamlessly from the physical site in Jhajjar into your future senior-friendly residence.
          </p>
        </div>

        {/* Minimal Stepper Breadcrumbs Bar */}
        <div className="bg-[#0D2329]/90 border border-white/10 rounded-3xl p-3 sm:p-4 backdrop-blur-md shadow-xl flex items-center justify-between overflow-x-auto gap-2">
          {steps.map((s, idx) => {
            const isActive = s.id === currentStep;
            const isCompleted = idx < stepIndex;

            return (
              <button
                key={s.id}
                onClick={() => setCurrentStep(s.id)}
                className={`px-3 sm:px-4 py-2 rounded-2xl flex items-center gap-2 transition-all shrink-0 text-xs font-semibold cursor-pointer ${
                  isActive
                    ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md scale-105'
                    : isCompleted
                    ? 'bg-[#2C5E50]/60 text-white/90 hover:bg-[#2C5E50]'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px] font-mono">
                  {s.number}
                </span>
                <span className="hidden md:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Canvas Container */}
        <div className="bg-[#0A1C22] rounded-3xl border border-[#14353E] shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          {/* Top Stage Header & 2D/3D Comparison Pill */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono uppercase text-[#C58F58] font-bold tracking-widest block">
                Stage {stepIndex + 1} of 6
              </span>
              <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-[#FAF8F5]">
                {currentStep === 'land' && 'Step 1: The Physical Land Today in Kheri Asra, Jhajjar'}
                {currentStep === 'masterplan' && 'Step 2: 64-Plot Plotted Township & 30k Sq. Ft. Hospital 3D'}
                {currentStep === 'building' && 'Step 3: G+2 + Stilt Senior Residence Building Elevation 3D'}
                {currentStep === 'floor' && 'Step 4: Ground Floor Selection (Phase 1 Priority Release)'}
                {currentStep === 'unit' && `Step 5: Inspecting ${selectedUnit.unitNumber} (${selectedUnit.typeName})`}
                {currentStep === 'interior' && `Step 6: Walk Inside ${selectedUnit.unitNumber} — 360° Room Walkthrough`}
              </h3>
            </div>

            {/* 2D CAD vs 3D Toggle */}
            <div className="flex items-center bg-white/10 p-1 rounded-2xl border border-white/15 backdrop-blur-md text-xs font-bold shrink-0">
              <button
                onClick={() => setViewMode2D(false)}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  !viewMode2D ? 'bg-[#2C5E50] text-white shadow-md' : 'text-white/70 hover:text-white'
                }`}
              >
                <Rotate3d className="w-3.5 h-3.5 text-[#C58F58]" />
                3D Spatial View
              </button>
              <button
                onClick={() => setViewMode2D(true)}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode2D ? 'bg-[#C58F58] text-[#071519] shadow-md font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                2D CAD Plans
              </button>
            </div>
          </div>

          {/* VIEW STAGES */}
          {/* STEP 1: REAL LAND TODAY */}
          {currentStep === 'land' && (
            <div className="space-y-6">
              <div className="flex items-center">
                <RealityBadge />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 relative h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-white/15 shadow-xl group">
                  {!viewMode2D ? (
                    <>
                      <video
                        src="/project-assets/real-site/drone/hero-loop.mp4"
                        poster="/project-assets/real-site/drone/real-land-aerial-1.jpg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                        Verified Physical Drone Survey
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white text-xs sm:text-sm space-y-1">
                        <p className="font-serif-heading font-bold text-base text-[#FAF8F5]">
                          11+ Acres Demarcated Freehold Land on State Highway 22
                        </p>
                        <p className="text-white/80 text-xs">
                          Actual ground drone footage of Kheri Asra, Jhajjar — connecting directly to State Highway 22 &amp; Reliance MET City.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-[#0D2329] p-4 flex flex-col items-center justify-center">
                      <Image
                        src="/project-assets/architecture/cad/previews/kheri-asra-revenue-map.jpg"
                        alt="Revenue Aks Shajra Map of Kheri Asra Site"
                        fill
                        className="object-contain p-2"
                      />
                      <div className="absolute bottom-3 left-4 right-4 bg-black/80 backdrop-blur-md p-2 rounded-xl text-center text-[11px] text-white">
                        Official Revenue Aks Shajra Demarcation Map (Khasra &amp; Murabba Details)
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      <MapPin className="w-4 h-4" /> Kheri Asra, Jhajjar, Haryana
                    </div>
                    <h4 className="text-2xl font-serif-heading font-bold text-[#FAF8F5]">
                      Begin Your Spatial Journey on Solid Ground
                    </h4>
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                      Unlike typical speculative projects, the land here is physically demarcated and ready for scheduled on-site walks. Next, step into the proposed 3D master plan.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-white/80">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> Freehold Title &amp; Registry Pathway
                    </div>
                    <p className="text-white/65 leading-relaxed">
                      Clear title chain ready for registry upon full payment with undivided share.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={goToNextStep}
                      className="flex-1 py-3.5 px-5 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Step 2: Enter 3D Master Plan →
                    </button>
                    <button
                      onClick={() => openLeadDrawer({ title: 'Schedule Private Site Walk to Jhajjar Land', actionType: 'book-site-visit' })}
                      className="py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-medium transition-all text-center cursor-pointer"
                    >
                      Book Site Walk
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: 3D MASTER PLAN */}
          {currentStep === 'masterplan' && (
            <div className="space-y-6">
              <div className="flex items-center">
                <ProposedBadge />
              </div>
              {!viewMode2D ? (
                <MasterPlan3DViewer
                  onSelectPlot={(plot) => {
                    openWhatsApp({
                      actionType: 'reserve-plot',
                      plotNumber: plot.plotNumber,
                      plotBlock: plot.block,
                      plotSize: `${plot.sizeSqYd} sq. yd.`,
                      message: `Hello, I am exploring the 3D Master Plan and interested in ${plot.plotNumber} (${plot.block}, ${plot.sizeSqYd} sq. yd.). Please share demarcation and price details.`
                    });
                  }}
                  onToggle2DView={() => setViewMode2D(true)}
                />
              ) : (
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-4">
                  <Image
                    src={projectOverview.images.masterPlanCad}
                    alt="2D Master Plan CAD — Architectural Drawing Source Document"
                    width={1000}
                    height={700}
                    className="rounded-xl mx-auto border border-white/10 object-contain bg-white"
                  />
                  <p className="text-xs text-white/70">
                    Architectural Drawing / Source Document by The Vision Architects showing 64 plots (Blocks A–F) and the proposed 30,000 sq. ft. hospital boundary.
                  </p>
                  <a
                    href={projectOverview.cadDownloads.masterplan}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C58F58] hover:text-white transition-colors"
                  >
                    Download Full Master Plan CAD (PDF) →
                  </a>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={goToPrevStep}
                  className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Real Land
                </button>
                <button
                  onClick={goToNextStep}
                  className="py-3.5 px-6 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  Step 3: Zoom to 3D Building →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: 3D BUILDING */}
          {currentStep === 'building' && (
            <div className="space-y-6">
              <div className="flex items-center">
                <ProposedBadge />
              </div>
              {!viewMode2D ? (
                <Building3DViewer
                  initialFloor="ground"
                  onSelectUnit={(unitId) => {
                    setSelectedUnitId(unitId);
                    setCurrentStep('unit');
                  }}
                  onToggle2DFallback={() => setViewMode2D(true)}
                />
              ) : (
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Image
                        src={projectOverview.images.stiltFloorCad}
                        alt="Stilt Floor CAD — Parking Level Architectural Drawing"
                        width={700}
                        height={900}
                        className="rounded-xl mx-auto border border-white/10 object-contain bg-white"
                      />
                      <p className="text-[11px] text-white/60">Stilt Floor — Parking Level</p>
                    </div>
                    <div className="space-y-2">
                      <Image
                        src={projectOverview.images.buildingCadElevation}
                        alt="Typical Floor CAD — Ground/First/Second Floor Architectural Drawing"
                        width={700}
                        height={900}
                        className="rounded-xl mx-auto border border-white/10 object-contain bg-white"
                      />
                      <p className="text-[11px] text-white/60">Typical Floor — 3 Units (Ground / First / Second)</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/70">
                    Architectural Drawing / Source Document by The Vision Architects — Stilt Parking + Ground + First + Second Floors.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
                    <a href={projectOverview.cadDownloads.groundFloor} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#C58F58] hover:text-white transition-colors">Ground Floor PDF →</a>
                    <a href={projectOverview.cadDownloads.firstFloor} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#C58F58] hover:text-white transition-colors">First Floor PDF →</a>
                    <a href={projectOverview.cadDownloads.secondFloor} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#C58F58] hover:text-white transition-colors">Second Floor PDF →</a>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={goToPrevStep}
                  className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Master Plan
                </button>
                <button
                  onClick={goToNextStep}
                  className="py-3.5 px-6 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  Step 4: Select Ground Floor Units →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: GROUND FLOOR */}
          {currentStep === 'floor' && (
            <div className="space-y-8">
              <div className="flex items-center">
                <ProposedBadge />
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#2C5E50]/40 to-[#14353E]/40 border border-emerald-400/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-400 text-emerald-950 uppercase font-mono">
                    Active Phase 1 Release
                  </span>
                  <span className="text-xs text-white/70 font-mono">Ground Level • Zero Stairs</span>
                </div>
                <h4 className="text-2xl font-serif-heading font-bold text-white">
                  Ground Floor: 3 Exclusive Barrier-Free Units
                </h4>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-2xl">
                  Step straight from the central garden promenade into your residence without climbing stairs. Includes covered stilt parking and dual wheelchair-friendly elevator access.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {buildingUnits.slice(0, 3).map((u) => {
                  const isSelected = selectedUnitId === u.id;
                  return (
                    <div
                      key={u.id}
                      onClick={() => setSelectedUnitId(u.id)}
                      className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                        isSelected
                          ? 'bg-[#2C5E50] border-emerald-400 shadow-2xl scale-105 ring-2 ring-emerald-400/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-mono uppercase text-[#C58F58] font-bold block">
                          {u.typeName}
                        </span>
                        <h5 className="text-2xl font-serif-heading font-bold text-white mt-1">
                          {u.unitNumber}
                        </h5>
                        <p className="text-xs text-white/75 mt-1">
                          ~{u.superAreaSqFt} sq. ft. super ({u.carpetAreaSqFt} sq. ft. carpet) • {u.facing}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-black/30 text-xs space-y-1">
                        <span className="text-white/50 text-[10px] uppercase font-mono block">Pre-Launch Price</span>
                        <strong className="text-[#C58F58] text-base">{u.priceDisplay}</strong>
                        <span className="text-[10px] text-white/60 block">*Indicative Down Payment Basis</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUnitId(u.id);
                          setCurrentStep('unit');
                        }}
                        className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all text-center"
                      >
                        Inspect Unit Details →
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={goToPrevStep}
                  className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to 3D Building
                </button>
                <button
                  onClick={goToNextStep}
                  className="py-3.5 px-6 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  Step 5: Step Inside {selectedUnit.unitNumber} →
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SELECT & INSPECT UNIT */}
          {currentStep === 'unit' && (
            <div className="space-y-8">
              <div className="flex items-center">
                <ProposedBadge />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/15 shadow-xl">
                  <Image
                    src={selectedUnit.interior3dCgi}
                    alt={`${selectedUnit.unitNumber} Spatial Preview`}
                    fill
                    className="object-cover object-center opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#C58F58] text-[10px] font-mono font-bold uppercase tracking-wider">
                    Proposed Spatial Interpretation
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <h4 className="text-2xl font-serif-heading font-bold text-[#FAF8F5]">
                      {selectedUnit.unitNumber} ({selectedUnit.typeName})
                    </h4>
                    <p className="text-xs text-white/80">
                      Single-floor layout with 32mm stainless grab bars, zero-threshold bath, and gradual risers.
                    </p>
                    <p className="text-[10px] text-white/50 italic">Unit configuration subject to final architectural allocation.</p>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-5">
                  <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs text-white/60 font-mono">Floor Level</span>
                      <span className="text-xs font-bold text-emerald-400">Ground Floor (Phase 1)</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs text-white/60 font-mono">Super / Carpet Area</span>
                      <span className="text-xs font-bold text-[#FAF8F5]">
                        ~{selectedUnit.superAreaSqFt} / ~{selectedUnit.carpetAreaSqFt} sq. ft.
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs text-white/60 font-mono">Orientation</span>
                      <span className="text-xs font-bold text-[#FAF8F5]">{selectedUnit.facing}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60 font-mono">Pre-Launch Basis</span>
                      <span className="text-xs font-bold text-[#C58F58]">{selectedUnit.priceDisplay}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-3">
                    <button
                      onClick={goToNextStep}
                      className="w-full py-3.5 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Step 6: Walk Through 3D Rooms →
                    </button>
                    <button
                      onClick={() =>
                        openWhatsApp({
                          actionType: 'reserve-unit',
                          unitName: selectedUnit.unitNumber,
                          unitType: selectedUnit.typeName,
                          floorLevel: selectedUnit.floorName,
                          message: `Hello, I completed the guided journey for ${selectedUnit.unitNumber} (${selectedUnit.typeName}) on Ground Floor. Please share detailed room blueprints and booking structure.`
                        })
                      }
                      className="w-full py-3 rounded-2xl bg-[#2C5E50] hover:bg-[#3D7363] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-[#C58F58]" />
                      Reserve {selectedUnit.unitNumber} on WhatsApp →
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={goToPrevStep}
                  className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Floor View
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: 3D INTERIOR ROOM WALKTHROUGH */}
          {currentStep === 'interior' && (
            <div className="space-y-6">
              <div className="flex items-center">
                <ProposedBadge />
              </div>
              <Interior3DViewer
                unitType={selectedUnit.type === '1-rk' ? '1-rk' : '1-bhk'}
                onToggle2DPlans={() => setViewMode2D(true)}
              />

              {/* Concluding CTA Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#2C5E50] to-[#1F483D] border border-emerald-400/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <h4 className="text-lg font-serif-heading font-bold text-[#FAF8F5]">
                    Ready to Experience {selectedUnit.unitNumber} in Person?
                  </h4>
                  <p className="text-xs text-white/80 font-light">
                    Schedule a private visit to inspect the demarcated land and verify architectural blueprints with the Foundation desk.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() =>
                      openWhatsApp({
                        actionType: 'reserve-unit',
                        unitName: selectedUnit.unitNumber,
                        unitType: selectedUnit.typeName,
                        floorLevel: selectedUnit.floorName,
                        message: `Hello, I have finished the 3D Walkthrough for ${selectedUnit.unitNumber} (${selectedUnit.typeName}). Please assist me with booking the priority site walk.`
                      })
                    }
                    className="py-3 px-5 rounded-2xl bg-[#C58F58] hover:bg-[#D49E67] text-[#071519] text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#071519]" />
                    Book via WhatsApp →
                  </button>

                  <button
                    onClick={() => openLeadDrawer({ title: `Schedule Private Site Walk for ${selectedUnit.unitNumber}`, unitName: selectedUnit.unitNumber })}
                    className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Request Call Back
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={goToPrevStep}
                  className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Unit Selection
                </button>
                <button
                  onClick={() => setCurrentStep('land')}
                  className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all flex items-center gap-2 cursor-pointer"
                >
                  Restart 3D Journey ↺
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
