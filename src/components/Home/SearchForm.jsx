import React, { useState } from 'react';
import DatePicker from '../DatePicker'; // Adjust the relative path based on where your DatePicker component lives
import SelectCity from '../SelectCity';

const SearchForm = ({ cities }) => {
    const [filters, setFilters] = useState({
        city_id: '',
        city_search: '',
        check_in: '',
        check_out: '',
        adults: 1,
        children: 0
    });

    const handleCityChange = (e) => {
        const value = e.target.value;
        const selectedCity = cities?.find(
            (city) => (city.full_name || city.name) === value
        );

        setFilters((prev) => ({
            ...prev,
            city_search: value,
            city_id: selectedCity ? selectedCity.id : ''
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const queryParams = new URLSearchParams({
            city_id: filters.city_id,
            check_in: filters.check_in,
            check_out: filters.check_out,
            adults: filters.adults,
            children: filters.children
        }).toString();

        window.location.href = `/rooms?${queryParams}`;
    };

    return (
        <div className="container" style={{ marginTop: '50px', position: 'relative', zIndex: 20 }}>
            <div className="bg-white p-4 shadow-lg border-0">
                <form onSubmit={handleFormSubmit} className="row g-3 align-items-center text-dark justify-content-center">

                    <div className="col-md-3">
                        <label className="small fw-bold text-uppercase text-secondary mb-2 d-block">Location</label>
                        <SelectCity
                            cities={cities}
                            value={filters.city_search}
                            placeholder="Where are you going?"
                            uniqueId="home_search"
                            onSelect={({ cityName, cityId }) => {
                                setFilters(prev => ({ ...prev, city_search: cityName, city_id: cityId }));
                            }}
                        />
                    </div>

                    <div className="col-md-3">
                        <label className="small fw-bold text-uppercase text-secondary mb-2 d-block">Stay Duration</label>
                        <div className="col-12 custom-datepicker-wrapper">
                            <DatePicker
                                dates={{ check_in: filters.check_in, check_out: filters.check_out }}
                                setDates={({ check_in, check_out }) => {
                                    setFilters((prev) => ({
                                        ...prev,
                                        check_in: check_in,
                                        check_out: check_out
                                    }));
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label className="small fw-bold text-uppercase text-secondary mb-2 d-block">Guests (per room)</label>
                        <div className="d-flex gap-2">
                            <div className="input-group">
                                <span className="input-group-text border-0 bg-light small text-muted">
                                    <i className="bi bi-person-fill"></i>
                                </span>
                                <input
                                    type="number"
                                    name="adults"
                                    className="form-control border-0 bg-light p-3"
                                    min="1"
                                    placeholder="Adults"
                                    value={filters.adults}
                                    onChange={handleInputChange}
                                    title="Adults"
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text border-0 bg-light small text-muted">
                                    <i className="bi bi-person-arms-up"></i>
                                </span>
                                <input
                                    type="number"
                                    name="children"
                                    className="form-control border-0 bg-light p-3"
                                    min="0"
                                    placeholder="Child"
                                    value={filters.children}
                                    onChange={handleInputChange}
                                    title="Children"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <button type="submit" className="btn-classic btn-classic-dark w-100 py-3" style={{ height: '56px' }}>
                            SEARCH
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SearchForm;