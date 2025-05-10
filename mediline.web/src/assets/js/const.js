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

const getTimeElapsed = (createDate) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - createDate) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
};

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
        sex: "Male",
        dateOfBirth: "12/24/1999",
        email: "john.doe@example.com",
        phoneNumber: "555-123-4567",
        address: "123 Main St",
        city: "Springfield",
        state: "Ohio",
        postalCode: "12345",
        role: "patient",
        password: "password123",
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        sex: "Female",
        dateOfBirth: "06/14/1996",
        email: "jane.smith@example.com",
        phoneNumber: "555-987-6543",
        address: "456 Elm St",
        city: "Greenwood",
        state: "Pennsylvania",
        postalCode: "67890",
        role: "doctor",
        password: "securePass456",
    },
    {
        id: 3,
        firstName: "Alice",
        lastName: "Johnson",
        sex: "Female",
        dateOfBirth: "01/15/1985",
        email: "alice.johnson@example.com",
        phoneNumber: "555-345-1234",
        address: "123 Maple St",
        city: "New York",
        state: "New York",
        postalCode: "10001",
        role: "Patient",
        password: "password123"
    },
    {
        id: 4,
        firstName: "Bob",
        lastName: "Miller",
        sex: "Male",
        dateOfBirth: "06/22/1990",
        email: "bob.miller@example.com",
        phoneNumber: "555-677-5678",
        address: "456 Oak St",
        city: "Boston",
        state: "Massachusetts",
        postalCode: "02108",
        role: "Patient",
        password: "password123"
    },
    {
        id: 5,
        firstName: "Charlie",
        lastName: "Davis",
        sex: "Male",
        dateOfBirth: "09/30/1978",
        email: "charlie.davis@example.com",
        phoneNumber: "555-555-9012",
        address: "789 Pine St",
        city: "Chicago",
        state: "Illinois",
        postalCode: "60601",
        role: "Patient",
        password: "password123"
    },
    {
        id: 6,
        firstName: "Daniel",
        lastName: "Stevens",
        sex: "Male",
        dateOfBirth: "02/20/1987",
        email: "daniel.stevens@example.com",
        phoneNumber: "555-567-3456",
        address: "567 Cedar St",
        city: "Los Angeles",
        state: "California",
        postalCode: "90001",
        role: "Patient",
        password: "password123"
    },
    {
        id: 7,
        firstName: "Emily",
        lastName: "Martinez",
        sex: "Female",
        dateOfBirth: "11/05/1993",
        email: "emily.martinez@example.com",
        phoneNumber: "555--654-6789",
        address: "789 Birch St",
        city: "San Francisco",
        state: "California",
        postalCode: "94102",
        role: "Patient",
        password: "password123"
    },
    {
        id: 8,
        firstName: "Frank",
        lastName: "Thompson",
        sex: "Male",
        dateOfBirth: "07/12/1980",
        email: "frank.thompson@example.com",
        phoneNumber: "555-479-9011",
        address: "901 Spruce St",
        city: "Seattle",
        state: "Washington",
        postalCode: "98101",
        role: "Patient",
        password: "password123"
    },
    {
        id: 9,
        firstName: "Sophia",
        lastName: "Williams",
        sex: "Female",
        dateOfBirth: "03/14/1995",
        email: "sophia.williams@example.com",
        phoneNumber: "180-555-1111",
        address: "111 Cherry St",
        city: "Houston",
        state: "Texas",
        postalCode: "77002",
        role: "Patient",
        password: "password123"
    },
    {
        id: 10,
        firstName: "Ethan",
        lastName: "Brown",
        sex: "Male",
        dateOfBirth: "08/22/1986",
        email: "ethan.brown@example.com",
        phoneNumber: "180-555-2222",
        address: "222 Walnut St",
        city: "Dallas",
        state: "Texas",
        postalCode: "75201",
        role: "Patient",
        password: "password123"
    },
    {
        id: 11,
        firstName: "Olivia",
        lastName: "Taylor",
        sex: "Female",
        dateOfBirth: "07/30/1978",
        email: "olivia.taylor@example.com",
        phoneNumber: "180-555-3333",
        address: "333 Spruce St",
        city: "Miami",
        state: "Florida",
        postalCode: "33101",
        role: "Patient",
        password: "password123"
    },
    {
        id: 12,
        firstName: "Michael",
        lastName: "Garcia",
        sex: "Male",
        dateOfBirth: "12/09/1991",
        email: "michael.garcia@example.com",
        phoneNumber: "180-555-4444",
        address: "444 Maple St",
        city: "Phoenix",
        state: "Arizona",
        postalCode: "85001",
        role: "Patient",
        password: "password123"
    },
    {
        "id": 13,
        "firstName": "Sarah",
        "lastName": "Johnson",
        "sex": "Female",
        "dateOfBirth": "05/14/1985",
        "email": "sarah.johnson@example.com",
        "phoneNumber": "180-555-5555",
        "address": "789 Elm St",
        "city": "Phoenix",
        "state": "Arizona",
        "postalCode": "85002",
        "role": "Pharmacist",
        "password": "securepassword456"
    },
];

export const patientDataList = [
    {
        userId: 1,
        mrn: "123456",
        sex: "Male",
        doctor: "214365",
        appointments: [1, 2, 3],
        pharmacyAddress: "56 Aptos Dr, New York, NY"
    },
    {
        userId: 3,
        mrn: "234567",
        sex: "Female",
        doctor: "214365",
        appointments: [4],
        pharmacyAddress: "56 Aptos Dr, New York, NY"
    },
    {
        userId: 4,
        mrn: "345678",
        sex: "Male",
        doctor: "214365",
        appointments: [5],
        pharmacyAddress: "56 Aptos Dr, New York, NY"
    },
    {
        userId: 5,
        mrn: "456789",
        sex: "Male",
        doctor: "214365",
        appointments: [6],
        pharmacyAddress: "56 Aptos Dr, New York, NY"
    },
    {
        userId: 6,
        mrn: "567890",
        sex: "Male",
        doctor: "214365",
        appointments: [7],
        pharmacyAddress: "56 Aptos Dr, New York, NY"
    },
    {
        userId: 7,
        mrn: "678901",
        doctor: "214365",
        sex: "Female",
        appointments: [8],
        pharmacyAddress: "56 Aptos Dr, New York, NY"
    },
    {
        userId: 8,
        mrn: "789012",
        doctor: "214365",
        sex: "Male",
        appointments: [9],
        pharmacyAddress: "56 Aptos Dr, New York, NY"
    },
    {
        userId: 9,
        mrn: "890123",
        doctor: "214365",
        sex: "Female",
        appointments: [10],
        pharmacyAddress: "56 Aptos Dr, New York, NY"
    },
    {
        userId: 10,
        mrn: "901234",
        doctor: "214365",
        sex: "Male",
        appointments: [11],
        pharmacyAddress: "56 Aptos Dr, New York, NY"
    },
    {
        userId: 11,
        mrn: "112345",
        doctor: "214365",
        sex: "Female",
        appointments: [12],
        pharmacyAddress: "56 Aptos Dr, New York, NY"
    },
    {
        userId: 12,
        mrn: "113456",
        doctor: "214365",
        sex: "Male",
        appointments: [13],
        pharmacyAddress: "56 Aptos Dr, New York, NY"
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

export const pharmacistDataList = [
    {
        userId: 13,
        patients: ["123456", "234567", "345678", "456789", "567890", "678901", "789012", "890123", "901234", "112345", "113456"],
        pharmacyName: "Aptos",
        pharmacyAddress: "56 Aptos Dr, New York, NY",
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
        paymentStatus: "Paid",
        messages: [
            { userId: 1, content: "Hi doctor, I wanted to confirm our appointment today." },
            { userId: 2, content: "Hello! Yes, we are scheduled for 9:00 AM. Is there anything you'd like to prepare?" },
            { userId: 1, content: "No, I think I'm all set. Thank you!" }
        ]
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
        paymentStatus: "Pending",
        messages: [
            { userId: 1, content: "Good morning, doctor! I’ve been feeling more energetic lately." },
            { userId: 2, content: "That's great to hear! Have you been following the exercise routine?" },
            { userId: 1, content: "Yes, I’ve been doing the brisk walks daily!" }
        ]
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
        paymentStatus: "Pending",
        messages: [
            { userId: 2, content: "Hello, how’s everything progressing with your fitness routine?" },
            { userId: 1, content: "Hi doctor, it's been going well! My heart rate during exercises seems lower now." },
            { userId: 2, content: "Excellent! That’s a great sign of improved endurance." }
        ]
    },
    {
        appointmentId: 4,
        appointmentType: "Online Chat",
        doctorLicenseNumber: "214365",
        patientMRN: "234567",
        appointmentDate: "04/18/2025",
        startTime: "13:00",
        endTime: "13:15",
        treatment: "Consultation",
        notes: "Discussed importance of cardiovascular exercise.",
        pharmacyNotes: "Suggested Omega-3 supplements for heart health and muscle recovery.",
        fixedFee: 150,
        paymentStatus: "Pending",
        messages: []
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
        paymentStatus: "Paid",
        messages: []
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
        paymentStatus: "Paid",
        messages: []
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
        paymentStatus: "Pending",
        messages: []
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
        paymentStatus: "Paid",
        messages: []
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
        paymentStatus: "Paid",
        messages: []
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
        paymentStatus: "Paid",
        messages: []
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
        paymentStatus: "Pending",
        messages: []
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
        paymentStatus: "Paid",
        messages: []
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
        paymentStatus: "Paid",
        messages: []
    }
];

export const discussionProfiles = [
    { userId: 1, bio: "Fitness enthusiast exploring recovery techniques." },
    { userId: 2, bio: "Cardiologist passionate about heart health and mindfulness." },
    { userId: 3, bio: "Patient sharing experiences with sustainable energy diets." },
    { userId: 4, bio: "Looking for advice on managing chronic pain effectively." },
    { userId: 5, bio: "Always searching for ways to improve sleep quality and mental clarity." },
    { userId: 6, bio: "Dedicated to refining workout routines and optimizing recovery." },
    { userId: 7, bio: "Mental health advocate exploring the benefits of journaling." },
    { userId: 8, bio: "Holistic health seeker prioritizing natural remedies for joint pain." },
    { userId: 9, bio: "Working on reducing stress and improving overall well-being." },
    { userId: 10, bio: "Exploring methods to regulate sleep and maintain a consistent schedule." },
    { userId: 11, bio: "Passionate about fitness but struggling with workout motivation." },
    { userId: 12, bio: "Looking for practical ways to boost cardiovascular health." }
];

export const discussionPostsList = [
    {
        postId: 1,
        authorId: 1,
        title: "Best recovery methods after a workout",
        content: "I've been trying different ways to recover post-workout. Any suggestions?",
        tags: ["John Doe", "Patient"],
        createDate: new Date("2025-04-19T14:30:00Z"),
        timestamp: getTimeElapsed(new Date("2025-04-19T14:30:00Z"))
    },
    {
        postId: 2,
        authorId: 2,
        title: "Health benefits of meditation",
        content: "Meditation has profound effects on heart health and mental well-being. Anyone else practicing it?",
        tags: ["Jane Smith", "Doctor"],
        createDate: new Date("2025-04-20T09:45:00Z"),
        timestamp: getTimeElapsed(new Date("2025-04-20T09:45:00Z"))
    },
    {
        postId: 3,
        authorId: 3,
        title: "Best diets for maintaining energy levels",
        content: "I feel fatigued lately—any advice on diets that sustain energy?",
        tags: ["Alice Johnson", "Patient"],
        createDate: new Date("2025-04-21T12:00:00Z"),
        timestamp: getTimeElapsed(new Date("2025-04-21T12:00:00Z"))
    },
    {
        postId: 4,
        authorId: 4,
        title: "Managing back pain effectively",
        content: "I've been dealing with chronic back pain. What are some effective treatments?",
        tags: ["Bob Miller", "Patient"],
        createDate: new Date("2025-04-18T10:00:00Z"),
        timestamp: getTimeElapsed(new Date("2025-04-18T10:00:00Z"))
    },
    {
        postId: 5,
        authorId: 5,
        title: "Sleep quality improvement tips",
        content: "I often wake up feeling tired even after 8 hours of sleep. Any tips?",
        tags: ["Charlie Davis", "Patient"],
        createDate: new Date("2025-04-19T08:30:00Z"),
        timestamp: getTimeElapsed(new Date("2025-04-19T08:30:00Z"))
    },
    {
        postId: 6,
        authorId: 6,
        title: "Best ways to recover from intense workouts",
        content: "I sometimes feel sore for days after heavy training. How do I speed up recovery?",
        tags: ["Daniel Stevens", "Patient"],
        createDate: new Date("2025-04-20T14:00:00Z"),
        timestamp: getTimeElapsed(new Date("2025-04-20T14:00:00Z"))
    },
    {
        postId: 7,
        authorId: 7,
        title: "Mental health benefits of journaling",
        content: "Journaling has been helping me process emotions better. Anyone else do this?",
        tags: ["Emily Martinez", "Patient"],
        createDate: new Date("2025-04-17T09:00:00Z"),
        timestamp: getTimeElapsed(new Date("2025-04-17T09:00:00Z"))
    },
    {
        postId: 8,
        authorId: 8,
        title: "Best home remedies for joint pain",
        content: "I prefer home treatments over medication. Any suggestions for joint pain relief?",
        tags: ["Frank Thompson", "Patient"],
        createDate: new Date("2025-04-18T11:00:00Z"),
        timestamp: getTimeElapsed(new Date("2025-04-18T11:00:00Z"))
    },
    {
        postId: 9,
        authorId: 9,
        title: "Effective stress management techniques",
        content: "Lately, stress has been tough to manage. What techniques work best?",
        tags: ["Sophia Williams", "Patient"],
        createDate: new Date("2025-04-19T13:00:00Z"),
        timestamp: getTimeElapsed(new Date("2025-04-19T13:00:00Z"))
    },
    {
        postId: 10,
        authorId: 10,
        title: "Advice on maintaining a healthy sleep cycle",
        content: "I struggle with inconsistent sleep patterns. Any tips for consistency?",
        tags: ["Ethan Brown", "Patient"],
        createDate: new Date("2025-04-16T08:00:00Z"),
        timestamp: getTimeElapsed(new Date("2025-04-16T08:00:00Z"))
    },
    {
        postId: 11,
        authorId: 11,
        title: "Finding motivation to exercise regularly",
        content: "Some weeks, I struggle to stay consistent with workouts. How do you stay motivated?",
        tags: ["Olivia Taylor", "Patient"],
        createDate: new Date("2025-04-17T10:00:00Z"),
        timestamp: getTimeElapsed(new Date("2025-04-17T10:00:00Z"))
    },
    {
        postId: 12,
        authorId: 12,
        title: "Tips for maintaining heart health",
        content: "I’m trying to improve my cardiovascular health. What lifestyle habits help?",
        tags: ["Michael Garcia", "Patient"],
        createDate: new Date("2025-04-18T09:00:00Z"),
        timestamp: getTimeElapsed(new Date("2025-04-18T09:00:00Z"))
    }
];

export const repliesTable = [
    // Replies to Post 1 (John Doe - Recovery Methods)
    { replyId: 1, postId: 1, userId: 2, content: "Hydration and proper sleep are key!", parentReplyId: null, createDate: new Date("2025-04-19T15:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-19T15:00:00Z")) },
    { replyId: 2, postId: 1, userId: 3, content: "I use cold showers and stretching after workouts.", parentReplyId: null, createDate: new Date("2025-04-19T15:30:00Z"), timestamp: getTimeElapsed(new Date("2025-04-19T15:30:00Z")) },
    { replyId: 3, postId: 1, userId: 4, content: "Interesting! What kind of stretches do you do?", parentReplyId: 2, createDate: new Date("2025-04-19T16:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-19T16:00:00Z")) },

    // Replies to Post 2 (Jane Smith - Meditation)
    { replyId: 4, postId: 2, userId: 1, content: "I’ve been trying guided meditation—it’s amazing!", parentReplyId: null, createDate: new Date("2025-04-20T10:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-20T10:00:00Z")) },
    { replyId: 5, postId: 2, userId: 3, content: "I’ve read about meditation improving focus. Any tips?", parentReplyId: 4, createDate: new Date("2025-04-20T10:30:00Z"), timestamp: getTimeElapsed(new Date("2025-04-20T10:30:00Z")) },

    // Replies to Post 3 (Alice Johnson - Energy Levels)
    { replyId: 6, postId: 3, userId: 2, content: "A balanced mix of protein and fiber helps sustain energy levels!", parentReplyId: null, createDate: new Date("2025-04-21T12:30:00Z"), timestamp: getTimeElapsed(new Date("2025-04-21T12:30:00Z")) },
    { replyId: 7, postId: 3, userId: 1, content: "I switched to whole grains and it made a difference.", parentReplyId: 6, createDate: new Date("2025-04-21T13:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-21T13:00:00Z")) },

    // Replies to Post 4 (Bob Miller - Back Pain)
    { replyId: 8, postId: 4, userId: 2, content: "Have you tried stretching and posture corrections?", parentReplyId: null, createDate: new Date("2025-04-18T11:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-18T11:00:00Z")) },
    { replyId: 9, postId: 4, userId: 5, content: "I swear by yoga for back pain relief!", parentReplyId: null, createDate: new Date("2025-04-18T11:30:00Z"), timestamp: getTimeElapsed(new Date("2025-04-18T11:30:00Z")) },
    { replyId: 10, postId: 4, userId: 6, content: "Are there specific stretches you recommend?", parentReplyId: 8, createDate: new Date("2025-04-18T12:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-18T12:00:00Z")) },

    // Replies to Post 5 (Charlie Davis - Sleep Quality)
    { replyId: 11, postId: 5, userId: 3, content: "Reducing screen time before bed helped me a lot!", parentReplyId: null, createDate: new Date("2025-04-19T09:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-19T09:00:00Z")) },
    { replyId: 12, postId: 5, userId: 7, content: "Have you tried meditation before sleep?", parentReplyId: 11, createDate: new Date("2025-04-19T09:30:00Z"), timestamp: getTimeElapsed(new Date("2025-04-19T09:30:00Z")) },

    // Replies to Post 6 (Daniel Stevens - Workout Recovery)
    { replyId: 13, postId: 6, userId: 1, content: "Hydration and protein intake help recovery!", parentReplyId: null, createDate: new Date("2025-04-20T15:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-20T15:00:00Z")) },
    { replyId: 14, postId: 6, userId: 4, content: "Ice baths have worked wonders for me.", parentReplyId: null, createDate: new Date("2025-04-20T15:30:00Z"), timestamp: getTimeElapsed(new Date("2025-04-20T15:30:00Z")) },
    { replyId: 15, postId: 6, userId: 5, content: "I use foam rolling to reduce soreness.", parentReplyId: 13, createDate: new Date("2025-04-20T16:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-20T16:00:00Z")) },

    // Replies to Post 7 (Emily Martinez - Journaling)
    { replyId: 16, postId: 7, userId: 8, content: "Journaling helps me track emotions and patterns.", parentReplyId: null, createDate: new Date("2025-04-17T10:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-17T10:00:00Z")) },
    { replyId: 17, postId: 7, userId: 9, content: "Do you follow a structure for journaling?", parentReplyId: 16, createDate: new Date("2025-04-17T10:30:00Z"), timestamp: getTimeElapsed(new Date("2025-04-17T10:30:00Z")) },

    // Replies to Post 8 (Frank Thompson - Joint Pain)
    { replyId: 18, postId: 8, userId: 7, content: "Turmeric and ginger tea are excellent anti-inflammatories.", parentReplyId: null, createDate: new Date("2025-04-18T12:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-18T12:00:00Z")) },
    { replyId: 19, postId: 8, userId: 9, content: "Have you tried acupuncture? It worked for me.", parentReplyId: null, createDate: new Date("2025-04-18T12:30:00Z"), timestamp: getTimeElapsed(new Date("2025-04-18T12:30:00Z")) },
    { replyId: 20, postId: 8, userId: 7, content: "Turmeric really works! Do you mix it with anything?", parentReplyId: 18, createDate: new Date("2025-04-18T13:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-18T13:00:00Z")) },

    // Replies to Post 9 (Sophia Williams - Stress Management)
    { replyId: 21, postId: 9, userId: 8, content: "Breathing exercises and walking outdoors help me relax.", parentReplyId: null, createDate: new Date("2025-04-19T14:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-19T14:00:00Z")) },
    { replyId: 22, postId: 9, userId: 7, content: "Music therapy is underrated. It really helps!", parentReplyId: null, createDate: new Date("2025-04-19T14:30:00Z"), timestamp: getTimeElapsed(new Date("2025-04-19T14:30:00Z")) },
    { replyId: 23, postId: 9, userId: 9, content: "Have you tried mindfulness meditation?", parentReplyId: 21, createDate: new Date("2025-04-19T15:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-19T15:00:00Z")) },
    
    // Replies to Post 10 (Ethan Brown - Healthy Sleep Cycle)
    { replyId: 24, postId: 10, userId: 11, content: "Keeping a strict bedtime routine helped me.", parentReplyId: null, createDate: new Date("2025-04-16T09:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-16T09:00:00Z")) },
    { replyId: 25, postId: 10, userId: 12, content: "Cutting caffeine after noon made a huge difference.", parentReplyId: 24, createDate: new Date("2025-04-16T09:30:00Z"), timestamp: getTimeElapsed(new Date("2025-04-16T09:30:00Z")) },

    // Replies to Post 11 (Olivia Taylor - Exercise Motivation)
    { replyId: 26, postId: 11, userId: 10, content: "Creating small, achievable goals helps maintain consistency.", parentReplyId: null, createDate: new Date("2025-04-17T11:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-17T11:00:00Z")) },
    { replyId: 27, postId: 11, userId: 12, content: "I switch up workouts to keep them interesting!", parentReplyId: null, createDate: new Date("2025-04-17T11:30:00Z"), timestamp: getTimeElapsed(new Date("2025-04-17T11:30:00Z")) },
    { replyId: 28, postId: 11, userId: 10, content: "Olivia, do you prefer outdoor or gym workouts?", parentReplyId: 26, createDate: new Date("2025-04-17T12:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-17T12:00:00Z")) },

    // Replies to Post 12 (Michael Garcia - Heart Health)
    { replyId: 29, postId: 12, userId: 11, content: "Daily walking and reducing processed food worked for me.", parentReplyId: null, createDate: new Date("2025-04-18T10:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-18T10:00:00Z")) },
    { replyId: 30, postId: 12, userId: 10, content: "Meditation and deep breathing improve heart function!", parentReplyId: null, createDate: new Date("2025-04-18T10:30:00Z"), timestamp: getTimeElapsed(new Date("2025-04-18T10:30:00Z")) },
    { replyId: 31, postId: 12, userId: 12, content: "Sophia, how do you track your progress?", parentReplyId: 29, createDate: new Date("2025-04-18T11:00:00Z"), timestamp: getTimeElapsed(new Date("2025-04-18T11:00:00Z")) }
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

export const pharmaPatData = {
    patient: {
        name: "Mary Keitel",
        dob: "05/26/1989",
        height: "152",
        weight: "110",
        email: "marykeitel@medhealth.org",
        phone: "3159849937",
        address: "49 Greenbriar Road, Greensboro, NC, 10001",
        medHistory: [
            {medication: "Ozempic", duration: "14", dosage: "0.25", since: "02/28/2025", expires: "09/07/2025"},
            {medication: "Arsenic", duration: "7", dosage: "28", since: "03/11/2025", expires: "10/13/2025"},
            {medication: "Diazepam", duration: "21", dosage: "7", since: "04/08/2025", expires: "11/25/2025"}
        ]
    },
    latestRequests: [
        {name: "Mary Keitel"}, {name:  "Gina Degeneres"}
    ],
    allPatients: [
        {name: "Luke Patterson"}, {name: "Dennis Goreman"}, {name: "Vicky Jang"}, {name: "James Callus"}, {name: "Sandra Park"}, {name: "John Doe"}, {name: "Michael Corleone"}, {name: "Elizabeth McGlynn"}
    ]
}

  export const PharmaHomeData = {
    requests : {
        collected: 97,
        processing: 4,
    },
    inventory : [
        { medication: "Ozempic", expires: "04/08/2025", stock: "100 units"},
        { medication: "Diazepam", expires: "08/24/2025", stock: "125 units"},
        { medication: "Arsenic", expires: "07/21/2025", stock: "75 units"},
    ],
    prescriptions : [
        { patient: "Mary Keitel", doctor: "Jacob Clifford", medication: "Ozempic", duration: "14 Days", dosage: "0.25 mg", bill: "$300.00", status: "Pending" },
        { patient: "Gina Degeneres", doctor: "Douglas Powers", medication: "Arsenic", duration: "7 Days", dosage: "7 tablets", bill: "$300.00", status: "Collected" },
        { patient: "Luke Patterson", doctor: "Jacob Clifford", medication: "Cyanide", duration: "8 Days", dosage: "16 tablets", bill: "$300.00", status: "Collected" },
        { patient: "Dennis Goreman", doctor: "Michael Kincaid", medication: "Phosphorus", duration: "14 Days", dosage: "28 tablets", bill: "$300.00", status: "Collected" },
        { patient: "Vikcy Jang", doctor: "Deborah Oh", medication: "Diazepam", duration: "5 Days", dosage: "20 tablets", bill: "$300.00", status: "Collected" },
        { patient: "Sandra Park", doctor: "Deborah Oh", medication: "Ozempic", duration: "10 Days", dosage: "20 tablets", bill: "$300.00", status: "Collected" },
        { patient: "John Doe", doctor: "Jacob Clifford", medication: "Arsenic", duration: "21 Days", dosage: "21 tablets", bill: "$300.00", status: "Collected" },
        { patient: "Michael Corleone", doctor: "Jacob Clifford", medication: "Glucose", duration: "30 Days", dosage: "120 tablets", bill: "$300.00", status: "Collected" }
      ]
      
}
