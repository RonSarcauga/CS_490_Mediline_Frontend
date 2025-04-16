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

        // Add the new user to the base user list
        const updatedUserList = [...baseUserList, newUser];
        localStorage.setItem("baseUserList", JSON.stringify(updatedUserList));
        console.log("Updated Users List in localStorage:", JSON.parse(localStorage.getItem("baseUserList")));
        //baseUserList.push(newUser);

        console.log("Users: ", baseUserList);

        // Clear the input fields after successful registration
        this.clearFields();

        // Return the newly added user
        return newUser;
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