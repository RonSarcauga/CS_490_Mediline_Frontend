import axiosInstance from '../assets/js/api';
class DPViewModel {
    // Centralized data fetching function
    async fetchData(patientId, userId) {
        try {
            // Use Promise.all to fetch data concurrently
            const [patientData, pastAppointments, upcomingAppointments, forms] = await Promise.all([
                this.getUserInfo(patientId),
                this.getPastAppointments(patientId), // Fetch past appointments
                this.getUpcomingAppointments(patientId), // Fetch upcoming appointments
                this.getForms(patientId),
            ]);

            // Stores pharmacy details
            let pharmacyInfo = null;

            // Fetch user info to get pharmacy details
            if (patientData && patientData.pharmacy) {
                pharmacyInfo = patientData.pharmacy;
            }

            // Handle appointment requests immediately
            this.handleAppointmentRequests(userId);

            // Look for invalid upcoming appointments
            this.handleInvalidAppointments(userId);

            const { activeMedications, pastMedications } = await this.getPrescriptions(userId, patientId);

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
                patientInfo: patientData || {},
                pastAppointments: pastAppointments || [],
                upcomingAppointments: upcomingAppointments || [],
                activeMedications: activeMedications || [],
                pastMedications: pastMedications || [],
                pharmacyInfo: pharmacyInfo || {},
                forms: forms || [],
            };
        } catch (error) {
            console.error("Error fetching data for Patient Dashboard:", error);
            return {
                patientInfo: {},
                pastAppointments: [],
                upcomingAppointments: [],
                activeMedications: [],
                pastMedications: [],
                pharmacyInfo: {},
                forms: [], // Return an empty object if there's an error
            };
        }
    }

    // Centralized function for fetching the doctor's data
    async getDoctorData(userId) {
        const userInfo = await this.getUserInfo(userId);

        console.log("Doctor data: ", JSON.stringify(userInfo, null, 2));
        return userInfo;
    }

    // Asynchronous method for automatically accepting/rejecting appointments as soon as a doctor logs in
    //async handleAppointmentRequests(id) {
    //    const doctor = await this.getDoctorData(id);
    //    const acceptingPatients = doctor?.accepting_patients;

    //    try {
    //        const response = await axiosInstance.get(`/doctor/${id}/appointment_requests`, {
    //            headers: {
    //                "Content-Type": "application/json",
    //                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    //            }
    //        });

    //        const requests = response.data;

    //        console.log(`Appointment requests have been handled successfully:\n${JSON.stringify(requests, null, 2)}`);

    //        // Extract appointment IDs and process them concurrently
    //        const appointmentPromises = requests.map((appointment) =>
    //            this.handleAppointmentRequest(appointment, acceptingPatients)
    //        );

    //        // Wait for all appointment requests to be processed
    //        await Promise.all(appointmentPromises);
    //    } catch (error) {
    //        console.error("Error handling appointment requests:", error);
    //    }
    //};

    async handleAppointmentRequests(id) {
        const doctor = await this.getDoctorData(id);
        const acceptingPatients = doctor?.accepting_patients;

        try {
            const response = await axiosInstance.get(`/doctor/${id}/appointment_requests`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            });

            const requests = response.data;

            console.log(`Appointment requests fetched successfully:\n${JSON.stringify(requests, null, 2)}`);

            // Process each appointment request sequentially
            for (const appointment of requests) {
                try {
                    await this.handleAppointmentRequest(appointment, acceptingPatients);
                    console.log(`Successfully processed appointment ${appointment.appointment_id}`);
                } catch (error) {
                    console.error(`Error processing appointment ${appointment.appointment_id}:`, error.response?.data || error.message);
                }
            }
        } catch (error) {
            console.error("Error fetching appointment requests:", error.response?.data || error.message);
        }
    }

    async handleAppointmentRequest(appointment, acceptingPatients) {
        try {
            const currentDate = new Date();
            const startDate = new Date(appointment.visit_time);
            const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

            // Determine the status based on the visit_time
            let status;
            if (startDate < currentDate) {
                // Mark as cancelled if the requested appointment date is in the past
                status = "CANCELLED";
            } else {
                status = acceptingPatients ? "CONFIRMED" : "CANCELLED";
            }

            const start_date = this.convertToLocalISOString(startDate);
            const end_date = this.convertToLocalISOString(endDate);
            
            console.log(`Processing appointment ${appointment.appointment_id} with status: ${status}`);
            console.log(`Start Date: ${start_date}\nEnd Date: ${end_date}`);

            const payload = {
                start_date: start_date,
                end_date: end_date,
                status: status,
                treatment: "Consultation",
            }

            console.log(`Request payload:\n${JSON.stringify(payload, null, 2)}`);

            // Make the API call to update the appointment status
            const response = await axiosInstance.put(
                `/appointment/update/${appointment.appointment_id}`, payload, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                }
            );

            console.log(`Appointment ${appointment.appointment_id} updated successfully:\n${JSON.stringify(response.data, null, 2)}`);
        } catch (error) {
            console.error(`Error updating appointment ${appointment.appointment_id}:`, error.response?.data || error.message);
        }
    }

    convertToLocalISOString(date) {
        const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
        const localDate = new Date(date.getTime() - offset); // Adjust to local time
        return localDate.toISOString().slice(0, -1); // Remove 'Z' to indicate local time
    }

    // Asynchronous function to find and get rid of appointments that have patients that are no longer with the doctor
    async handleInvalidAppointments(doctorId) {
        try {
            // Fetch the doctor's patients
            const patients = await this.getPatients(doctorId);
            if (!patients || patients.length === 0) {
                console.warn("No patients found for the doctor.");
                return;
            }

            // Fetch the doctor's upcoming appointments
            const response = await axiosInstance.get(`/appointment/upcoming/${doctorId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            });

            const appointments = response.data;
            console.log(`Doctor's upcoming appointments:\n${JSON.stringify(appointments, null, 2)}`);

            // Create a Set of valid patient IDs for quick lookup
            const validPatientIds = new Set(patients.patients.map((patient) => patient.patient_id));

            // Find appointments with invalid patients
            const invalidAppointments = appointments.filter(
                (appointment) => !validPatientIds.has(appointment.patient_id)
            );

            console.log(`Invalid appointments:\n${JSON.stringify(invalidAppointments, null, 2)}`);

            // Cancel invalid appointments
            for (const appointment of invalidAppointments) {
                try {
                    const currentDate = new Date();
                    const startDate = new Date(appointment.start_date);
                    const endDate = new Date(appointment.end_date);

                    const start_date = this.convertToLocalISOString(startDate);
                    const end_date = this.convertToLocalISOString(endDate);

                    const payload = {
                        start_date: start_date,
                        end_date: end_date,
                        status: "CANCELLED", // Set status to "CANCELLED"
                        treatment: appointment.treatment || "Consultation",
                    };

                    console.log(`Cancelling appointment ${appointment.appointment_id} with payload:\n${JSON.stringify(payload, null, 2)}`);

                    // Make the API call to update the appointment status
                    const response = await axiosInstance.put(
                        `/appointment/update/${appointment.appointment_id}`,
                        payload,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                            },
                        }
                    );

                    console.log(`Appointment ${appointment.appointment_id} cancelled successfully:\n${JSON.stringify(response.data, null, 2)}`);
                } catch (error) {
                    console.error(`Error cancelling appointment ${appointment.appointment_id}:`, error.response?.data || error.message);
                }
            }
        } catch (error) {
            console.error("Error handling invalid appointments:", error.response?.data || error.message);
        }
    }


    // Asynchronous method to fetch patients
    async getPatients(doctorId) {
        try {
            const response = await axiosInstance.get(`/doctor/${doctorId}/doctor-patients`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            const patients = response.data;

            console.log(`Patients fetched successfully:\n${JSON.stringify(patients, null, 2)}`);
            return patients;
        } catch (error) {
            console.error("Error fetching user:", error);
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

    // Helper method to fetch a patient's prescriptions and their medications
    async getPrescriptions(id, patientId) {
        try {
            // Debug Statement
            console.log("Did I make it here?");

            // Fetch all prescriptions for the user
            const response = await axiosInstance.get(`/prescription/user/${id}?sort_by=created_at&order_by=desc`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            const prescriptions = response.data;

            const patientPrescriptions = prescriptions.filter(prescription => prescription.patient_id === patientId);

            // Fetch medications for each prescription concurrently
            const medicationsByPrescription = await Promise.all(
                patientPrescriptions.map(async (prescription) => {
                    const medications = await this.getPrescriptionMedications(prescription.prescription_id);
                    //console.log(`Medications fetched for prescription ${prescription.prescription_id}:`, medications);

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

            //console.log(`Active Medications: ${JSON.stringify(activeMedications, null, 2)}`);
            //console.log(`Past Medications: ${JSON.stringify(pastMedications, null, 2)}`);

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

    // Helper method to get past appointments
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
            console.error("Error fetching past appointments: ", error.response?.data || error.message);
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

    // Asynchronous call to get a patient's forms
    async getForms(userId) {
        try {
            const response = await axiosInstance.get(`/report/user/${userId}?sort_by=created_at&order_by=desc`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            const forms = response.data;
            return forms;
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    }

    // Asynchronous call to get the exercise list
    async getExerciseList() {
        try {
            const response = await axiosInstance.get(`/exercise/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            // Store the response data
            const exercises = response.data;
            return exercises || [];
        } catch (error) {
            console.error("Error for fetching exercises:", error.response?.data || error.message);
        }
    }

    // Asynchronous call to get the exercise list for a specific patient
    async getPatientRegimens(patientId) {
        try {
            const response = await axiosInstance.get(`/exercise/user/${patientId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            console.log('Patient Exercises:', response.data);

            // Store the exercises
            const exercises = response.data;

            return exercises;
        } catch (error) {
            console.error("Error for fetching exercises: ", error.response?.data || error.message);

        }
    };

    async updatePatientRegimens(exerciseId, status, reps) {
        try {
            const response = await axiosInstance.put(`/exercise/${exerciseId}`, {
                status: status,
                reps: reps
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            console.log(`Exercise ${exerciseId} status updated to ${status}:`, response.data);
        } catch (error) {
            console.error("Error for updating exercises: ", error.response?.data || error.message);
        }
    }

    async submitExercise(patientId, userId, exercise) {
        try {
            // Extract the exercise ID
            const exerciseId = exercise.exercise_id;

            // Set a default number of reps
            if (exercise.reps === null) {
                exercise.reps = 0;
            }

            const payload = {
                patient_id: patientId,
                doctor_id: userId,
                reps: exercise.reps,
                exercise_id: exerciseId,
            }

            console.log(`Exercise: ${JSON.stringify(payload, null, 2)}`);

            //const response = await fetch(`/api/exercises`, {
            //    method: "POST",
            //    headers: {
            //        "Content-Type": "application/json",
            //    },
            //    body: JSON.stringify({
            //        patient_id: patientId,
            //        user_id: userId,
            //        status: "in_progress",
            //        ...exercise,
            //    }),
            //});
        } catch (error) {
            console.error("Error submitting exercises:", error.response?.data || error.message);
        }
    }

    // Asynchronous call to make a prescription request to the pharmacy
    async submitOrder(data, userId, patientId) {
        try {
            // Fetch the necessary information needed for making the API call
            const patientInfo = await this.getUserInfo(patientId);
            const pharmacyInfo = patientInfo.pharmacy;

            if (!pharmacyInfo) {
                throw new Error("Pharmacy information is missing for the patient.");
            }

            // Fetch the pharmacy inventory
            const inventory = await this.getPharmacyInventory(pharmacyInfo.pharmacy_id);

            if (!Array.isArray(inventory)) {
                throw new Error("Invalid inventory data received.");
            }

            // Find the matching inventory record based on the medication name
            const matchingInventory = inventory.find(
                (item) => item.medication_name.toLowerCase() === data.medication.toLowerCase()
            );

            if (!matchingInventory) {
                throw new Error(`Medication "${data.medication}" not found in the pharmacy inventory.`);
            }

            // Helper function to extract numeric value from a string
            const extractNumber = (input) => {
                const match = input.match(/\d+/); // Match the first numeric value
                return match ? parseInt(match[0], 10) : null; // Return the number or null if not found
            };

            // Extract numeric values from dosage and duration
            const dosage = extractNumber(data.dosage);
            const duration = extractNumber(data.duration);

            if (!dosage || !duration) {
                throw new Error("Invalid dosage or duration format. Please provide numeric values (e.g., '20 mg', '10 days').");
            }

            // Generate the taken_date in local time without the 'Z'
            const takenDate = this.convertToLocalISOString(new Date());

            // Create the payload
            const payload = {
                doctor_id: parseInt(userId),
                medications: [
                    {
                        dosage: dosage,
                        instructions: data.instructions,
                        duration: duration,
                        medication_id: parseInt(matchingInventory.medication_id),
                        taken_date: takenDate,
                    },
                ],
                patient_id: parseInt(patientId),
            };

            console.log(`Submitting order with payload: ${JSON.stringify(payload, null, 2)}`);

            // Make the API call to submit the order (uncomment when ready to use)
             const response = await axiosInstance.post(`/pharmacy/${pharmacyInfo.pharmacy_id}`, payload, {
                 headers: {
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                 }
             });

            // Return the payload for confirmation or further processing
            return payload;
        } catch (error) {
            console.error("Error submitting order:", error.response?.data || error.message);
            throw error;
        }
    }

    async updateDoctorInfo(data, doctorId) {
        console.log(`Data to be submitted: ${JSON.stringify(data, null, 2)}`);

        // Fetch the doctor's information
        const doctor = await this.getUserInfo(doctorId);

        // Remove the auditing fields from the doctor
        const { updated_at, created_at, bio, city_id, user_id, address_id, zipcode, accepting_patients, ...filteredDoctor } = doctor;
        const { address, ...filteredData } = data;
        
        // Update the payload
        const payload = {
            ...filteredData,
            ...filteredDoctor,
            country: "United States"
        }

        // Print and return the filtered doctor data
        console.log("Filtered Doctor Data: ", JSON.stringify(payload, null, 2));

        try {
            const response = await axiosInstance.put(`/doctor/${doctorId}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            console.log(`Doctor information successfully updated:\n${JSON.stringify(response.data, null, 2)}`);
        } catch (error) {
            console.error("Error for updating exercises: ", error.response?.data || error.message);
        }

        return filteredDoctor;
    }


    formatDateToBackend(date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error("Invalid Date object.");
        }
        return date.toISOString().replace('Z', ''); // Remove the 'Z' from the ISO string
    }

    async getPharmacyInventory(pharmacyId, medication) {
        try {
            const response = await axiosInstance.get(`/prescription/pharmacy/${pharmacyId}/inventory`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
            });

            const inventory = response.data;

            return inventory;
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
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

    // Asynchronous method to fetch a patient's past medications
    async getPastMedications(id) {
        try {
            const response = await axiosInstance.get(`/prescription/patient/${id}/history`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            const medications = response.data;
            console.log(`Past medications: ${JSON.stringify(medications, null, 2)}`);
        } catch (error) {
            console.error('Error fetching medication list:', error);
            throw error;
        }
    }

    // Asynchronous method to post survey data
    async submitSurvey(id, doctorId, data) {
        // Append ID and doctor ID to the form data
        const payload = {
            ...data,
            doctor_id: doctorId,
        };

        console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);
        try {
            const response = await axiosInstance.post(`/report/user/${id}`, {
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
        // Append ID and doctor ID to the form data
        const payload = {
            ...data,
            user_id: id,
        };

        console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);
        try {
            const response = await axiosInstance.put(`/patient/${id}`, {
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

export const dpVM = new DPViewModel();