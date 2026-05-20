import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Bookings from '../pages/Bookings';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/Layout';
import Rooms from '../pages/Rooms';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/rooms', element: <Rooms /> },
            { path: '/login', element: <Login /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: '/bookings', element: <Bookings />, }
                ],
            },
        ],
    },
]);

