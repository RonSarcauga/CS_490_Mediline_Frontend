import {
    baseUserList,
    patientDataList,
    doctorDataList,
    pharmacistDataList,
    appointmentDataList,
    vitalHistoryList,
} from '../assets/js/const';
import axiosInstance from '../assets/js/api';

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

    // Helper method to format a birth date into "Month Day, Year"
    formatBirthDate(birthDate, format = "default") {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Ensure birthDate is in a standard format
        const date = this.parseDate(birthDate);
        if (!date) return "Invalid date format";

        switch (format) {
            case "MM/DD/YYYY":
                return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear()}`;
            case "DD/MM/YYYY":
                return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
            case "YYYY-MM-DD":
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
            case "Month Day, Year":
                return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            default:
                return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`; // Default format
        }
    };

    // Asynchronous method to fetch user information
    async getUserInfo(id) {
        try {
            const response = await axiosInstance.get(`/user/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            const user = response.data;

            console.log(`User fetched successfully:\n${JSON.stringify(user, null, 2)}`);

            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    // Helper method to calculate the age of a user
    calculateAge(birthDate) {
        const date = this.parseDate(birthDate);
        if (!date) return "Invalid date";

        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();

        // Adjust age if the birthday hasn't occurred yet this year
        const hasBirthdayOccurred =
            today.getMonth() > date.getMonth() ||
            (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());

        return hasBirthdayOccurred ? age : age - 1;
    };

    // Utility function to parse various common date formats
    parseDate(dateString) {
        // Try parsing ISO format first (YYYY-MM-DD)
        let date = new Date(dateString);
        if (!isNaN(date.getTime())) return date;

        // Try parsing other common formats
        const delimiters = ["/", "-"];
        for (const delimiter of delimiters) {
            const parts = dateString.split(delimiter);
            if (parts.length === 3) {
                let [part1, part2, part3] = parts.map(p => parseInt(p, 10));

                // Determine format based on value constraints
                if (part1 > 31) { // YYYY-MM-DD or YYYY/DD/MM
                    date = new Date(part1, part2 - 1, part3);
                } else if (part3 > 31) { // MM/DD/YYYY or DD/MM/YYYY
                    date = new Date(part3, part1 - 1, part2);
                }

                if (!isNaN(date.getTime())) return date;
            }
        }
    
        return null; // Return null if no valid date format was found
    };

    // Splits the date from time in a Date object
    splitDateTime(dateTime) {
        if (!dateTime || typeof dateTime !== "string") {
            throw new Error("Invalid input. Expected a DateTime string.");
        }

        const dateObj = new Date(dateTime);
        if (isNaN(dateObj.getTime())) {
            throw new Error("Invalid DateTime format.");
        }

        // Extract date in "YYYY-MM-DD" format
        const formattedDate = dateObj.toISOString().split("T")[0];

        // Extract time in "HH:MM" format
        const formattedTime = dateObj.toISOString().split("T")[1].split("Z")[0].slice(0, 5);

        return { date: formattedDate, time: formattedTime };
    };

    // Converts a date string into a Date object
    convertToDate(dateString) {
        try {
            // Parse the date string into a Date object
            const date = new Date(dateString);

            // Check if the date is valid
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date format");
            }

            return date;
        } catch (error) {
            console.error(`Error converting date string: ${error.message}`);
            return null; // Return null if the date is invalid
        }
    }

    // Helper method to generate a timestamp for posts
    generateTimestamp(date) {
        if (!date || !(date instanceof Date)) {
            throw new Error("Invalid date. Please provide a valid Date object.");
        }

        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000); // Difference in seconds

        if (diffInSeconds < 0) {
            return "In the future"; // Handle future dates
        }

        if (diffInSeconds < 10) {
            return "Just now";
        }

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minutes ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return `${diffInDays} days ago`;
        }

        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) {
            return `${diffInWeeks} weeks ago`;
        }

        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `${diffInMonths} months ago`;
        }

        const diffInYears = Math.floor(diffInDays / 365);
        return `${diffInYears} years ago`;
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

    //// Helper method to calculate the age of a user
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

    // Helper method to change the format of the phone number
    formatPhoneNumber(phoneNumber, format = "default") {
    if (!phoneNumber || typeof phoneNumber !== "string") {
        throw new Error("Invalid phone number input. Expected a string.");
    }
        // Remove all non-numeric characters
        const cleaned = phoneNumber.replace(/\D/g, "");

        // Ensure it's a valid 10-digit phone number
        if (cleaned.length !== 10) {
            throw new Error("Invalid phone number format. Expected a 10-digit number.");
        }

        switch (format) {
            case "dashes":
                return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
            case "parentheses":
                return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
            case "international":
                return `+1-${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
            case "spaces":
                return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
            case "compact":
                return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
            default:
                return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`; // Default format
        }

    };

    // Captialize the first letter of a string
    capitalize(string) {
        if (!string || typeof string !== "string") {
            throw new Error(`Expected a string. Got ${typeof string} instead.`);
        }

        const capitalized = string.slice(0,1).toUpperCase() + string.slice(1);
        console.log(`Formatted string: ${capitalized}`);

        return capitalized;
    };

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

    async getAppointmentInvoice(user_id, create_date) {
        try {
            const response = await axiosInstance.get(`/payment/user/${user_id}?sort_by=created_at&order_by=desc`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            const invoices = response.data;

            invoices.map((invoice) => {
                const date1 = new Date(invoice.created_at).toISOString().split("T")[0];
                const date2 = new Date(create_date).toISOString().split("T")[0];

                if (date1 === date2) {
                    console.log("Invoices found!");
                    return invoice;
                }
            });
        } catch (error) {
            console.error(`No invoices on record: ${error.response?.data || error.message}`);
        }
    }

    async getAppointmentData(appointment_id) {
        try {
            const response = await axiosInstance.get(`/appointment/${appointment_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            console.log(`Appointment ID: ${appointment_id}\n${response.data}`);

            return response.data;
        } catch (error) {
            console.error(`No appointment on record: ${error.response?.data || error.message}`);
        }
    }

    // Helper method to fetch a patient's past appointments
    async getPastAppointments(id) {
        try {
            // Retrieving data from the medical record endpoint
            const response = await axiosInstance.get(`/medical_record/${id}?sort_by=created_at&order_by=desc`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            console.log(`Past appointments fetched:\n${JSON.stringify(response.data, null, 2)}`);

            // Stores the response in a constant
            const appointments = response.data;

            // Returns the constant
            return appointments;
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    }

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

    // Asynchronous method to fetch upcoming appointments
    async getUpcomingAppointments(user_id) {
        try {
            const response = await axiosInstance.get(`/appointment/upcoming/${user_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            console.log(`Past appointments fetched:\n${JSON.stringify(response.data, null, 2)}`);

            const appointments = response.data;

            return appointments;
        } catch (error) {
            console.error(`No appointments on record: ${error.response?.data || error.message}`);
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

    // Helper method tp fetch appointments

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

    getNextUpcomingAppointment(appointments) {
        if (!Array.isArray(appointments)) return null;

        const now = new Date();
      
        const upcoming = appointments
            .filter((appt) =>
                ["CONFIRMED"].includes(appt.status?.toUpperCase()) &&
                new Date(appt.start_date) > now
            )
            .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
      
        return upcoming.length > 0 ? upcoming[0] : null;
    }

};

export const dashboardLayoutViewModel = new DashboardLayoutViewModel();