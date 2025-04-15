import { baseUserList } from '../assets/js/const';

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
        const user = baseUserList.find((u) => u.email === this.email);

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

    getUsers() {
        return JSON.parse(localStorage.getItem("baseUserList")) || baseUserList;
    }

    // Clear input fields after login attempt
    clearFields() {
        this.email = "";
        this.password = "";
    },
};

export default LoginViewModel;