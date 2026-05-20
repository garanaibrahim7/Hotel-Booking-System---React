import React, { useEffect, useRef, useState } from 'react';


import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import DatePicker from './DatePicker';

const SideBarFilter = ({ cities = [], filtersData = {}, initialFilters = {}, onFilterApply }) => {

    const [filters, setFilters] = useState({
        city_id: initialFilters.city_id || '',
        check_in: initialFilters.check_in || '',
        check_out: initialFilters.check_out || '',
        adults: initialFilters.adults || 1,
        children: initialFilters.children || 0,
        min_price: initialFilters.min_price || '',
        max_price: initialFilters.max_price || '',
        categories: initialFilters.categories || [],
        types: initialFilters.types || []
    });
    // const [dates, setDates] = useState({ check_in: '', check_out: '' });

    const dateInputRef = useRef(null);


    useEffect(() => console.log('filters:', filtersData), []);
    // useEffect(() => console.log('filters:', filters), [filters]);


    // useEffect(() => {
    //     if (filters.city_id && filtersData.cities.length > 0) {
    //         const selectedCity = filtersData.cities.find(c => String(c.id) === String(filters.city_id));
    //         if (selectedCity) {
    //             setFilters(prev => ({ ...prev, city_name: selectedCity.full_name }));
    //         }
    //     }
    // }, [filters.city_id, cities]);


    // useEffect(() => {
    //     if (!dateInputRef.current) return;

    //     const fpInstance = flatpickr(dateInputRef.current, {
    //         mode: 'range',
    //         dateFormat: 'Y-m-d',
    //         minDate: 'today',
    //         defaultDate: filters.check_in && filters.check_out ? [filters.check_in, filters.check_out] : [],
    //         onChange: (selectedDates, dateStr, instance) => {
    //             if (selectedDates.length === 1) {
    //                 const inDate = selectedDates[0];
    //                 instance.set('minDate', new Date(inDate.getTime() + 24 * 60 * 60 * 1000)); // allow only future checkout

    //                 setFilters(prev => {
    //                     const updated = { ...prev, check_in: instance.formatDate(inDate, 'Y-m-d'), check_out: '' };
    //                     return updated;
    //                 });
    //             }

    //             if (selectedDates.length === 2) {
    //                 const inDate = selectedDates[0];
    //                 const outDate = selectedDates[1];

    //                 if (outDate <= inDate) {
    //                     alert('Invalid dates');
    //                     instance.clear();
    //                     return;
    //                 }

    //                 console.log(instance);
    //                 setFilters(prev => {
    //                     const updated = {
    //                         ...prev,
    //                         check_in: instance.formatDate(inDate, 'Y-m-d'),
    //                         check_out: instance.formatDate(outDate, 'Y-m-d')
    //                     };
    //                     console.log('Updated filters in onChange:', updated);
    //                     if (onFilterApply) onFilterApply(updated);
    //                     return updated;
    //                 });
    //             }
    //         }
    //     });

    //     return () => {
    //         if (fpInstance) fpInstance.destroy();
    //     };
    // }, [filters.check_in, filters.check_out, onFilterApply]);

    // Central dynamic event handler replacing "this.form.submit()" triggers
    const handleInputChange = (field, value) => {
        setFilters(prev => {
            // if(field === 'max_price' && filters.min_price && value <= filters.min_price) {
            //     return { ...prev, [field]: filters.min_price + 1 }
            // }
            return { ...prev, [field]: value }
        });

        // if (onFilterApply) onFilterApply();
    };

    const handleCitySearchInput = (e) => {
        const val = e.target.value;
        const matchedCity = filtersData.cities.find(c => c.full_name === val);

        setFilters(prev => {
            const updated = {
                ...prev,
                city_id: matchedCity ? matchedCity.id : val === '' ? '' : prev.city_id
            };

            if (matchedCity || val === '') {
                // if (onFilterApply) onFilterApply(updated);
            }
            return updated;
        });
    };

    const handleCheckboxGroupChange = (field, itemValue) => {
        setFilters(prev => ({ ...prev, [field]: [...prev[field], itemValue] }));
        // if (onFilterApply) onFilterApply({ ...prev, [field]: itemValue });
    };

    const handleClearAll = (e) => {
        e.preventDefault();
        const cleared = {
            city_id: '',
            city_name: '',
            check_in: '',
            check_out: '',
            adults: 1,
            children: 0,
            min_price: '',
            max_price: '',
            categories: [],
            types: []
        };
        setFilters(cleared);
        // if (onFilterApply) onFilterApply(cleared);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // if (onFilterApply) onFilterApply(filters);
    };

    useEffect(() => {
        if (onFilterApply)
            onFilterApply(filters);
    }, [filters]);

    // Helper formatting for dynamic text render matrix
    const formatDateDisplay = () => {
        if (filters.check_in && filters.check_out) {
            const options = { day: '2-digit', month: 'short' };
            const dIn = new Date(filters.check_in).toLocaleDateString('en-US', options);
            const dOut = new Date(filters.check_out).toLocaleDateString('en-US', options);
            return `${dIn} — ${dOut}`;
        }
        return 'Select Dates';
    };

    return (
        <div className="filter-sidebar bg-white m-1 p-3 p-md-4 shadow-sm border rounded-0">
            <div className="d-flex justify-content-between align-items-center mb-0 mb-md-4 row">
                <div className="col-10" data-bs-toggle="collapse" data-bs-target="#filterContent" role="button">
                    <h5 className="fw-bold m-0 headingfonts">
                        <i className="bi bi-sliders2-vertical me-2 d-md-none"></i>Filters
                    </h5>
                </div>
                <div className="d-flex align-items-center text-end col-2">
                    <a href="#clear" onClick={handleClearAll} className="text-decoration-none small text-danger fw-bold me-3">
                        Clear
                    </a>
                </div>
            </div>

            <div className="collapse d-md-block mt-3 mt-md-0" id="filterContent">
                <form onSubmit={handleFormSubmit}>

                    <div className="filter-group mb-4">
                        <label className="small fw-bold text-uppercase text-secondary mb-2 d-block">Destination</label>
                        <div className="position-relative">
                            <input
                                type="text"
                                className="form-control border-0 bg-light p-3 shadow-none small"
                                placeholder="Search City..."
                                list="jsx_city_list"
                                value={filters.city_name}
                                onChange={handleCitySearchInput}
                                autoComplete="off"
                            />
                            <datalist id="jsx_city_list">
                                {filtersData.cities.map(city => (
                                    <option key={city.id} value={city.full_name} />
                                ))}
                            </datalist>
                        </div>
                    </div>

                    <hr className="my-4 text-muted opacity-25 d-none d-md-block" />

                    <div className="filter-group mb-4">
                        <label className="small fw-bold text-uppercase text-secondary mb-3 d-block">Occupancy (per room)</label>
                        <div className="row g-2">
                            <div className="col-6">
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text bg-light border-0 text-muted small"><i className="bi bi-person-fill"></i></span>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        className="form-control bg-light border-0 py-2 small"
                                        placeholder="Adults"
                                        title="Adults"
                                        value={filters.adults}
                                        onChange={(e) => handleInputChange('adults', parseInt(e.target.value) || 1)}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text bg-light border-0 text-muted small"><i className="bi bi-person-arms-up"></i></span>
                                    <input
                                        type="number"
                                        min="0"
                                        max="10"
                                        className="form-control bg-light border-0 py-2 small"
                                        placeholder="Child"
                                        title="Children"
                                        value={filters.children}
                                        onChange={(e) => handleInputChange('children', parseInt(e.target.value) || 0)}
                                    />
                                </div>
                            </div>
                        </div>
                        <small className="text-muted mt-2 d-block" style={{ fontSize: '0.65rem' }}>Max occupancy per room basis.</small>
                    </div>

                    <hr className="my-4 text-muted opacity-25 d-none d-md-block" />

                    <DatePicker
                        dates={{ check_in: filters.check_in, check_out: filters.check_out }}
                        setDates={({ check_in, check_out }) => {
                            setFilters(prev => ({
                                ...prev,
                                check_in: check_in,
                                check_out: check_out
                            }));
                        }}
                    />

                    <hr className="my-4 text-muted opacity-25 d-none d-md-block" />

                    {/* Pricing Ranges */}
                    <div className="filter-group mb-4">
                        <label className="small fw-bold text-uppercase text-secondary mb-3 d-block">Price Per Night</label>
                        <div className="d-flex gap-2">
                            <input
                                type="number"
                                className="form-control form-control-sm bg-light border-0 py-2"
                                placeholder="Min"
                                value={filters.min_price}
                                onChange={(e) => handleInputChange('min_price', parseInt(e.target.value))}
                            />
                            <input
                                type="number"
                                className="form-control form-control-sm bg-light border-0 py-2"
                                placeholder="Max"
                                value={filters.max_price}
                                min={filters.min_price + 1}
                                onChange={(e) => handleInputChange('max_price', parseInt(e.target.value))}
                            />
                        </div>
                    </div>

                    <hr className="my-4 text-muted opacity-25 d-none d-md-block" />


                    <div className="row">
                        <div className="col-6 col-md-12 mb-4">
                            <label className="small fw-bold text-uppercase text-secondary mb-3 d-block">Category</label>
                            {filtersData.categories.map(cat => {
                                const normCat = cat.toLowerCase();
                                return (
                                    <div className="form-check mb-2" key={cat}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={normCat}
                                            id={`cat_${cat}`}
                                            checked={filters.categories.includes(normCat)}
                                            onChange={() => handleCheckboxGroupChange('categories', normCat)}
                                        />
                                        <label className="form-check-label small" htmlFor={`cat_${cat}`}>{cat}</label>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="col-6 col-md-12 mb-4">
                            <label className="small fw-bold text-uppercase text-secondary mb-3 d-block">Room Type</label>
                            {filtersData.types.map(type => {
                                const normType = type.toLowerCase();
                                return (
                                    <div className="form-check mb-2" key={type}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={normType}
                                            id={`type_${type}`}
                                            checked={filters.types.includes(normType)}
                                            onChange={() => handleCheckboxGroupChange('types', normType)}
                                        />
                                        <label className="form-check-label small" htmlFor={`type_${type}`}>{type}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-classic-dark w-100 py-2 mt-2 shadow-sm d-md-none">
                        APPLY FILTERS
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SideBarFilter;