import { CityLocation } from '@/types';

export const locationsData: CityLocation[] = [
  {
    id: 'loc-1',
    slug: 'delhi-ncr',
    name: 'Delhi NCR',
    state: 'Delhi National Capital Territory',
    region: 'North India',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=80',
    activeCaregivers: 380,
    partnerHospitals: 42,
    familiesServed: 3850,
    avgResponseTimeMin: 14,
    localHubAddress: 'Aeterna Care Central Command Hub, B-4/12 Vasant Vihar, South Delhi, New Delhi 110057',
    helpline: '+91 11 4084 9900',
    leadCoordinator: {
      name: 'Capt. Vikramaditya Rathore (Retd.)',
      title: 'Zonal Care Director — Delhi NCR',
      phone: '+91 98101 22445',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    coveredLocalities: [
      'Vasant Vihar', 'Greater Kailash (GK 1 & 2)', 'Hauz Khas', 'Defence Colony', 'South Extension',
      'Chanakyapuri', 'Panchsheel Park', 'Dwarka (Sectors 1-23)', 'Rohini', 'Pitampura',
      'Civil Lines', 'Punjabi Bagh', 'Mayur Vihar', 'Saket', 'Gulmohar Park'
    ],
    partnerHospitalList: [
      { name: 'Max Super Speciality Hospital, Saket', accreditation: 'NABH / JCI', speciality: 'Multi-Speciality & Cardiac Sciences' },
      { name: 'Indraprastha Apollo Hospital, Sarita Vihar', accreditation: 'JCI / NABH', speciality: 'Neurosciences & Critical Care' },
      { name: 'Fortis Escorts Heart Institute, Okhla', accreditation: 'NABH', speciality: 'Cardiac Care & Emergency' },
      { name: 'Medanta Mediclinic, Defence Colony', accreditation: 'NABH', speciality: 'Geriatric Outpatient & Daycare' }
    ],
    localTestimonials: [
      {
        quote: 'Living in London, I was terrified when my 82-year-old mother suffered a mild stroke in GK-2. Aeterna’s ambulance arrived in 11 minutes and Sister Maria stayed by her bedside through recovery. Truly lifesavers.',
        author: 'Karan Mehra',
        locality: 'Greater Kailash II, New Delhi',
        rating: 5,
        serviceUsed: 'ICU Home Nursing & Emergency SOS'
      },
      {
        quote: 'The visiting MD doctor conducts thorough 45-minute checks for my father. No hospital queues, no parking trauma in South Delhi traffic.',
        author: 'Pooja Taneja',
        locality: 'Vasant Vihar, New Delhi',
        rating: 5,
        serviceUsed: 'Doctor Home Visits'
      }
    ],
    faqs: [
      {
        question: 'Which areas of Delhi NCR do you cover for emergency ambulance?',
        answer: 'We cover all zones of South, Central, West, North, and East Delhi with average dispatch times under 14 minutes, backed by our 8 strategic ambulance standby nodes.'
      },
      {
        question: 'Can we get a Hindi-speaking caregiver who knows North Indian vegetarian cooking?',
        answer: 'Yes! All our Delhi caregivers are fluent in Hindi and North Indian dietary preparations including diabetic sattvic meals.'
      }
    ]
  },
  {
    id: 'loc-2',
    slug: 'gurgaon',
    name: 'Gurgaon (Gurugram)',
    state: 'Haryana',
    region: 'North India',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1400&q=80',
    activeCaregivers: 260,
    partnerHospitals: 28,
    familiesServed: 2420,
    avgResponseTimeMin: 12,
    localHubAddress: 'Aeterna Care Regional Hub, Sector 54, Golf Course Road, Gurugram, Haryana 122002',
    helpline: '+91 124 4920 800',
    leadCoordinator: {
      name: 'Dr. Sonali Grover',
      title: 'Senior Clinical Lead — Gurugram',
      phone: '+91 99102 33881',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    coveredLocalities: [
      'Golf Course Road', 'DLF Phase 1, 2, 3, 4 & 5', 'Golf Course Extension', 'Sohna Road',
      'Nirvana Country', 'South City 1 & 2', 'Sector 56 & 57', 'Palam Vihar',
      'Sushant Lok 1 & 2', 'Sector 14 & 15', 'MG Road Condominiums', 'Ambience Island'
    ],
    partnerHospitalList: [
      { name: 'Medanta — The Medicity, Sector 38', accreditation: 'JCI / NABH', speciality: 'Comprehensive Quaternary Care' },
      { name: 'Fortis Memorial Research Institute (FMRI)', accreditation: 'JCI / NABH', speciality: 'Neuro & Oncology' },
      { name: 'Max Hospital, Sushant Lok 1', accreditation: 'NABH', speciality: 'Internal Medicine & Emergency' },
      { name: 'Artemis Hospital, Sector 51', accreditation: 'JCI / NABH', speciality: 'Orthopedics & Geriatrics' }
    ],
    localTestimonials: [
      {
        quote: 'My parents live in a condominium on Golf Course Extension. Aeterna Care attendant Prakash is punctual, respectful, and manages my father’s Parkinson’s mobility wonderfully.',
        author: 'Amitabh Sen',
        locality: 'DLF Phase 5, Gurgaon',
        rating: 5,
        serviceUsed: '24x7 Live-in Caregiver Attendant'
      }
    ],
    faqs: [
      {
        question: 'Do your staff have security gate clearance for gated high-rise condominiums?',
        answer: 'Yes, all our staff carry verified company photo IDs with digital MyGate / NoBrokerHood pre-authorization.'
      }
    ]
  },
  {
    id: 'loc-3',
    slug: 'mumbai',
    name: 'Mumbai & MMR',
    state: 'Maharashtra',
    region: 'West India',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=80',
    activeCaregivers: 410,
    partnerHospitals: 48,
    familiesServed: 4100,
    avgResponseTimeMin: 15,
    localHubAddress: 'Aeterna Medical Hub, 102 Maker Chambers V, Nariman Point & Bandra West, Mumbai 400021',
    helpline: '+91 22 6902 4400',
    leadCoordinator: {
      name: 'Dr. Farhan Merchant',
      title: 'Zonal Clinical Director — Mumbai Metropolitan',
      phone: '+91 98200 44910',
      photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
    },
    coveredLocalities: [
      'South Mumbai (Colaba to Worli)', 'Bandra West & Bandra East', 'Juhu & Vile Parle',
      'Andheri West (Lokhandwala, Versova)', 'Khar & Santacruz', 'Powai Hiranandani',
      'Chembur', 'Ghatkopar', 'Mulund & Thane West', 'Navi Mumbai (Vashi, Nerul, Belapur)',
      'Borivali West & Kandivali', 'Malabar Hill & Pedder Road'
    ],
    partnerHospitalList: [
      { name: 'Lilavati Hospital & Research Centre, Bandra', accreditation: 'NABH', speciality: 'Multi-Speciality & Cardiac' },
      { name: 'Hinduja Hospital, Mahim', accreditation: 'NABH / CAP', speciality: 'Critical Care & Pulmonology' },
      { name: 'Kokilaben Dhirubhai Ambani Hospital, Andheri', accreditation: 'JCI / NABH', speciality: 'Stroke & Neuro-Rehabilitation' },
      { name: 'Sir H. N. Reliance Foundation Hospital, Girgaon', accreditation: 'JCI / NABH', speciality: 'Quaternary Healthcare' }
    ],
    localTestimonials: [
      {
        quote: 'Navigating Mumbai traffic for my mother’s post-knee replacement physiotherapy was impossible. Dr. Vivek’s home sessions restored her walking within 4 weeks. Truly exceptional.',
        author: 'Anjali Deshmukh',
        locality: 'Prabhadevi, Mumbai',
        rating: 5,
        serviceUsed: 'Physiotherapy & Neuro-Rehab'
      }
    ],
    faqs: [
      {
        question: 'Do you cover Thane and Navi Mumbai?',
        answer: 'Yes! We have dedicated operational teams and standby ACLS ambulances in both Thane and Navi Mumbai.'
      }
    ]
  },
  {
    id: 'loc-4',
    slug: 'bangalore',
    name: 'Bangalore (Bengaluru)',
    state: 'Karnataka',
    region: 'South India',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1400&q=80',
    activeCaregivers: 350,
    partnerHospitals: 36,
    familiesServed: 3600,
    avgResponseTimeMin: 13,
    localHubAddress: 'Aeterna Care South Hub, 100 Feet Road, Indiranagar & Koramangala 4th Block, Bengaluru 560038',
    helpline: '+91 80 4719 3300',
    leadCoordinator: {
      name: 'Ms. Deepa Somasekharan',
      title: 'Regional Care Operations Head — Bengaluru',
      phone: '+91 98450 11922',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
    },
    coveredLocalities: [
      'Indiranagar', 'Koramangala', 'HSR Layout (Sectors 1-7)', 'Whitefield & ITPL',
      'Jayanagar & JP Nagar', 'Sadashivanagar & Malleshwaram', 'Sarjapur Road',
      'Hebbal & Dollars Colony', 'Electronic City Phase 1 & 2', 'BTM Layout',
      'Richmond Town & Lavelle Road', 'Yelahanka'
    ],
    partnerHospitalList: [
      { name: 'Manipal Hospital, Old Airport Road', accreditation: 'NABH / AAHRPP', speciality: 'Comprehensive Quaternary & Emergency' },
      { name: 'Aster CMI Hospital, Hebbal', accreditation: 'JCI / NABH', speciality: 'Neurology & Multi-Organ Transplant' },
      { name: 'Fortis Hospital, Bannerghatta Road', accreditation: 'JCI / NABH', speciality: 'Cardiac Sciences & Oncology' },
      { name: 'Apollo Hospitals, Jayanagar', accreditation: 'NABH', speciality: 'Geriatric Care & Orthopedics' }
    ],
    localTestimonials: [
      {
        quote: 'As an NRI in Seattle, Aeterna Care’s Platinum plan is the best investment I ever made for my 79-year-old parents in Jayanagar. The daily vitals app updates give me peace of mind every single morning.',
        author: 'Siddharth Hegde',
        locality: 'Jayanagar, Bengaluru',
        rating: 5,
        serviceUsed: 'Platinum Comprehensive Care Plan'
      }
    ],
    faqs: [
      {
        question: 'Do caregivers speak Kannada and English?',
        answer: 'Yes, our Bengaluru team has bilingual caregivers fluent in Kannada, English, Tamil, and Telugu.'
      }
    ]
  },
  {
    id: 'loc-5',
    slug: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    region: 'West India',
    heroImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1400&q=80',
    activeCaregivers: 210,
    partnerHospitals: 22,
    familiesServed: 1890,
    avgResponseTimeMin: 14,
    localHubAddress: 'Aeterna Hub Pune, Koregaon Park Road & Baner, Pune 411001',
    helpline: '+91 20 4910 2200',
    leadCoordinator: {
      name: 'Dr. Swapnil Joshi',
      title: 'Clinical Director — Pune',
      phone: '+91 98901 77334',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    coveredLocalities: [
      'Koregaon Park', 'Kalyani Nagar', 'Aundh & Baner', 'Kothrud', 'Viman Nagar',
      'Bavdhan', 'Model Colony & Shivaji Nagar', 'Magarpatta City', 'Hadapsar',
      'Wakad & Hinjawadi', 'Prabhat Road', 'Salunke Vihar & Wanowrie'
    ],
    partnerHospitalList: [
      { name: 'Ruby Hall Clinic, Sassoon Road', accreditation: 'NABH', speciality: 'Multi-Speciality & Trauma' },
      { name: 'Jupiter Hospital, Baner', accreditation: 'NABH', speciality: 'Cardiac Sciences & Critical Care' },
      { name: 'Sahyadri Super Speciality Hospital, Deccan', accreditation: 'NABH', speciality: 'Neurosciences & Geriatrics' }
    ],
    localTestimonials: [
      {
        quote: 'My mother is 84 and lives in Kothrud. The memory care attendant assigned by Aeterna is so patient with her Alzheimer’s. Highly recommend to all Pune families.',
        author: 'Varsha Kulkarni',
        locality: 'Kothrud, Pune',
        rating: 5,
        serviceUsed: 'Dementia & Memory Care'
      }
    ],
    faqs: [
      {
        question: 'Are Marathi-speaking attendants available?',
        answer: 'Yes, 90%+ of our Pune care staff are native Marathi speakers.'
      }
    ]
  },
  {
    id: 'loc-6',
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    region: 'South India',
    heroImage: 'https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=1400&q=80',
    activeCaregivers: 290,
    partnerHospitals: 30,
    familiesServed: 2750,
    avgResponseTimeMin: 13,
    localHubAddress: 'Aeterna Hub Hyderabad, Road No. 36 Jubilee Hills & Gachibowli, Hyderabad 500033',
    helpline: '+91 40 4820 1100',
    leadCoordinator: {
      name: 'Dr. Haritha Reddy',
      title: 'Zonal Medical Head — Hyderabad',
      phone: '+91 98490 88219',
      photo: 'https://images.unsplash.com/photo-1594824813590-78174548842d?auto=format&fit=crop&w=600&q=80'
    },
    coveredLocalities: [
      'Jubilee Hills & Banjara Hills', 'Gachibowli & Financial District', 'Madhapur & Hitec City',
      'Kondapur', 'Kukatpally & Miyapur', 'Secunderabad & Marredpally', 'Begumpet',
      'Somajiguda & Ameerpet', 'Manikonda', 'Attapur & Mehdipatnam'
    ],
    partnerHospitalList: [
      { name: 'Apollo Hospitals, Jubilee Hills', accreditation: 'JCI / NABH', speciality: 'Comprehensive Quaternary Care' },
      { name: 'Yashoda Hospitals, Somajiguda & Hitec City', accreditation: 'NABH', speciality: 'Critical Care & Neurosciences' },
      { name: 'KIMS Hospitals, Secunderabad', accreditation: 'NABH', speciality: 'Cardiology & Geriatric Medicine' }
    ],
    localTestimonials: [
      {
        quote: 'My father was discharged after open heart surgery. Aeterna setup the hospital bed and deployed nurse Mary in Gachibowli within 3 hours. Seamless execution.',
        author: 'Raghu Varma',
        locality: 'Gachibowli, Hyderabad',
        rating: 5,
        serviceUsed: 'Post-Operative Care & Bed Rental'
      }
    ],
    faqs: [
      {
        question: 'Do you cover Secunderabad and Cyberabad?',
        answer: 'Yes, our fleet and staff cover the entire twin cities region with 24/7 support.'
      }
    ]
  },
  {
    id: 'loc-7',
    slug: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South India',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80',
    activeCaregivers: 270,
    partnerHospitals: 26,
    familiesServed: 2300,
    avgResponseTimeMin: 14,
    localHubAddress: 'Aeterna Hub Chennai, TTK Road, Alwarpet & Anna Nagar, Chennai 600018',
    helpline: '+91 44 4902 7700',
    leadCoordinator: {
      name: 'Sister Stella Mary, RN',
      title: 'Senior Clinical Supervisor — Chennai',
      phone: '+91 98401 66520',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
    },
    coveredLocalities: [
      'Alwarpet & Mylapore', 'Anna Nagar (East & West)', 'Adyar & Besant Nagar',
      'T. Nagar & Nungambakkam', 'RA Puram & Boat Club', 'Velachery & OMR',
      'Kilpauk', 'Thiruvanmiyur', 'ECR (Kottivakkam to Palavakkam)', 'Porur'
    ],
    partnerHospitalList: [
      { name: 'Apollo Hospitals, Greams Road', accreditation: 'JCI / NABH', speciality: 'Quaternary Healthcare' },
      { name: 'Kauvery Hospital, Alwarpet', accreditation: 'NABH', speciality: 'Geriatric Medicine & Neuro' },
      { name: 'MGM Healthcare, Nelson Manickam Road', accreditation: 'JCI / NABH', speciality: 'Cardiac Sciences & Critical Care' }
    ],
    localTestimonials: [
      {
        quote: 'My mother lives in Mylapore. Sister Revathi from Aeterna takes care of her like family. Very grateful for their service.',
        author: 'Suresh Krishnan',
        locality: 'Mylapore, Chennai',
        rating: 5,
        serviceUsed: 'Trained Geriatric Caregiver'
      }
    ],
    faqs: [
      {
        question: 'Do caregivers speak Tamil fluently?',
        answer: 'Yes, 100% of our Chennai nursing and attendant staff are fluent in Tamil.'
      }
    ]
  },
  {
    id: 'loc-8',
    slug: 'noida',
    name: 'Noida & Greater Noida',
    state: 'Uttar Pradesh',
    region: 'North India',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=80',
    activeCaregivers: 190,
    partnerHospitals: 18,
    familiesServed: 1650,
    avgResponseTimeMin: 13,
    localHubAddress: 'Aeterna Hub Noida, Sector 62 & Sector 18, Noida, UP 201301',
    helpline: '+91 120 4810 990',
    leadCoordinator: {
      name: 'Rajnish Kumar',
      title: 'Operations Head — Noida & Greater Noida',
      phone: '+91 99100 55214',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
    },
    coveredLocalities: [
      'Sector 50 & 51', 'Sector 44 & 47', 'Sector 93 & 93A (Expressway)',
      'Sector 137 & 143', 'Sector 62 & 63', 'Sector 15 & 18', 'Greater Noida West (Noida Extension)',
      'Jaypee Greens (Greater Noida)', 'Sector 74-78 High-rise societies'
    ],
    partnerHospitalList: [
      { name: 'Jaypee Hospital, Sector 128', accreditation: 'NABH', speciality: 'Multi-Speciality & Cardiac' },
      { name: 'Fortis Hospital, Sector 62', accreditation: 'NABH', speciality: 'Neuro & Oncology' },
      { name: 'Max Multi Speciality Hospital, Greater Noida', accreditation: 'NABH', speciality: 'Emergency & General Medicine' }
    ],
    localTestimonials: [
      {
        quote: 'My father lives on Noida Expressway. The doorstep lab tests and weekly doctor visits have kept his diabetes well controlled.',
        author: 'Shalini Mathur',
        locality: 'Sector 93A, Noida',
        rating: 5,
        serviceUsed: 'Gold Essential Care Plan'
      }
    ],
    faqs: [
      {
        question: 'Do you cover Noida Expressway societies?',
        answer: 'Yes, we have 2 standby ambulance hubs positioned along the Expressway.'
      }
    ]
  },
  {
    id: 'loc-9',
    slug: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    region: 'East India',
    heroImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1400&q=80',
    activeCaregivers: 230,
    partnerHospitals: 24,
    familiesServed: 2100,
    avgResponseTimeMin: 16,
    localHubAddress: 'Aeterna Hub Kolkata, Salt Lake Sector V & Ballygunge, Kolkata 700091',
    helpline: '+91 33 4900 8811',
    leadCoordinator: {
      name: 'Dr. Debabrata Banerjee',
      title: 'Zonal Medical Director — Kolkata',
      phone: '+91 98300 22718',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
    },
    coveredLocalities: [
      'Salt Lake (Sectors 1-5)', 'New Town (Action Area 1-3)', 'Ballygunge & Gariahat',
      'Alipore & New Alipore', 'Park Street & Rawdon Street', 'Behala & Jadavpur',
      'Dum Dum & Lake Town', 'Southern Avenue'
    ],
    partnerHospitalList: [
      { name: 'Apollo Multispeciality Hospitals, EM Bypass', accreditation: 'JCI / NABH', speciality: 'Quaternary Healthcare' },
      { name: 'Medica Superspecialty Hospital, Mukundapur', accreditation: 'NABH', speciality: 'Cardiac Sciences & Critical Care' },
      { name: 'AMRI Hospitals, Dhakuria & Salt Lake', accreditation: 'NABH', speciality: 'Geriatric Medicine' }
    ],
    localTestimonials: [
      {
        quote: 'My parents in Ballygunge are taken care of like royalty. The Bengali-speaking companion Soumya takes them for morning walks and cultural events.',
        author: 'Rituparna Ghosh',
        locality: 'Ballygunge, Kolkata',
        rating: 5,
        serviceUsed: 'Companion & Concierge Care'
      }
    ],
    faqs: [
      {
        question: 'Are Bengali-speaking attendants available in Salt Lake and New Town?',
        answer: 'Yes, all our local staff are fluent in Bengali and English.'
      }
    ]
  },
  {
    id: 'loc-10',
    slug: 'ahmedabad',
    name: 'Ahmedabad & Gandhinagar',
    state: 'Gujarat',
    region: 'West India',
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1400&q=80',
    activeCaregivers: 180,
    partnerHospitals: 19,
    familiesServed: 1450,
    avgResponseTimeMin: 14,
    localHubAddress: 'Aeterna Hub Ahmedabad, SG Highway & Bodakdev, Ahmedabad 380054',
    helpline: '+91 79 4912 3344',
    leadCoordinator: {
      name: 'Dr. Ketan Patel',
      title: 'Clinical Lead — Gujarat Region',
      phone: '+91 98250 11490',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
    },
    coveredLocalities: [
      'SG Highway', 'Bodakdev & Vastrapur', 'Satellite & Prahlad Nagar',
      'Navrangpura & CG Road', 'Thaltej & Bopal', 'Gandhinagar (Sectors 1-30)',
      'Maninagar', 'Paldi & Ambawadi'
    ],
    partnerHospitalList: [
      { name: 'Zydus Hospitals, Thaltej', accreditation: 'NABH', speciality: 'Comprehensive Quaternary' },
      { name: 'Apollo Hospitals, Gandhinagar', accreditation: 'JCI / NABH', speciality: 'Cardiac Sciences & Oncology' },
      { name: 'Marengo CIMS Hospital, Science City Road', accreditation: 'JCI / NABH', speciality: 'Cardiology & Critical Care' }
    ],
    localTestimonials: [
      {
        quote: 'My father needed BiPAP and hospital bed rental after COVID lung fibrosis. Aeterna setup everything in Satellite within 2 hours.',
        author: 'Bhavin Shah',
        locality: 'Satellite, Ahmedabad',
        rating: 5,
        serviceUsed: 'Medical Equipment Rental & Nursing'
      }
    ],
    faqs: [
      {
        question: 'Are vegetarian/Jain diet compliant caregivers available?',
        answer: 'Yes, 100% of our Gujarat staff strictly adhere to vegetarian and Jain dietary preferences.'
      }
    ]
  },
  {
    id: 'loc-11',
    slug: 'chandigarh',
    name: 'Chandigarh Tricity',
    state: 'Punjab / Haryana / UT',
    region: 'North India',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=80',
    activeCaregivers: 160,
    partnerHospitals: 16,
    familiesServed: 1320,
    avgResponseTimeMin: 12,
    localHubAddress: 'Aeterna Hub Chandigarh, Sector 9 & Mohali Phase 7, Chandigarh 160009',
    helpline: '+91 172 4901 223',
    leadCoordinator: {
      name: 'Col. Jasbir Singh (Retd.)',
      title: 'Regional Operations Head — Tricity',
      phone: '+91 98140 33819',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    coveredLocalities: [
      'Chandigarh (Sectors 1-40)', 'Panchkula (Sectors 1-21)', 'Mohali (Phases 1-11 & Aerocity)',
      'Zirakpur', 'Mansa Devi Complex', 'Kharar'
    ],
    partnerHospitalList: [
      { name: 'Max Super Speciality Hospital, Mohali', accreditation: 'NABH', speciality: 'Cardiac Sciences & Neuro' },
      { name: 'Fortis Hospital, Mohali', accreditation: 'JCI / NABH', speciality: 'Critical Care & Orthopedics' },
      { name: 'Alchemist Hospital, Panchkula', accreditation: 'NABH', speciality: 'Multi-Speciality & Emergency' }
    ],
    localTestimonials: [
      {
        quote: 'My mother is 81 and lives in Sector 18 Chandigarh. Aeterna’s nurse Sister Gurpreet takes immense care of her insulin and physiotherapy.',
        author: 'Harpreet Dhillon',
        locality: 'Sector 18, Chandigarh',
        rating: 5,
        serviceUsed: 'Silver Assist Plan & Nursing'
      }
    ],
    faqs: [
      {
        question: 'Do you cover both Panchkula and Mohali?',
        answer: 'Yes, our ambulances and care managers operate across the entire Tricity network.'
      }
    ]
  },
  {
    id: 'loc-12',
    slug: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'North India',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=80',
    activeCaregivers: 140,
    partnerHospitals: 14,
    familiesServed: 1100,
    avgResponseTimeMin: 14,
    localHubAddress: 'Aeterna Hub Jaipur, C-Scheme & Vaishali Nagar, Jaipur 302001',
    helpline: '+91 141 4920 112',
    leadCoordinator: {
      name: 'Dr. Manisha Shekhawat',
      title: 'Clinical Supervisor — Rajasthan',
      phone: '+91 98290 44102',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    coveredLocalities: [
      'C-Scheme & Civil Lines', 'Vaishali Nagar', 'Malviya Nagar & Jagatpura',
      'Raja Park & Mansarovar', 'Bani Park', 'Tonk Road Condominiums'
    ],
    partnerHospitalList: [
      { name: 'Manipal Hospital, Vidhyadhar Nagar', accreditation: 'NABH', speciality: 'Multi-Speciality & Critical Care' },
      { name: 'Fortis Escorts Hospital, Malviya Nagar', accreditation: 'NABH', speciality: 'Cardiac Sciences & Emergency' },
      { name: 'Eternal Hospital (EHCC), Jawahar Circle', accreditation: 'NABH / JCI', speciality: 'Quaternary Heart & Critical Care' }
    ],
    localTestimonials: [
      {
        quote: 'My parents in Vaishali Nagar have peace of mind with Aeterna’s quarterly doctor visits and 24x7 emergency backup.',
        author: 'Gaurav Rathore',
        locality: 'Vaishali Nagar, Jaipur',
        rating: 5,
        serviceUsed: 'Gold Essential Care Plan'
      }
    ],
    faqs: [
      {
        question: 'How fast can emergency ambulance reach C-Scheme or Vaishali Nagar?',
        answer: 'Our standby ambulances arrive within 12 to 14 minutes across central Jaipur.'
      }
    ]
  }
];
