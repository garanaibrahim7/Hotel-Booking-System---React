import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SearchForm from '../components/Home/SearchForm';
import SpecialRooms from '../components/Home/SpecialRooms';
import FeaturedRooms from '../components/Home/FeaturedRooms';

const Home = () => {
  const [heroImage, setHeroImage] = useState('');
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [specialRooms, setSpecialRooms] = useState([]);
  const [cities, setCities] = useState([]);

  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingSpecial, setLoadingSpecial] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/cities')
      .then(response => {
        if (response.data.success) {
          // console.log(response)
          setCities(response.data.cities);
        }
      })
      .catch(error => console.error("Error fetching hero image:", error));

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

  return (
    <div className="bg-off-white">
      <section className="intro-section bg-dark text-light text-center">
        <div className="hero-header position-relative" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="introtext d-flex flex-column justify-content-center align-items-center text-light gap-4">
            <span>Experience Luxury Like Never Before</span>
            <h1 className="headingfonts text-center mx-auto">Book Your Dream Stay Today.</h1>

            <div className="position-absolute" style={{ top: '70vh' }}>
              <SearchForm cities={cities} />
            </div>
          </div>
        </div>
        {/* <div className="container py-5">
          <span>Experience Luxury Like Never Before</span>
          <h1 className="headingfonts my-3">Book Your Dream Stay Today.</h1>
        </div> */}
      </section>

      <SpecialRooms rooms={specialRooms} />

      <FeaturedRooms rooms={featuredRooms} />

    </div>
  );
};

export default Home;