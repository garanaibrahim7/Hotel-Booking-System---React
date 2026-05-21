import React, { useEffect, useState } from 'react';
import { useGetBookingDetailsQuery } from '../redux/store/apiSlice';
import BookingPayment from '../components/booking/BookingPayment';
import BookingDetails from '../components/booking/BookingDetails';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import '../echo';

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook for programmatic navigation
    const { id: urlBookingId } = useParams();

    const routerState = location.state || {};
    const isInitialized = routerState.isInitialized || false;
    const initialPayload = routerState.payload || null;    

    // Manage Booking ID State
    const [bookingId, setBookingId] = useState(
        initialPayload?.booking_id || initialPayload?.id || urlBookingId || ''
    );

    // Sync ID if URL or Payload changes
    useEffect(() => {
        if (initialPayload?.booking_id || initialPayload?.id) {
            setBookingId(initialPayload.booking_id || initialPayload.id);
        } else if (urlBookingId) {
            setBookingId(urlBookingId);
        }
    }, [initialPayload, urlBookingId]);

    // RTK Query Hook
    const { data: bookingData, isLoading, error, refetch } = useGetBookingDetailsQuery(bookingId, {
        skip: isInitialized || !bookingId,
    });

    // Real-time WebSocket Listener
    useEffect(() => {
        if (!bookingId) return;

        const channel = window.Echo.channel(`booking-tracker.${bookingId}`);

        channel.listen('.PaymentStatusProcessed', (e) => {
            console.log('Update received via WebSockets:', e);
            
            if (e.success) {
                // DIRECT NAVIGATE OVERRIDE:
                // Force route change to clear the initialization state and reload components natively
                navigate(`/booking-status/${bookingId}`, { 
                    replace: true, // Replaces history entry so back-button behavior remains clean
                    state: { isInitialized: false } // Wipe out the initialization flag completely
                });

                // If already on the status route, trigger manual cache invalidation
                if (!isInitialized) {
                    refetch();
                }
            }
        });

        // Cleanup listener on unmount
        return () => {
            window.Echo.leaveChannel(`booking-tracker.${bookingId}`);
        };
    }, [bookingId, isInitialized, navigate, refetch]);

    // View A: Ready for Payment
    if (isInitialized && initialPayload?.payment_url) {
        return (
            <div className="container py-5 mt-4">
                <BookingPayment stripeUrl={initialPayload.payment_url} />
            </div>
        );
    }

    // View B: Loading Data from Server
    if (isLoading) {
        return (
            <div className="container py-5 mt-5 text-center text-dark">
                <h4>Fetching Your Reservation Ledger...</h4>
            </div>
        );
    }

    // View C: Error State
    if (error) {
        return (
            <div className="container py-5 mt-5 text-center text-danger">
                <h4>{error?.data?.message || 'Booking details not found.'}</h4>
            </div>
        );
    }

    // View D: Success View with Real-Time Data
    if (bookingData) {
        return (
            <div className="container py-5 mt-4">
                <BookingDetails data={bookingData} />
            </div>
        );
    }

    // View E: Fallback / Empty State
    return (
        <div className="container py-5 mt-5 text-center text-muted">
            <i className="bi bi-folder-x display-1 opacity-25"></i>
            <h4 className="mt-3 text-uppercase fw-bold">No Active Reservation Selected</h4>
        </div>
    );
};

export default Booking;