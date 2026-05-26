import React, { useState, useEffect } from 'react';
import DatePicker from './DatePicker';
import SelectCity from './SelectCity';

const SideBarFilter = ({ filtersData = { cities: [], categories: [], types: [] }, initialFilters = {}, onFilterApply }) => {
    const [filters, setFilters] = useState({
        city_id: initialFilters.city_id || '',
        city_name: initialFilters.city_name || '',
        check_in: initialFilters.check_in || '',
        check_out: initialFilters.check_out || '',
        adults: initialFilters.adults || 1,
        children: initialFilters.children || 0,
        min_price: initialFilters.min_price || '',
        max_price: initialFilters.max_price || '',
        categories: initialFilters.categories || [],
        types: initialFilters.types || []
    });

    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        if (initialFilters.city_id && filtersData.cities?.length > 0 && !filters.city_name) {
            const matched = filtersData.cities.find(c => String(c.id) === String(initialFilters.city_id));
            if (matched) {
                setFilters(prev => ({ ...prev, city_id: matched.id, city_name: matched.full_name }));
            }
        }
    }, [initialFilters.city_id, filtersData.cities]);

    const handleInputChange = (field, value) => {
        const nextFilters = { ...filters, [field]: value };
        setFilters(nextFilters);
        if (onFilterApply) onFilterApply(nextFilters);
    };

    const handleCitySearchInput = (e) => {
        const val = e.target.value;
        const matchedCity = filtersData.cities?.find(c => c.full_name.toLowerCase() === val.toLowerCase());

        const nextFilters = {
            ...filters,
            city_name: val,
            city_id: matchedCity ? matchedCity.id : val === '' ? '' : filters.city_id
        };

        setFilters(nextFilters);
        if (onFilterApply) onFilterApply(nextFilters);
    };

    // Toggle array elements inside checkboxes on/off smoothly
    const handleCheckboxGroupChange = (field, itemValue) => {
        const alreadyExists = filters[field].includes(itemValue);
        const updatedGroup = alreadyExists
            ? filters[field].filter(val => val !== itemValue)
            : [...filters[field], itemValue];

        const nextFilters = { ...filters, [field]: updatedGroup };
        setFilters(nextFilters);
        if (onFilterApply) onFilterApply(nextFilters);
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
        if (onFilterApply) onFilterApply(cleared);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (onFilterApply) onFilterApply(filters);
    };

    const filteredCities = (filtersData.cities || []).filter(city =>
        city.full_name?.toLowerCase().includes((filters.city_name || '').toLowerCase())
    );

    return (
        <div className="filter-sidebar bg-white m-1 p-3 p-md-4 shadow-sm border rounded-0">
            <div className="d-flex justify-content-between align-items-center mb-0 mb-md-4 row">
                <div className="col-10" data-bs-toggle="collapse" data-bs-target="#filterContent" role="button">
                    <h5 className="fw-bold m-0 headingfonts">
                        <i className="bi bi-sliders2-vertical me-2 d-md-none"></i>Filters
                    </h5>
                </div>
                <div className="col-2 text-end">
                    <a href="#clear" onClick={handleClearAll} className="text-decoration-none small text-danger fw-bold">
                        Clear
                    </a>
                </div>
            </div>

            <div className="collapse d-md-block mt-3 mt-md-0" id="filterContent">
                <form onSubmit={handleFormSubmit}>

                    <div className="filter-group mb-4 position-relative">
                        <label className="small fw-bold text-uppercase text-secondary mb-2 d-block">Destination</label>
                        <SelectCity
                            cities={filtersData.cities}
                            value={filters.city_name}
                            placeholder="Search City..."
                            uniqueId="sidebar_search"
                            onSelect={({ cityName, cityId }) => {
                                const nextFilters = { ...filters, city_name: cityName, city_id: cityId };
                                setFilters(nextFilters);
                                if (onFilterApply) onFilterApply(nextFilters);
                            }}
                        />
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
                            const nextFilters = {
                                ...filters,
                                check_in: check_in,
                                check_out: check_out
                            };
                            setFilters(nextFilters);
                            if (onFilterApply) onFilterApply(nextFilters);
                        }}
                    />

                    <hr className="my-4 text-muted opacity-25 d-none d-md-block" />

                    <div className="filter-group mb-4">
                        <label className="small fw-bold text-uppercase text-secondary mb-3 d-block">Price Per Night</label>
                        <div className="d-flex gap-2">
                            <input
                                type="number"
                                className="form-control form-control-sm bg-light border-0 p-3"
                                placeholder="Min"
                                value={filters.min_price}
                                onChange={(e) => handleInputChange('min_price', e.target.value === '' ? '' : parseInt(e.target.value))}
                                style={{ borderRadius: '0' }}
                            />
                            <input
                                type="number"
                                className="form-control form-control-sm bg-light border-0 p-3"
                                placeholder="Max"
                                value={filters.max_price}
                                min={filters.min_price ? filters.min_price + 1 : ''}
                                onChange={(e) => handleInputChange('max_price', e.target.value === '' ? '' : parseInt(e.target.value))}
                                style={{ borderRadius: '0' }}
                            />
                        </div>
                    </div>

                    <hr className="my-4 text-muted opacity-25 d-none d-md-block" />

                    <div className="row">
                        <div className="col-6 col-md-12 mb-4">
                            <label className="small fw-bold text-uppercase text-secondary mb-3 d-block">Category</label>
                            {(filtersData.categories || []).map(cat => {
                                const normCat = cat.toLowerCase();
                                return (
                                    <div className="form-check mb-2" key={cat}>
                                        <input
                                            className="form-check-input style-checkbox"
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
                            {(filtersData.types || []).map(type => {
                                const normType = type.toLowerCase();
                                return (
                                    <div className="form-check mb-2" key={type}>
                                        <input
                                            className="form-check-input style-checkbox"
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

                    <button type="submit" className="btn btn-classic-dark w-100 py-3 mt-2 shadow-sm d-md-none text-uppercase fw-bold" style={{ borderRadius: '0', letterSpacing: '1px' }}>
                        Apply Filters
                    </button>
                </form>
            </div>


        </div>
    );
};

export default SideBarFilter;