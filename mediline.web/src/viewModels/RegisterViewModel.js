import { baseUserList } from '../assets/js/const';

const RegisterViewModel = {
    // Properties of the view model
    // These properties are used to bind data from the view (UI) to the view model
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    accountType: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    specialty: "",
    pharmacyName: "",
    pharmacyAddress: "",

    // Helper function that calls the "addUser" method in the service layer
    addUser() {
        console.log("Users: ", baseUserList);

        // Basic validation
        if (
            !this.firstname ||
            !this.lastname ||
            !this.email ||
            !this.dateOfBirth ||
            !this.accountType ||
            !this.password ||
            this.password !== this.confirmPassword
        ) {
            throw new Error("Invalid input: Ensure all required fields are filled and passwords match.");
        }

        // Generate a unique ID for the new user
        const newUserId = baseUserList.length > 0 ? baseUserList[baseUserList.length - 1].id + 1 : 1;

        // Construct the new user object
        const newUser = {
            id: newUserId,
            firstName: this.firstname,
            lastName: this.lastname,
            dateOfBirth: this.dateOfBirth,
            email: this.email,
            phoneNumber: this.phone,
            address: this.address,
            city: this.city,
            state: this.state,
            zipCode: this.postalCode,
            role: this.accountType,
            password: this.password,
            ...(this.accountType === "doctor" && {
                licenseNumber: this.licenseNumber,
                specialty: this.specialty,
            }),
            ...(this.accountType === "pharmacist" && {
                pharmacyName: this.pharmacyName,
                pharmacyAddress: this.pharmacyAddress,
            }),
        };

        // Check the role of the registered user
        if (this.role === "patient")
        {
            // Generate a random but unique 6-digit MRN here
        }
        if (this.role === "doctor") {
            // Populate with doctor fields
            licenseNumber: this.licenseNumber,

        }

        // Add the new user to the base user list
        const updatedUserList = [...baseUserList, newUser];
        localStorage.setItem("baseUserList", JSON.stringify(updatedUserList));
        console.log("Updated Users List in localStorage:", JSON.parse(localStorage.getItem("baseUserList")));

        console.log("Users: ", baseUserList);

        // Clear the input fields after successful registration
        this.clearFields();

        // Return the newly added user
        return newUser;
    },

    // Helper function that registers a user and creates a role-specific entry
    addUser() {
        console.log("Users Before Registration: ", baseUserList);

        // Basic validation
        if (
            !this.firstname ||
            !this.lastname ||
            !this.email ||
            !this.dateOfBirth ||
            !this.address ||
            !this.city ||
            !this.state ||
            !this.postalCode ||
            !this.accountType ||
            !this.password ||
            !this.confirmPassword
        ) {
            throw new Error("Invalid input: Ensure all required fields are filled.");
        }

        // Ensure the user doesn't already exist
        const existingUser = baseUserList.find(user => user.email === this.email);
        if (existingUser) {
            throw new Error("User already exists: " + this.email);
        }

        // Generate unique incremental ID for the new base user
        const newUserId = baseUserList.length > 0 ? baseUserList[baseUserList.length - 1].id + 1 : 1;

        // Create the new base user object
        const newUser = {
            id: newUserId,
            firstName: this.firstname,
            lastName: this.lastname,
            email: this.email,
            dateOfBirth: this.dateOfBirth,
            accountType: this.accountType,
            password: this.password
        };

        // Add user to base user list
        baseUserList.push(newUser);
        localStorage.setItem("baseUserList", JSON.stringify(baseUserList));

        // Create an associated record in the role-specific table
        if (this.accountType === "patient") {
            const newPatient = {
                userId: newUserId,
                mrn: generateRandomMRN(patientDataList),
                sex: this.sex || "Not Specified",
                doctor: null, // No doctor assigned by default
                appointments: [] // No appointments yet
            };
            patientDataList.push(newPatient);
        } else if (this.accountType === "doctor") {
            const newDoctor = {
                userId: newUserId,
                licenseNumber: this.licenseNumber,
                specialty: this.specialty,
                patients: [],
                appointments: [],
                acceptingNewPatients: true
            };
            doctorDataList.push(newDoctor);
        }

        console.log("Updated Base User List: ", baseUserList);
        console.log("Updated Patient Data: ", patientDataList);
        console.log("Updated Doctor Data: ", doctorsList);

        // Clear input fields after successful registration
        this.clearFields();

        return newUser;
    },

    // Helper function for generating a unique MRN
    generateRandomMRN(existingPatients) {
        let newMRN;
        do {
            newMRN = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit number
        } while (existingPatients.some(patient => patient.mrn === newMRN)); // Ensure uniqueness
        return newMRN;
    },

    // Helper method that calls the service layer
    clearFields() {
        this.firstname = "";
        this.lastname = "";
        this.dateOfBirth = "";
        this.accountType = "";
        this.email = "";
        this.phone = "";
        this.address = "";
        this.city = "";
        this.state = "";
        this.postalCode = "";
        this.password = "";
        this.confirmPassword = "";
        this.licenseNumber = "";
        this.specialty = "";
        this.pharmacyName = "";
        this.pharmacyAddress = "";
    },
};

export default RegisterViewModel;