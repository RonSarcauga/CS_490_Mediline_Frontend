import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import '../../assets/css/default-style.css';
import '../../assets/scss/default-style.scss';
import HomePage from './Home';
import LoginPage from './Login';
import RegisterPage from './Register';
import FindADoctorPage from './FindADoctor';
import DiscussionForumPage from './DiscussionForumPage';
import PDDiscussionForum from './PDDiscussionForum';
import PatientDashboard from './PatientDashboard';
import PatientDashboardHome from './PatientDashboardHome';
import Dashboard from './PatientDashboard_Exercise_Page';
import DashboardLayout from './DashboardLayout'
import DoctorDashboardHome from './DoctorDashboardHome';
import DoctorPatientProfile from './DoctorPatientProfile';
import DoctorAppointment from './DoctorAppointment';
import PatientAppointment from './PatientAppointment';
import PharmacistHome from './PharmacistHome';
import PharmacistPatientProfile from './PharmacistPatientProfile';

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
    },
    {
        path: '/patientDashboard',
        element: <PatientDashboard />,
    },
    {
        path: '/patientExercise',
        element: <Dashboard />,
    },
    {
        path: '/patientDiscussion',
        element: <PDDiscussionForum />,
    },
    {
        path: '/patientHome',
        element: <PatientDashboardHome />,
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
    {
        path: '/patientAppointment',
        element: <PatientAppointment />,
    },
    {
        path: '/pharmacistHome',
        element: <PharmacistHome />,
    },
    {
        path: '/pharmacistPatient',
        element: <PharmacistPatientProfile />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
