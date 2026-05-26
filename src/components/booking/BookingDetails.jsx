import React from 'react';

const BookingDetails = ({ data }) => {
  const { reference, status, hotel, guest, items, pricing, review, actions } = data;
  // console.log(data);

  const renderStatusBadge = () => {
    const badgeStyle = { borderRadius: '0' };
    const isSuccess = status.code === 1;

    const badgeColor = (status) => {
      switch (status) {
        case 0:
          return 'warning';
        case 1:
          return 'success';
        case 2:
          return 'danger';
        case 3:
          return 'warning';
        default:
          return 'danger'
      }
    }

    return (
      <span
        className={`badge px-3 py-2 text-uppercase fw-bold rounded-0 bg-${badgeColor(status.code)}`}
        style={badgeStyle}
      >
        {status.label}
      </span>
    );
  };


  return (
    <div className="card border-0 shadow-lg rounded-0 bg-white text-dark p-5 my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center border-bottom pb-4 mb-4">
        <div>
          <span className="badge bg-dark text-uppercase mb-2 rounded-0 small p-2" style={{ letterSpacing: '1px' }}>
            Ref: {reference}
          </span>
          <h2 className="headingfonts fw-bold text-uppercase mb-0" style={{ letterSpacing: '1px' }}>
            Reservation Details
          </h2>
        </div>
        <div className="text-end">
          <p className="small text-muted mb-1 text-uppercase">Status</p>
          {renderStatusBadge()}
        </div>
      </div>

      {/* Hotel & Guest Info */}
      <div className="row g-4 mb-5">
        <div className="col-md-6 border-end">
          <h5 className="fw-bold text-uppercase small text-secondary mb-3">Hotel Details</h5>
          <h5 className="fw-bold mb-1">{hotel.name}</h5>
          <p className="small text-muted mb-0">{hotel.address}, PIN {hotel.pincode}</p>
        </div>
        <div className="col-md-6 ps-md-4">
          <h5 className="fw-bold text-uppercase small text-secondary mb-3">Guest Information</h5>
          <div className="small"><strong>Name:</strong> {guest.name}</div>
          <div className="small"><strong>Email:</strong> {guest.email}</div>
          <div className="small"><strong>Mobile:</strong> {guest.mobile || 'N/A'}</div>
        </div>
      </div>

      {/* Manifest Table */}
      <div className="table-responsive mb-5">
        <table className="table border rounded-0 small align-middle">
          <thead className="bg-light text-uppercase">
            <tr>
              <th className="ps-4">Room Details</th>
              <th className="text-center">Dates</th>
              <th className="text-center">Nights</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="ps-4 py-3">
                  <span className="fw-bold d-block">{item.room_number}</span>
                  <small className="text-muted text-uppercase">{item.category} - {item.type}</small>
                </td>
                <td className="text-center text-muted">{item.check_in} - {item.check_out}</td>
                <td className="text-center fw-bold">{item.nights}</td>
                <td className="text-end fw-bold">{item.total} {pricing.currency}</td>
              </tr>
            ))}
            {pricing.discount_applied > 0 && (
              <tr>
                <td colSpan="3" className="text-end text-uppercase fw-bold py-3">
                  Discount Applied
                </td>
                <td className="text-end fw-bold py-3 text-success">
                  - {pricing.discount_applied} {pricing.currency}
                </td>
              </tr>
            )}
            <tr className="table-light">
              <td colSpan="3" className="text-end text-uppercase fw-bold py-3">Grand Total</td>
              <td className="text-end fw-bold h5 mb-0 py-3" style={{ color: '#d0ac77' }}>
                {pricing.total_paid} {pricing.currency}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Actions */}
      <div className="d-flex justify-content-end gap-2 pt-4 border-top">
        <button onClick={() => window.history.back()} className="btn btn-outline-dark px-4 rounded-0 small fw-bold text-uppercase">
          Back
        </button>
        {actions.can_invoice && (
          <button className="btn btn-dark px-4 rounded-0 small fw-bold text-uppercase"
            onClick={() => window.location.href = data.download_invoice}>
            <i className="bi bi-download me-1"></i> Invoice
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;