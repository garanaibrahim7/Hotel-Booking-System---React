import React from 'react';

const SummaryPricingPanel = ({ summary, showDiscount, onCheckoutTrigger }) => {
  return (
    <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: '100px', borderRadius: 0 }}>
      <h5 className="fw-bold mb-4 headingfonts text-uppercase" style={{ letterSpacing: '1px' }}>Stay Summary</h5>

      <div className="d-flex justify-content-between mb-3">
        <span className="text-muted small text-uppercase">Duration</span>
        <span className="fw-bold small" id="summary_duration">
          {summary.stayNights} {summary.stayNights > 1 ? 'Nights' : 'Night'}
        </span>
      </div>

      <div className="d-flex justify-content-between mb-2">
        <span className="text-muted small text-uppercase">Subtotal</span>
        <span className="text-dark small" id="summary_subtotal">
          {summary.currency} {Number(summary.subtotal).toFixed(2)}
        </span>
      </div>

      {/* Coupon structural layer row */}
      <div 
        id="summary_discount_row"
        className={`justify-content-between mb-2 text-success ${showDiscount ? 'd-flex' : 'd-none'}`}
      >
        <span className="small text-uppercase">Discount Applied</span>
        <span className="small fw-bold" id="summary_discount">
          - {summary.currency} {Number(summary.totalSavings).toFixed(2)}
        </span>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 pt-4 border-top">
        <h5 className="fw-bold mb-0 text-uppercase small">Total Amount</h5>
        <h4 className="fw-bold mb-0 text-primary" id="summary_grand_total">
          {summary.currency} {Number(summary.grandTotal).toFixed(2)}
        </h4>
      </div>

      <button
        onClick={onCheckoutTrigger}
        className="btn btn-dark w-100 py-3 mt-4 fw-bold text-uppercase rounded-0"
        style={{ letterSpacing: '2px', backgroundColor: '#212529', color: '#fff' }}
      >
        Checkout <i className="bi bi-chevron-right ms-2"></i>
      </button>
    </div>
  );
};

export default SummaryPricingPanel;