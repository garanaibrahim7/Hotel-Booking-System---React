import React, { useState } from 'react';

const DateModal = ({ show, modalData, onClose, onConfirm }) => {
    const [dates, setDates] = useState({
        checkIn: '',
        checkOut: ''
    });

    // 🚪 If the modal shouldn't be open, render nothing
    if (!show) return null;

    // 📅 Get today's date in YYYY-MM-DD format to prevent booking in the past
    const getTodayString = () => new Date().toISOString().split('T')[0];

    const handleInputChange = (e) => {
        setDates(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Pass the selected dates back up to our API function in Rooms.jsx
        onConfirm(modalData.roomId, modalData.hotelId, dates.checkIn, dates.checkOut);
    };

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1100 }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '0' }}>
                    <div className="modal-header bg-light text-dark">
                        <h5 className="modal-title fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>Select Booking Dates</h5>
                        <button type="button" className="btn-close shadow-none" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="modal-body p-4">
                            <div className="row">
                                <div className="col-6">
                                    <label className="small fw-bold text-uppercase text-muted mb-2">Check-In</label>
                                    <input
                                        type="date"
                                        name="checkIn"
                                        className="form-control"
                                        required
                                        min={getTodayString()}
                                        value={dates.checkIn}
                                        onChange={handleInputChange}
                                        style={{ borderRadius: '0' }}
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="small fw-bold text-uppercase text-muted mb-2">Check-Out</label>
                                    <input
                                        type="date"
                                        name="checkOut"
                                        className="form-control"
                                        required
                                        min={dates.checkIn || getTodayString()} // Can't checkout before checking in
                                        value={dates.checkOut}
                                        onChange={handleInputChange}
                                        style={{ borderRadius: '0' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-dark w-100 py-3 fw-bold text-uppercase"
                                style={{ backgroundColor: '#bca47f', border: 'none', borderRadius: '0', letterSpacing: '2px' }}
                            >
                                Confirm & Add to Cart
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DateModal;