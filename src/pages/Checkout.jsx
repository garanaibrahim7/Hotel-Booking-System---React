import React, { useState, useEffect } from 'react';
import { useApplyCouponMutation, useRemoveCouponMutation, useGetCheckoutDetailsQuery, useProcessCheckoutMutation } from '../redux/store/apiSlice';
import GuestDetailsForm from '../components/checkout/GuestDetailsForm';
import SidePanel from '../components/checkout/SidePanel';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
    const { data: serverData, isLoading, error } = useGetCheckoutDetailsQuery();
    // const { data: processCheckoutData, isLoading: bookingProcessing, error: bookingProcessError } = useProcessCheckoutMutation();
    const [processCheckout, { isLoading: bookingProcessing, error: bookingProcessError }] = useProcessCheckoutMutation();

    const [applyCoupon] = useApplyCouponMutation();
    const [removeCoupon] = useRemoveCouponMutation();

    const data = serverData?.data;

    const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '', instruction: '' });
    const [checkoutPayload, setCheckoutPayload] = useState(null);
    const [couponCode, setCouponCode] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [couponErrorMsg, setCouponErrorMsg] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        if (serverData?.success) {
            setCheckoutPayload(data);
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

            if (response.status === 'success') {
                setCheckoutPayload(prev => ({
                    ...prev,
                    discountId: response.data.coupon_id,
                    discountCode: response.data.coupon_code,
                    discountAmount: response.data.discount_amount,
                    finalTotal: response.data.final_converted_amount,
                    finalActualTotal: response.data.final_amount,
                }));
                console.log(checkoutPayload);
            }
        } catch (err) {
            setCouponErrorMsg('Network failure parsing discount token.');
        }
    };

    const handleCouponRemove = async () => {
        setCouponErrorMsg('');
        try {
            const response = await removeCoupon().unwrap();
            console.log(response);
            setCheckoutPayload(prev => ({
                ...prev,
                discountId: null,
                discountCode: null,
                discountAmount: 0,
                finalTotal: response.data.finalTotal,
                // finalActualTotal: response.data.final_amount,
            }));

        } catch (err) {
            console.error("Failed clear coupon endpoint allocation:", err);
        }
    };

    const handleBookingVerificationSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!guestInfo.name.trim())
            errors.name = 'Full Client Verification name string field required.';
        if (!guestInfo.email.trim())
            errors.email = 'Email address line context parameter required.';
        if (!guestInfo.phone.trim())
            errors.phone = 'Active primary contact phone context allocation required.';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const bookingPayload = {
            ...guestInfo,
            check_in: checkoutPayload.checkIn,
            check_out: checkoutPayload.checkOut,
            coupon_code: checkoutPayload.discountCode || '',
            payment_method: 'stripe',
            room_requirements: checkoutPayload.rooms.map(room => `${room.id}:1`),
        };


        try {
            // console.log('Payload:', bookingPayload)
            const response = await processCheckout(bookingPayload).unwrap();
            if (response.success || response.status === 'success') {
                navigate('/booking-status', {
                    state: {
                        isInitialized: true,
                        payload: response.data
                        // booking_id: response.data.booking_id,
                    }
                });
            }
        } catch (err) {
            console.error("Payment Initialization Error: ", err);
            alert(err?.data?.message || 'Payment Initializatoin failed, Please try again.');
        }

        // window.location.href = '';
        // alert('Booking processing initialized securely via structural payload!');
    };

    if (checkoutPayload !== null)
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
                            couponCode={checkoutPayload.discountCode}
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