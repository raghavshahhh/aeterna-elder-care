export interface CommunityEvent {
  id: string;
  title: string;
  category: 'Yoga & Wellness' | 'Music & Arts' | 'Doctor AMA' | 'Cognitive Games' | 'Spiritual & Satsang';
  hostName: string;
  hostRole: string;
  hostPhoto: string;
  date: string;
  time: string;
  duration: string;
  attendeesCount: number;
  description: string;
  isLiveNow?: boolean;
  videoUrl?: string;
}

export const communityEventsData: CommunityEvent[] = [
  {
    id: 'evt-1',
    title: 'Morning Gentle Chair Yoga & Pranayama for Joint Mobility',
    category: 'Yoga & Wellness',
    hostName: 'Acharya Sunita Sharma',
    hostRole: 'Senior Geriatric Yoga Therapist (20+ yrs)',
    hostPhoto: 'https://images.unsplash.com/photo-1594824813590-78174548842d?auto=format&fit=crop&w=400&q=80',
    date: 'Today',
    time: '08:00 AM IST',
    duration: '45 mins',
    attendeesCount: 248,
    isLiveNow: true,
    description: 'A gentle, safe morning routine designed for seniors with arthritis and stiffness. Improves oxygenation, posture, and mental calm without floor strain.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'evt-2',
    title: 'Retro Bollywood Antakshari & Musical Nostalgia Hour',
    category: 'Music & Arts',
    hostName: 'Pandit Alok Mukherjee',
    hostRole: 'Classical Vocalist & Music Therapist',
    hostPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    date: 'Today',
    time: '05:30 PM IST',
    duration: '60 mins',
    attendeesCount: 380,
    description: 'Sing along to timeless classics from the golden 60s and 70s. An uplifting evening of joy, song guessing, and community laughter.',
  },
  {
    id: 'evt-3',
    title: 'Doctor AMA: Managing Blood Sugar & Summer Hydration in Seniors',
    category: 'Doctor AMA',
    hostName: 'Dr. Rajeshwar Kulkarni, MD',
    hostRole: 'Chief of Geriatric Medicine, AIIMS Alum',
    hostPhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    date: 'Tomorrow',
    time: '04:00 PM IST',
    duration: '45 mins',
    attendeesCount: 520,
    description: 'Live interactive Q&A where seniors and their family members can ask direct questions about diabetes meds, diet tips, and electrolyte balance.',
  },
  {
    id: 'evt-4',
    title: 'Mind Fitness: Brain Gym, Word Puzzles & Memory Mastery',
    category: 'Cognitive Games',
    hostName: 'Dr. Shalini Ramanathan',
    hostRole: 'Lead Cognitive Neuropsychologist (NIMHANS)',
    hostPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    date: 'Saturday',
    time: '11:00 AM IST',
    duration: '45 mins',
    attendeesCount: 310,
    description: 'Fun cognitive exercises that stimulate neural plasticity, working memory, and focus to prevent age-related mental decline.',
  },
  {
    id: 'evt-5',
    title: 'Evening Bhagavad Gita & Upanishad Wisdom Circle',
    category: 'Spiritual & Satsang',
    hostName: 'Swami Vidyananda',
    hostRole: 'Spiritual Counselor & Philosopher',
    hostPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    date: 'Sunday',
    time: '06:00 PM IST',
    duration: '50 mins',
    attendeesCount: 640,
    description: 'Reflective discourses on finding peace, letting go of anxiety, and embracing graceful aging in modern times.',
  }
];

export const communityClubs = [
  {
    name: 'Sur-Taal Music & Karaoke Club',
    members: '1,420+ Seniors',
    schedule: 'Every Tue & Fri, 5:30 PM',
    iconName: 'Music',
    desc: 'Sing your heart out with fellow golden-era music lovers from all across India.'
  },
  {
    name: 'Sanjeevani Yoga & Pranayama Club',
    members: '2,800+ Seniors',
    schedule: 'Daily, 8:00 AM',
    iconName: 'Activity',
    desc: 'Daily physician-curated joint stretching, breathing exercises, and guided mindfulness.'
  },
  {
    name: 'Grandmasters Chess & Sudoku Guild',
    members: '890+ Seniors',
    schedule: 'Every Wed & Sun, 4:00 PM',
    iconName: 'Trophy',
    desc: 'Friendly tournaments and memory challenges to keep cognitive acuity razor sharp.'
  },
  {
    name: 'Globetrotters Book & Travel Club',
    members: '1,150+ Seniors',
    schedule: 'Every Thursday, 6:00 PM',
    iconName: 'BookOpen',
    desc: 'Virtual world tours, historical discussions, and literary book exchanges.'
  }
];
