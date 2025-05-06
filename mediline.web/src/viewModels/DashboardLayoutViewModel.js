import {
    baseUserList,
    patientDataList,
    doctorDataList,
    pharmacistDataList,
    appointmentDataList,
    vitalHistoryList,
} from '../assets/js/const';

import apiClient from '../models/api';

class DashboardLayoutViewModel {
    // Retrieves a list of users from the user table
    users = [...baseUserList];

    // Helper method to retrieve users
    getUsers()
    {
        //console.log(`Users Inside Local Storage: `, JSON.parse(localStorage.getItem("baseUserList")));
        return JSON.parse(localStorage.getItem("baseUserList")) || baseUserList;
        // return this.users; // Return the list of users that authored the posts
    }

    // Helper method to format a user's birthday
    //formatBirthDate(birthDate)
    //{
    //    const months = [
    //        "January", "February", "March", "April", "May", "June",
    //        "July", "August", "September", "October", "November", "December"
    //    ];

    //    const [month, day, year] = birthDate.split("/");
    //    const monthName = months[parseInt(month) - 1]; // Convert month number to name

    //    return `${monthName} ${parseInt(day)}, ${year}`;
    //}

    formatBirthDate(birthDate) {

        const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

        let dateObj;

        if (birthDate.includes("-")) {  // Handles ISO format (YYYY-MM-DD)
            dateObj = new Date(birthDate);
        } else if (birthDate.includes("/")) {  // Handles MM/DD/YYYY format
            const [month, day, year] = birthDate.split("/");
            dateObj = new Date(`${year}-${month}-${day}`);
        } else {
            throw new Error("Unsupported date format");
        }

        // Format dates properly
        const monthName = months[dateObj.getMonth()];  // Convert month number to name
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();

        return `${monthName} ${day}, ${year}`;
    }

    // Helper method to calculate the age of a user
    //calculateAge(birthDate)
    //{
    //    const [month, day, year] = birthDate.split("/");
    //    const date = new Date(year, month - 1, day); // Convert to Date object
    //    const today = new Date();

    //    let age = today.getFullYear() - date.getFullYear();

    //    // Adjust age if the birthday hasn't occurred yet this year
    //    const hasBirthdayOccurred =
    //        today.getMonth() > date.getMonth() ||
    //        (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());

    //    return hasBirthdayOccurred ? age : age - 1;
    //}

    calculateAge(birthDate) {
        let dateObj;

            // Detect and parse different formats dynamically
            if (birthDate.includes("-")) {  // Handles ISO format (YYYY-MM-DD)
                dateObj = new Date(birthDate);
            } else if (birthDate.includes("/")) {  // Handles MM/DD/YYYY format
                const [month, day, year] = birthDate.split("/");
                dateObj = new Date(`${year}-${month}-${day}`);
            } else {
                throw new Error("Unsupported date format");
            }

            // Get today's date
            const today = new Date();
            let age = today.getFullYear() - dateObj.getFullYear();

            // Adjust age if the birthday hasn't occurred yet this year
            const hasBirthdayOccurred =
                today.getMonth() > dateObj.getMonth() ||
                (today.getMonth() === dateObj.getMonth() && today.getDate() >= dateObj.getDate());

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
    //getPatientData(id)
    //{
    //    console.log(`Patient ID: ${id}`);
    //    return patientDataList.find(patient => patient.userId === id);
    //};

    // Helper method to find records in the patient table by ID
    async getPatientData(userId) {
        try {
            console.log(`User ID: ${userId}`)

            // HTTP Get
            // Gets user info from the API client
            const response = await apiClient.get(`/patients/data/${userId}`);
            const patient = response.data;

            // Logs the data returned by the backend to the console
            console.log(`Patient data: ${JSON.stringify(patient, null, 2)}`);

            // Returns a user data object to the 
            return patient;
        }
        catch (error) {
            console.error("Error: ", error);
        }
    }

    // Asynchronous method for fetching patient data
    //async fetchPatientData(userId) {
    //    try {
    //        // HTTP Get
    //        // Gets user info from the API client
    //        const patient = await this.getPatientData(userId);

    //        // Logs the data returned by the backend to the console
    //        console.log(JSON.stringify(patient.data, null, 2));

    //        // Returns a user data object to the 
    //        return patient;
    //    }
    //    catch (error) {
    //        console.error("Error: ", error);
    //    }
    //};

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
    //getPastAppointmentsSorted(id)
    //{
    //    // Fetch the patient's records from the appointment table
    //    const patientRecord = patientDataList.find(patient => patient.userId === id);

    //    // Return if there are no appointments on record
    //    if (!patientRecord) return [];

    //    // Get the patient's MRN
    //    const patientMRN = patientRecord.mrn;

    //    // Filter appointments where the appointment date is before today
    //    const pastAppointments = appointmentDataList.filter(appt => appt.patientMRN === patientMRN && new Date(appt.appointmentDate) < new Date());

    //    // Sort filtered appointments by date in descending order
    //    pastAppointments.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

    //    return pastAppointments;
    //}

    async getPastAppointmentsSorted(id) {
        try {
            // HTTP Get
            // Gets user info from the API client
            const response = await apiClient.get(`/appointments/past/${id}`);

            // Logs the data returned by the backend to the console
            console.log(JSON.stringify(response.data, null, 2));

            // Returns a user data object to the 
            return response.data;
        }
        catch (error) {
            console.error("Error: ", error);
        }
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
        const today = new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });

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
        const today = new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });

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
        const today = new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });

        // Filter appointments for today that match the doctor's license number
        const todaysAppointments = appointmentDataList.filter(appt =>
            appt.doctorLicenseNumber === doctorRecord.licenseNumber && appt.appointmentDate === today
        );

        return todaysAppointments;
    }

    // Helper method to get a list of the doctor's appointments for a selected date
    getAppointmentsByDate(id, date) {
        // Find the doctor's record in doctorsList using their userId
        const doctorRecord = doctorDataList.find(doctor => doctor.userId === id);
        if (!doctorRecord) return [];

        // Get today's date in the same format as appointments (mm/dd/yyyy)
        const appointmentDate = new Date(date).toLocaleDateString("en-US", {month: "2-digit", day: "2-digit", year: "numeric"});

        // Filter appointments for today that match the doctor's license number
        const appointments = appointmentDataList.filter(appt =>
            appt.doctorLicenseNumber === doctorRecord.licenseNumber && appt.appointmentDate === appointmentDate
        );

        return appointments;
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

    // Helper method to find records in the doctor table by license number
    getPharmacistData(id) {
        return pharmacistDataList.find(pharmacist => pharmacist.userId === id);
    }

    // Helper method to get all of the patients served by a pharmacy
    getCustomers(address) {
        const customers = patientDataList.filter(user => user.pharmacyAddress === address);
        return customers;
    }

};

export const dashboardLayoutViewModel = new DashboardLayoutViewModel();