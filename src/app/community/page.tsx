'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { communityEventsData, communityClubs, CommunityEvent } from '@/data/communityData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { useModal } from '@/context/ModalContext';
import {
  Tv,
  Calendar,
  Clock,
  Users,
  Play,
  Heart,
  Sparkles,
  Share2,
  CheckCircle2,
  Radio,
  Music,
  Smile,
  BookOpen
} from 'lucide-react';

export default function CommunityPage() {
  const { showToast } = useToast();
  const { openLeadDrawer } = useModal();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeLiveEvent, setActiveLiveEvent] = useState<CommunityEvent | null>(
    communityEventsData.find((e) => e.isLiveNow) || communityEventsData[0]
  );
  const [isPlayingLive, setIsPlayingLive] = useState(false);

  const categories = ['all', 'Yoga & Wellness', 'Music & Arts', 'Doctor AMA', 'Cognitive Games', 'Spiritual & Satsang'];

  const filteredEvents = communityEventsData.filter(
    (evt) => selectedCategory === 'all' || evt.category === selectedCategory
  );

  const handleRsvp = (eventTitle: string) => {
    showToast({
      title: 'RSVP Confirmed! 🎉',
      description: `We've saved your seat for "${eventTitle}". A WhatsApp link has been sent.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Editorial Hero Header */}
      <section className="bg-gradient-to-b from-[#F6F1E8] to-[#FBF9F5] py-16 sm:py-20 border-b border-[#E8E2D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold animate-pulse">
            <Radio className="w-4 h-4" />
            <span>Club Aeterna • Daily Interactive Community</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif-heading font-bold text-[#0D2329]">
            Active Aging, Lifelong Joy & Connected Fellowship
          </h1>

          <p className="text-base sm:text-xl text-[#3D685A] font-light max-w-2xl mx-auto leading-relaxed">
            Loneliness is as harmful to health as 15 cigarettes a day. We bring seniors together every day for live yoga, retro music, doctor AMAs, and mental fitness.
          </p>
        </div>
      </section>

      {/* Featured Live Stream / Interactive Broadcast Theater */}
      {activeLiveEvent && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0D2329] text-white rounded-3xl overflow-hidden border border-[#1C4550] shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            {/* Live Player Screen */}
            <div className="lg:col-span-8 relative aspect-16/9 sm:aspect-video bg-black flex items-center justify-center">
              {!isPlayingLive ? (
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80"
                    alt={activeLiveEvent.title}
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-white" />
                        LIVE BROADCAST NOW
                      </span>
                      <span className="text-xs text-white/80 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                        👥 {activeLiveEvent.attendeesCount} Seniors Watching
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl sm:text-3xl font-serif-heading font-bold text-white">
                        {activeLiveEvent.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/70">
                        Hosted by {activeLiveEvent.hostName} ({activeLiveEvent.hostRole})
                      </p>
                      <Button
                        variant="gold"
                        size="lg"
                        leftIcon={<Play className="w-5 h-5 fill-current" />}
                        onClick={() => setIsPlayingLive(true)}
                        className="mt-3 font-bold"
                      >
                        Join Live Stream Now →
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#071519] space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce">
                    <Radio className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Connected to Live Studio Broadcast</h3>
                  <p className="text-xs text-white/70 max-w-md">
                    You are now streaming &ldquo;{activeLiveEvent.title}&rdquo;. Audio and video synchronized in high definition.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlayingLive(false)}
                    className="text-white border-white/20"
                  >
                    Exit Theater View
                  </Button>
                </div>
              )}
            </div>

            {/* Live Chat & Community Host Panel */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#071519]/50">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden shrink-0 border-2 border-[#C58F58]">
                    <Image
                      src={activeLiveEvent.hostPhoto}
                      alt={activeLiveEvent.hostName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{activeLiveEvent.hostName}</h3>
                    <p className="text-xs text-[#C58F58]">{activeLiveEvent.hostRole}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-white/50 block font-bold">
                    Session Agenda:
                  </span>
                  <p className="text-xs text-white/80 leading-relaxed font-light">
                    {activeLiveEvent.description}
                  </p>
                </div>

                {/* Simulated Live Comments Feed */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase text-emerald-400 font-bold block">
                    💬 Live Elder Chat (248 Active):
                  </span>
                  <div className="space-y-1.5 text-[11px] bg-white/5 p-3 rounded-2xl border border-white/5">
                    <p className="text-white/80">
                      <strong className="text-amber-300">Col. Bakshi (Noida):</strong> Namaste Sunita ji, today&apos;s breathing rhythm feels so peaceful!
                    </p>
                    <p className="text-white/80">
                      <strong className="text-teal-300">Meenakshi Iyer (Bangalore):</strong> Joining from Indiranagar with my morning tea.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Button
                  variant="gold"
                  size="md"
                  className="w-full"
                  onClick={() => handleRsvp(activeLiveEvent.title)}
                >
                  Save to My Calendar & WhatsApp Reminder
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4 Community Interest Clubs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="sage" size="md">
            Elder Interest Groups
          </Badge>
          <h2 className="text-3xl font-serif-heading font-bold text-[#0D2329]">
            Join Free Special-Interest Clubs
          </h2>
          <p className="text-sm text-[#5C6F75]">
            Where seniors make lifelong friends, share stories, and celebrate cultural festivals together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityClubs.map((club, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-4xl block">{club.icon}</span>
                <h3 className="font-bold text-base text-[#0D2329]">{club.name}</h3>
                <p className="text-xs text-[#5C6F75] leading-relaxed font-light">{club.desc}</p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D8] space-y-3">
                <div className="text-[11px] text-[#3D685A] font-semibold space-y-0.5">
                  <div>👥 {club.members}</div>
                  <div>⏰ {club.schedule}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => handleRsvp(club.name)}
                >
                  Join Club Free →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Schedule with Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D8]">
          <div>
            <h3 className="text-2xl font-serif-heading font-bold text-[#0D2329]">
              Upcoming Live Show Schedule
            </h3>
            <p className="text-xs text-[#5C6F75]">Interactive sessions broadcasted every week morning and evening.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0D2329] text-white border-[#0D2329]'
                    : 'bg-white text-[#5C6F75] border-[#E8E2D8] hover:bg-[#F6F1E8]'
                }`}
              >
                {cat === 'all' ? 'All Shows' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl p-6 border border-[#E8E2D8] shadow-sm hover:border-[#3D685A] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="sage" size="sm">
                    {evt.category}
                  </Badge>
                  <span className="text-xs font-bold text-[#C58F58] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {evt.date} • {evt.time}
                  </span>
                </div>

                <h4 className="font-bold text-base text-[#0D2329] group-hover:text-[#3D685A] transition-colors line-clamp-2">
                  {evt.title}
                </h4>

                <p className="text-xs text-[#5C6F75] leading-relaxed line-clamp-3 font-light">
                  {evt.description}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border">
                    <Image
                      src={evt.hostPhoto}
                      alt={evt.hostName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0D2329] block">{evt.hostName}</span>
                    <span className="text-[10px] text-[#5C6F75]">{evt.hostRole}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-between">
                <span className="text-xs text-[#5C6F75]">
                  👥 <strong>{evt.attendeesCount}</strong> RSVPed
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleRsvp(evt.title)}
                  className="text-xs"
                >
                  RSVP Free
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F6F1E8] rounded-3xl p-8 sm:p-12 border border-[#E2D7C5] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-bold text-[#0D2329]">
              Want Your Parents to Join the Daily Joy?
            </h3>
            <p className="text-sm text-[#5C6F75]">
              Club Aeterna is included 100% free with all Aeterna Care membership tiers. We even provide phone setup and tablet assistance.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => openLeadDrawer({ title: 'Get Free Club Aeterna Invitation' })}
            >
              Get Free Senior Pass →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
