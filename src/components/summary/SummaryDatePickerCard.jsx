import React, { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const SummaryDatePickerCard = ({ checkIn, checkOut, onDateRangeSelected }) => {
  const flatpickrRef = useRef(null);
  const fpInstance = useRef(null);

  useEffect(() => {
    if (!flatpickrRef.current) return;

    fpInstance.current = flatpickr(flatpickrRef.current, {
      mode: 'range',
      minDate: 'today',
      dateFormat: 'Y-m-d',
      defaultDate: checkIn && checkOut ? [checkIn, checkOut] : [],
      onClose: (selectedDates) => {
        if (selectedDates.length === 2) {
          const formattedIn = flatpickr.formatDate(selectedDates[0], 'Y-m-d');
          const formattedOut = flatpickr.formatDate(selectedDates[1], 'Y-m-d');
          onDateRangeSelected({ check_in: formattedIn, check_out: formattedOut });
        }
      },
    });

    return () => {
      if (fpInstance.current) fpInstance.current.destroy();
    };
  }, [checkIn, checkOut, onDateRangeSelected]);

  const formatDateDisplay = () => {
    if (!checkIn || !checkOut) return 'Select Dates';
    const options = { day: '2-digit', month: 'short' };
    const dIn = new Date(checkIn).toLocaleDateString('en-US', options);
    const dOut = new Date(checkOut).toLocaleDateString('en-US', { ...options, year: 'numeric' });
    return `${dIn} — ${dOut}`;
  };

  return (
    <div 
      className="bg-light p-3 mb-4 border-start border-4 border-primary" 
      id="dateEditTrigger"
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.7rem' }}>Your Dates</small>
          <p className="mb-0 small fw-bold" id="display_stay_dates">
            {formatDateDisplay()}
          </p>
        </div>
        <i className="bi bi-pencil-square text-primary"></i>
      </div>
      <input 
        type="text" 
        ref={flatpickrRef}
        autoComplete="off"
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10 }}
      />
    </div>
  );
};

export default SummaryDatePickerCard;