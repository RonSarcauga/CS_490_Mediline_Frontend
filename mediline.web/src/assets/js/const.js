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
];

export const patientDataList = [
    {
        userId: 1,
        mrn: "123456",
        sex: "Male",
        doctor: null,
        appointments: []
    }
];

export const doctorDataList = [
    {
        userId: 2, 
        licenseNumber: "214365",
        specialty: "Cardiologist",
        patients: [],
        appointments: [],
        acceptingNewPatients: true
    }
];

export const appointmentDataList = [
    {
        appointmentId: 1,
        doctorLicenseNumber: "214365",
        patientMRN: "123456",
        appointmentDate: "04/10/2025",
        startTime: "09:00",
        endTime: "09:30",
        notes: "Discussed importance of cardiovascular exercise. Recommended at least 30 minutes of brisk walking daily.",
        pharmacyNotes: "Suggested Omega-3 supplements for heart health and muscle recovery.",
        fixedFee: 150,
        paymentStatus: "Paid"
    },
    {
        appointmentId: 2,
        doctorLicenseNumber: "214365",
        patientMRN: "123456",
        appointmentDate: "04/17/2025",
        startTime: "10:00",
        endTime: "10:45",
        notes: "Patient reports improvement in endurance. Advised incorporating strength training twice a week.",
        pharmacyNotes: "Recommended vitamin D and magnesium supplements for bone and muscle support.",
        fixedFee: 150,
        paymentStatus: "Pending"
    },
    {
        appointmentId: 3,
        doctorLicenseNumber: "214365",
        patientMRN: "123456",
        appointmentDate: "04/25/2025",
        startTime: "14:00",
        endTime: "14:30",
        notes: "Follow-up to assess progress in fitness routine. Will evaluate improvements in heart rate and endurance.",
        pharmacyNotes: "Recommended electrolyte supplements for hydration during exercise.",
        fixedFee: 150,
        paymentStatus: "Pending"
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
    }
];
