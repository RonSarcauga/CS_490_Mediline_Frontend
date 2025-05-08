//import { specialties, ratings, } from '../assets/js/const';
//import { useDoctors } from '../hooks/useDoctors';

//const FindDoctorViewModel = {
//    // Contains the data to be displayed in the view
//    filters: {
//        name: "",
//        specialty: "",
//        rating: "",
//        acceptingNewPatients: false,
//        search: "",
//        setByDropdown: false,
//    },

//    // Stores and manages the active filters
//    activeFilters: {
//        name: "",
//        specialty: "",
//        rating: "",
//        acceptingNewPatients: false,
//        search: "",
//        setByDropdown: false,
//    },

//    doctorId: null,

//    filterByURL: false,

//    // Helper functions which would be used to make calls to the appropriate methods in the service layer

//    // Call to the update filter method in the service layer
//    updateFilter: function (field, value) {
//        this.activeFilters[field] = value;
//    },

//    // Call to the apply filter method in the service layer
//    applyFilters() {
//        this.filters = { ...this.activeFilters };
//    },

//    // Call to the update search filter method in the service layer
//    updateSearch: function (query) {
//        this.activeFilters.search = query;
//        console.log("Search String: ", query);

//        // Determines if the filter has already been applied in a dropdown
//        if (!query.trim()) {
//            this.activeFilters.name = "";
//            if (!this.activeFilters.setByDropdown) {
//                this.activeFilters.specialty = "";
//            }
//            return;
//        }

//        // Check if the query matches a specialty label
//        const isSpecialty = specialties.some((s) => s.label.toLowerCase() === query.toLowerCase());

//        if (isSpecialty && !this.activeFilters.setByDropdown) {
//            // If the query matches a specialty label and specialty is not set by the SelectList
//            this.activeFilters.specialty = specialties.find((s) => s.label.toLowerCase() === query.toLowerCase())?.value;
//            this.activeFilters.name = "";
//        }
//        else {
//            // Assume it's a name search and update only the name filter
//            this.activeFilters.name = query;
//            if (!this.activeFilters.setByDropdown) {
//                this.activeFilters.specialty = "";
//            }
//        }
//    },

//    // Call to the clear filters method in the service layer
//    clearFilters: function () {
//        this.activeFilters = {
//            name: "",
//            specialty: "",
//            rating: "",
//            search: "",
//            acceptingNewPatients: false,
//        };
//        this.applyFilters();
//    },

//    // Call to the get doctors method in the service layer
//    getDoctorList: function () {
//        return useDoctors(this.filters);
//    },

//    // Fetch doctors from the backend
//    async fetchDoctors() {
//        try {
//            const response = await apiClient.get("/doctor/", { params: this.activeFilters });
//            return response.data.map((doctor, i) => ({
//                ...doctor,
//                rating: `${80 + (i % 5) * 5}%`,
//                acceptingNewPatients: i % 2 === 0
//            }));
//        }
//        catch (error) {
//            console.error("Error fetching doctors: ", error);
//            return [];
//        }
//    },

//    // Call to the get specialties method in the service layer
//    getSpecialties: function () {
//        return specialties;
//    },

//    // Call to the get ratings method in the service layer
//    getRatings: function () {
//        return ratings;
//    },
//};

//export default FindDoctorViewModel;

import { specialties, ratings, doctorList } from '../assets/js/const';
import axiosInstance from '../assets/js/api';

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

    doctorId: null,

    filterByURL: false,

    // Helper functions which would be used to make calls to the appropriate methods in the service layer
    filterDoctors: function (doctors) {
        const { name, specialty, rating, acceptingNewPatients } = this.filters;

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
            const matchesAcceptance = !acceptingNewPatients || doctor.acceptingNewPatients;

            return matchesName && matchesSpecialty && matchesRating && matchesAcceptance;
        });
    },

    // Call to the update filter method in the service layer
    updateFilter: function (field, value) {
        this.activeFilters[field] = value;
    },

    // Call to the apply filter method in the service layer
    applyFilters() {
        this.filters = { ...this.activeFilters };
    },

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
    clearFilters: function () {
        this.activeFilters = {
            name: "",
            specialty: "",
            rating: "",
            search: "",
            acceptingNewPatients: false,
        };
        this.applyFilters();
    },

    // Call to the get doctors method in the service layer
    getDoctorList: function () {
        return doctorList.filter((doctor) => {
            const { name, specialty, rating, acceptingNewPatients } = this.filters;

            // Converts the rating and rating range to numerical values
            const [minRating, maxRating] = rating ? rating.split('-').map((r) => parseFloat(r.replace('%', ''))) : [null, null];
            const doctorRating = parseFloat(doctor.rating.replace('%', ''));

            // Maps the value returned by the select list to the appropriate label in the specialties list
            const specialtyLabel = specialties.find((s) => s.value === specialty)?.label;

            // Filtering logic (this should be performed by the back end)
            const matchesName = !name || doctor.label.toLowerCase().includes(name.toLowerCase());
            const matchesSpecialty = !specialty || doctor.specialty.toLowerCase() === specialtyLabel.toLowerCase();
            const matchesRating = !rating || (doctorRating >= minRating && doctorRating <= maxRating);
            const matchesAcceptance = !acceptingNewPatients || doctor.acceptingNewPatients;

            return matchesName && matchesSpecialty && matchesRating && matchesAcceptance;
        });
    },

    async fetchDashboardData() {
        try {
            const [doctors] = await Promise.all([
                this.fetchDoctors()
            ]);

            //console.log(`Is doctors populated?\n${JSON.stringify(doctors, null, 2)}`);

            console.log("Doctors Before Extracting:", JSON.stringify(doctors, null, 2));

            if (!Array.isArray(doctors) || doctors.length === 0) {
                console.error("Doctors data is invalid:", doctors);
                return { doctors: [], specialties: [] }; // Prevent errors
            }

            const specialties = this.getSpecialties(doctors);

            return {
                doctors: doctors,
                specialties: specialties
            };
        } catch (error) {
            console.error("Error fetching dashboard data: ", error);
            return null;
        }
    },

    // Fetch doctors and their ratings in one function call
    async fetchDoctors() {
        try {
            const response = await axiosInstance.get("/doctor/", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            const doctors = response.data;

            // Fetch ratings for all doctors concurrently using Promise.all
            const doctorsWithRatings = await Promise.all(
                doctors.map(async (doctor) => {
                    const rating = await this.getDoctorRating(doctor.user_id);
                    const percentRating = Math.round(parseFloat(rating) * 10);

                    return {
                        ...doctor,
                        rating: percentRating
                    };
                })
            );

            //console.log(`Is it an array: ${Array.isArray(doctorsWithRatings)}\nDoctors With Ratings: ${doctorsWithRatings}`);

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

    // Call to the get specialties method in the service layer
    getSpecialties(doctors) { 
        console.log("Doctors Inside The Passed Parameter:", JSON.stringify(doctors, null, 2));
        console.log("Is Doctors An Array?", Array.isArray(doctors));

        if (!Array.isArray(doctors)) {
            console.error("Doctors is not an array:", doctors);
            return [];
        }

        const specialties = doctors.map((doctor) => doctor.specialization);

        // Convert specialties into objects that can be inputted into the Select List component
        return specialties.map((specialty) => ({
            label: specialty,
            value: specialty.replace(/\s+/g, "").toLowerCase() // Formats value for consistency
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