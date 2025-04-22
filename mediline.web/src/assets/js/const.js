export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const today = new Date();

export const specialties = [
    {label: "Cardiologist", value: "cardiologist"},
    {label: "Exercise Physiologist", value: "exercisePhysiologist"},
    {label: "Gerontologist", value: "gerontologist"},
    {label: "Kinesiologist", value: "kinesiologist"},
    {label: "Physical Therapist", value: "physicalTherapist"},
    {label: "Pulmonologist", value: "pulmonologist"},
]

export const ratings = [
    {label: "Very Dissatisfied", value: "0%-20%"},
    {label: "Dissatisfied", value: "21%-40%"},
    {label: "Neutral", value: "41%-60%"},
    {label: "Satisfied", value: "61%-80%"},
    {label: "Very Satisfied", value: "81%-100%"},
]

export const doctorList = [
    { value: "doc1", label: "John Smith", rating: "95%", acceptingNewPatients: true, specialty: "Cardiologist" },
    { value: "doc2", label: "Emily Johnson", rating: "88%", acceptingNewPatients: false, specialty: "Physical Therapist" },
    { value: "doc3", label: "Michael Brown", rating: "92%", acceptingNewPatients: true, specialty: "Pulmonologist" },
    { value: "doc4", label: "Sarah Davis", rating: "90%", acceptingNewPatients: true, specialty: "Kinesiologist" },
    { value: "doc5", label: "William Garcia", rating: "89%", acceptingNewPatients: false, specialty: "Exercise Physiologist" },
    { value: "doc6", label: "Jessica Martinez", rating: "93%", acceptingNewPatients: true, specialty: "Gerontologist" },
    { value: "doc7", label: "Daniel Lee", rating: "87%", acceptingNewPatients: false, specialty: "Physical Therapist" },
    { value: "doc8", label: "Sophia Taylor", rating: "94%", acceptingNewPatients: true, specialty: "Cardiologist" },
    { value: "doc9", label: "Ethan Moore", rating: "91%", acceptingNewPatients: false, specialty: "Pulmonologist" },
    { value: "doc10", label: "Olivia White", rating: "96%", acceptingNewPatients: true, specialty: "Exercise Physiologist" }
];

export const discussionPosts = [
    {
        author: "John Doe",
        role: "patient",
        timestamp: "1 day ago",
        title: "Best workout ever",
        content: "I love to do this workout on the weekends. It's energizing and keeps me active.",
        tags: "Patient",
        replies: 3,
    },
    {
        author: "Jane Smith",
        role: "patient",
        timestamp: "2 hours ago",
        title: "Healthy meal prep tips",
        content: "Meal prepping is a game changer for my weekly routine. Anyone have more ideas?",
        tags: "Doctor",
        replies: 5,
    },
    {
        author: "Alex Johnson",
        role: "patient",
        timestamp: "30 minutes ago",
        title: "Struggling with motivation",
        content: "I've been finding it hard to stay consistent with my workouts. Any advice?",
        tags: "Patient",
        replies: 8,
    },
    {
        author: "Maria Gonzalez",
        role: "patient",
        timestamp: "3 days ago",
        title: "Yoga for beginners",
        content: "Just started yoga and it's amazing! Can anyone share beginner-friendly poses?",
        tags: "Pharmacist",
        replies: 2,
    },
    {
        author: "Chris Wong",
        role: "patient",
        timestamp: "1 week ago",
        title: "Running tips for endurance",
        content: "Training for a marathon and looking for ways to improve my endurance. Suggestions?",
        tags: "Doctor",
        replies: 6,
    },
];

export const userList = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        role: "patient",
        bio: "I'm passionate about fitness and enjoy sharing tips on staying active.",
        joinDate: "01/15/2022",
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        role: "doctor",
        bio: "A family physician dedicated to promoting healthy lifestyle practices.",
        joinDate: "03/20/2021",
    },
    {
        id: 3,
        firstName: "Alex",
        lastName: "Johnson",
        email: "alex.johnson@example.com",
        role: "patient",
        bio: "Striving to find consistency in my fitness routine. Love learning from others.",
        joinDate: "05/10/2022",
    },
    {
        id: 4,
        firstName: "Maria",
        lastName: "Gonzalez",
        email: "maria.gonzalez@example.com",
        role: "pharmacist",
        bio: "Experienced pharmacist passionate about educating patients on medication safety.",
        joinDate: "07/25/2021",
    },
    {
        id: 5,
        firstName: "Chris",
        lastName: "Wong",
        email: "chris.wong@example.com",
        role: "doctor",
        bio: "Marathon runner and sports medicine specialist. Helping patients achieve their best.",
        joinDate: "09/18/2020",
    },
];

export const patientDashboardData = {
    doctor: {
      name: "Dr. Jacob Clifford",
      rating: 9.5,
      status: "Serving Patients",
      lastAppointment: { date: "January 16, 2024", time: "15:00"},
      borderColor: "#007bff"
    },
    checkout: [
      { appointment: "March 12, 2025", doctor: "Dr. Jacob Clifford", treatment: "Follow Up", totalBill: "$300.00", status: "Unpaid", id: 1 },
      { appointment: "January 21, 2024", doctor: "Dr. Douglas Powers", treatment: "Consultation", totalBill: "$250.00", status: "Paid", id: 2 }
    ],
    appointments: [
      {
        doctor: "Dr. Jacob Clifford",
        specialization: "Exercise Physiologist",
        time: {
          date: "March 12, 2025",
          time: "10:00 - 10:30"
        },
        type: "Online Chat"
      }
    ],
    user: {
      name: "Luke Patterson",
      mrn: "984568",
      gender: "Male",
      birthday: "September 28, 1982",
      age: "42",
      medications: ["Drug 1", "Drug 2"],
      lastAppointment: { date: "January 21, 2024", time: "17:00", doctor: "Dr. Douglas Powers"},
      address: "74 Ames Ave, Greensboro, Norch Carolina",
      phone: "+1 (934) 799 3917"
    }
};

export const doctorAppointmentData = {
    rating: 9.5,
    ratingColor: "#007bff",
    patient: {
      name: "Luke Patterson",
      mrn: "984568",
      gender: "Male",
      birthday: "September 28, 1982",
      age: "42",
      medications: ["Drug 1", "Drug 2"],
      lastAppointment: { date: "January 21, 2024", time: "17:00", doctor: "Dr. Douglas Powers"},
      address: "74 Ames Ave, Greensboro, Norch Carolina",
      phone: "+1 (934) 799 3917"
    },
    booking: {
        status: "In Progress",
        time: { date: "March 12, 2025", time: "10:00"},
        doctor: "Dr. Jacob Clifford",
        treatment: "Consultation"
    }
};

export const baseUserList = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "12/24/1999",
        email: "john.doe@example.com",
        phoneNumber: "555-123-4567",
        address: "123 Main St",
        city: "Springfield",
        postalCode: "12345",
        role: "patient",
        password: "password123",
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "06/14/1996",
        email: "jane.smith@example.com",
        phoneNumber: "555-987-6543",
        address: "456 Elm St",
        city: "Greenwood",
        postalCode: "67890",
        role: "doctor",
        password: "securePass456",
    },
    {
        id: 3,
        firstName: "Alice",
        lastName: "Johnson",
        dateOfBirth: "01/15/1985",
        email: "alice.johnson@example.com",
        phoneNumber: "555-345-1234",
        address: "123 Maple St",
        city: "New York",
        postalCode: "10001",
        role: "Patient",
        password: "password123"
    },
    {
        id: 4,
        firstName: "Bob",
        lastName: "Miller",
        dateOfBirth: "06/22/1990",
        email: "bob.miller@example.com",
        phoneNumber: "555-677-5678",
        address: "456 Oak St",
        city: "Boston",
        postalCode: "02108",
        role: "Patient",
        password: "password123"
    },
    {
        id: 5,
        firstName: "Charlie",
        lastName: "Davis",
        dateOfBirth: "09/30/1978",
        email: "charlie.davis@example.com",
        phoneNumber: "555-555-9012",
        address: "789 Pine St",
        city: "Chicago",
        postalCode: "60601",
        role: "Patient",
        password: "password123"
    },
    {
        id: 6,
        firstName: "Daniel",
        lastName: "Stevens",
        dateOfBirth: "02/20/1987",
        email: "daniel.stevens@example.com",
        phoneNumber: "555-567-3456",
        address: "567 Cedar St",
        city: "Los Angeles",
        postalCode: "90001",
        role: "Patient",
        password: "password123"
    },
    {
        id: 7,
        firstName: "Emily",
        lastName: "Martinez",
        dateOfBirth: "11/05/1993",
        email: "emily.martinez@example.com",
        phoneNumber: "555--654-6789",
        address: "789 Birch St",
        city: "San Francisco",
        postalCode: "94102",
        role: "Patient",
        password: "password123"
    },
    {
        id: 8,
        firstName: "Frank",
        lastName: "Thompson",
        dateOfBirth: "07/12/1980",
        email: "frank.thompson@example.com",
        phoneNumber: "555-479-9011",
        address: "901 Spruce St",
        city: "Seattle",
        postalCode: "98101",
        role: "Patient",
        password: "password123"
    },
    {
        id: 9,
        firstName: "Sophia",
        lastName: "Williams",
        dateOfBirth: "03/14/1995",
        email: "sophia.williams@example.com",
        phoneNumber: "180-555-1111",
        address: "111 Cherry St",
        city: "Houston",
        postalCode: "77002",
        role: "Patient",
        password: "password123"
    },
    {
        id: 10,
        firstName: "Ethan",
        lastName: "Brown",
        dateOfBirth: "08/22/1986",
        email: "ethan.brown@example.com",
        phoneNumber: "180-555-2222",
        address: "222 Walnut St",
        city: "Dallas",
        postalCode: "75201",
        role: "Patient",
        password: "password123"
    },
    {
        id: 11,
        firstName: "Olivia",
        lastName: "Taylor",
        dateOfBirth: "07/30/1978",
        email: "olivia.taylor@example.com",
        phoneNumber: "180-555-3333",
        address: "333 Spruce St",
        city: "Miami",
        postalCode: "33101",
        role: "Patient",
        password: "password123"
    },
    {
        id: 12,
        firstName: "Michael",
        lastName: "Garcia",
        dateOfBirth: "12/09/1991",
        email: "michael.garcia@example.com",
        phoneNumber: "180-555-4444",
        address: "444 Maple St",
        city: "Phoenix",
        postalCode: "85001",
        role: "Patient",
        password: "password123"
    }
];

export const patientDataList = [
    {
        userId: 1,
        mrn: "123456",
        sex: "Male",
        doctor: "214365",
        appointments: [1,2,3]
    },
    {
        userId: 3,
        mrn: "234567",
        sex: "Female",
        doctor: "214365",
        appointments: [4]
    },
    {
        userId: 4,
        mrn: "345678",
        sex: "Male",
        doctor: "214365",
        appointments: [5]
    },
    {
        userId: 5,
        mrn: "456789",
        sex: "Male",
        doctor: "214365",
        appointments: [6]
    },
    {
        userId: 6,
        mrn: "567890",
        doctor: "214365",
        sex: "Male",
        appointments: [7]
    },
    {
        userId: 7,
        mrn: "678901",
        doctor: "214365",
        sex: "Female",
        appointments: [8]
    },
    {
        userId: 8,
        mrn: "789012",
        doctor: "214365",
        sex: "Male",
        appointments: [9]
    },
    {
        userId: 9,
        mrn: "890123",
        doctor: "214365",
        sex: "Female",
        appointments: [10]
    },
    {
        userId: 10,
        mrn: "901234",
        doctor: "214365",
        sex: "Male",
        appointments: [11]
    },
    {
        userId: 11,
        mrn: "112345",
        doctor: "214365",
        sex: "Female",
        appointments: [12]
    },
    {
        userId: 12,
        mrn: "113456",
        doctor: "214365",
        sex: "Male",
        appointments: [13]
    }
];

export const doctorDataList = [
    {
        userId: 2, 
        licenseNumber: "214365",
        specialty: "Cardiologist",
        patients: ["123456", "234567", "345678", "456789", "567890", "678901", "789012", "890123", "901234", "112345", "113456"],
        appointments: [1,2,3,4,5,6,7,8,9,10,11,12,13],
        acceptingNewPatients: true
    }
];

export const appointmentDataList = [
    {
        appointmentId: 1,
        appointmentType: "Online Chat",
        doctorLicenseNumber: "214365",
        patientMRN: "123456",
        appointmentDate: "04/10/2025",
        startTime: "09:00",
        endTime: "09:15",
        treatment: "Consultation",
        notes: "Discussed importance of cardiovascular exercise. Recommended at least 30 minutes of brisk walking daily.",
        pharmacyNotes: "Suggested Omega-3 supplements for heart health and muscle recovery.",
        fixedFee: 150,
        paymentStatus: "Paid"
    },
    {
        appointmentId: 2,
        appointmentType: "Online Chat",
        doctorLicenseNumber: "214365",
        patientMRN: "123456",
        appointmentDate: "04/17/2025",
        startTime: "10:00",
        endTime: "10:15",
        treatment: "Consultation",
        notes: "Patient reports improvement in endurance. Advised incorporating strength training twice a week.",
        pharmacyNotes: "Recommended vitamin D and magnesium supplements for bone and muscle support.",
        fixedFee: 150,
        paymentStatus: "Pending"
    },
    {
        appointmentId: 3,
        appointmentType: "Online Chat",
        doctorLicenseNumber: "214365",
        patientMRN: "123456",
        appointmentDate: "04/25/2025",
        startTime: "14:00",
        endTime: "14:15",
        treatment: "Consultation",
        notes: "Follow-up to assess progress in fitness routine. Will evaluate improvements in heart rate and endurance.",
        pharmacyNotes: "Recommended electrolyte supplements for hydration during exercise.",
        fixedFee: 150,
        paymentStatus: "Pending"
    },
    {
        appointmentId: 4,
        appointmentType: "Online Chat",
        doctorLicenseNumber: "214365",
        patientMRN: "234567",
        appointmentDate: "04/18/2025",
        startTime: "14:00",
        endTime: "14:15",
        treatment: "Consultation",
        fixedFee: 150,
        paymentStatus: "Pending"
    },
    {
        appointmentId: 5,
        appointmentType: "Online Chat",
        doctorLicenseNumber: "214365",
        patientMRN: "345678",
        appointmentDate: "04/20/2025",
        startTime: "08:30",
        endTime: "08:45",
        treatment: "Consultation",
        fixedFee: 150,
        paymentStatus: "Paid"
    },
    {
        appointmentId: 6,
        doctorLicenseNumber: "214365",
        patientMRN: "456789",
        appointmentDate: new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
        startTime: "08:00",
        endTime: "08:15",
        appointmentType: "Online Chat",
        treatment: "Consultation",
        fixedFee: 150,
        paymentStatus: "Paid"
    },
    {
        appointmentId: 7,
        doctorLicenseNumber: "214365",
        patientMRN: "567890",
        appointmentDate: new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
        startTime: "08:20",
        endTime: "08:35",
        appointmentType: "Online Chat",
        treatment: "Consultation",
        fixedFee: 150,
        paymentStatus: "Pending"
    },
    {
        appointmentId: 8,
        doctorLicenseNumber: "214365",
        patientMRN: "678901",
        appointmentDate: new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
        startTime: "08:40",
        endTime: "08:55",
        appointmentType: "Online Chat",
        treatment: "Consultation",
        fixedFee: 150,
        paymentStatus: "Paid"
    },
    {
        appointmentId: 9,
        doctorLicenseNumber: "214365",
        patientMRN: "789012",
        appointmentDate: new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
        startTime: "09:00",
        endTime: "09:15",
        appointmentType: "Online Chat",
        treatment: "Consultation",
        fixedFee: 150,
        paymentStatus: "Paid"
    },
    {
        appointmentId: 10,
        doctorLicenseNumber: "214365",
        patientMRN: "890123",
        appointmentDate: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
        startTime: "08:30",
        endTime: "08:45",
        appointmentType: "Online Chat",
        treatment: "Consultation",
        fixedFee: 150,
        paymentStatus: "Paid"
    },
    {
        appointmentId: 11,
        doctorLicenseNumber: "214365",
        patientMRN: "901234",
        appointmentDate: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
        startTime: "10:00",
        endTime: "10:15",
        appointmentType: "Online Chat",
        treatment: "Consultation",
        fixedFee: 150,
        paymentStatus: "Pending"
    },
    {
        appointmentId: 12,
        doctorLicenseNumber: "214365",
        patientMRN: "112345",
        appointmentDate: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
        startTime: "11:15",
        endTime: "11:30",
        appointmentType: "Online Chat",
        treatment: "Consultation",
        fixedFee: 150,
        paymentStatus: "Paid"
    },
    {
        appointmentId: 13,
        doctorLicenseNumber: "214365",
        patientMRN: "113456",
        appointmentDate: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" }),
        startTime: "13:30",
        endTime: "13:45",
        appointmentType: "Online Chat",
        treatment: "Consultation",
        fixedFee: 150,
        paymentStatus: "Paid"
    }
];

export const vitalHistoryList = [
    {
        id: 1,
        date: "04/10/2025",
        time: "08:00",
        patientMRN: "123456",
        measurements: {
            height: 175,
            weight: 75,
            caloriesBurned: 2300,
            waterIntake: 2.5,
            bloodPressure: "120/80",
            heartRate: 72
        }
    },
    {
        id: 2,
        date: "04/11/2025",
        time: "08:00",
        patientMRN: "123456",
        measurements: {
            height: 175,
            weight: 74.5,
            caloriesBurned: 2500,
            waterIntake: 3,
            bloodPressure: "118/76",
            heartRate: 70
        }
    },
    {
        id: 3,
        date: "04/10/2025",
        time: "08:30",
        patientMRN: "2345678",
        height: 170,
        weight: 68,
        heartRate: 72,
        bloodPressure: "120/80",
        caloriesBurned: 250,
        waterIntake: "2L"
    },
    {
        id: 4, 
        date: "04/11/2025",
        time: "09:15",
        patientMRN: "345678",
        height: 175,
        weight: 80,
        heartRate: 76,
        bloodPressure: "125/85",
        caloriesBurned: 300,
        waterIntake: "2.5L"
    },
    {
        id: 5,
        date: "04/12/2025",
        time: "10:00",
        patientMRN: "456789",
        height: 165,
        weight: 55,
        heartRate: 70,
        bloodPressure: "118/78",
        caloriesBurned: 200,
        waterIntake: "1.8L"
    },
    {
        id: 6,
        date: new Date().toLocaleDateString("en-US"),
        time: "09:00",
        patientMRN: "456789",
        height: 172,
        weight: 75,
        heartRate: 74,
        bloodPressure: "122/80",
        caloriesBurned: 260,
        waterIntake: "2.2L"
    },
    {
        id: 7,
        date: new Date().toLocaleDateString("en-US"),
        time: "10:30",
        patientMRN: "567890",
        height: 168,
        weight: 70,
        heartRate: 78,
        bloodPressure: "118/76",
        caloriesBurned: 290,
        waterIntake: "2.0L"
    },
    {
        id: 8,
        date: new Date().toLocaleDateString("en-US"),
        time: "11:45",
        patientMRN: "678901",
        height: 180,
        weight: 85,
        heartRate: 80,
        bloodPressure: "130/85",
        caloriesBurned: 310,
        waterIntake: "2.5L"
    }
];

export const chatlog = {
    patient: "Luke Patterson",
    doctor: "Jacob Clifford",
    log: [
        [0, "Hi Dr. Clifford, I've been having some sharp pain in my lower back since yesterday afternoon."],
        [1, "Hi Luke, sorry to hear that. Can you describe the pain? Is it constant or does it come and go?"],
        [0, "It comes and goes, mostly when I move or twist my torso. Sitting still isn’t too bad."],
        [1, "Got it. Any numbness, tingling in your legs, or difficulty walking?"],
        [0, "No, nothing like that. Just the localized pain on the right side."],
        [1, "Okay, that’s helpful. Did you lift anything heavy recently or have a fall?"],
        [0, "Yeah, I helped my friend move a couch two days ago. It was kind of awkward to carry."],
        [1, "That could definitely be the cause. Sounds like a muscle strain. I recommend rest, ice packs, and over-the-counter ibuprofen for now."],
        [0, "Alright, thanks. Should I avoid exercise for the next few days?"],
        [1, "Yes, avoid strenuous activity. If the pain persists for more than 5 days or gets worse, we’ll schedule a follow-up."]
      ]
};
//  const { patientCount, servingP, appointmentCount, pendingCount, invoices, patientsToday, appointmentsToday} = doctorDashboardData;
export const doctorDashboardData = {
    patientCount: 258,
    servingP: true,
    appointmentCount: 657,
    pendingCount: 27,
    //columnKeys={["status", "date", "number", "name", "total"]}
    invoices: [
      { status: "Unsent", date: "03/11/2025", number: "#055", name: "Gina Degeneres", total: "$500", id: 1 },
      { status: "Paid", date: "03/11/2025", number: "#054", name: "Mary Keitel", total: "$500", id: 2 },
      { status: "Overdue", date: "03/02/2025", number: "#053", name: "Johnny Cage", total: "$500", id: 3 },
    ],
    patientsToday : [
        { time: "8:00", name: "Mary Keitel" },
        { time: "9:00", name: "Gina Degeneres" },
        { time: "10:00", name: "Luke Patterson" },
        { time: "11:00", name: "Dennis Goreman" },
        { time: "12:00", name: "Vicky Jang" },
        { time: "13:00", name: "James Callus" },
        { time: "14:00", name: "Sandra Park" },
        { time: "15:00", name: "John Doe" },
        { time: "16:00", name: "Michael Corleone" },
        { time: "17:00", name: "Elizabeth McGlynn" }
      ],      
    appointmentsToday: {
        
    }
};

export const bookingInfo = {
    meetingTime: { 
        date: "March 12, 2025",
        time: "14:00",
        doctor: "Dr. Jacob Clifford",
    },
    preAppointmentChecklist: [
        "Check-In Form",
        "Self Evaluation Form",
    ],
    treatment: ["Consultation"]
};