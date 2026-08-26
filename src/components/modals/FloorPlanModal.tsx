'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import {
  X,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Building2,
  ShieldCheck,
  Layers,
  Car,
  Compass,
  FileText,
  MessageSquare,
  Calendar,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

type FloorPlanTab = 'residences' | 'stilt' | 'hospital-ground' | 'hospital-first' | 'hospital-second';

interface FloorPlanItem {
  id: FloorPlanTab;
  title: string;
  category: 'Residences (Plots 63 & 64)' | 'Ayurvedic Hospital (G+2)';
  badge: string;
  architect: string;
  imageSrc: string;
  pdfDownloadSrc?: string;
  plotNumber?: string;
  areaDescription: string;
  keyHighlights: string[];
  dimensionsSummary: { label: string; value: string }[];
}

const FLOOR_PLANS: Record<FloorPlanTab, FloorPlanItem> = {
  residences: {
    id: 'residences',
    title: 'Typical Floor Plan — 1 BHK & 1 RK Senior Suites',
    category: 'Residences (Plots 63 & 64)',
    badge: 'Plots 63 & 64 • G+2 Residential',
    architect: 'The Vision Architects & Consultant · Ar. Yash Garg (B.Arch, M.Arch)',
    imageSrc: '/project-assets/architecture/cad/previews/typical-floor-cad.jpg',
    pdfDownloadSrc: '/project-assets/architecture/cad/slcf-masterplan-site-layout.pdf',
    plotNumber: 'Plot No: 63 & 64 (Haryana)',
    areaDescription: 'Building Footprint: 46\'-0" × 50\'-6" (~2,323 sq.ft. / ~258 sq.yd.)',
    keyHighlights: [
      'Type A (1 BHK): Bedroom 10\'0" × 10\'10", Living 9\'0" × 9\'10", Kitchen 5\'0" × 9\'0", Toilet 4\'0" × 7\'2"',
      'Type B (1 BHK Executive): Bedroom 10\'0" × 10\'0", Living/Dining 9\'0" × 14\'4", Toilet 4\'0" × 7\'2"',
      'Type C (1 RK Studio): Bedroom 10\'0" × 10\'0", Living 9\'0" × 9\'0", Kitchen 5\'0" × 9\'0", Toilet 4\'0" × 7\'2"',
      'Common Lobby: 9\'8" × 25\'1" with 5\'6" × 8\'0" Lift Shaft',
      'Senior Stairs: 4\'6" Wide, 10" Tread, 6" Gentle Rise (21 steps total)',
      'Balcony: 3\'6" Wide Projection with safety railings'
    ],
    dimensionsSummary: [
      { label: 'Building Dimension', value: '46\'-0" × 50\'-6"' },
      { label: '1 BHK Super Area', value: '~400 sq. ft.' },
      { label: '1 BHK Carpet Area', value: '~276 sq. ft.' },
      { label: '1 RK Super Area', value: '~240 sq. ft.' },
      { label: '1 RK Carpet Area', value: '~195 sq. ft.' },
      { label: 'Staircase Specification', value: '10" Tread • 6" Riser' }
    ]
  },
  stilt: {
    id: 'stilt',
    title: 'Stilt Parking Floor Plan — 14 Covered Bays & 3 Gates',
    category: 'Residences (Plots 63 & 64)',
    badge: 'Plots 63 & 64 • Stilt Level',
    architect: 'The Vision Architects & Consultant · Ar. Yash Garg',
    imageSrc: '/project-assets/architecture/cad/previews/stilt-floor-cad.jpg',
    pdfDownloadSrc: '/project-assets/architecture/cad/slcf-masterplan-site-layout.pdf',
    plotNumber: 'Plot No: 63 & 64 (Haryana)',
    areaDescription: 'Ground Level Open Stilt: 46\'-0" × 50\'-6" with 3 Entry Gates',
    keyHighlights: [
      '14 Dedicated Covered Car Parking Bays (6 top row, 2 center, 6 bottom row)',
      '3 Independent Entry Gates along wide front road for zero traffic pinch-points',
      'Direct Elevator Access (5\'6" × 8\'0" Shaft) connecting stilt to all residential floors',
      '4\'0" Wide Gradual Senior Stairs with 6" risers and 10" treads',
      'Natural cross-ventilation and perimeter lighting for senior evening safety'
    ],
    dimensionsSummary: [
      { label: 'Total Parking Capacity', value: '14 Covered Bays' },
      { label: 'Covered Bay Option', value: '₹3,00,000 (Optional)' },
      { label: 'Uncovered Parking', value: 'Included Free' },
      { label: 'Entry Gates', value: '3 Wide Gates' },
      { label: 'Elevator Access', value: 'Direct from Stilt' },
      { label: 'Ramp / Slope', value: 'Zero-step Level Access' }
    ]
  },
  'hospital-ground': {
    id: 'hospital-ground',
    title: 'Ayurvedic Hospital Ground Floor — OPDs & Panchakarma',
    category: 'Ayurvedic Hospital (G+2)',
    badge: 'Hospital Core • Ground Floor',
    architect: 'The Vision Architects & Consultant · Ar. Yash Garg',
    imageSrc: '/project-assets/architecture/cad/previews/ground-floor-preview.jpg',
    pdfDownloadSrc: '/project-assets/architecture/floor-plans/ground-floor-plan.pdf',
    plotNumber: 'Township Health Zone (SH-22 Jhajjar)',
    areaDescription: 'Ground Floor Wing: 117\'-10" × 138\'-0" (~10,000 sq.ft.)',
    keyHighlights: [
      '6 Dedicated OPD Consultation Chambers (OPD 1 to 6)',
      'Panchakarma Ayurvedic Therapy Suites with Abhyanga & Shirodhara tables',
      'Multi-Purpose Yoga & Meditation Hall: 34\'2" × 49\'0"',
      'Ayurvedic Pharmacy Store: 15\'0" × 20\'0"',
      'Grand Reception & Waiting Lounge: 25\'7" × 50\'1"',
      'Emergency Triage & Mini Operation Theatre: 18\'6" × 19\'0"'
    ],
    dimensionsSummary: [
      { label: 'Total Hospital Footprint', value: '30,000 sq. ft. (G+2)' },
      { label: 'Ground Floor Wing', value: '117\'-10" × 138\'-0"' },
      { label: 'Yoga / Meditation Hall', value: '34\'2" × 49\'0"' },
      { label: 'OPD Suites', value: '6 Independent Chambers' },
      { label: 'Panchakarma Units', value: '9 Therapy Rooms' },
      { label: 'Emergency Wing', value: 'Triage + Mini OT' }
    ]
  },
  'hospital-first': {
    id: 'hospital-first',
    title: 'Hospital First Floor — Diagnostics, ICU & OT Complex',
    category: 'Ayurvedic Hospital (G+2)',
    badge: 'Clinical Care • First Floor',
    architect: 'The Vision Architects & Consultant · Ar. Yash Garg',
    imageSrc: '/project-assets/architecture/cad/previews/first-floor-preview.jpg',
    pdfDownloadSrc: '/project-assets/architecture/floor-plans/first-floor-plan.pdf',
    plotNumber: 'Township Health Zone (SH-22 Jhajjar)',
    areaDescription: 'First Floor Clinical Wing: 117\'-10" × 138\'-0"',
    keyHighlights: [
      'Modern Operation Theatre (18\'0" × 25\'7") and Intensive Care Unit (18\'0" × 20\'0")',
      'Advanced Diagnostics: MRI (17\'10" × 28\'0"), CT Scan (17\'10" × 20\'8"), X-Ray / Ultrasound (16\'0" × 18\'0")',
      'Cathlab & Dialysis Suite: 20\'0" × 30\'0"',
      'In-Patient Accommodation: Private Rooms (9\'4" × 10\'8") & Semi-Private Suites',
      'Dual Bed-Size Stretcher Lifts (7\'0" × 8\'6") and 5\'4" Wide Gentle Stairs'
    ],
    dimensionsSummary: [
      { label: 'Operation Theatre', value: '18\'0" × 25\'7"' },
      { label: 'ICU Capacity', value: '18\'0" × 20\'0"' },
      { label: 'MRI Suite', value: '17\'10" × 28\'0"' },
      { label: 'CT Scan Room', value: '17\'10" × 20\'8"' },
      { label: 'Dialysis Center', value: '20\'0" × 30\'0"' },
      { label: 'Stretcher Lifts', value: '2 Dual Bed Lifts' }
    ]
  },
  'hospital-second': {
    id: 'hospital-second',
    title: 'Hospital Second Floor — 50-Seat Auditorium & Rooftop Pool',
    category: 'Ayurvedic Hospital (G+2)',
    badge: 'Wellness & Research • Second Floor',
    architect: 'The Vision Architects & Consultant · Ar. Yash Garg',
    imageSrc: '/project-assets/architecture/cad/previews/second-floor-preview.jpg',
    pdfDownloadSrc: '/project-assets/architecture/floor-plans/second-floor-plan.pdf',
    plotNumber: 'Township Health Zone (SH-22 Jhajjar)',
    areaDescription: 'Second Floor & Open Roof: 117\'-10" × 138\'-0"',
    keyHighlights: [
      '50-Seating Open Auditorium for spiritual discourses, wellness talks, and cultural events',
      'Hydrotherapy / Swimming Pool Area (10\'0" × 12\'0") for joint mobility and therapy',
      'Ayurvedic Library & Reading Room (17\'10" × 28\'8")',
      'Conference & Medical Research Rooms (20\'0" × 26\'2")',
      'Semi-Shaded Recreational Terrace (20\'4" × 38\'0") & Open Rooftop Deck (39\'2" × 56\'11")'
    ],
    dimensionsSummary: [
      { label: 'Open Auditorium', value: '50 Seats Capacity' },
      { label: 'Hydrotherapy Pool', value: '10\'0" × 12\'0"' },
      { label: 'Wellness Library', value: '17\'10" × 28\'8"' },
      { label: 'Conference Hall', value: '20\'0" × 26\'2"' },
      { label: 'Shaded Recreation', value: '20\'4" × 38\'0"' },
      { label: 'Open Roof Deck', value: '39\'2" × 56\'11"' }
    ]
  }
};

export const FloorPlanModal: React.FC = () => {
  const { isFloorPlanOpen, floorPlanContext, closeFloorPlan, openWhatsApp, openLeadDrawer } = useModal();

  const [activeTab, setActiveTab] = useState<FloorPlanTab>('residences');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync active tab when modal opens with context
  useEffect(() => {
    if (floorPlanContext?.floorPlanType) {
      setActiveTab(floorPlanContext.floorPlanType);
    }
    // Reset zoom and pan on open
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [floorPlanContext, isFloorPlanOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFloorPlanOpen) {
        closeFloorPlan();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFloorPlanOpen, closeFloorPlan]);

  if (!isFloorPlanOpen) return null;

  const currentPlan = FLOOR_PLANS[activeTab] || FLOOR_PLANS.residences;

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 3.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.7));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // Mouse Drag / Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch handlers for mobile pan
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panPosition.x,
        y: e.touches[0].clientY - panPosition.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPanPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fade-in">
      <div
        className={`bg-[#0D2329] border border-white/20 rounded-3xl w-full text-white shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'h-full max-h-screen' : 'max-w-7xl max-h-[95vh]'
        }`}
      >
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-b border-white/10 bg-[#071519]/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C58F58]/20 border border-[#C58F58]/40 flex items-center justify-center text-[#E0AB77]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0AB77] font-bold">
                  {currentPlan.badge}
                </span>
                <span className="text-white/40 text-xs hidden sm:inline">•</span>
                <span className="text-[11px] text-white/70 hidden sm:inline">{currentPlan.category}</span>
              </div>
              <h3 className="text-base sm:text-xl font-serif-heading font-bold text-white tracking-tight">
                {currentPlan.title}
              </h3>
            </div>
          </div>

          {/* Action Tools & Close Button */}
          <div className="flex items-center gap-2">
            {currentPlan.pdfDownloadSrc && (
              <a
                href={currentPlan.pdfDownloadSrc}
                download
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all"
                title="Download High-Res Vector PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#C58F58]" />
                <span>Download PDF</span>
              </a>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={closeFloorPlan}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-300 border border-white/15 text-white transition-colors"
              title="Close Floor Plan"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-2 px-4 bg-[#0A1C22] border-b border-white/10 overflow-x-auto no-scrollbar shrink-0">
          {(Object.keys(FLOOR_PLANS) as FloorPlanTab[]).map((tabKey) => {
            const plan = FLOOR_PLANS[tabKey];
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                onClick={() => {
                  setActiveTab(tabKey);
                  handleResetZoom();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#C58F58] text-[#071519] font-bold shadow-md'
                    : 'bg-white/5 text-white/75 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {tabKey === 'stilt' ? (
                  <Car className="w-3.5 h-3.5" />
                ) : tabKey.startsWith('hospital') ? (
                  <Building2 className="w-3.5 h-3.5" />
                ) : (
                  <Layers className="w-3.5 h-3.5" />
                )}
                <span>{plan.title.split('—')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Grid: Image Viewer (Left) + Architectural Specs (Right) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left: Zoomable Architectural Drawing Canvas */}
          <div
            ref={containerRef}
            className="lg:col-span-8 bg-[#071519] relative overflow-hidden flex items-center justify-center min-h-[380px] lg:min-h-[540px] select-none cursor-grab active:cursor-grabbing border-b lg:border-b-0 lg:border-r border-white/10"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #53676E 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Transform Container */}
            <div
              style={{
                transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out'
              }}
              className="relative max-w-full max-h-full flex items-center justify-center p-4"
            >
              <img
                src={currentPlan.imageSrc}
                alt={currentPlan.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl border border-white/10 pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Floating Zoom & Reset Toolbar */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0D2329]/90 backdrop-blur-md border border-white/20 shadow-xl z-20">
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>100%</span>
              </button>
            </div>

            {/* Interactive Pan Helper Badge */}
            <div className="absolute top-4 left-4 pointer-events-none hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-white/70 border border-white/10">
              <Info className="w-3.5 h-3.5 text-[#C58F58]" />
              <span>Drag to Pan • Pinch or use +/- to Zoom</span>
            </div>
          </div>

          {/* Right: Architectural Specifications, Dimensions & Booking CTAs */}
          <div className="lg:col-span-4 bg-[#0A1C22] p-5 sm:p-7 overflow-y-auto flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Authoritative Title Block Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#E0AB77] text-xs font-mono uppercase tracking-widest font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  CAD Certified Drawing
                </div>
                <div className="text-xs text-white/80 font-medium">
                  {currentPlan.architect}
                </div>
                <div className="text-[11px] font-mono text-emerald-400">
                  {currentPlan.areaDescription}
                </div>
              </div>

              {/* Measured Dimensions Matrix */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#E0AB77] mb-3 font-bold">
                  Architectural Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {currentPlan.dimensionsSummary.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-[10px] text-white/50 font-mono">{item.label}</div>
                      <div className="font-bold text-white mt-0.5">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights List */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#E0AB77] font-bold">
                  Key Layout Inclusions
                </h4>
                <div className="space-y-2 text-xs text-white/80">
                  {currentPlan.keyHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                      <ChevronRight className="w-3.5 h-3.5 text-[#C58F58] shrink-0 mt-0.5" />
                      <span className="leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Booking & WhatsApp Actions */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <button
                onClick={() => {
                  closeFloorPlan();
                  openLeadDrawer({
                    title: `Schedule Site Walk to Inspect ${currentPlan.title}`,
                    unitType: currentPlan.title,
                    actionType: 'book-site-visit'
                  });
                }}
                className="w-full py-3.5 rounded-2xl bg-[#C58F58] hover:bg-[#B37E47] text-[#071519] text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Site Walk to Inspect Layout →</span>
              </button>

              <button
                onClick={() => {
                  closeFloorPlan();
                  openWhatsApp({
                    actionType: 'inquire-residence',
                    unitName: currentPlan.title,
                    message: `Hello, I am reviewing the CAD architectural floor plan for ${currentPlan.title} at Senior Living Citizens Foundation. Please share price quote and site visit schedule.`
                  });
                }}
                className="w-full py-3 rounded-2xl bg-white/10 hover:bg-[#25D366]/20 hover:text-emerald-300 border border-white/15 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire on WhatsApp (+91 99999 55847)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
