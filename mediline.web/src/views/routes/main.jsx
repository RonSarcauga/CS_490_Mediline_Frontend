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
import PDHome from './PDHome';
import PDDiscussionForum from './PDDiscussionForum';
import DashboardLayout from './DashboardLayout';
import UserProvider from '../../context/UserProvider';

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
                path: 'patient/discussion-forum',
                element: <PDDiscussionForum />,
            }
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
