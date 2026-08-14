import { Article } from '@/types';

export const resourcesData: Article[] = [
  {
    id: 'art-1',
    slug: '10-early-warning-signs-of-dementia-in-parents',
    title: '10 Early Warning Signs of Dementia in Aging Parents (And How to React)',
    summary: 'Distinguishing between normal age-related forgetfulness and progressive cognitive impairment. A clinical guide for adult children with an actionable home assessment checklist.',
    category: 'Dementia & Cognitive Health',
    readTimeMinutes: 7,
    publishDate: '2026-06-18',
    heroImage: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1400&q=80',
    author: {
      name: 'Dr. Shalini Ramanathan',
      role: 'Lead Cognitive Neuropsychologist',
      credentials: 'Ph.D. Clinical Neuropsychology (NIMHANS)'
    },
    medicallyReviewedBy: {
      name: 'Dr. Rajeshwar Kulkarni, MD',
      speciality: 'Chief of Geriatric Medicine',
      hospital: 'Aeterna Clinical Advisory Board'
    },
    keyTakeaways: [
      'Normal aging involves forgetting names occasionally; dementia involves forgetting recently learned information repeatedly.',
      'Difficulty executing familiar multi-step tasks (cooking a favorite recipe, managing bank checkbooks) is an early marker.',
      'Disorientation to time, season, or familiar neighborhood routes warrants clinical screening.',
      'Sudden uncharacteristic personality shifts, paranoia, or social withdrawal should not be dismissed as "cranky old age".'
    ],
    sections: [
      {
        heading: '1. Memory Loss That Disrupts Daily Life',
        paragraphs: [
          'One of the most common early signs of Alzheimer’s disease is forgetting recently learned information. While occasionally forgetting where one left reading glasses is typical of a 75-year-old brain, asking the same question five times within thirty minutes or relying heavily on memory aids for routine tasks points to neurological changes.',
          'In early dementia, long-term memories from childhood often remain vivid, leading families to falsely believe "their memory is still sharp". The critical flag is short-term consolidation failure.'
        ],
        calloutBox: {
          type: 'clinical-note',
          title: 'Clinical Distinction',
          text: 'Normal Aging: Forgetting an acquaintance’s name and remembering it later in the evening.\nDementia: Forgetting who visited the home an hour ago or failing to recognize close relatives.'
        }
      },
      {
        heading: '2. Challenges in Planning or Solving Everyday Problems',
        paragraphs: [
          'Seniors developing cognitive impairment often exhibit subtle executive dysfunction. They may struggle to follow a familiar recipe they cooked for thirty years or keep track of monthly electricity and utility bills.',
          'Working with numbers becomes strenuous. You might notice unpaid utility bills piling up or disproportionate frustration when balancing a checkbook.'
        ]
      },
      {
        heading: '3. Difficulty Completing Familiar Daily Tasks',
        paragraphs: [
          'People living with dementia frequently find it hard to complete daily routines. They may get confused about the rules of a favorite card game, struggle to operate the television remote, or lose the sequence required to button a shirt.',
          'Notice whether your parent is hesitating or abandoning hobbies they once cherished.'
        ]
      },
      {
        heading: '4. Confusion with Time or Place',
        paragraphs: [
          'Losing track of dates, seasons, and the passage of time is a prominent red flag. An elder might dress in heavy woolens in the middle of May or become deeply distressed because they believe they have an office meeting from thirty years ago.'
        ]
      },
      {
        heading: 'Next Steps: How Adult Children Should Respond',
        paragraphs: [
          'If you notice two or more of these warning signs in your parents, do not confront them aggressively or argue. Instead, schedule a gentle, comprehensive bedside Geriatric Assessment with a specialist who can conduct standardized MMSE (Mini-Mental State Exam) and MoCA tests in the comfort of their home.'
        ],
        bulletPoints: [
          'Schedule an unhurried Geriatric Bedside Consultation',
          'Document specific incidents with dates and times for the neurologist',
          'Install non-intrusive home safety sensors and door alerts',
          'Consider structured memory care assistance to relieve family burnout'
        ]
      }
    ],
    tags: ['Dementia', 'Alzheimers', 'Geriatric Health', 'Parent Care'],
    relatedSlugs: ['preventing-elderly-falls-home-safety-checklist', 'managing-hypertension-diabetes-in-seniors']
  },
  {
    id: 'art-2',
    slug: 'preventing-elderly-falls-home-safety-checklist',
    title: 'The Ultimate Home Fall-Prevention Checklist for Seniors',
    summary: 'Falls are the #1 cause of fatal injury and hip fractures among seniors over 70. Learn practical room-by-room environmental modifications that reduce fall risk by over 75%.',
    category: 'Home Safety & Mobility',
    readTimeMinutes: 6,
    publishDate: '2026-07-02',
    heroImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1400&q=80',
    author: {
      name: 'Dr. Vivek Swaminathan, MPT',
      role: 'Head of Neuro-Rehab',
      credentials: 'MPT Neuro-Sciences (NIMHANS)'
    },
    medicallyReviewedBy: {
      name: 'Dr. Arvind Sen, MS',
      speciality: 'Consultant Orthopedic & Trauma Surgeon',
      hospital: 'Aeterna Clinical Advisory Board'
    },
    keyTakeaways: [
      '80% of senior falls occur inside the bathroom during night-time visits.',
      'Eliminate loose throw rugs and floor clutter across all high-traffic corridors.',
      'Install heavy-duty grab bars bolted into structural walls, not suction-cup accessories.',
      'Maintain continuous 2700K warm night-light illumination along the pathway to the restroom.'
    ],
    sections: [
      {
        heading: 'The Hidden Danger: Why Falls Are So Devastating in Elders',
        paragraphs: [
          'In young adults, a slip results in a bruise. In an 80-year-old with osteoporosis, a simple slip often causes a femoral neck hip fracture, requiring major surgery, prolonged bed rest, and high risk of secondary pulmonary complications.',
          'Fear of falling also triggers a downward spiral: seniors voluntarily restrict their walking, leading to rapid muscle atrophy, joint stiffness, and even greater loss of balance.'
        ]
      },
      {
        heading: 'Room-by-Room Safety Modifications',
        paragraphs: [
          'Transforming your parents’ home into a fall-safe sanctuary requires specific mechanical and lighting upgrades across three high-risk zones:'
        ],
        bulletPoints: [
          'Bathroom: Stainless steel grab bars beside the western commode and inside the shower area.',
          'Bathroom: High-traction anti-skid rubberized mats; replace slippery glazed tiles.',
          'Bedroom: Bed height adjusted so knees are at exactly 90 degrees when feet touch the floor.',
          'Hallway & Corridors: Motion-sensor nightlights plugged into low wall sockets every 3 meters.',
          'Footwear: Enclosed supportive footwear with non-slip rubber soles (no loose slip-on slippers).'
        ],
        calloutBox: {
          type: 'warning',
          title: 'Avoid Suction-Cup Bars',
          text: 'Never use cheap suction-cup grab bars in bathrooms. They frequently detach under adult body weight during a slip. Always install wall-anchored stainless steel bars with minimum 150 kg load rating.'
        }
      }
    ],
    tags: ['Fall Prevention', 'Home Safety', 'Orthopedics', 'Mobility'],
    relatedSlugs: ['10-early-warning-signs-of-dementia-in-parents', 'managing-hypertension-diabetes-in-seniors']
  },
  {
    id: 'art-3',
    slug: 'managing-hypertension-diabetes-in-seniors',
    title: 'Managing Hypertension and Diabetes in Seniors: Polypharmacy Risks',
    summary: 'Why taking 8+ medications daily often leads to dangerous drug interactions, postural hypotension, and dizziness. How clinical medication reconciliation protects your parents.',
    category: 'Chronic Care & Medicine',
    readTimeMinutes: 8,
    publishDate: '2026-07-15',
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80',
    author: {
      name: 'Dr. Rajeshwar Kulkarni, MD',
      role: 'Chief of Geriatric Medicine',
      credentials: 'MBBS, MD Internal Medicine (AIIMS)'
    },
    medicallyReviewedBy: {
      name: 'Dr. Pallavi Sengupta, MD',
      speciality: 'Pathology & Pharmacology Director',
      hospital: 'Aeterna Clinical Advisory Board'
    },
    keyTakeaways: [
      'Polypharmacy (taking 5+ daily drugs) is responsible for over 30% of preventable senior hospitalizations.',
      'Aggressive blood pressure lowering in elderly patients can cause orthostatic hypotension and syncope.',
      'Glycemic targets for seniors over 75 should be individualized (HbA1c 7.5%–8.0% is often safer than strict 6.5%).',
      'Conduct an annual "Brown Bag Review" with a geriatrician to weed out redundant medications.'
    ],
    sections: [
      {
        heading: 'The Polypharmacy Trap in Indian Elders',
        paragraphs: [
          'It is very common for an Indian senior to see a cardiologist for blood pressure, an endocrinologist for diabetes, an orthopedist for knee pain, and a gastroenterologist for acidity. Each specialist prescribes 2 to 3 pills.',
          'Within a few years, the parent is consuming 12 different pills every single day. No single physician is reviewing the cumulative toxicities and drug-to-drug interactions.'
        ]
      },
      {
        heading: 'Postural Hypotension & Sudden Dizziness',
        paragraphs: [
          'Certain antihypertensives cause a sudden drop in blood pressure when standing up from a seated or lying position. The senior feels lightheaded, experiences a blackout, and falls.',
          'Our visiting physicians always measure blood pressure in both supine and standing positions to detect and correct postural drops before an accident happens.'
        ]
      }
    ],
    tags: ['Diabetes', 'Hypertension', 'Polypharmacy', 'Internal Medicine'],
    relatedSlugs: ['10-early-warning-signs-of-dementia-in-parents', 'choosing-between-home-care-and-assisted-living']
  },
  {
    id: 'art-4',
    slug: 'choosing-between-home-care-and-assisted-living',
    title: 'Home Care vs. Assisted Living Facility: Which Is Best for Your Parent?',
    summary: 'A balanced, compassionate evaluation of emotional well-being, financial costs, clinical safety, and dignity when choosing between at-home elder care and senior living facilities in India.',
    category: 'Care Strategy & Decisions',
    readTimeMinutes: 9,
    publishDate: '2026-07-28',
    heroImage: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1400&q=80',
    author: {
      name: 'Ms. Radhika Nair',
      role: 'Director of Active Aging',
      credentials: 'M.A. Social Work, Geriatric Mental Health Coach'
    },
    medicallyReviewedBy: {
      name: 'Dr. Meenakshi Sundaram',
      speciality: 'Director of Elder Well-being',
      hospital: 'Aeterna Clinical Advisory Board'
    },
    keyTakeaways: [
      '92% of Indian seniors express an overwhelming emotional desire to "age in place" in their own ancestral homes.',
      'At-home 24/7 care provides 1-on-1 personalized attention, unlike institutional facilities where staff ratios range from 1:6 to 1:12.',
      'Home care minimizes exposure to multidrug-resistant hospital pathogens and institutional depression.',
      'Modern tech-enabled home care gives NRI children total transparency through daily vitals and GPS logs.'
    ],
    sections: [
      {
        heading: 'The Emotional Weight of Relocation',
        paragraphs: [
          'Uprooting an 82-year-old from the home where they raised their children, know the neighborhood fruit vendor, and have their daily chai rituals often triggers deep emotional shock, accelerated dementia progression, and depression.',
          'Aging in place preserves psychological familiarity and autonomy.'
        ]
      },
      {
        heading: 'Cost Comparison: 24/7 Home Care vs. Premium Assisted Living',
        paragraphs: [
          'High-end senior living facilities in Delhi NCR, Bangalore, or Pune typically require a non-refundable deposit of ₹15 to ₹40 Lakhs plus monthly maintenance of ₹70,000 to ₹1,20,000. In contrast, comprehensive at-home care with clinical supervision, medical equipment, and an attendant typically costs between ₹35,000 and ₹55,000 per month without upfront capital lock-in.'
        ]
      }
    ],
    tags: ['Home Care', 'Senior Living', 'Care Decisions', 'NRI Family'],
    relatedSlugs: ['10-early-warning-signs-of-dementia-in-parents', 'preventing-elderly-falls-home-safety-checklist']
  }
];
