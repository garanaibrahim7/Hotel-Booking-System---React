import React, { useEffect, useState } from 'react';
import { useGetBookingDetailsQuery } from '../redux/store/apiSlice';
import BookingPayment from '../components/booking/BookingPayment';
import BookingDetails from '../components/booking/BookingDetails';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import '../echo';

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id: urlBookingId } = useParams();

    const routerState = location.state || {};
    const isInitialized = routerState.isInitialized || false;

    const initialPayload = routerState.payload?.data || routerState.payload || null;

    const [bookingId, setBookingId] = useState(
        initialPayload?.booking_id || initialPayload?.id || urlBookingId || ''
    );

    useEffect(() => {
        if (initialPayload?.booking_id || initialPayload?.id) {
            setBookingId(initialPayload.booking_id || initialPayload.id);
        } else if (urlBookingId) {
            setBookingId(urlBookingId);
        }
    }, [initialPayload, urlBookingId]);

    const { data: bookingData, isLoading, error, refetch } = useGetBookingDetailsQuery(bookingId, {
        skip: isInitialized || !bookingId,
    });

    useEffect(() => {
        if (!bookingId) return;

        const channel = window.Echo.channel(`booking-tracker.${bookingId}`);

        channel.listen('.PaymentStatusProcessed', (e) => {
            console.log('Update received via WebSockets:', e);

            if (e.success) {
                navigate(`/booking-status/${bookingId}`, {
                    replace: true,
                    state: { isInitialized: false, payload: null }
                });

                refetch();
            }
        });

        return () => {
            window.Echo.leaveChannel(`booking-tracker.${bookingId}`);
        };
    }, [bookingId, navigate, refetch]);

    if (isInitialized && initialPayload?.payment_url) {
        return (
            <div className="container py-5 mt-4">
                <BookingPayment stripeUrl={initialPayload.payment_url} />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="container py-5 mt-5 text-center text-dark">
                <h4>Fetching Your Reservation Ledger...</h4>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5 mt-5 text-center text-danger">
                <h4>{error?.data?.message || 'Booking details not found.'}</h4>
            </div>
        );
    }

    if (bookingData) {
        return (
            <div className="container py-5 mt-4">
                <BookingDetails data={bookingData} />
            </div>
        );
    }

    return (
        <div className="container py-5 mt-5 text-center text-muted">
            <i className="bi bi-folder-x display-1 opacity-25"></i>
            <h4 className="mt-3 text-uppercase fw-bold">No Active Reservation Selected</h4>
        </div>
    );
};

export default Booking;