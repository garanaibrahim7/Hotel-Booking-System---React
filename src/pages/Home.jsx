import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../css/header.css'

const Home = () => {
  const [heroImage, setHeroImage] = useState('');
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [specialRooms, setSpecialRooms] = useState([]);

  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingSpecial, setLoadingSpecial] = useState(true);

  useEffect(() => {

    document.body.classList.add('is-home');

    axios.get('http://localhost:8000/api/home/hero-image')
      .then(response => {
        if (response.data.success) {
          setHeroImage(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching hero image:", error));

    axios.get('http://localhost:8000/api/home/featured-rooms')
      .then(response => {
        if (response.data.success) {
          setFeaturedRooms(response.data.data);
          // console.log(response.data);          
        }
      })
      .catch(error => console.error("Error fetching featured rooms:", error))
      .finally(() => setLoadingFeatured(false));


    axios.get('http://localhost:8000/api/home/special-offers')
      .then(response => {
        if (response.data.success) {
          setSpecialRooms(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching special offers:", error))
      .finally(() => setLoadingSpecial(false));
  }, []);

  window.addEventListener('scroll', function () {
    const nav = document.querySelector('.custom-nav');
    if (window.scrollY > 700) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  return (
    <div className="bg-off-white">
      <section className="intro-section bg-dark text-light text-center">
        <div className="hero-header position-relative" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="introtext d-flex flex-column justify-content-center align-items-center text-light gap-4">
            <span>Experience Luxury Like Never Before</span>
            <h1 className="headingfonts text-center mx-auto">Book Your Dream Stay Today.</h1>

            {/* {{-- @include('client.partials.search-bar') --}} */}
            <div className="position-absolute" style={{ top: '70vh' }}>
              {/* @include('client.partials.searchForm') */}
            </div>
          </div>
        </div>
        {/* <div className="container py-5">
          <span>Experience Luxury Like Never Before</span>
          <h1 className="headingfonts my-3">Book Your Dream Stay Today.</h1>
        </div> */}
      </section>

      <section className="py-5 container">
        <span className="text-uppercase small text-secondary d-block mb-2" style={{ letterSpacing: '5px' }}>
          Exclusive Deals
        </span>
        <h2 className="headingfonts mb-4">Deals in Your City</h2>

        {loadingSpecial ? (
          <div className="text-center py-4">Loading real-time deals...</div>
        ) : specialRooms.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            pagination={{ clickable: true }}
            className="py-4"
          >
            {specialRooms.map((room) => (
              <SwiperSlide key={room.id}>
                <div className="roomcard border-0 shadow-sm h-100 bg-white card">
                  {/* Room Card content matches previous layout mapping */}
                  <div className="ratio ratio-4x3 overflow-hidden">
                    <img
                      src={room.images?.[0] ? `http://localhost:8000/storage/${room.images[0].path}` : '/placeholder.jpg'}
                      className="card-img-top object-fit-cover w-100 h-100"
                      alt={room.title}
                    />
                  </div>
                  <div className="card-body text-center p-4">
                    <h5 className="headingfonts fw-bold text-dark">{room.title}</h5>
                    <p className="text-primary fw-bold">
                      {room.user_currency_symbol} {room.offer_price || room.converted_price}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-muted">No special offers available right now.</p>
        )}
      </section>

      {/* 🏨 Featured Rooms Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <span className="text-uppercase small text-secondary d-block mb-2" style={{ letterSpacing: '5px' }}>
            Rooms
          </span>
          <h2 className="headingfonts mb-4">Featured Rooms</h2>

          {loadingFeatured ? (
            <div className="text-center py-4">Loading our top featured rooms...</div>
          ) : (
            <div className="row g-4">
              {featuredRooms.map((room) => (
                <div key={room.id} className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    {/* Render featured room card content */}
                    <div className="card-body">
                      <h5 className="fw-bold">{room.title}</h5>
                      <p className="text-muted small">{room.hotel?.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;