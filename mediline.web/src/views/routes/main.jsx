import { StrictMode } from 'react';
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
import DoctorDashboardHome from './DoctorDashboardHome';
import DoctorPatientProfile from './DoctorPatientProfile';
import DoctorAppointment from './DoctorAppointment';

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
    {
        path: '/doctorHome',
        element: <DoctorDashboardHome />,
    },
    {
        path: '/doctorPatient',
        element: <DoctorPatientProfile />,
    },
    {
        path: '/doctorAppointment',
        element: <DoctorAppointment />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
