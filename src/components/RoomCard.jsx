import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ room, currentStayHotelId, onChooseToBook }) => {
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        if (e.target.closest('button') || e.target.closest('a')) {
            return;
        }
        navigate(`/rooms/${room.id}`);
    };

    // console.log(room);
    
    const hasOffer = !!room.offer;
    const isDifferentHotel = currentStayHotelId !== null && currentStayHotelId !== room.hotel_id;

    return (
        <div
            className="card mb-3 border-0 shadow-sm overflow-hidden hotel-room-card"
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="row g-0 align-items-start">
                <div className="col-md-4">
                    <img
                        src={room.images?.[0] ? `${room.images[0].path}` : '/images/placeholder.jpg'}
                        className="img-fluid object-fit-cover"
                        style={{ height: '220px', width: '100%' }}
                        alt={room.title}
                    />
                </div>

                <div className="col-md-8 p-4 d-flex flex-column" style={{ minHeight: '220px' }}>
                    <div className="d-flex justify-content-between align-items-start">
                        <div className="headingfonts">
                            <h5 className="fw-bold mb-1 text-uppercase" style={{ letterSpacing: '1px' }}>{room.title}</h5>
                            <div className="mb-2">
                                <span className="badge bg-light text-dark border-0 shadow-sm small fw-normal me-2">{room.type}</span>
                                <span className="badge bg-light text-dark border-0 shadow-sm small fw-normal">{room.category}</span>
                            </div>

                            <ul className="list-inline small text-muted my-3">
                                <li className="list-inline-item me-3">
                                    <i className="bi bi-people-fill me-1"></i>
                                    {room.max_adults} Adults
                                    {room.max_children > 0 && `, ${room.max_children} Child`}
                                </li>
                                <li className="list-inline-item">
                                    {room.hotel?.cancellation_charge === 0 && (
                                        <>
                                            <i className="bi bi-check2-circle text-success me-1"></i>
                                            Free Cancellation
                                        </>
                                    )}
                                </li>
                            </ul>
                        </div>

                        <div className="text-end primaryfont">
                            {hasOffer ? (
                                <>
                                    <div className="mb-1">
                                        <span className="badge bg-danger small text-uppercase" style={{ fontSize: '0.7rem' }}>
                                            {room.offer_type} Off
                                        </span>
                                    </div>
                                    <h4 className="text-classic fw-bold mb-0">
                                        {room.user_currency_symbol} {Number(room.offer_price).toFixed(2)}
                                    </h4>
                                    <div className="text-muted small">
                                        <del>{room.user_currency_symbol} {Number(room.converted_price).toFixed(2)}</del>
                                        <span className="ms-1">/ night</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h4 className="text-classic fw-bold mb-0">
                                        {room.user_currency_symbol}{Number(room.converted_price).toFixed(2)}
                                    </h4>
                                    <small className="text-muted">/ per night</small>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-auto d-flex justify-content-between align-items-center border-top pt-3">
                        <div className="pe-2">
                            {hasOffer ? (
                                <p className="text-danger mb-0 small fw-bold">
                                    <i className="bi bi-ticket-perforated-fill me-1"></i> {room.offer}
                                </p>
                            ) : (
                                <p className="text-muted mb-0 small">Best Price Guaranteed</p>
                            )}
                        </div>

                        {isDifferentHotel ? (
                            <button
                                type="button"
                                className="btn-classic btn-classic-dark px-2 py-2 text-uppercase"
                                onClick={() => navigate(`/rooms/${room.id}`)}
                            >
                                Explore Room
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => onChooseToBook(room.id, room.hotel_id, room.coupon_code ? { coupon_code: room.coupon_code, offer: room.offer, offer_type: room.offer_type } : null)}
                                className="btn-classic btn-classic-dark px-2 py-2 text-uppercase"
                            >
                                Choose to Book
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;