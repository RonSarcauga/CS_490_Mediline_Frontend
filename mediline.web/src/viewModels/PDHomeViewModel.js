import axiosInstance from '../assets/js/api';

class PDHomeViewModel {
    // Centralized data fetching function
    async fetchData(userId) {
        try {
            // Use Promise.all to fetch data concurrently
            const [pastAppointments, upcomingAppointments] = await Promise.all([
                this.getPastAppointments(userId), // Fetch past appointments
                this.getUpcomingAppointments(userId), // Fetch upcoming appointments
            ]);

            // Return the results as an object
            return {
                pastAppointments: pastAppointments || [], // Default to an empty array if null/undefined
                upcomingAppointments: upcomingAppointments || [], // Default to an empty array if null/undefined
            };
        } catch (error) {
            console.error("Error fetching data for Patient Dashboard:", error);
            return {
                pastAppointments: [],
                upcomingAppointments: [],
            };
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

            console.log(`Past appointments fetched:\n${JSON.stringify(response.data, null, 2)}`);

            const appointments = response.data;

            return appointments;
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

        // Validate the date format (MM/DD/YYYY)
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(dateString)) {
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

    // Updated bookAppointment method
    async bookAppointment(dateInput, timeInput, doctorId, patientId) {
        try {
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
                patient_id: patientId,
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
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

}

export const pdHomeVM = new PDHomeViewModel();