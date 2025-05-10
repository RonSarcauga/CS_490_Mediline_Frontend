import { specialties, ratings, doctorList } from '../assets/js/const';
import axiosInstance from '../assets/js/api';
import js from '@eslint/js';

const FindDoctorViewModel = {
    // Contains the data to be displayed in the view
    filters: {
        name: "",
        specialty: "",
        rating: "",
        acceptingNewPatients: false,
        search: "",
        setByDropdown: false,
    },

    // Stores and manages the active filters
    activeFilters: {
        name: "",
        specialty: "",
        rating: "",
        acceptingNewPatients: false,
        search: "",
        setByDropdown: false,
    },

    specialties: {},

    // The super user's token
    getSuperToken: async function () {
        try {
            const response = await axiosInstance.post(`/auth/login`, {
                password: "password123",
                username: "pthompson@example.org"
            });

            const token = response.data.token;

            // Split the JWT into three parts (Header, Payload, Signature)
            const payloadBase64 = token.split(".")[1];

            // Decode the Base64 string and parse the JSON
            const decodedPayload = JSON.parse(atob(payloadBase64));
            console.log(`Decoded Token: ${decodedPayload}`);

            // Stores the super user's token in local storage
            localStorage.setItem("jwtToken", token);
        } catch (error) {
            console.error("Error:", error);
        }
        return localStorage.getItem("jwtToken");
    },

    isTokenExpired(token) {
        try {
            // Split the JWT into its parts (Header, Payload, Signature)
            const payloadBase64 = token.split(".")[1];

            // Decode the Base64 string and parse the JSON
            const decodedPayload = JSON.parse(atob(payloadBase64));

            // Check if the token has expired
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            return decodedPayload.exp < currentTime; // `exp` is the expiration time in the token payload
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // Treat the token as expired if there's an error
        }
    },

    doctorId: null,

    filterByURL: false,

    // Helper functions which would be used to make calls to the appropriate methods in the service layer
    //filterDoctors: function (doctors) {
    //    const { name, specialty, rating, acceptingNewPatients } = this.filters;

    //    // Convert the rating range to numerical values
    //    const [minRating, maxRating] = rating
    //        ? rating.split("-").map((r) => parseFloat(r.replace("%", "")))
    //        : [null, null];

    //    return doctors.filter((doctor) => {
    //        const doctorRating = parseFloat(doctor.rating);

    //        // Check if the doctor matches the filters
    //        const matchesName = !name || doctor.name.toLowerCase().includes(name.toLowerCase());
    //        const matchesSpecialty = !specialty || doctor.specialization.toLowerCase() === specialty.toLowerCase();
    //        const matchesRating = !rating || (doctorRating >= minRating && doctorRating <= maxRating);
    //        const matchesAcceptance = !acceptingNewPatients || doctor.acceptingNewPatients;

    //        return matchesName && matchesSpecialty && matchesRating && matchesAcceptance;
    //    });
    //},

    filterDoctors: function (doctors) {
        const { name, specialty, rating, acceptingNewPatients, search } = this.filters;

        console.log(`Active Filters: ${JSON.stringify(this.filters, null, 2)}`);

        // Convert the rating range to numerical values
        const [minRating, maxRating] = rating
            ? rating.split("-").map((r) => parseFloat(r.replace("%", "")))
            : [null, null];

        return doctors.filter((doctor) => {
            const doctorRating = parseFloat(doctor.rating);

            // Check if the doctor matches the filters
            const matchesName = !name || doctor.name.toLowerCase().includes(name.toLowerCase());
            const matchesSpecialty = !specialty || doctor.specialization.toLowerCase() === specialty.toLowerCase();
            const matchesRating = !rating || (doctorRating >= minRating && doctorRating <= maxRating);

            // Handle acceptingNewPatients filter for both true and false
            const matchesAcceptance =
                acceptingNewPatients === false || doctor.acceptingPatients === acceptingNewPatients;

            // Check if the search query matches the doctor's name or specialty
            const matchesSearch =
                !search ||
                doctor.name.toLowerCase().includes(search.toLowerCase()) ||
                doctor.specialization.toLowerCase().includes(search.toLowerCase());

            return matchesName && matchesSpecialty && matchesRating && matchesAcceptance && matchesSearch;
        });
    },


    // Call to the update filter method in the service layer
    updateFilter: function (field, value) {
        console.log(`${field}: ${value}`);
        this.activeFilters[field] = value;
    },

    // Call to the apply filter method in the service layer
    applyFilters: async function () {
        // Update the filters with the current active filters
        this.filters = { ...this.activeFilters };

        // Fetch the list of doctors from the backend
        const doctors = await this.fetchDoctors();

        // Apply the filters to the fetched doctors
        const filteredDoctors = this.filterDoctors(doctors);

        // Return the filtered list of doctors
        return filteredDoctors;
    },

    //applyFilters() {
    //    this.filters = { ...this.activeFilters };
    //},

    // Call to the update search filter method in the service layer
    updateSearch: function (query) {
        this.activeFilters.search = query;
        console.log("Search String: ", query);

        // Determines if the filter has already been applied in a dropdown
        if (!query.trim()) {
            this.activeFilters.name = "";
            if (!this.activeFilters.setByDropdown) {
                this.activeFilters.specialty = "";
            }
            return;
        }

        // Check if the query matches a specialty label
        const isSpecialty = specialties.some((s) => s.label.toLowerCase() === query.toLowerCase());

        if (isSpecialty && !this.activeFilters.setByDropdown) {
            // If the query matches a specialty label and specialty is not set by the SelectList
            this.activeFilters.specialty = specialties.find((s) => s.label.toLowerCase() === query.toLowerCase())?.value;
            this.activeFilters.name = "";
        }
        else {
            // Assume it's a name search and update only the name filter
            this.activeFilters.name = query;
            if (!this.activeFilters.setByDropdown) {
                this.activeFilters.specialty = "";
            }
        }
    },

    // Call to the clear filters method in the service layer
    clearFilters: async function () {
        this.activeFilters = {
            name: "",
            specialty: "",
            rating: "",
            search: "",
            acceptingNewPatients: false,
        };

        this.filters = { ...this.activeFilters };

        const doctors = await this.fetchDoctors();

        return doctors;
    },

    // Call to the get doctors method in the service layer
    getDoctorList: async function () {
        const doctors = await this.fetchDoctors(); // Fetch doctors from the backend
        return this.filterDoctors(doctors); // Apply filters to the fetched doctors
    },

    async fetchDashboardData() {
        try {
            if (!localStorage.getItem("jwtToken") || this.isTokenExpired(localStorage.getItem("jwToken"))) {
                await this.getSuperToken();
            }

            const [doctors] = await Promise.all([
                this.fetchDoctors()
            ]);

            //console.log(`Is doctors populated?\n${JSON.stringify(doctors, null, 2)}`);

            //console.log("Doctors Before Extracting:", JSON.stringify(doctors, null, 2));

            if (!Array.isArray(doctors) || doctors.length === 0) {
                console.error("Doctors data is invalid:", doctors);
                return { doctors: [], specialties: [] }; // Prevent errors
            }

            const specialties = this.getSpecialties(doctors);

            console.log(`Specialties:\n${JSON.stringify(specialties, null, 2)}`);

            return {
                doctors: doctors,
                specialties: specialties
            };
        } catch (error) {
            console.error("Error fetching dashboard data: ", error);
            return { doctors: [], specialties: [] };
        }
    },

    // Fetch doctors and their ratings in one function call
    //async fetchDoctors() {
    //    try {
    //        const response = await axiosInstance.get("/doctor/", {
    //            headers: {
    //                "Content-Type": "application/json",
    //                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    //            }
    //        });

    //        const doctors = response.data;

    //        // Fetch ratings for all doctors concurrently using Promise.all
    //        const doctorsWithRatings = await Promise.all(
    //            doctors.map(async (doctor) => {
    //                const rating = await this.getDoctorRating(doctor.user_id);
    //                const percentRating = Math.round(parseFloat(rating) * 10);
    //                const user = await this.getUserInfo(doctor.user_id);

    //                return {
    //                    ...doctor,
    //                    user: user,
    //                    rating: percentRating,
    //                    acceptingPatients: user.accepting_patients
    //                };
    //            })
    //        );

    //        //console.log(`Is it an array: ${Array.isArray(doctorsWithRatings)}\nDoctors With Ratings: ${doctorsWithRatings}`);

    //        return doctorsWithRatings;
    //    } catch (error) {
    //        console.error("Error fetching doctors or ratings:", error);
    //        return [];
    //    }
    //},

    async fetchDoctors() {
        try {
            const response = await axiosInstance.get("/doctor/", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            });

            const doctors = response.data;

            if (!Array.isArray(doctors) || doctors.length === 0) {
                console.error("No doctors returned from API:", doctors);
                return [];
            }

            // Fetch ratings and user info concurrently
            const doctorsWithRatings = await Promise.all(
                doctors.map(async (doctor) => {
                    const rating = await this.getDoctorRating(doctor.user_id);
                    const percentRating = Math.round(parseFloat(rating) * 10);
                    const user = await this.getUserInfo(doctor.user_id);

                    return {
                        ...doctor,
                        user: user,
                        rating: percentRating,
                        acceptingPatients: user.accepting_patients,
                    };
                })
            );

            console.log("Doctors with ratings:", doctorsWithRatings);

            return doctorsWithRatings;
        } catch (error) {
            console.error("Error fetching doctors or ratings:", error);
            return [];
        }
    },


    // Fetch rating for a specific doctor
    async getDoctorRating(id) {
        try {
            const response = await axiosInstance.get(`/doctor/${id}/ratings`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            return response.data.average_rating;
        } catch (error) {
            console.error("Error fetching doctor rating:", error);
            return "0";
        }
    },

    async getUserInfo(userId) {
        try {
            const response = await axiosInstance.get(`/user/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    },

    // Function to add a doctor
    async addDoctor(userId) {
        const payload = {
            patient_id: userId,
            doctor_id: this.doctorId
        }

        console.log(`Patient ${userId} is adding doctor ${this.doctorId}\n${JSON.stringify(payload, null, 2)}`);

        try {
            const response = await axiosInstance.post(`/request/patient/${userId}/doctor/${this.doctorId}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            const user = response.data
            console.log("Doctor successfully added!\n ", JSON.stringify(user, null, 2));
        } catch (error) {
            console.error("Error adding a doctor:", error);
        }
    },

    // Call to the get specialties method in the service layer
    //getSpecialties(doctors) {
    //    console.log("Doctors Inside The Passed Parameter:", JSON.stringify(doctors, null, 2));
    //    console.log("Is Doctors An Array?", Array.isArray(doctors));

    //    if (!Array.isArray(doctors)) {
    //        console.error("Doctors is not an array:", doctors);
    //        return [];
    //    }

    //    const specialties = doctors.map((doctor) => doctor.specialization);

    //    //console.log(`Specialties:\n${JSON.stringify(specialties, null, 2)}`);

    //    // Convert specialties into objects that can be inputted into the Select List component
    //    return specialties.map((specialty) => ({
    //        label: specialty,
    //        value: specialty.replace(/\s+/g, "").toLowerCase() // Formats value for consistency
    //    }));
    //},

    getSpecialties(doctors) {
        if (!Array.isArray(doctors) || doctors.length === 0) {
            console.error("Invalid or empty doctors array:", doctors);
            return [];
        }

        // Extract and deduplicate specialties
        const specialtiesSet = new Set();
        doctors.forEach((doctor) => {
            if (doctor.specialization) {
                specialtiesSet.add(doctor.specialization.trim());
            }
        });

        // Convert the Set to an array of objects for the Select List component
        return Array.from(specialtiesSet).map((specialty) => ({
            label: specialty,
            value: specialty.replace(/\s+/g, "").toLowerCase(), // Format value for consistency
        }));
    },


    // Call to the get ratings method in the service layer
    getRatings: function () {
        return ratings;
    },

    // Call to the get specialties method in the service layer
    //getSpecialties: function () {
    //    return specialties;
    //},

    // Fetch doctors from the backend
    //async fetchDoctors() {
    //    try {
    //        const response = await axiosInstance.get("/doctor/", {
    //            headers: {
    //                "Content-Type": "application/json",
    //                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    //            }
    //        });

    //        console.log(`Doctors fetched: ${response.data}`);

    //        const rating = await this.getDoctorRating(response.data.user_id);

    //        const percentRating = Math.round(parseFloat(rating) * 10);

    //        const payload = {
    //            id: response.data.user_id,
    //            name: response.data.name,
    //            specialization: response.data.specialization,
    //            rating: percentRating
    //        }

    //        return payload;

    //        //return response.data.map((doctor, i) => ({
    //        //    ...doctor,
    //        //    rating: `${80 + (i % 5) * 5}%`,
    //        //    acceptingNewPatients: i % 2 === 0
    //        //}));
    //    }
    //    catch (error) {
    //        console.error("Error fetching doctors: ", error);
    //        return [];
    //    }
    //},

    //async getDoctorRating(id) {
    //    try {
    //        const response = await axiosInstance.get(`/doctor/${id}/ratings`, {
    //            headers: {
    //                "Content-Type": "application/json",
    //                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    //            }
    //        });

    //        const rating = response.data.average_rating;

    //        console.log(`Rating fetched: ${rating}`);
    //        return
    //    } catch (error) {
    //        console.error("Error fetching doctor rating: ", error);
    //    }
    //},
};

export default FindDoctorViewModel;