export interface AdminLead {
  id: string;
  patientName: string;
  age: number;
  contactName: string;
  phone: string;
  city: string;
  serviceRequested: string;
  urgency: 'Immediate' | 'Within 48h' | 'Next Week';
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Closed';
  createdDate: string;
  source: string;
  estimatedValue: string;
}

export interface AdminBooking {
  id: string;
  service: string;
  customerName: string;
  city: string;
  dateTime: string;
  assignedStaff: string;
  amount: string;
  paymentStatus: 'Paid (Razorpay)' | 'Pending' | 'Billed to Membership';
  status: 'Active' | 'Scheduled' | 'Completed' | 'In-Progress';
}

export const mockAdminLeads: AdminLead[] = [
  {
    id: 'LD-9021',
    patientName: 'Sh. B.M. Agarwal',
    age: 83,
    contactName: 'Rohit Agarwal (Son)',
    phone: '+91 98112 90432',
    city: 'South Delhi (GK-1)',
    serviceRequested: '24-Hr Live-in Caregiver Attendant',
    urgency: 'Immediate',
    status: 'New',
    createdDate: '12 Mins Ago',
    source: '8-Step Find Care Wizard',
    estimatedValue: '₹52,500 / mo'
  },
  {
    id: 'LD-9020',
    patientName: 'Mrs. Jayalakshmi Iyer',
    age: 78,
    contactName: 'Karthik Iyer (Son in Singapore)',
    phone: '+65 9123 4567',
    city: 'Bangalore (Indiranagar)',
    serviceRequested: 'Platinum Comprehensive Membership',
    urgency: 'Within 48h',
    status: 'Contacted',
    createdDate: '45 Mins Ago',
    source: 'Website Plan Booking',
    estimatedValue: '₹1,24,790 / yr'
  },
  {
    id: 'LD-9019',
    patientName: 'Col. Ranjit Singh',
    age: 80,
    contactName: 'Col. Ranjit Singh (Self)',
    phone: '+91 98140 11299',
    city: 'Chandigarh (Sector 9)',
    serviceRequested: 'Physiotherapy & Knee Rehab (15 Sessions)',
    urgency: 'Within 48h',
    status: 'Qualified',
    createdDate: '3 Hours Ago',
    source: 'Direct Phone Helpline',
    estimatedValue: '₹10,500'
  },
  {
    id: 'LD-9018',
    patientName: 'Mrs. Nalini Merchant',
    age: 86,
    contactName: 'Farhan Merchant (Son)',
    phone: '+91 98200 44910',
    city: 'Mumbai (Bandra West)',
    serviceRequested: 'ICU Home Nursing (Tracheostomy)',
    urgency: 'Immediate',
    status: 'Converted',
    createdDate: 'Yesterday',
    source: 'Lilavati Hospital Discharge Referral',
    estimatedValue: '₹54,000 / mo'
  }
];

export const mockAdminBookings: AdminBooking[] = [
  {
    id: 'BK-4401',
    service: 'Doctor Home Visit + 12-Lead ECG',
    customerName: 'Justice P.K. Nambiar',
    city: 'Bangalore (Whitefield)',
    dateTime: 'Tomorrow, 10:30 AM',
    assignedStaff: 'Dr. Vivek Swaminathan, MPT',
    amount: '₹1,499',
    paymentStatus: 'Paid (Razorpay)',
    status: 'Scheduled'
  },
  {
    id: 'BK-4400',
    service: 'Motorized Hospital Bed Rental (3-Func)',
    customerName: 'Col. K.L. Malhotra',
    city: 'Gurgaon (DLF Phase 5)',
    dateTime: 'Today, 2:00 PM',
    assignedStaff: 'Er. Sandeep Bhasin',
    amount: '₹5,500 / mo',
    paymentStatus: 'Billed to Membership',
    status: 'Active'
  },
  {
    id: 'BK-4399',
    service: 'Senior Platinum Blood Diagnostics',
    customerName: 'Mrs. Suniti Sen',
    city: 'South Delhi (Vasant Vihar)',
    dateTime: 'Today, 7:30 AM',
    assignedStaff: 'Sunil Phlebotomist',
    amount: '₹3,499',
    paymentStatus: 'Paid (Razorpay)',
    status: 'Completed'
  }
];
