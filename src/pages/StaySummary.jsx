import React, { useState } from 'react';
import { useGetStaySummaryQuery, useRemoveRoomFromStayMutation, useUpdateStayDatesMutation } from '../redux/store/apiSlice';
import SummaryRoomCard from '../components/summary/SummaryRoomCard';
import SummaryDatePickerCard from '../components/summary/SummaryDatePickerCard';
import SummaryPricingPanel from '../components/summary/SummaryPricingPanel';
import { Link, useNavigate } from 'react-router-dom';

const StaySummary = () => {

    const navigate = useNavigate();
    const { data: serverPayload, isLoading, error } = useGetStaySummaryQuery();
    const [updateDates] = useUpdateStayDatesMutation();
    const [removeItem, { isLoading: isRemoving }] = useRemoveRoomFromStayMutation();

    const [alertConfig, setAlertConfig] = useState({ show: false, message: '' });

    if (isLoading) return <div className="container py-5 mt-5 text-center"><h4>Loading Review Manifest...</h4></div>;


    const checkIn = serverPayload?.check_in || '';
    const checkOut = serverPayload?.check_out || '';

    const stay = serverPayload?.stay || {};
    // console.log(serverPayload);

    const summary = serverPayload?.summary || null;
    const itemsArray = stay; // || Object.entries(stay.items) || [];

    const handleDatesSubmit = async (dateObject) => {
        try {
            const response = await updateDates(dateObject).unwrap();
            if (response.message) {
                setAlertConfig({ show: true, message: response.message });
            } else {
                setAlertConfig({ show: false, message: '' });
            }
        } catch (err) {
            setAlertConfig({ show: true, message: 'Server context failed updating dates.' });
        }
    };

    const handleItemRemoval = async (itemId) => {
        try {
            await removeItem(itemId).unwrap();
            console.log("deleted");
            
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const executeCheckoutSequence = () => {
        navigate('/checkout');
    };

    if (itemsArray.length === 0 || !summary) {
        return (
            <div className="container py-5 mt-5">
                <div className="row justify-content-center py-5">
                    <div className="col-md-6 text-center">
                        <div className="mb-4">
                            <i className="bi bi-calendar-x text-muted opacity-25" style={{ fontSize: '5rem' }}></i>
                        </div>
                        <h2 className="fw-bold text-uppercase mb-3" style={{ letterSpacing: '2px' }}>Your Stay is Empty</h2>
                        <p className="text-muted mb-5">Select a room to begin your luxury experience.</p>

                        <Link className="btn btn-dark px-5 py-3 rounded-0 text-uppercase fw-bold" to="/hotels/explore">Explore Hotels</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5 mt-5 text-dark">
            <div className="row">

                <div className="col-12 mb-4">
                    <div className="d-flex justify-content-between align-items-end border-bottom pb-4">
                        <div>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-2 small text-uppercase" style={{ letterSpacing: '1px' }}>
                                    <li className="breadcrumb-item text-muted">Reservation</li>
                                    <li className="breadcrumb-item active text-dark fw-bold">Review Stay</li>
                                </ol>
                            </nav>
                            <h2 className="fw-bold text-uppercase mb-0" style={{ letterSpacing: '2px' }}>Review Your Stay</h2>
                            <span className="text-muted">at {stay.hotel_name || 'Selected Luxury Estate'}</span>
                        </div>
                        <div className="text-end d-none d-md-block">
                            <span className="badge bg-dark px-3 py-2 text-uppercase fw-normal" style={{ borderRadius: 0 }}>
                                Verified Selection
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    {itemsArray.map((details, id) => (
                        <SummaryRoomCard
                            key={id}
                            id={details.id}
                            details={details}
                            currency={summary.currency}
                            onRemove={handleItemRemoval}
                        />
                    ))}

                    {summary.hotel_id && (
                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <a href={`http://localhost:8000/client/room/explore/${summary.hotel_id}`} className="btn btn-outline-dark px-4 py-2 rounded-0 small fw-bold">
                                <i className="bi bi-plus-lg me-1"></i> Add More Rooms
                            </a>
                        </div>
                    )}
                </div>

                <div className="col-lg-4 mt-4 mt-lg-0">

                    <SummaryDatePickerCard
                        checkIn={checkIn}
                        checkOut={checkOut}
                        onDateRangeSelected={handleDatesSubmit}
                    />

                    {summary.error_message && (
                        <div className="alert alert-warning border-0 shadow-sm d-flex align-items-center rounded-0">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            <div><strong>Wait!</strong> {summary.error_message}</div>
                        </div>
                    )}

                    {alertConfig.show && (
                        <div className="alert alert-danger d-flex align-items-center rounded-0 border-0 shadow-sm mb-3">
                            <i className="bi bi-exclamation-triangle-fill me-3"></i>
                            <span className="small text-uppercase" style={{ fontSize: '0.75rem' }}>{alertConfig.message}</span>
                            <button onClick={() => setAlertConfig({ show: false, message: '' })} className="btn-close ms-auto" style={{ fontSize: '0.8rem' }}></button>
                        </div>
                    )}

                    <SummaryPricingPanel
                        summary={summary}
                        showDiscount={!!stay.discount_id || summary.totalSavings > 0}
                        onCheckoutTrigger={executeCheckoutSequence}
                    />

                </div>
            </div>
        </div>
    );
};

export default StaySummary;