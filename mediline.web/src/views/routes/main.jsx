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
import PDHome from './PDHome';
import PDAppointment from './PDAppointment';
import PDProfile from './PDProfile';
import PDFindDoctor from './PDFindDoctor';
import PDDiscussionForum from './PDDiscussionForum';
import DDHome from './DDHome';
import DDAccount from './DDAccount';
import DDProfile from './DDProfile';
import DDAppointment from './DDAppointment';
import PHHome from './PHHome';
import PHPatient from './PHPatient';
import DashboardLayout from './DashboardLayout';
import UserProvider from '../../context/UserProvider';
import PatientAppointment from './PatientAppointment';
import FindADoctorPage from './FindADoctor';
import DiscussionForumPage from './DiscussionForumPage';

//import RouteErrorPage from './RouteErrorPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    //errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          { path: 'patient', element: <PDHome /> },
          { path: 'patient/profile', element: <PDProfile /> },
          { path: 'patient/profile/find-a-doctor', element: <PDFindDoctor /> },
          { path: 'patient/appointment', element: <PDAppointment /> },
          { path: 'patient/discussion-forum', element: <PDDiscussionForum /> },

          { path: 'doctor', element: <DDHome /> },
          { path: 'doctor/profile', element: <DDAccount /> },
          { path: 'doctor/profile/:patientId', element: <DDProfile /> },
          { path: 'doctor/appointment', element: <PDAppointment /> },
          { path: 'doctor/discussion-forum', element: <PDDiscussionForum /> },

          { path: 'pharmacist', element: <PHHome /> },
          { path: 'pharmacist/profile', element: <PHPatient /> },
          { path: 'pharmacist/discussion-forum', element: <PDDiscussionForum /> },
        ],
      },

      { path: 'discussionForumPage', element: <DiscussionForumPage /> },
      { path: 'findADoctor', element: <FindADoctorPage /> },
      { path: 'chat', element: <PatientAppointment /> },
      {/* path: "/unauthorized",element: <RouteErrorPage message="Unauthorized: Please log in again." /> */},

    ],
  },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </QueryClientProvider>
    </StrictMode>
);