import React from 'react';

const SummaryRoomCard = ({ id, details, currency, onRemove }) => {
  return (
    <div className="card border-0 shadow-sm mb-4 overflow-hidden" style={{ borderRadius: 0, height: '200px' }}>
      <div className="row g-0 h-100">
        <div className="col-md-3">
          <img 
            src={`http://localhost:8000/storage/${details.image || 'placeholder.jpg'}`} 
            className="img-fluid object-fit-cover w-100 h-100" 
            alt={details.title}
          />
        </div>
        <div className="col-md-9 p-4">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="fw-bold mb-1 text-uppercase">{details.title}</h5>
              <p className="small text-muted mb-0">
                <i className="bi bi-door-closed me-1"></i> {details.quantity} {details.quantity > 1 ? 'Rooms' : 'Room'}
              </p>
            </div>
            <div className="text-end">
              {details.price < details.base_price ? (
                <>
                  <del className="text-muted small d-block">
                    {currency} {Number(details.converted_base_price).toFixed(2)}
                  </del>
                  <span className="fw-bold text-primary fs-4">
                    {currency} {Number(details.converted_price).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="fw-bold text-dark fs-4">
                  {currency} {Number((details.base_price / details.price) * details.converted_price).toFixed(2)}
                </span>
              )}
              <small className="text-muted d-block small">per night</small>
            </div>
          </div>

          <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
            <button 
              onClick={() => onRemove(id)}
              className="btn btn-link text-danger small text-decoration-none fw-bold p-0 border-0"
              style={{ fontSize: '0.85rem' }}
            >
              <i className="bi bi-trash3 me-1"></i> REMOVE
            </button>

            {details.offer_message && (
              <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 small">
                <i className="bi bi-patch-check-fill me-1"></i> {details.offer_message}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryRoomCard;