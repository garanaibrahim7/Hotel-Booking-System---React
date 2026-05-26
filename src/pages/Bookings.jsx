import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBookingsQuery } from '../redux/store/apiSlice'; 

const Bookings = () => {
  const navigate = useNavigate();
  
  // Fetch data using your existing RTK Query configuration
  const { data, isLoading, error } = useGetBookingsQuery();
  
  // Safely parse out array from resource envelopes
  const bookings = data?.bookings || data || [];

  // Dynamic conditional badge mapping matching your exact blade template logic rules
  const renderStatusBadge = (booking) => {
    const statusCode = booking.status?.code;
    const label = booking.status?.label || 'Confirmed';
    const baseClass = "badge px-3 py-2 text-uppercase fw-bold";
    const inlineStyle = { borderRadius: '0', fontSize: '10px' };

    if (statusCode === 1) {
      return (
        <span className={`${baseClass} bg-success-subtle text-success border border-success-subtle`} style={inlineStyle}>
          {label}
        </span>
      );
    } else if (statusCode === 0) {
      return (
        <span className={`${baseClass} bg-warning-subtle text-warning border border-warning-subtle`} style={inlineStyle}>
          Pending
        </span>
      );
    } else if (statusCode === 3) {
      return (
        <span className={`${baseClass} bg-warning-subtle text-warning border border-warning-subtle`} style={inlineStyle}>
          Processing
        </span>
      );
    } else {
      // Refund conditions branch validation blocks
      if (booking.refund?.status === 1) {
        return (
          <span className={`${baseClass} bg-danger-subtle text-danger border border-danger-subtle`} style={inlineStyle}>
            Refunded
          </span>
        );
      } else if (booking.refund?.status === 0) {
        return (
          <span className={`${baseClass} bg-danger-subtle text-danger border border-danger-subtle`} style={inlineStyle}>
            Refund Initialized
          </span>
        );
      } else {
        return (
          <span className={`${baseClass} bg-danger-subtle text-danger border border-danger-subtle`} style={inlineStyle}>
            Cancelled
          </span>
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container py-5 my-5 text-center text-dark">
        <div className="spinner-grow mb-3" role="status" style={{ width: '3.5rem', height: '3.5rem', color: '#bca47f' }}></div>
        <h4>Fetching Your Bookings Archive...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 my-5 text-center text-danger">
        <h4>{error?.data?.message || 'Unable to retrieve reservation records.'}</h4>
      </div>
    );
  }

  return (
    <>
      <div className="container py-5 my-5">
        <div className="row">
          <div className="col-12">
            
            {/* Page Header Layout Block */}
            <h2 className="fw-bold text-uppercase mb-4" style={{ letterSpacing: '2px' }}>Your Bookings</h2>
            <div style={{ width: '60px', height: '3px', background: '#bca47f' }} className="mb-5"></div>

            {/* Core Card Framework Wrapper */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: '0' }}>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead style={{ backgroundColor: '#f8f5f0' }}>
                    <tr className="text-uppercase small fw-bold" style={{ letterSpacing: '1px' }}>
                      <th className="ps-4 py-3">Booking Details</th>
                      <th className="py-3">Room Type</th>
                      <th className="py-3">Amount</th>
                      <th className="py-3">Status</th>
                      <th className="pe-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length > 0 ? (
                      bookings.map((booking, index) => (
                        <tr key={booking.reference_number || index} className="border-bottom">
                          
                          <td className="ps-4 py-4">
                            <div className="fw-bold text-dark">#{booking.reference_number}</div>
                            <small className="text-muted">{booking.booking_date}</small>
                          </td>

                          <td className="py-4">
                            <div className="fw-semibold">
                              {booking.room_summary}
                            </div>
                            <small className="text-muted">
                              {booking.stay_dates?.full_stay}
                            </small>
                          </td>

                          <td className="py-4 fw-bold">
                            {booking.payment?.amount} <span className="small text-muted">{booking.payment?.currency}</span>
                          </td>

                          <td className="py-4">
                            {renderStatusBadge(booking)}
                          </td>

                          <td className="pe-4 py-4 text-center">
                            <div className="btn-group" style={{ width: '120px' }}>
                              <button
                                onClick={() => navigate(`/booking/${booking.id || booking.reference_number}`)}
                                className="btn btn-sm btn-outline-dark rounded-0 px-3"
                                title="View Details"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              
                              {booking.status?.code === 1 && booking.links?.print && (
                                <a 
                                  href={booking.links.print}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-sm btn-outline-dark rounded-0 px-3 border-start-0"
                                  title="Print Invoice"
                                >
                                  <i className="bi bi-printer"></i>
                                </a>
                              )}
                            </div>
                          </td>

                        </tr>
                      ))
                    ) : (
                      /* Empty Directory Fallback row exact markup match */
                      <tr>
                        <td colSpan="5" className="text-center py-5">
                          <i className="bi bi-calendar-x d-block mb-3 fs-1 text-muted"></i>
                          <p className="text-muted">No reservations found yet.</p>
                          <button 
                            onClick={() => navigate('/rooms')} 
                            className="btn btn-brand btn-sm px-4"
                          >
                            Book Now
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;