import { baseUserList } from '../assets/js/const';

class DashboardLayoutViewModel {
    // Retrieves a list of users from the user table
    users = [...baseUserList];

    // Helper method to retrieve users
    getUsers() {
        console.log(`Users Inside Local Storage: `, JSON.parse(localStorage.getItem("baseUserList")));
        return JSON.parse(localStorage.getItem("baseUserList")) || baseUserList;
        // return this.users; // Return the list of users that authored the posts
    }

    // Helper method to format a user's birthday
    formatBirthDate(birthDate) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const [month, day, year] = birthDate.split("/");
        const monthName = months[parseInt(month) - 1]; // Convert month number to name

        return `${monthName} ${parseInt(day)}, ${year}`;
    }

    // Helper method to calculate the age of a user
    calculateAge(birthDate) {
        const [month, day, year] = birthDate.split("/");
        const date = new Date(year, month - 1, day); // Convert to Date object
        const today = new Date();

        let age = today.getFullYear() - date.getFullYear();

        // Adjust age if the birthday hasn't occurred yet this year
        const hasBirthdayOccurred =
            today.getMonth() > date.getMonth() ||
            (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());

        return hasBirthdayOccurred ? age : age - 1;
    }

    // Helper method to change the format of the phone number
    formatPhoneNumber(phoneNumber)
    {
        // A regex patttern that is used to parse through the stored phone number
        const match = phoneNumber.match(/^(\d{3})-(\d{3})-(\d{4})$/);

        if (!match) {
            throw new Error("Invalid phone number format. Expected ###-###-####.");
        }

        // Extract matched groups and reformat
        return `(${match[1]}) ${match[2]} ${match[3]}`;
    }
};

export const dashboardLayoutViewModel = new DashboardLayoutViewModel();