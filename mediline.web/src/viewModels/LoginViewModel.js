import axiosInstance from '../assets/js/api';

const LoginViewModel = {
    // Inout fields for the login form
    email: "",
    password: "",

    // Method to clear out the fields for the login form
    clearFields() {
        this.email = "";
        this.password = "";
    },

    getPayload() {
        const payload = {
            username: this.email,
            password: this.password
        };

        console.log(JSON.stringify(payload, null, 2));

        return payload;
    },

    // Asynchronous login method
    async login() {
        // Checks for an email or password inside the input fields
        if (!this.email || !this.password) {
            throw new Error("Email and password are required.");
        }

        // Fetch the payload from the form data
        const payload = this.getPayload();
        console.log(payload);

        try {
            // Retrieving data from the login endpoint
            const response = await axiosInstance.post('/auth/login', payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(`Login successful:\n${JSON.stringify(response.data, null, 2)}`);

            // Stores the user object
            const user = await this.fetchUserData(response.data.user_id);

            // Combines the necessary fields
            const currentUser = {
                user_id: user.user_id,
                role: response.data.account_type,
                address1: user.address1,
                address2: user.address2,
                city: user.city,
                country: user.country,
                dob: user.dob,
                doctor: null,
                email: user.email,
                firstName: user.first_name,
                sex: user.gender,
                lastName: user.last_name,
                pharmacy: null,
                phone: user.phone,
                state: user.state,
                zipcode: user.zipcode
            }

            // Confirm that the correct data is being passed
            console.log(`Current user: ${JSON.stringify(currentUser, null, 2)}`);
            return currentUser;
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    },

    // Asynchronous method for fetching user information
    // This can be used to get the registration fields from the user
    async fetchUserData(userId) {
        try {
            // HTTP Get
            // Gets user info from the API client
            const response = await axiosInstance.get(`/user/${userId}`);

            // Logs the data returned by the backend to the console
            console.log(`User information: ${JSON.stringify(response.data, null, 2)}`);

            // Returns a user data object to the 
            return response.data;
        }
        catch (error) {
            console.error("Error: ", error);
        }
    },
};

export default LoginViewModel;
