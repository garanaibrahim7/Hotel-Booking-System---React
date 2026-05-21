import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Bookings from '../pages/Bookings';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/Layout';
import Rooms from '../pages/Rooms';
import StaySummary from '../pages/StaySummary';
import Checkout from '../pages/Checkout';
import Booking from '../pages/Booking';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/rooms', element: <Rooms /> },
            { path: '/login', element: <Login /> },
            { path: '/stay-list', element: <StaySummary /> },
            { path: '/checkout', element: <Checkout /> },
            { path: '/booking-status', element: <Booking /> },
            { path: '/booking-status/:id', element: <Booking /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: '/bookings', element: <Bookings />, }
                ],
            },
            { path: '*', element: <div className="text-center py-5 d-flex flex-column justify-content-center" style={{ height: '95vh' }}><h2 className="headingfonts">404 - Page Not Found</h2><p className="text-muted">The page you're looking for doesn't exist.</p></div> },
        ],
    },
]);

