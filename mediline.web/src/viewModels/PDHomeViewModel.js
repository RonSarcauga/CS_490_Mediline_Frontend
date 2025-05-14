import axiosInstance from '../assets/js/api';

class PDHomeViewModel {
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

    async fetchData(userId, doctor) {
        try {
            // Use Promise.all to fetch data concurrently
            const [user, pastAppointments, upcomingAppointments] = await Promise.all([
                this.getUserInfo(userId),
                this.getPastAppointments(userId), // Fetch past appointments
                this.getUpcomingAppointments(userId), // Fetch upcoming appointments
                // this.getPrescriptions(userId), // Fetch prescriptions
            ]);

            let doctorInfo = null;

            // Check if the doctor object is empty
            if (user.doctor && Object.keys(user.doctor).length > 0) {
                doctorInfo = await this.getUserInfo(user.doctor.doctor_id);
            }

            const { activeMedications, pastMedications } = await this.getPrescriptions(userId);

            // Fetch additional data for past appointments
            const enrichedPastAppointments = await Promise.all(
                pastAppointments.map(async (appointment) => {
                    console.log(`Appointment ID: ${appointment.appointment.appointment_id}`);
                    const appointmentData = await this.getAppointmentData(appointment.appointment.appointment_id);
                    const invoiceData = await this.getAppointmentInvoice(userId, appointment.created_at);
                    return {
                        ...appointment,
                        ...appointmentData,
                        invoice: invoiceData || null, // Add invoice data if available
                    };
                })
            );

            // Fetch additional data for upcoming appointments
            const enrichedUpcomingAppointments = await Promise.all(
                upcomingAppointments.map(async (appointment) => {
                    const appointmentData = await this.getAppointmentData(appointment.appointment_id);
                    const invoiceData = await this.getAppointmentInvoice(userId, appointment.created_at);
                    return {
                        ...appointment,
                        appointmentDetails: appointmentData,
                        invoice: invoiceData || null, // Add invoice data if available
                    };
                })
            );

            console.log(`Patient Dashboard Data:\n${JSON.stringify({
                user: user || [],
                pastAppointments: enrichedPastAppointments || [], // Default to an empty array if null/undefined
                upcomingAppointments: enrichedUpcomingAppointments || [],
                doctorData: doctor || {},
                doctorInfo: doctorInfo || {},
                activeMedications: activeMedications || [],
                pastMedications: pastMedications || [],
            }, null, 2)}`);

            // Return the results as an object
            return {
                user: user || [],
                pastAppointments: enrichedPastAppointments || [], // Default to an empty array if null/undefined
                upcomingAppointments: enrichedUpcomingAppointments || [],
                doctorData: doctor || {},
                doctorInfo: doctorInfo || {},
                activeMedications: activeMedications || [],
                pastMedications: pastMedications || [],
            };
        } catch (error) {
            console.error("Error fetching data for Patient Dashboard:", error);
            return {
                user: [],
                pastAppointments: [],
                upcomingAppointments: [],
                doctor: {},
                doctorInfo: {},
                activeMedications: [],
                pastMedications: [],
            };
        }
    }


    // Helper method to fetch a patient's prescriptions
    //async getPrescriptions(id) {
    //    try {
    //        // Retrieving data from the medical record endpoint
    //        const response = await axiosInstance.get(`/prescription/user/${id}?sort_by=created_at&order_by=desc`, {
    //            headers: {
    //                "Content-Type": "application/json",
    //                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    //            }
    //        });
    //        console.log(`Prescriptions fetched:\n${JSON.stringify(response.data, null, 2)}`);

    //        // Stores the response in a constant
    //        const prescriptions = response.data;

    //        // Returns the constant
    //        return prescriptions;
    //    } catch (error) {
    //        console.error("Login failed:", error.response?.data || error.message);
    //    }
    //}

    // Helper method to fetch a patient's prescriptions and their medications
    async getPrescriptions(id) {
        try {
            // Fetch all prescriptions for the user
            const response = await axiosInstance.get(`/prescription/user/${id}?sort_by=created_at&order_by=desc`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            const prescriptions = response.data;

            // Fetch medications for each prescription concurrently
            const medicationsByPrescription = await Promise.all(
                prescriptions.map(async (prescription) => {
                    const medications = await this.getPrescriptionMedications(prescription.prescription_id);
                    console.log(`Medications fetched for prescription ${prescription.prescription_id}:`, medications);

                    return medications.map((medication) => {
                        console.log(`Mapping medication:`, medication);
                        return {
                            ...medication,
                            prescriptionId: prescription.prescription_id, // Add prescription ID for reference
                        };
                    });

                })
            );

            // Flatten the array of medications
            const allMedications = medicationsByPrescription.flat();

            // Split medications into active and past medications
            const currentDate = new Date();
            const activeMedications = [];
            const pastMedications = [];

            allMedications.forEach((medication) => {
                if (medication.status === "PAID") {
                    // Normalize the taken_date to ensure it's a valid ISO 8601 string
                    const takenDate = new Date(`${medication.taken_date}Z`); // Append 'Z' to indicate UTC
                    if (isNaN(takenDate.getTime())) {
                        console.warn(`Invalid taken_date for medication: ${JSON.stringify(medication)}`);
                        return; // Skip this medication if the date is invalid
                    }

                    const endDate = new Date(takenDate);
                    endDate.setDate(endDate.getDate() + medication.duration);

                    if (endDate > currentDate) {
                        activeMedications.push(medication);
                    } else {
                        pastMedications.push(medication);
                    }
                }
            });

            // Sort active and past medications in descending order
            activeMedications.sort((a, b) => new Date(b.taken_date) - new Date(a.taken_date));
            pastMedications.sort((a, b) => new Date(b.taken_date) - new Date(a.taken_date));

            console.log(`Active Medications: ${JSON.stringify(activeMedications, null, 2)}`);
            console.log(`Past Medications: ${JSON.stringify(pastMedications, null, 2)}`);

            // Return the medications split into active and past
            return {
                activeMedications,
                pastMedications,
            };
        } catch (error) {
            console.error("Error fetching prescriptions and medications:", error.response?.data || error.message);
            return {
                activeMedications: [],
                pastMedications: [],
            };
        }
    }


    // Asynchronous method to fetch medications from a prescription
    async getPrescriptionMedications(prescriptionId) {
        try {
            const response = await axiosInstance.get(`/prescription/${prescriptionId}/medications`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            const medications = response.data;

            // Return the medications or an empty array if the response is invalid
            return Array.isArray(medications) ? medications : [];
        } catch (error) {
            console.error(`Error fetching medications for prescription ${prescriptionId}:`, error.response?.data || error.message);
            return []; // Return an empty array if the API call fails
        }
    }

    // Helper method to fetch invoice data for each appointment
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

    // Helper method to get appointment data
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
    //async getPastAppointments(id) {
    //    try {
    //        // Retrieving data from the medical record endpoint
    //        const response = await axiosInstance.get(`/medical_record/${id}?sort_by=created_at&order_by=desc`, {
    //            headers: {
    //                "Content-Type": "application/json",
    //                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    //            }
    //        });

    //        // Stores the response in a constant
    //        const appointments = response.data;

    //        // Fetch doctor info for each appointment concurrently
    //        const appointmentsWithDoctorInfo = await Promise.all(
    //            appointments.map(async (appt) => {
    //                if (appt.doctor_id) {
    //                    const doctorInfo = await this.getUserInfo(appt.doctor_id);
    //                    return { ...appt, doctorInfo }; // Add doctorInfo to the appointment object
    //                }
    //                return appt; // If no doctor_id, return the appointment as is
    //            })
    //        );

    //        console.log(`Past appointments fetched:\n${JSON.stringify(appointmentsWithDoctorInfo, null, 2)}`);

    //        // Returns the modified appointments with doctor info included
    //        return appointmentsWithDoctorInfo;
    //    } catch (error) {
    //        console.error("Error fetching past appointments:", error.response?.data || error.message);
    //        return [];
    //    }
    //}



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

    // Asynchronous method to fetch upcoming appointments
    async getUpcomingAppointments(user_id) {
        try {
            const response = await axiosInstance.get(`/appointment/upcoming/${user_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            const appointments = response.data;

            // Fetch doctor info for each appointment concurrently
            const appointmentsWithDoctorInfo = await Promise.all(
                appointments.map(async (appt) => {
                    if (appt.doctor_id) {
                        const doctorInfo = await this.getUserInfo(appt.doctor_id);
                        return { ...appt, doctorInfo }; // Add doctorInfo to the appointment object
                    }
                    return appt; // If no doctor_id, return the appointment as is
                })
            );

            console.log(`Upcoming appointments fetched:\n${JSON.stringify(appointmentsWithDoctorInfo, null, 2)}`);

            // Returns the modified appointments with doctor info included
            return appointmentsWithDoctorInfo;
        } catch (error) {
            console.error(`No appointments on record: ${error.response?.data || error.message}`);
        }
    }

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

    // Asynchronous method to book an appointment
    // Method to combine date and time strings into a Date object
    combineDateAndTime(dateString, timeString) {
        if (!dateString || !timeString) {
            throw new Error("Both date and time inputs are required.");
        }

        console.log(`Date string: ${dateString}\nTime string: ${timeString}`);

        // Normalize the date format to MM/DD/YYYY
        const normalizedDateString = dateString.replace(
            /^(\d)\/(\d{2})\/(\d{4})$/,
            "0$1/$2/$3"
        );

        // Validate the date format (MM/DD/YYYY)
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(normalizedDateString)) {
            throw new Error("Invalid date format. Expected format: MM/DD/YYYY.");
        }

        // Validate the time format (HH:MM)
        const timeRegex = /^\d{2}:\d{2}$/;
        if (!timeRegex.test(timeString)) {
            throw new Error("Invalid time format. Expected format: HH:MM.");
        }

        // Combine the date and time into a single string
        const combinedDateTimeString = `${dateString} ${timeString}`;

        // Create a Date object
        const dateObject = new Date(combinedDateTimeString);

        // Check if the resulting Date object is valid
        if (isNaN(dateObject.getTime())) {
            throw new Error("Invalid date or time. Unable to create a valid Date object.");
        }

        return dateObject;
    }

    abbreviateName(fullName) {
        if (fullName === null) {
            return "";
        }

        // Split the fullName string by spaces.
        const nameParts = fullName.trim().split(" ");

        // Check we have at least two parts.
        if (nameParts.length < 2) {
            return fullName; // or handle differently if there's only one name
        }

        // Get the first character of the first name and the full last name.
        const firstInitial = nameParts[0].charAt(0);
        const lastName = nameParts[nameParts.length - 1];

        // Construct the abbreviated name.
        return `${firstInitial}. ${lastName}`;
    }

    // Updated bookAppointment method
    async bookAppointment(dateInput, timeInput, doctorId, patientId) {
        try {
            const patient_id = parseInt(patientId);

            // Validate inputs
            if (!dateInput || !timeInput || !doctorId || !patientId) {
                console.error("Invalid inputs. Ensure date, time, doctor ID, and patient ID are provided.");
                return;
            }

            // Combine date and time into a start_date
            const startDate = this.combineDateAndTime(dateInput, timeInput);

            // Validate that the appointment time falls within the doctor's working hours (09:00 - 21:00)
            const { time: appointmentTime } = this.splitDateTime(startDate.toISOString());
            const [hours, minutes] = appointmentTime.split(":").map(Number);
            if (hours < 9 || hours > 21 || (hours === 21 && minutes > 0)) {
                console.error("Invalid appointment time: Appointments can only be scheduled between 09:00 and 21:00.");
                return;
            }

            // Automatically set the end_date to 30 minutes after the start_date
            const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

            // Format startDate and endDate to remove milliseconds
            const formattedStartDate = this.convertToLocalISOString(startDate);
            const formattedEndDate = this.convertToLocalISOString(endDate);

            //const formattedStartDate = startDate.toISOString().split(".")[0];
            //const formattedEndDate = endDate.toISOString().split(".")[0];

            // Fetch upcoming appointments for the user
            const upcomingAppointments = await this.getUpcomingAppointments(patientId);

            // Extract the date from the start_date
            const { date: appointmentDate } = this.splitDateTime(startDate.toISOString());

            // Check if the new appointment date conflicts with any existing upcoming appointments
            const isDateConflict = upcomingAppointments.some((appt) => {
                const existingAppointmentDate = this.splitDateTime(appt.start_date).date;
                return existingAppointmentDate === appointmentDate;
            });


            if (isDateConflict) {
                console.error("Appointment conflict: You already have an appointment scheduled on this date.");
                return;
            }

            // Prepare the payload
            const payload = {
                doctor_id: doctorId,
                patient_id: patient_id,
                start_date: formattedStartDate, // Use formatted date
                end_date: formattedEndDate, // Use formatted date
                treatment: "Consultation"
            };

            // Proceed to book the appointment
            const response = await axiosInstance.post(`/appointment/add`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            console.log("Appointment successfully booked:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error booking appointment:", error.response?.data || error.message);
        }
    }

    // String that changes local time dates to ISO format
    convertToLocalISOString(date) {
        const offset = date.getTimezoneOffset() * 60000;
        const localDate = new Date(date.getTime() - offset);
        return localDate.toISOString().slice(0, -1);
    }
}

export const pdHomeVM = new PDHomeViewModel();