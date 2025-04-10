import { specialties, ratings, doctorList } from '../assets/js/const';

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

    // Call to the get specialties method in the service layer
    getSpecialties: function () {
        return specialties;
    },

    // Call to the get ratings method in the service layer
    getRatings: function () {
        return ratings;
    },
};

export default FindDoctorViewModel;