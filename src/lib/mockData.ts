// Mock Data Service for Dentaleem
// Comprehensive mock data for all entities in the system

export interface MockLab {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  turnaround: string;
  avgPrice: string;
  location: string;
  specialties: string[];
  verified: boolean;
  goldCertified: boolean;
  featured: boolean;
  certifications: string[];
  cases: number;
  turnaroundDays: number;
  coverPhoto?: string;
  description?: string;
  technologies?: string[];
  deliveryZones?: string[];
}

export interface MockCase {
  id: string;
  patientName: string;
  internalPatientId?: string;
  patientType: 'adult' | 'pediatric';
  labId: number;
  labName: string;
  status: 'draft' | 'pending_payment' | 'design' | 'production' | 'delivery' | 'completed' | 'remake';
  progress: number;
  dueDate: string;
  createdAt: string;
  restorations: MockRestoration[];
  material: string;
  notes?: string;
  priority?: 'normal' | 'urgent';
  currentStage?: 'draft' | 'design' | 'production' | 'qc' | 'delivery' | 'completed';
}

export interface MockRestoration {
  id: string;
  type: string;
  teethNumbers: string[];
  material: string;
  notes?: string;
  isTryIn?: boolean;
  linkedToRestorationId?: string;
}

export interface MockPayment {
  id: string;
  caseId: string;
  invoiceNumber: string;
  amount: number;
  status: 'paid' | 'pending' | 'upcoming' | 'overdue';
  date: string;
  paymentMethod?: string;
  escrowStatus?: 'pending' | 'held' | 'released';
}

export interface MockNotification {
  id: string;
  type: 'lab' | 'payment' | 'system' | 'delivery';
  title: string;
  message: string;
  date: string;
  read: boolean;
  caseId?: string;
  actionUrl?: string;
}

export interface MockMessage {
  id: string;
  caseId: string;
  senderId: string;
  senderName: string;
  senderRole: 'dentist' | 'lab' | 'admin';
  message: string;
  timestamp: string;
  attachments?: string[];
  read: boolean;
}

export interface MockReview {
  id: string;
  caseId: string;
  labId: number;
  rating: number;
  comment: string;
  tags: string[];
  date: string;
  canEdit: boolean;
}

export const mockLabs: MockLab[] = [
  {
    id: 1,
    name: "Precision Dental Lab",
    rating: 4.9,
    reviews: 127,
    turnaround: "10-12 days",
    avgPrice: "$350",
    location: "Dubai, UAE",
    specialties: ["Zirconia", "E-max", "Implants"],
    verified: true,
    goldCertified: true,
    featured: true,
    certifications: ["ISO 9001", "DAMAS"],
    cases: 450,
    turnaroundDays: 11,
    description: "Premium dental laboratory specializing in digital workflows and high-quality restorations.",
    technologies: ["CAD/CAM", "3D Printing", "Digital Scanning"],
    deliveryZones: ["UAE", "GCC", "International"],
  },
  {
    id: 2,
    name: "Elite Dental Solutions",
    rating: 4.8,
    reviews: 98,
    turnaround: "8-10 days",
    avgPrice: "$380",
    location: "Abu Dhabi, UAE",
    specialties: ["Veneers", "Full Arch", "E-max"],
    verified: true,
    goldCertified: true,
    featured: true,
    certifications: ["ISO 13485", "CE"],
    cases: 380,
    turnaroundDays: 9,
    description: "Expert in aesthetic dentistry with state-of-the-art facilities.",
    technologies: ["Digital Workflow", "Multilayer Zirconia"],
    deliveryZones: ["UAE", "GCC"],
  },
  {
    id: 3,
    name: "Pro Lab Technologies",
    rating: 4.7,
    reviews: 156,
    turnaround: "12-14 days",
    avgPrice: "$320",
    location: "Sharjah, UAE",
    specialties: ["Zirconia", "Metal Ceramic", "Temporary"],
    verified: true,
    goldCertified: false,
    featured: false,
    certifications: ["ISO 9001"],
    cases: 620,
    turnaroundDays: 13,
    description: "Reliable local lab with extensive experience in traditional and digital techniques.",
    technologies: ["Traditional", "CAD/CAM"],
    deliveryZones: ["UAE"],
  },
];

export const mockCases: MockCase[] = [
  {
    id: "CS-2024-001",
    patientName: "Ahmad M.",
    internalPatientId: "PT-1234",
    patientType: "adult",
    labId: 1,
    labName: "Precision Dental Lab",
    status: "design",
    progress: 45,
    dueDate: "2024-12-25",
    createdAt: "2024-12-10",
    currentStage: "design",
    restorations: [
      {
        id: "R1",
        type: "Crown",
        teethNumbers: ["14", "15"],
        material: "Zirconia",
        notes: "High translucency preferred",
      },
      {
        id: "R2",
        type: "Crown",
        teethNumbers: ["14", "15"],
        material: "PMMA",
        isTryIn: true,
        linkedToRestorationId: "R1",
      },
    ],
    material: "Zirconia",
    priority: "urgent",
    notes: "Patient prefers natural shade A2",
  },
  {
    id: "CS-2024-002",
    patientName: "Sara K.",
    internalPatientId: "PT-1235",
    patientType: "adult",
    labId: 2,
    labName: "Elite Dental Solutions",
    status: "production",
    progress: 70,
    dueDate: "2024-12-22",
    createdAt: "2024-12-05",
    currentStage: "production",
    restorations: [
      {
        id: "R3",
        type: "Veneer",
        teethNumbers: ["11", "12", "21", "22"],
        material: "E-max",
        notes: "Hollywood white smile",
      },
    ],
    material: "E-max",
    priority: "normal",
  },
];

export const mockPayments: MockPayment[] = [
  {
    id: "INV-2024-001",
    caseId: "CS-2024-001",
    invoiceNumber: "INV-2024-001",
    amount: 750,
    status: "pending",
    date: "2024-12-10",
    escrowStatus: "held",
  },
  {
    id: "INV-2024-002",
    caseId: "CS-2024-002",
    invoiceNumber: "INV-2024-002",
    amount: 1200,
    status: "paid",
    date: "2024-12-05",
    paymentMethod: "Credit Card",
    escrowStatus: "released",
  },
];

export const mockNotifications: MockNotification[] = [
  {
    id: "N1",
    type: "lab",
    title: "Design Ready for Approval",
    message: "Precision Dental Lab uploaded design for Case CS-2024-001",
    date: "2024-12-18T10:30:00",
    read: false,
    caseId: "CS-2024-001",
    actionUrl: "/case/CS-2024-001",
  },
  {
    id: "N2",
    type: "delivery",
    title: "Case Out for Delivery",
    message: "Case CS-2024-002 is being delivered today",
    date: "2024-12-18T08:00:00",
    read: false,
    caseId: "CS-2024-002",
  },
  {
    id: "N3",
    type: "payment",
    title: "Payment Received",
    message: "Payment of $1,200 processed successfully",
    date: "2024-12-17T14:20:00",
    read: true,
  },
];

export const mockMessages: MockMessage[] = [
  {
    id: "M1",
    caseId: "CS-2024-001",
    senderId: "lab-1",
    senderName: "Precision Dental Lab",
    senderRole: "lab",
    message: "We've uploaded the initial design for your review. Please check and approve.",
    timestamp: "2024-12-18T10:30:00",
    read: false,
  },
  {
    id: "M2",
    caseId: "CS-2024-001",
    senderId: "dentist-1",
    senderName: "Dr. Ahmed",
    senderRole: "dentist",
    message: "The shade looks good, but can you adjust the margins slightly?",
    timestamp: "2024-12-18T09:15:00",
    read: true,
  },
];

export const mockReviews: MockReview[] = [
  {
    id: "REV-1",
    caseId: "CS-2024-002",
    labId: 2,
    rating: 5,
    comment: "Excellent work, perfect fit, and fast turnaround!",
    tags: ["Quality", "Communication", "Timing"],
    date: "2024-12-15",
    canEdit: true,
  },
];

// Mock analytics data
export const mockAnalytics = {
  casesPerMonth: [
    { month: "Jul", count: 8 },
    { month: "Aug", count: 12 },
    { month: "Sep", count: 10 },
    { month: "Oct", count: 15 },
    { month: "Nov", count: 14 },
    { month: "Dec", count: 18 },
  ],
  avgTurnaround: 11.5,
  remakePercentage: 2.3,
  spendByLab: [
    { lab: "Precision Dental Lab", spend: 4500 },
    { lab: "Elite Dental Solutions", spend: 3800 },
    { lab: "Pro Lab Technologies", spend: 2200 },
  ],
  topMaterials: [
    { material: "Zirconia", count: 45 },
    { material: "E-max", count: 32 },
    { material: "Metal Ceramic", count: 18 },
  ],
};

// Feature flags
export const featureFlags = {
  enableChat: true,
  enable3DViewer: false,
  enableRTL: true,
  enablePSPIntegration: false,
  enableCourierTracking: true,
  enablePromoCode: true,
};
