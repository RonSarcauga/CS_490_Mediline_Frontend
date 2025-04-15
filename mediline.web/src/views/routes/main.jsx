import { StrictMode, useState, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import '../../assets/css/default-style.css';
import '../../assets/scss/default-style.scss';
import HomePage from './Home';
import PatientDashboard from './PatientDashboard';
import LoginPage from './Login';
import RegisterPage from './Register';
import FindADoctorPage from './FindADoctor';
import DiscussionForumPage from './DiscussionForumPage';
import PDDiscussionForum from './PDDiscussionForum';
import DashboardLayout from './DashboardLayout'

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            { path: 'patient', element: <PDDiscussionForum /> },
        ],
    },
    {
        path: '/patientDashboard',
        element: <PDDiscussionForum />,
    },
    {
        path: '/findADoctor',
        element: <FindADoctorPage />,
    },
    {
        path: '/discussionForumPage',
        element: <DiscussionForumPage />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </StrictMode>,
);
