import React from 'react';

const BookingDetails = ({ data }) => {
  const { reference, status, hotel, guest, items, pricing, review, actions } = data;

  return (
    <div className="card border-0 shadow-lg rounded-0 bg-white text-dark p-5 my-4">
      {/* Upper Header Grid */}
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
          <span className={`badge px-3 py-2 text-uppercase fw-bold rounded-0 ${status.code === 1 ? 'bg-success' : 'bg-warning text-dark'}`}>
            {status.label}
          </span>
        </div>
      </div>

      <div className="row g-4">
        {/* Hotel Details Column */}
        <div className="col-md-6 border-end">
          <h5 className="fw-bold text-uppercase small text-secondary mb-3" style={{ letterSpacing: '0.5px' }}>Hotel Details</h5>
          <h5 className="fw-bold mb-1">{hotel.name}</h5>
          <p className="small text-muted text-uppercase mb-0">
            <i className="bi bi-geo-alt-fill me-1"></i> {hotel.address}, PIN {hotel.pincode}
          </p>
        </div>

        {/* Guest Details Column */}
        <div className="col-md-6 ps-md-4">
          <h5 className="fw-bold text-uppercase small text-secondary mb-3" style={{ letterSpacing: '0.5px' }}>Guest Information</h5>
          <div className="mb-2"><span className="text-muted small text-uppercase d-inline-block" style={{ width: '100px' }}>Name:</span> <span className="fw-bold small">{guest.name}</span></div>
          <div className="mb-2"><span className="text-muted small text-uppercase d-inline-block" style={{ width: '100px' }}>Email:</span> <span className="small">{guest.email}</span></div>
          <div className="mb-2"><span className="text-muted small text-uppercase d-inline-block" style={{ width: '100px' }}>Mobile:</span> <span className="small">{guest.mobile || 'N/A'}</span></div>
        </div>
      </div>

      {/* Room Allocation Manifesto Table */}
      <div className="mt-5">
        <h5 className="fw-bold text-uppercase small text-secondary mb-3" style={{ letterSpacing: '0.5px' }}>Room Allocation Manifest</h5>
        <table className="table table-bordered rounded-0 small align-middle">
          <thead className="table-dark text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
            <tr>
              <th>Room Number & Class</th>
              <th className="text-center">Stay Duration</th>
              <th className="text-center" style={{ width: '100px' }}>Nights</th>
              <th className="text-end" style={{ width: '150px' }}>Rate / Night</th>
              <th className="text-end" style={{ width: '150px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="py-3">
                  <span className="fw-bold text-uppercase d-block">Room {item.room_number}</span>
                  <small className="text-muted text-uppercase" style={{ fontSize: '10px' }}>{item.category} — {item.type}</small>
                </td>
                <td className="text-center text-muted">{item.check_in} — {item.check_out}</td>
                <td className="text-center fw-bold">{item.nights}</td>
                <td className="text-end fw-bold">{pricing.currency} {Number(item.price_per_night).toFixed(2)}</td>
                <td className="text-end fw-bold">{pricing.currency} {Number(item.total).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" className="text-end text-uppercase text-muted fw-bold py-2">Subtotal</td>
              <td className="text-end fw-bold py-2">{pricing.currency} {Number(pricing.subtotal).toFixed(2)}</td>
            </tr>
            {pricing.discount_applied > 0 && (
              <tr>
                <td colSpan="4" className="text-end text-uppercase text-success fw-bold py-2">Promo Savings Applied</td>
                <td className="text-end fw-bold text-success py-2">- {pricing.currency} {Number(pricing.discount_applied).toFixed(2)}</td>
              </tr>
            )}
            <tr className="table-light">
              <td colSpan="4" className="text-end text-uppercase fw-bold h6 mb-0 py-3">Grand Total Paid</td>
              <td className="text-end fw-bold text-primary h5 mb-0 py-3" style={{ color: '#d0ac77' }}>
                {pricing.currency} {Number(pricing.total_paid).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Re-integrated review display section loop */}
      {review && (
        <div className="mt-5 p-4 bg-light border">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-uppercase small text-secondary mb-0" style={{ letterSpacing: '0.5px' }}>Your Stay Review</h5>
            <span className="badge bg-warning text-dark rounded-0 fw-bold">★ {review.rating}.0 / 5</span>
          </div>
          <p className="fst-italic mb-3 text-secondary">"{review.comment}"</p>
          <div className="row g-2 text-center text-uppercase" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
            <div className="col-3 border p-2 bg-white"><strong>Food:</strong> {review.scores.food}/5</div>
            <div className="col-3 border p-2 bg-white"><strong>Service:</strong> {review.scores.services}/5</div>
            <div className="col-3 border p-2 bg-white"><strong>Hospitality:</strong> {review.scores.hospitality}/5</div>
            <div className="col-3 border p-2 bg-white"><strong>Cleaning:</strong> {review.scores.cleaning}/5</div>
          </div>
          <small className="text-muted d-block mt-3 text-end">Submitted on {review.created_at}</small>
        </div>
      )}

      {/* Action Triggers Grid mapping actions flags array safely */}
      <div className="d-flex justify-content-end gap-2 mt-4 pt-4 border-top">
        {actions.can_cancel && <button className="btn btn-outline-danger px-4 rounded-0 small fw-bold text-uppercase">Cancel Booking</button>}
        {actions.can_refund && <button className="btn btn-outline-warning px-4 rounded-0 small fw-bold text-uppercase text-dark">Request Refund</button>}
        {actions.can_invoice && <button className="btn btn-outline-dark px-4 rounded-0 small fw-bold text-uppercase"><i className="bi bi-download me-1"></i> Invoice</button>}
        {actions.can_review && <button className="btn btn-dark px-4 rounded-0 small fw-bold text-uppercase" style={{ backgroundColor: '#d0ac77', border: 'none' }}>Leave a Review</button>}
      </div>
    </div>
  );
};

export default BookingDetails;