import {
    baseUserList,
    patientDataList,
    doctorDataList,
    appointmentDataList,
} from '../assets/js/const';

class DashboardLayoutViewModel {
    // Retrieves a list of users from the user table
    users = [...baseUserList];

    // Helper method to retrieve users
    getUsers()
    {
        console.log(`Users Inside Local Storage: `, JSON.parse(localStorage.getItem("baseUserList")));
        return JSON.parse(localStorage.getItem("baseUserList")) || baseUserList;
        // return this.users; // Return the list of users that authored the posts
    }

    // Helper method to format a user's birthday
    formatBirthDate(birthDate)
    {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const [month, day, year] = birthDate.split("/");
        const monthName = months[parseInt(month) - 1]; // Convert month number to name

        return `${monthName} ${parseInt(day)}, ${year}`;
    }

    // Helper method to calculate the age of a user
    calculateAge(birthDate)
    {
        const [month, day, year] = birthDate.split("/");
        const date = new Date(year, month - 1, day); // Convert to Date object
        const today = new Date();

        let age = today.getFullYear() - date.getFullYear();

        // Adjust age if the birthday hasn't occurred yet this year
        const hasBirthdayOccurred =
            today.getMonth() > date.getMonth() ||
            (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());

        return hasBirthdayOccurred ? age : age - 1;
    }

    // Helper method to change the format of the phone number
    formatPhoneNumber(phoneNumber)
    {
        // A regex patttern that is used to parse through the stored phone number
        const match = phoneNumber.match(/^(\d{3})-(\d{3})-(\d{4})$/);

        if (!match) {
            throw new Error("Invalid phone number format. Expected ###-###-####.");
        }

        // Extract matched groups and reformat
        return `(${match[1]}) ${match[2]} ${match[3]}`;
    }

    // Helper method to changes the format of the time string
    formatTimeString(timeString) {
        let [hour, minutes] = timeString.split(":");
        return `${parseInt(hour, 10)}:${minutes}`;
    };

    // Helper method to find records in the patient table by ID
    getPatientData(id)
    {
        console.log(`Patient ID: ${id}`);
        return patientDataList.find(patient => patient.userId === id);
    };

    // Helper method to find records in the patient table by MRN
    getPatientByMRN(mrn) {
        return patientDataList.find(patient => patient.mrn === mrn);
    }

    // Helper method to find records in the doctor table by ID
    getDoctorData(id)
    {
        return doctorDataList.find(doctor => doctor.userId === id);
    }

    // Helper method to find records in the doctor table by license number
    getDoctorByLicense(licenseNumber) {
        return doctorDataList.find(doctor => doctor.licenseNumber === licenseNumber);
    }

    // Helper method that determines if a patient has a doctor
    hasDoctor(id) {
        const patient = patientDataList.find(patient => patient.userId === id);
        return patient ? patient.doctor !== null : false;
    };

    // Helper method to retrieve appointment data
    getPastAppointmentsSorted(id)
    {
        // Fetch the patient's records from the appointment table
        const patientRecord = patientDataList.find(patient => patient.userId === id);

        // Return if there are no appointments on record
        if (!patientRecord) return [];

        // Get the patient's MRN
        const patientMRN = patientRecord.mrn;

        // Filter appointments where the appointment date is before today
        const pastAppointments = appointmentDataList.filter(appt => appt.patientMRN === patientMRN && new Date(appt.appointmentDate) < new Date());

        // Sort filtered appointments by date in descending order
        pastAppointments.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

        return pastAppointments;
    }

    // Helper method to retrieve upcoming appointments
    getUpcomingAppointmentsSorted(id) {
        // Find the patient's MRN using their (base) user ID
        const patientRecord = patientDataList.find(patient => patient.userId === id);

        // Checks if the patient's record exists
        if (!patientRecord) return [];

        // Get the patient's MRN
        const patientMRN = patientRecord.mrn;

        // Filter appointments that match the patient's MRN and are upcoming
        const upcomingAppointments = appointmentDataList.filter(appt =>
            appt.patientMRN === patientMRN && new Date(appt.appointmentDate) >= new Date()
        );

        // Sort appointments by date in ascending order (soonest first)
        upcomingAppointments.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

        return upcomingAppointments;
    }

    // Helper method to retrieve upcoming appointments
    getUpcomingAppointmentsDoctor(licenseNumber) {
        // Find the patient's MRN using their (base) user ID
        const doctorRecord = doctorDataList.find(doctor => doctor.licenseNumber === licenseNumber);

        // Checks if the patient's record exists
        if (!doctorRecord) return [];

        // Get the current date in the format (mm/dd/yyyy)
        const today = new Date().toLocaleDateString("en-US");

        // Get the patient's MRN
        const doctorLicenseNumber = doctorRecord.licenseNumber;

        // Filter appointments that match the patient's MRN and are upcoming
        const upcomingAppointments = appointmentDataList.filter(appt =>
            appt.doctorLicenseNumber === doctorLicenseNumber && new Date(appt.appointmentDate) >= new Date(today)
        );

        // Sort appointments by date in ascending order (soonest first)
        upcomingAppointments.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

        return upcomingAppointments;
    }

    // Helper method to retrieve a list of all a doctor's patients
    getPatients(licenseNumber) {
        // Check if the doctor has a record in the database
        const doctorRecord = doctorDataList.find(doctor => doctor.licenseNumber === licenseNumber);
        if (!doctorRecord) return [];

        // Extract the list of patient MRNs from the doctor record
        const patientMRNs = doctorRecord.patients;

        // Retrieve patient details from baseUserList using MRNs
        const patients = baseUserList.filter(user =>
            patientDataList.some(patient => patient.userId === user.id && patientMRNs.includes(patient.mrn))
        );

        return patients;
    }

    // Helper method to retrieve a list of the doctor's patients for the day
    getTodaysPatients(id) {
        // Find the doctor's record in doctorsList using their userId
        const doctorRecord = doctorDataList.find(doctor => doctor.userId === id);
        if (!doctorRecord) return [];

        // Get today's date in the same format as appointments (mm/dd/yyyy)
        const today = new Date().toLocaleDateString("en-US");

        // Filter appointments for today that match the doctor's license number
        const todaysAppointments = appointmentDataList.filter(appt =>
            appt.doctorLicenseNumber === doctorRecord.licenseNumber && appt.appointmentDate === today
        );

        // Extract patient MRNs from today's appointments
        const patientMRNs = [...new Set(todaysAppointments.map(appt => appt.patientMRN))];

        // Retrieve patient details from baseUserList using MRNs
        const todaysPatients = baseUserList.filter(user =>
            patientDataList.some(patient => patient.userId === user.id && patientMRNs.includes(patient.mrn))
        );

        return todaysPatients;
    }

    // Helper method to retrieve a list of the doctor's appointments for the day
    getTodaysAppointments(id) {
        // Find the doctor's record in doctorsList using their userId
        const doctorRecord = doctorDataList.find(doctor => doctor.userId === id);
        if (!doctorRecord) return [];

        // Get today's date in the same format as appointments (mm/dd/yyyy)
        const today = new Date().toLocaleDateString("en-US");

        // Filter appointments for today that match the doctor's license number
        const todaysAppointments = appointmentDataList.filter(appt =>
            appt.doctorLicenseNumber === doctorRecord.licenseNumber && appt.appointmentDate === today
        );

        return todaysAppointments;
    }

    // Get the current days of the week
    getCurrentWeekDays() {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDay);

        let weekDays = [];

        for (let i = 0; i < 7; i++) {
            let newDate = new Date(startOfWeek);
            newDate.setDate(startOfWeek.getDate() + i);

            let day = daysOfWeek[newDate.getDay()];
            let month = newDate.toLocaleDateString("en-US", { month: "long" });
            let date = newDate.getDate();
            let year = newDate.getFullYear();

            weekDays.push({ day, month, date, year });
        }

        return weekDays;
    }
};

export const dashboardLayoutViewModel = new DashboardLayoutViewModel();