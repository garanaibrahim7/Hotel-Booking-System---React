import React, { useState } from 'react';

const SelectCity = ({ cities = [], value = '', onSelect, placeholder = "Search City...", uniqueId = "city_select" }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // Filter cities instantly based on lowercase partial matching string arrays
    const filteredCities = cities.filter(city =>
        (city.full_name || city.name || '').toLowerCase().includes((value || '').toLowerCase())
    );

    const handleInputChange = (e) => {
        const val = e.target.value;
        const matchedCity = cities.find(
            c => (c.full_name || c.name || '').toLowerCase() === val.toLowerCase()
        );
        // Let the parent know the user is typing, pass empty id until an option is selected/matched
        onSelect({ 
            cityName: val, 
            cityId: matchedCity ? matchedCity.id : '' 
        });
    };

    return (
        <div className="position-relative w-100">
            <input
                type="text"
                className="form-control border-0 bg-light p-3 shadow-none small"
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                onFocus={() => setDropdownVisible(true)}
                onBlur={() => setTimeout(() => setDropdownVisible(false), 250)} // Delay registers click
                autoComplete="off"
                style={{ borderRadius: '0', height: '56px' }}
            />
            
            {/* Filter Dropdown Menu Panel */}
            {dropdownVisible && value && filteredCities.length > 0 && (
                <div 
                    className="position-absolute w-100 bg-white border shadow-lg z-3 mt-1 text-start" 
                    style={{ maxHeight: '200px', overflowY: 'auto', left: 0, borderRadius: '0' }}
                >
                    {filteredCities.map((city, idx) => (
                        <div
                            key={city.id || `${uniqueId}_option_${idx}`}
                            className="p-3 small custom-select-city-item border-bottom text-dark"
                            style={{ cursor: 'pointer', transition: '0.2s' }}
                            onMouseDown={() => {
                                onSelect({
                                    cityName: city.full_name || city.name,
                                    cityId: city.id
                                });
                            }}
                        >
                            <i className="bi bi-geo-alt-fill me-2 text-muted"></i>
                            {city.full_name || city.name}
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .custom-select-city-item:hover {
                    background-color: #f8f5f0 !important;
                    color: #bca47f !important;
                }
            `}</style>
        </div>
    );
};

export default SelectCity;