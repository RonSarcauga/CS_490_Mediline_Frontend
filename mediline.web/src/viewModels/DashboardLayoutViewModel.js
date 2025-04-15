import { baseUserList } from '../assets/js/const';

class DashboardLayoutViewModel {
    // Retrieves a list of users from the user table
    users = [...baseUserList];

    // Helper method to retrieve users
    getUsers() {
        return this.users; // Return the list of users that authored the posts
    }
};

export const dashboardLayoutViewModel = new DashboardLayoutViewModel();