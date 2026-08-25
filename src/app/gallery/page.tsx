import { projectOverview } from '@/data/propertyData';
import { Video, MapPin, FileText, ShieldCheck, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Site Gallery — Drone Footage & Site Evidence',
  description: 'Real drone footage, site photographs, and architectural CAD drawings of Senior Living Citizen Foundation at Kheri Asra, Jhajjar.'
};

function getYoutubeEmbedId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export default function GalleryPage() {
  const youtubeId = getYoutubeEmbedId(projectOverview.droneYoutubeUrl) || 'jiEwQ6RA2HI';

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
        {/* Official YouTube Walkthrough Video Player */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                <Video className="w-3.5 h-3.5 text-red-400" /> Official YouTube Project Video
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329] mt-2">
                Ground &amp; Aerial Walkthrough Video
              </h2>
            </div>
            <a
              href={projectOverview.droneYoutubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide transition-all shadow-lg self-start sm:self-auto cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" /> Watch on YouTube App ↗
            </a>
          </div>

          <div className="w-full h-[260px] sm:h-[440px] lg:h-[540px] rounded-3xl overflow-hidden border border-[#E8E2D8] shadow-2xl bg-black relative">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
              title="Senior Living Citizen Foundation — Official Site Drone & Ground Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
          <p className="text-xs text-[#53676E]">Client-supplied full walkthrough video showing the demarcated freehold property in Kheri Asra, Jhajjar, and SH-22 highway approach.</p>
        </section>

        {/* Full Drone Video Local Player */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/85 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider">
              <MapPin className="w-3 h-3 text-emerald-400" /> High-Bitrate Aerial Drone Flyover
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">Direct Drone Aerial Video</h2>
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
          <p className="text-xs text-[#53676E]">Raw 1080p aerial drone footage showing the perimeter demarcation and immediate surroundings.</p>
        </section>

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
