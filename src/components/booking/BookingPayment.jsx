import React, { useEffect, useRef } from 'react';

const BookingPayment = ({ stripeUrl }) => {  
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (stripeUrl && !hasRedirected.current) {
      window.open(stripeUrl, '_blank');
      hasRedirected.current = true;
    }
  }, [stripeUrl]);

  return (
    <div className="card border-0 shadow-sm mx-auto my-5" style={{ borderRadius: '0', maxWidth: '600px' }}>
      {/* Matching top gold accent bar used across your booking systems */}
      <div className="card-header bg-dark py-4 px-5 text-center" style={{ borderBottom: '4px solid #bca47f' }}>
        <h4 className="text-white text-uppercase fw-bold mb-0" style={{ letterSpacing: '2px' }}>
          Payment Gateway Redirect
        </h4>
      </div>

      <div className="card-body p-5 bg-white text-center">
        <div className="mb-4">
          <div className="spinner-grow mb-3" role="status" style={{ width: '3.5rem', height: '3.5rem', color: '#bca47f' }}></div>
          <h5 className="fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>Transaction Initialized</h5>
          <p className="text-muted small text-uppercase">Secure Gateway Pipeline Active</p>
        </div>

        <hr className="my-4 opacity-25" />

        <div className="bg-light p-4 mb-4 border-start border-4 text-start" style={{ borderColor: '#bca47f' }}>
          <h6 className="fw-bold mb-2 text-uppercase small" style={{ color: '#bca47f' }}>
            <i className="bi bi-shield-fill-check me-2"></i>Action Required
          </h6>
          <p className="small mb-0 text-secondary" style={{ lineHeight: '1.6' }}>
            We have securely launched Stripe's infrastructure in a separate tab to handle your transaction details. 
            <strong> Please keep this window open.</strong> It will seamlessly refresh the moment the server completes processing.
          </p>
        </div>

        <p className="small text-muted mb-4">
          If your web pop-up blocks intercepted the page or you accidently closed the link, hit the manual link below:
        </p>

        <a 
          href={stripeUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-brand w-100 py-3 text-uppercase fw-bold shadow-sm"
          style={{ fontSize: '14px', letterSpacing: '1.5px' }}
        >
          Complete Secure Payment <i className="bi bi-box-arrow-up-right ms-2"></i>
        </a>
      </div>

      <style>{`
        .btn-brand {
          background-color: #bca47f;
          color: white;
          border: none;
          border-radius: 0;
          transition: 0.3s;
        }
        .btn-brand:hover {
          background-color: #1a1a1a;
          color: #bca47f;
        }
      `}</style>
    </div>
  );
};

export default BookingPayment;