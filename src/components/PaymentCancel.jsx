import React, { useEffect } from 'react';

const PaymentCancel = () => {
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         window.close();
    //     }, 4000);
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-off-white px-3">
            <div className="card border-0 shadow-lg p-5 text-center bg-white rounded-0 text-dark position-relative" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="danger-accent-line"></div>
                
                <div className="cancel-icon-wrap mx-auto mb-4 d-flex align-items-center justify-content-center">
                    <i className="bi bi-x-lg display-3"></i>
                </div>

                <h3 className="headingfonts fw-bold text-uppercase mb-2" style={{ letterSpacing: '2px' }}>
                    Payment Cancelled By User
                </h3>
                <div style={{ width: '40px', height: '2px', background: '#bb4343' }} className="mx-auto mb-4"></div>

                <p className="text-muted small px-3 mb-4">
                    The transaction process was intentionally halted or interrupted. No financial settlements were cleared. Please return to your cart summary manifest to initialize checkout again.
                </p>

                {/* <div className="bg-light p-3 small text-secondary mb-4 border border-dashed text-uppercase fw-semibold" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                    <i className="bi bi-clock-history me-2"></i> Closing Window in 4 Seconds...
                </div>

                <button 
                    onClick={() => window.close()} 
                    className="btn btn-danger-dark w-100 py-3 fw-bold text-uppercase small"
                    style={{ borderRadius: '0', letterSpacing: '1px' }}
                >
                    Close Tab Now
                </button> */}
            </div>

            <style>{`
                .bg-off-white { background-color: #f8f5f0; }
                .danger-accent-line { position: absolute; top: 0; left: 0; width: 100%; height: 4px; background-color: #bb4343; }
                
                .cancel-icon-wrap {
                    width: 100px;
                    height: 100px;
                    background-color: #fcebe9;
                    color: #bb4343;
                    border-radius: 50%;
                    animation: shakeIn 0.5s ease-in-out forwards;
                }

                .btn-danger-dark {
                    background-color: #1a1a1a;
                    color: white;
                    border: none;
                    transition: 0.3s ease;
                }
                .btn-danger-dark:hover {
                    background-color: #bb4343;
                }

                @keyframes shakeIn {
                    0% { transform: scale(0.5); opacity: 0; }
                    50% { transform: scale(1.05); }
                    65% { transform: rotate(-8deg); }
                    80% { transform: rotate(8deg); }
                    95% { transform: rotate(-3deg); }
                    100% { transform: scale(1) rotate(0); opacity: 1; }
                }
                .border-dashed { border-style: dashed !important; }
            `}</style>
        </div>
    );
};

export default PaymentCancel;