import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';

const FeaturedRooms = ({ rooms }) => {
    const navigate = useNavigate();

    if (!rooms || rooms.length === 0) {
        return null;
    }

    return (
        <section className="featuredrooms py-5" id="featured">
            <div className="container">
                {/* Section Title Header */}
                <div className="row mb-5">
                    <div className="col-12 col-md-6 d-flex flex-column align-items-center align-items-md-start">
                        <span className="text-uppercase small text-secondary d-block mb-2" style={{ letterSpacing: '5px' }}>
                            rooms
                        </span>
                        <h1 className="fw-normal lh-sm mb-3 headingfonts text-center text-md-start">
                            Featured Rooms
                        </h1>
                    </div>
                </div>

                {/* Featured Rooms Slider Carousel */}
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
                                {/* Standard Aspect-Ratio Image Box */}
                                <div className="ratio ratio-4x3 overflow-hidden">
                                    <img
                                        src={room.images?.[0]?.path ? `http://localhost:8000/storage/${room.images[0].path}` : '/images/placeholder.jpg'}
                                        className="card-img-top object-fit-cover transition-zoom w-100 h-100"
                                        alt={room.title}
                                    />
                                </div>

                                {/* Content Details Block Container */}
                                <div className="room-card-body d-flex flex-column align-items-center p-4">
                                    <span className="text-uppercase text-muted" style={{ fontSize: '0.6rem', letterSpacing: '2px' }}>
                                        {room.category} | {room.hotel?.name}
                                    </span>

                                    <h5 className="headingfonts mt-2 text-dark fw-bold">{room.title}</h5>

                                    <p className="text-muted small text-center px-2">
                                        {room.description && room.description.length > 80
                                            ? `${room.description.substring(0, 80)}...`
                                            : room.description}
                                    </p>

                                    <div className="mt-auto pt-3 border-top w-100 text-center">
                                        <span className="fs-5 text-dark d-flex flex-column align-items-center gap-2">
                                            <span className="fw-bold">
                                                {room.hotel?.city?.state?.country?.currency_symbol || 'INR'} {parseFloat(room.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>

                                            <small className="text-muted mb-2 fs-6">Per Night</small>

                                            <span
                                                className="text-uppercase text-dark border-bottom border-dark pb-1 mt-2"
                                                style={{ letterSpacing: '1px', fontSize: '0.7rem' }} >
                                                Explore Details
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section >
    );
};

export default FeaturedRooms;