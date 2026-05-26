import React, { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const DatePicker = ({ dates, setDates }) => {
  const flatpickrRef = useRef(null);
  const fpInstance = useRef(null);

  useEffect(() => {
    if (!flatpickrRef.current) return;

    fpInstance.current = flatpickr(flatpickrRef.current, {
      mode: 'range',
      dateFormat: 'Y-m-d',
      minDate: 'today',
      
      defaultDate: dates.check_in && dates.check_out ? [dates.check_in, dates.check_out] : [],
      
      onChange: (selectedDates, dateStr, instance) => {        
        if (selectedDates.length === 2) {
          setDates({
            check_in: instance.formatDate(selectedDates[0], 'Y-m-d'),
            check_out: instance.formatDate(selectedDates[1], 'Y-m-d')
          });
        }
      },
    });

    return () => {
      if (fpInstance.current) {
        fpInstance.current.destroy();
      }
    };
  }, [setDates]);
  
  useEffect(() => {
    if (fpInstance.current) {
      if (dates.check_in && dates.check_out) {
        fpInstance.current.setDate([dates.check_in, dates.check_out], false);
      } else if (!dates.check_in && !dates.check_out) {
        fpInstance.current.clear();
      }
    }
  }, [dates.check_in, dates.check_out]);

  const formatDateDisplay = () => {
    if (dates.check_in && dates.check_out) {
      const options = { day: '2-digit', month: 'short' };
      const dIn = new Date(dates.check_in).toLocaleDateString('en-US', options);
      const dOut = new Date(dates.check_out).toLocaleDateString('en-US', options);
      return `${dIn} — ${dOut}`;
    }
    return 'Select Dates';
  };

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div
          className="position-relative p-2 bg-light d-flex align-items-center"
          id="dateEditTrigger"
          style={{ height: '65px', cursor: 'pointer', borderRadius: '8px' }}
        >
          <i className="bi bi-calendar3 me-3 ms-2" style={{ color: '#bca47f', fontSize: '1.4rem' }}></i>

          <div className="d-flex flex-column">
            <label className="small fw-bold text-uppercase text-secondary mb-0" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
              Stay Duration
            </label>
            <span className="primaryfont text-dark fw-bold" style={{ fontSize: '0.95rem' }}>
              {formatDateDisplay()}
            </span>
          </div>

          {/* Invisible input overlaying the clickable block */}
          <input
            type="text"
            ref={flatpickrRef}
            autoComplete="off"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;