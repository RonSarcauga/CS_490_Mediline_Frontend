import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import '../../assets/css/default-style.css';
import HomePage from './home';
import Dashboard from './dashboard';
import LoginPage from './login';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
