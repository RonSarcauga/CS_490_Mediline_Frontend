import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../../assets/css/default-style.css';
import '../../assets/scss/default-style.scss';
import HomePage from './Home';
import LoginPage from './login';
import RegisterPage from './Register';
import FindADoctorPage from './FindADoctor';
import DiscussionForumPage from './DiscussionForumPage';
import PDHome from './PDHome';
import PDAppointment from './PDAppointment';
import PDProfile from './PDProfile';
import PDFindDoctor from './PDFindDoctor';
import PDDiscussionForum from './PDDiscussionForum';
import DDHome from './DDHome';
import DDProfile from './DDProfile';
import DDAppointment from './DDAppointment';
import PHHome from './PHHome';
import PHPatient from './PHPatient';
import DashboardLayout from './DashboardLayout';
import UserProvider from '../../context/UserProvider';
import PatientDashboardHome from './PatientDashboardHome';
import Dashboard from './PatientDashboard_Exercise_Page';
import DoctorDashboardHome from './DoctorDashboardHome';
import DoctorPatientProfile from './DoctorPatientProfile';
import DoctorAppointment from './DoctorAppointment';
import PatientAppointment from './PatientAppointment';
import PharmacistHome from './PharmacistHome';
import PharmacistPatientProfile from './PharmacistPatientProfile';
import ErrorBoundary from './ErrorBoundary';

const queryClient = new QueryClient();

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
            {
                path: 'patient',
                element: <PDHome />,
            },
            {
                path: 'patient/profile',
                element: <PDProfile />,
            },
            {
                path: 'patient/profile/find-a-doctor',
                element: <PDFindDoctor />,
            },
            {
                path: 'patient/appointment',
                element: <PDAppointment />,
            },
            {
                path: 'patient/discussion-forum',
                element: <PDDiscussionForum />,
            },
            {
                path: 'doctor',
                element: <DDHome />,
            },
            {
                path: 'doctor/profile',
                element: <DDProfile />
            },
            {
                path: 'doctor/profile/:patientId',
                element: <DDProfile />
            },
            {
                path: 'doctor/appointment',
                element: <DDAppointment />
            },
            {
                path: 'doctor/discussion-forum',
                element: <PDDiscussionForum />,
            },
            {
                path: 'pharmacist',
                element: <PHHome />,
            },
            {
                path: 'pharmacist/profile',
                element: <PHPatient />,
            },
            {
                path: 'pharmacist/discussion-forum',
                element: <PDDiscussionForum />,
            },
        ],
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
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <ErrorBoundary>
                    <RouterProvider router={router} />
                </ErrorBoundary>
            </UserProvider>
        </QueryClientProvider>
    </StrictMode>
  );