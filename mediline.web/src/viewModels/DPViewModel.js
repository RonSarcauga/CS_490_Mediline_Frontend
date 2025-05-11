import axiosInstance from '../assets/js/api';

class DPViewModel {
    // Centralized data fetching function
    async fetchData(patientId, userId) {
        try {
            // Use Promise.all to fetch data concurrently
            const [patientData, pastAppointments, upcomingAppointments, prescriptions] = await Promise.all([
                this.getUserInfo(patientId),
                this.getPastAppointments(patientId), // Fetch past appointments
                this.getUpcomingAppointments(patientId), // Fetch upcoming appointments
                this.getPrescriptions(patientId), // Fetch prescriptions
            ]);

            // Stores pharmacy details
            let pharmacyInfo = null;

            // Fetch user info to get pharmacy details
            if (patientData && patientData.pharmacy) {
                pharmacyInfo = patientData.pharmacy;
            }

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
                pastAppointments: pastAppointments || [], // Default to an empty array if null/undefined
                upcomingAppointments: upcomingAppointments || [],
                prescriptions: prescriptions || [],
                pharmacyInfo: pharmacyInfo || {}, // Include pharmacy information
            };
        } catch (error) {
            console.error("Error fetching data for Patient Dashboard:", error);
            return {
                patientData: {},
                pastAppointments: [],
                upcomingAppointments: [],
                prescriptions: [],
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

            console.log(`User fetched successfully:\n${JSON.stringify(user, null, 2)}`);

            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    // Helper method to fetch a patient's prescriptions
    async getPrescriptions(id) {
        try {
            // Retrieving data from the medical record endpoint
            const response = await axiosInstance.get(`/prescription/user/${id}?sort_by=created_at&order_by=desc`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            console.log(`Prescriptions fetched:\n${JSON.stringify(response.data, null, 2)}`);

            // Stores the response in a constant
            const prescriptions = response.data;

            // Returns the constant
            return prescriptions;
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
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