import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';

const SpecialRooms = ({ rooms }) => {
    const navigate = useNavigate();

    // console.log(rooms);


    if (!rooms || rooms.length === 0) {
        return (
            <section className="bg-off-white py-5" id="explore">
                <div className="container text-center py-5">
                    <p className="text-muted">No special offers available in your city right now.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-off-white py-5" id="explore">
            <div className="container">
                {/* Section Header */}
                <div className="row mb-5">
                    <div className="col-12 col-md-6">
                        <span className="text-uppercase small text-secondary d-block mb-2" style={{ letterSpacing: '5px' }}>
                            Exclusive Deals
                        </span>
                        <h1 className="fw-normal lh-sm mb-3 headingfonts">
                            Deals in Your City
                        </h1>
                    </div>
                </div>

                {/* Exclusive Deals Slider Carousel */}
                <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className="featuredRoomsSwiper px-2 py-4"
                >
                    {rooms.map((room) => (
                        <SwiperSlide key={room.id} className="h-auto">
                            <div
                                className="roomcard border-0 shadow-sm h-100 mx-2 position-relative bg-white"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/room/${room.id}`)}
                            >
                                {/* Special Tag Accent Layer */}
                                {room.offer_price && (
                                    <div className="position-absolute top-0 start-0 z-3 m-3">
                                        <span
                                            className="badge rounded-0 px-3 py-2 text-uppercase fw-bold shadow-sm text-white"
                                            style={{ background: '#bca47f', fontSize: '0.65rem', letterSpacing: '1px' }}
                                        >
                                            <i className="bi bi-tag-fill me-1"></i> Special Offer - {room.offer}
                                        </span>
                                    </div>
                                )}

                                {/* Aspect-Ratio Visual Container */}
                                <div className="ratio ratio-4x3 overflow-hidden">
                                    <img
                                        src={room.images?.[0]?.path ? `http://localhost:8000/storage/${room.images[0].path}` : '/images/placeholder.jpg'}
                                        className="card-img-top object-fit-cover transition-zoom w-100 h-100"
                                        alt={room.title}
                                    />
                                </div>

                                {/* Meta Description details content panel layout */}
                                <div className="room-card-body d-flex flex-column align-items-center p-4">
                                    <span className="text-uppercase text-muted" style={{ fontSize: '0.6rem', letterSpacing: '2px' }}>
                                        {room.category} | {room.hotel?.name}
                                    </span>

                                    <h5 className="headingfonts mt-2 text-dark fw-bold">{room.title}</h5>

                                    {/* {room.offer && (
                    <p className="small text-primary fw-bold mb-1" style={{ fontSize: '0.7rem' }}>
                      {room.offer}
                    </p>
                  )} */}

                                    <p className="text-muted small text-center px-2">
                                        {room.description && room.description.length > 80
                                            ? `${room.description.substring(0, 80)}...`
                                            : room.description}
                                    </p>

                                    <div className="mt-auto pt-3 border-top w-100 text-center">
                                        <div className="fs-5 text-dark">
                                            {room.offer_price ? (
                                                <>
                                                    <small className="text-muted text-decoration-line-through fs-6 fw-normal me-2">
                                                        {parseFloat(room.converted_price || room.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </small>
                                                    <span className="fw-bold">
                                                        {room.user_currency_symbol} {parseFloat(room.offer_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-primary fw-bold">
                                                    {room.user_currency_symbol} {parseFloat(room.converted_price || room.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                            )}
                                        </div>

                                        <small className="text-muted d-block mb-2">Per Night</small>

                                        <span
                                            className="text-uppercase text-dark border-bottom border-dark pb-1 mt-2 d-inline-block"
                                            style={{ letterSpacing: '1px', fontSize: '0.7rem' }}
                                        >
                                            Explore Details
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default SpecialRooms;