//const LoginViewModel = {
//    email: "",
//    password: "",

//    clearFields() {
//        this.email = "";
//        this.password = "";
//    },
//};

//export default LoginViewModel;

import { baseUserList } from '../assets/js/const';
import axiosInstance from '../assets/js/api';

const LoginViewModel = {
    // Input fields for the login page
    email: "",
    password: "",

    // Helper function to call the login method in the service layer
    login() {
        if (!this.email || !this.password) {
            throw new Error("Email and password are required.");
        }

        // Fetch the user data from the "backend"
        const users = JSON.parse(localStorage.getItem("baseUserList"));
        const user = users.find((u) => u.email === this.email);

        if (user && user.password === this.password) {
            // Mock successful authentication
            return {
                success: true,
                user,
            };
        } else {
            // Mock failed authentication
            throw new Error("Invalid email or password.");
        }
    },

    // Clear input fields after login attempt
    clearFields() {
        this.email = "";
        this.password = "";
    },
};

export default LoginViewModel;
