import apiClient from '../models/api';

const LoginViewModel = {
    // Inout fields for the login form
    email: "",
    password: "",

    // Method to clear out the fields for the login form
    clearFields() {
        this.email = "";
        this.password = "";
    },

    // Method to login
    async login() {
        // Checks for an email or password inside the input fields
        if (!this.email || !this.password) {
            throw new Error("Email and password are required.");
        }

        // Get the current user from the backend
        const currentUser = await this.getCurrentUser();

        // Check if the current user is null
        if (!currentUser) {
            throw new Error("Invalid email or password.");
        }
        else {
            return currentUser;
        }
    },

    // Asynchronous method for fetching user information
    // This can be used to get the registration fields from the user
    async fetchUserData(userId) {
        try {
            // HTTP Get
            // Gets user info from the API client
            const response = await apiClient.get(`/user/${userId}`);

            // Logs the data returned by the backend to the console
            // console.log(JSON.stringify(response.data, null, 2));

            // Returns a user data object to the 
            return response.data;
        }
        catch (error) {
            console.error("Error: ", error);
        }
    },

    // Asynchronous method for getting the current user
    // This will be used to store the current user into the User Provider
    async getCurrentUser() {
        try {
            // HTTP Post Request
            // Sends the username and email on the form to the backend
            const response = await apiClient.post(
                `/auth/login`,
                {
                    username: this.email,
                    password: this.password,
                }
            );

            // Stores the account type and the user IDs that are returned by the API
            const accountType = response.data.account_type;
            const userId = response.data.user_id;

            // Stores the object returned by the Fetch User Data method
            const userData = await this.fetchUserData(userId);

            // Logs the account type and user info
            // console.log(`Role: ${accountType}\nUser Data: ${JSON.stringify(userData, null, 2)}`);

            // Creates a current user object 
            const currentUser = {
                role: accountType,
                data: userData
            }
            //console.log(`Current user:\n${JSON.stringify(currentUser, null, 2)}}`);

            // Returns the current user object
            return currentUser;
        }
        catch (error) {
            console.error("Error: ", error);
        }
    }
};

export default LoginViewModel;
