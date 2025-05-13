import axiosInstance from '../assets/js/api';

class OverviewViewModel {
    // Centralized data fetching function
    async fetchData(userId, doctor) {
        try {
            // Use Promise.all to fetch data concurrently
            const [user, pastAppointments, upcomingAppointments, prescriptions] = await Promise.all([
                this.getUserInfo(userId),
                this.getPastAppointments(userId), // Fetch past appointments
                this.getUpcomingAppointments(userId), // Fetch upcoming appointments
                this.getPrescriptions(userId), // Fetch prescriptions
            ]);

            let doctorInfo = null;
            let pharmacyInfo = null;

            // Check if the doctor object is not empty
            if (doctor && Object.keys(doctor).length > 0) {
                doctorInfo = await this.getUserInfo(doctor.doctor_id);
            }

            // Fetch user info to get pharmacy details
            const userInfo = await this.getUserInfo(userId);
            if (userInfo && userInfo.pharmacy) {
                pharmacyInfo = userInfo.pharmacy; // Extract pharmacy information
            }

            const { activeMedications, pastMedications } = await this.getPrescriptions(userId);

            //console.log(`Patient Profile Data:\n${JSON.stringify({
            //    pastAppointments: pastAppointments || [], // Default to an empty array if null/undefined
            //    upcomingAppointments: upcomingAppointments || [],
            //    doctorData: doctor || {},
            //    doctorInfo: doctorInfo || {},
            //    prescriptions: prescriptions || [],
            //    pharmacyInfo: pharmacyInfo || {}, // Include pharmacy information
            //}, null, 2)}`);

            // Return the results as an object
            return {
                user: user || [],
                pastAppointments: pastAppointments || [], // Default to an empty array if null/undefined
                upcomingAppointments: upcomingAppointments || [],
                doctorData: doctor || {},
                doctorInfo: doctorInfo || {},
                activeMedications: activeMedications || [],
                pastMedications: pastMedications || [],
                pharmacyInfo: pharmacyInfo || {}, // Include pharmacy information
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
                pharmacyInfo: {}, // Return an empty object if there's an error
            };
        }
    }


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

            //console.log(`User fetched successfully:\n${JSON.stringify(user, null, 2)}`);

            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

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
            console.error("Error fetching past appointments:", error.response?.data || error.message);
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

    // Asynchronous method to post survey data
    async submitSurvey(id, doctorId, data) {
        // Append ID and doctor ID to the form data
        const payload = {
            ...data,
            doctor_id: doctorId,
            report_id: 1,
        };

        console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);
        try {
            const response = await axiosInstance.post(`/report/user/${id}`, {
                calories_intake: Number(payload.calories_intake),
                doctor_id: payload.doctor_id,
                height: Number(payload.height),
                hours_of_exercise: Number(payload.hours_of_exercise),
                hours_of_sleep: Number(payload.hours_of_sleep),
                report_id: payload.report_id,
                weight: Number(payload.weight),
            },{
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

    // Asynchronous method to fetch user information
    async updateInfo(id, data) {
        let response = data;
        const { zipcode, user_id, address, ...filteredData } = response;

        // Append ID and doctor ID to the form data
        const payload = {
            ...filteredData
        };

        console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);
        try {
            const response = await axiosInstance.put(`/patient/${id}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            const user = response.data;
            console.log(`User fetched successfully:\n${JSON.stringify(user, null, 2)}`);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };
}

export const overviewVM = new OverviewViewModel();