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

export const patientDashboardData = {
    doctor: {
      name: "Dr. Sarah Lee",
      rating: 4.7,
      status: "Available",
      lastAppointment: "2025-04-02 10:30AM",
      borderColor: "#007bff"
    },
    procedures: [
      { name: "Blood Test", date: "2025-04-01", id: 1 },
      { name: "MRI", date: "2025-03-28", id: 2 }
    ],
    appointments: [
      {
        doctor: "Dr. Alex Smith",
        specialization: "Cardiology",
        time: "2025-04-09",
        hour: "11:00 AM",
        type: "Online Chat"
      },
      {
        doctor: "Dr. Eva Johnson",
        specialization: "Dermatology",
        time: "2025-04-12",
        hour: "9:00 AM",
        type: "Online Chat"
      }
    ],
    user: {
      name: "Luke Patterson",
      mrn: "984568",
      gender: "Male",
      birthday: "September 28, 1982",
      age: "42",
      medication: ["Drug 1", "Drug 2"]
    }
  };  