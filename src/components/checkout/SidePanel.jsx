import React, { useState } from 'react';
import RoomDetail from './RoomDetail';

const SidePanel = ({
    payload,
    couponCode,
    onApplyCoupon,
    onRemoveCoupon,
    couponError
}) => {
    const [inputCode, setInputCode] = useState('');
    const [isApplying, setIsApplying] = useState(false);

    const handleCouponSubmit = async (e) => {
        e.preventDefault();
        if (!inputCode.trim()) return;
        setIsApplying(true);
        await onApplyCoupon(inputCode);
        setIsApplying(false);
    };

    // console.log(couponCode);
    
    const savings = payload.subTotal - payload.finalTotal;

    const formatDateDisplay = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    };

    const formatYearDisplay = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div className="bg-light p-5 border-start h-100 text-dark">
            <h4 className="fw-bold text-uppercase mb-4">Summary</h4>

            {/* Hotel Meta Data */}
            <div className="mb-4">
                <p className="small text-muted mb-1 text-uppercase" style={{ fontSize: '11px' }}>Hotel</p>
                <h6 className="fw-bold mb-0">{payload.hotel.name}</h6>
                <small className="text-muted text-uppercase" style={{ fontSize: '10px' }}>
                    {payload.hotel.city}, {payload.hotel.state}
                </small>
            </div>

            {/* Stay Duration */}
            <div className="mb-4">
                <p className="small text-muted mb-1 text-uppercase" style={{ fontSize: '11px' }}>Stay Period</p>
                <h6 className="fw-bold mb-1">
                    {formatDateDisplay(payload.checkIn)} — {formatYearDisplay(payload.checkOut)}
                </h6>
                <span className="badge bg-dark text-uppercase p-2 rounded-0" style={{ fontSize: '10px' }}>
                    {payload.nights} Nights
                </span>
            </div>

            {/* Selected Room Loops mapping checkout.blade logic */}
            <div className="border-top border-bottom py-3 mb-4">
                <p className="small text-muted mb-2 text-uppercase" style={{ fontSize: '11px' }}>Selected Rooms</p>
                {payload.rooms?.map((room) => (
                    <RoomDetail
                        key={room.id}
                        room={room}
                        nights={payload.nights}
                        currencySymbol={payload.currency_symbol}
                    />
                ))}
            </div>

            {/* Re-Architected Coupon Input / Validation Box */}
            <div className="border-bottom py-3 mb-4">
                {!couponCode ? (
                    <form onSubmit={handleCouponSubmit}>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control rounded-0 shadow-none border"
                                placeholder="Coupon Code"
                                value={inputCode}
                                onChange={(e) => setInputCode(e.target.value)}
                                disabled={isApplying}
                            />
                            <button
                                type="submit"
                                className="btn btn-dark rounded-0 fw-bold px-3 text-uppercase"
                                style={{ width: '30%', minWidth: '80px', fontSize: '13px' }}
                                disabled={isApplying}
                            >
                                {isApplying ? '...' : 'Apply'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div
                        className="bg-white border p-2 d-flex justify-content-between align-items-center rounded-0"
                        style={{ borderStyle: 'dashed !important', borderColor: '#198754 !important' }}
                    >
                        <div className="d-flex align-items-center">
                            <i className="bi bi-ticket-perforated-fill text-success fs-5 me-2"></i>
                            <div>
                                <small className="text-uppercase fw-bold text-success d-block" style={{ fontSize: '9px' }}>Applied</small>
                                <span className="fw-bold small">{couponCode}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onRemoveCoupon}
                            className="btn btn-sm text-danger fw-bold text-uppercase p-0 border-0 bg-transparent"
                            style={{ fontSize: '11px' }}
                        >
                            Remove
                        </button>
                    </div>
                )}
                {couponError && <label className="text-danger small mt-2 d-block fw-bold">{couponError}</label>}
            </div>

            {/* Pricing Lines Display Matrix */}
            <div>
                {savings > 0.5 && (
                    <div className="d-flex justify-content-between align-items-center mb-2 text-success">
                        <span className="h6 fw-bold text-uppercase mb-0" style={{ fontSize: '13px' }}>Discount Applied</span>
                        <span className="h5 fw-bold mb-0">
                            - {payload.currency_symbol} {Number(savings).toFixed(2)}
                        </span>
                    </div>
                )}

                <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 fw-bold text-uppercase mb-0" style={{ fontSize: '15px' }}>Total</span>
                    <span className="h3 fw-bold mb-0" style={{ color: '#d0ac77' }}>
                        {payload.currency_symbol} {Number(payload.finalTotal).toFixed(2)}
                    </span>
                </div>
            </div>

            {/* International Converted Currency Fallback Block */}
            {payload.converted && (
                <div className="mt-3 pt-2 border-top">
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="small fw-bold text-uppercase text-muted" style={{ fontSize: '11px' }}>
                            Payable in Hotel Currency
                        </span>
                        <span className="h5 fw-bold mb-0" style={{ color: '#d0ac77' }}>
                            {payload.hotelCurrencySymbol} {Number(payload.finalActualTotal).toFixed(2)}
                        </span>
                    </div>
                    <small className="text-muted d-block mt-1" style={{ fontSize: '10px', fontStyle: 'italic' }}>
                        *Exchange Rates may differ based on Bank's Rates
                    </small>
                </div>
            )}
        </div>
    );
};

export default SidePanel;