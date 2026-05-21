import React, { useEffect } from 'react';

const BookingPayment = ({ stripeUrl }) => {  
  useEffect(() => {
    if (stripeUrl) {
      window.open(stripeUrl, '_blank');
    }
  }, [stripeUrl]);

  return (
    <div className="card text-center p-5 border-0 shadow-sm rounded-0 bg-white text-dark my-5 mx-auto" style={{ maxWidth: '600px' }}>
      <div className="mb-4">
        <div className="spinner-grow text-warning mb-3" role="status" style={{ width: '3.5rem', height: '3.5rem' }}></div>
        <h3 className="headingfonts fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>Payment Initialized</h3>
        <p className="text-muted small text-uppercase">Secure Gate Channel Established</p>
      </div>

      <hr className="my-4 opacity-25" />

      <div className="bg-light p-4 mb-4 border-start border-4 border-warning text-start">
        <h6 className="fw-bold mb-2 text-uppercase small">
          <i className="bi bi-shield-fill-check me-2 text-warning"></i>Action Required
        </h6>
        <p className="small mb-0 text-secondary" style={{ lineHeight: '1.6' }}>
          We have securely opened Stripe's secure infrastructure window in a separate browser tab to complete your transaction.
        </p>
      </div>

      <p className="small text-muted mb-4">
        If the payment window did not appear or you closed it, click the button below to complete your checkout process securely.
      </p>

      <a 
        href={stripeUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="btn btn-dark btn-lg w-100 py-3 rounded-0 text-uppercase fw-bold shadow-sm"
        style={{ backgroundColor: '#d0ac77', border: 'none', letterSpacing: '1.5px', fontSize: '14px', color: '#fff' }}
      >
        Complete Secure Payment <i className="bi bi-box-arrow-up-right ms-2"></i>
      </a>
    </div>
  );
};

export default BookingPayment;