import { projectOverview } from '@/data/propertyData';
import { Video, MapPin, FileText, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Site Gallery — Drone Footage & Site Evidence',
  description: 'Real drone footage, site photographs, and architectural CAD drawings of Senior Living Citizen Foundation at Kheri Asra, Jhajjar.'
};

function getYoutubeEmbedId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export default function GalleryPage() {
  const youtubeId = getYoutubeEmbedId(projectOverview.droneYoutubeUrl);

  const cadImages = [
    { src: '/project-assets/architecture/cad/previews/masterplan-real.jpg', label: '64-Plot Masterplan', source: 'The Vision Architects', status: 'ARCHITECTURAL DRAWING / SOURCE DOCUMENT' },
    { src: '/project-assets/architecture/cad/previews/kheri-asra-revenue-map.jpg', label: 'Kheri Asra Revenue / Khasra Map', source: 'Haryana Revenue Records', status: 'REAL LAND RECORD' },
    { src: '/project-assets/architecture/cad/previews/stilt-floor-cad.jpg', label: 'Stilt Floor CAD (Plot 63 & 64)', source: 'The Vision Architects', status: 'ARCHITECTURAL DRAWING / SOURCE DOCUMENT' },
    { src: '/project-assets/architecture/cad/previews/typical-floor-cad.jpg', label: 'Typical Floor CAD', source: 'The Vision Architects', status: 'ARCHITECTURAL DRAWING / SOURCE DOCUMENT' }
  ];

  return (
    <div className="space-y-16 pb-20 bg-[#FAF8F5]">
      {/* Page Hero */}
      <section className="bg-[#0D2329] text-white py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-emerald-300 uppercase tracking-widest">
            <Video className="w-3.5 h-3.5" />
            Real Site Gallery
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif-heading font-normal tracking-tight text-[#FAF8F5]">
            See the <span className="italic font-serif text-[#C58F58]">Real Land</span> at Kheri Asra.
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Full drone footage and real architectural drawings — everything below is either genuine site evidence or a client-supplied source document, clearly labeled.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Full Drone Video Player */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/85 border border-emerald-500/40 text-emerald-700 text-[11px] font-mono font-bold uppercase tracking-wider">
              <MapPin className="w-3 h-3" /> Real Site Today
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">Full Drone Flyover</h2>
          <div className="rounded-3xl overflow-hidden border border-[#E8E2D8] shadow-xl bg-black">
            <video
              controls
              playsInline
              poster="/project-assets/real-site/drone/poster.jpg"
              className="w-full aspect-video"
            >
              <source src="/project-assets/real-site/drone/full-tour.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="text-xs text-[#53676E]">Client-supplied aerial footage captured at Kheri Asra, Jhajjar — the demarcated freehold land parcel and SH-22 frontage.</p>
        </section>

        {/* YouTube Embed */}
        {youtubeId && (
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">Project Video</h2>
            <div className="rounded-3xl overflow-hidden border border-[#E8E2D8] shadow-xl bg-black aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Senior Living Citizen Foundation — Project Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </section>
        )}

        {/* Real CAD & Land Records */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF2EE] border border-[#CDE0D7] text-[#2C5E50] text-[11px] font-mono font-bold uppercase tracking-wider">
              <FileText className="w-3 h-3" /> Architectural Drawing / Source Document
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">Real CAD &amp; Land Records</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cadImages.map((img) => (
              <div key={img.src} className="rounded-2xl overflow-hidden border border-[#E8E2D8] shadow-md bg-white">
                <img src={img.src} alt={img.label} className="w-full h-64 object-contain bg-white" />
                <div className="p-4 space-y-1">
                  <div className="text-sm font-bold text-[#0D2329]">{img.label}</div>
                  <div className="text-xs text-[#53676E]">Source: {img.source}</div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wide">
                    <ShieldCheck className="w-3 h-3" /> {img.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
