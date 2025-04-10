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
