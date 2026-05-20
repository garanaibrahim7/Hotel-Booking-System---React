import React, { useState, useEffect } from 'react';
import { useApplyCouponMutation, useRemoveCouponMutation, useGetCheckoutDetailsQuery } from '../redux/store/apiSlice';
import GuestDetailsForm from '../components/checkout/GuestDetailsForm';
import SidePanel from '../components/checkout/SidePanel';


const Checkout = () => {
    const { data: serverData, isLoading, error } = useGetCheckoutDetailsQuery();
    const [applyCoupon] = useApplyCouponMutation();
    const [removeCoupon] = useRemoveCouponMutation();

    // console.log(serverData);

    const data = serverData?.data;

    const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '', instruction: '' });
    const [formErrors, setFormErrors] = useState({});
    const [couponErrorMsg, setCouponErrorMsg] = useState('');

    // Pre-populate input fields with active user defaults from manifest metadata session
    useEffect(() => {
        if (serverData?.success) {
            // Mocked or mapped straight from logged-in server variables contexts
            setGuestInfo(prev => ({
                ...prev,
                name: data?.user?.name || '',
                email: data?.user?.email || '',
                phone: data?.user?.phone || '',
            }));
        }
    }, [data]);

    if (isLoading) return <div className="container py-5 mt-5 text-center"><h4>Assembling Checkout Parameters...</h4></div>;
    if (error || !serverData?.success) {
        return (
            <div className="container py-5 mt-5 text-center text-danger">
                <h4>{error?.message || 'Failed initializing checkout context manifest. Verification failed.'}</h4>
            </div>
        );
    }

    const checkoutPayload = data;
    const coupon_code = data.discountCode;

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setGuestInfo(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleCouponApply = async (codeString) => {
        setCouponErrorMsg('');
        try {
            const response = await applyCoupon({
                couponCode: codeString,
                totalAmount: checkoutPayload.finalActualTotal,
                hotelId: checkoutPayload.hotel.id,
                userCountryId: checkoutPayload.userCountryId,
                nights: checkoutPayload.nights
            }).unwrap();

            if (!response.status) {
                setCouponErrorMsg(response.error || 'Invalid Coupon Code configuration.');
            }
            console.log(response);
            // ----------------------------------------------------------------------
            // ----------------------------------------------------------------------
            // ------------------- Have to Manage This ------------------------------
            // ----------------------------------------------------------------------
            // ----------------------------------------------------------------------
        } catch (err) {
            setCouponErrorMsg('Network failure parsing discount token.');
        }
    };

    const handleCouponRemove = async () => {
        setCouponErrorMsg('');
        try {
            await removeCoupon().unwrap();
        } catch (err) {
            console.error("Failed clear coupon endpoint allocation:", err);
        }
    };

    const handleBookingVerificationSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        // Basic standard form validations lines mapping backend constraints
        if (!guestInfo.name.trim()) errors.name = 'Full Client Verification name string field required.';
        if (!guestInfo.email.trim()) errors.email = 'Email address line context parameter required.';
        if (!guestInfo.phone.trim()) errors.phone = 'Active primary contact phone context allocation required.';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Prepare complete form submission body
        const bookingPayload = {
            ...guestInfo,
            check_in: checkoutPayload.checkIn,
            check_out: checkoutPayload.checkOut,
            coupon_code: coupon_code || '',
            payment_method: 'stripe',
            room_requirements: checkoutPayload.rooms.map(room => `${room.id}:1`),
        };

        console.log("Dispatching secure complete booking sequence manifest:", bookingPayload);
        // Wire up an explicit route redirection window line or trigger your final post-booking mutation:
        // window.location.href = 'http://localhost:8000/booking/checkout/process';
        alert('Booking processing initialized securely via structural payload!');
    };

    return (
        <div className="container py-5 mt-5">
            <div className="row g-0 shadow-lg border">

                {/* Left Input Section Column */}
                <div className="col-lg-8 bg-white">
                    <GuestDetailsForm
                        formData={guestInfo}
                        onChange={handleFormChange}
                        onSubmit={handleBookingVerificationSubmit}
                        errors={formErrors}
                    />
                </div>

                {/* Right Aggregate Summary Side Column Panel Box */}
                <div className="col-lg-4 bg-light">
                    <SidePanel
                        payload={checkoutPayload}
                        couponCode={coupon_code}
                        onApplyCoupon={handleCouponApply}
                        onRemoveCoupon={handleCouponRemove}
                        couponError={couponErrorMsg}
                    />
                </div>

            </div>
        </div>
    );
};

export default Checkout;