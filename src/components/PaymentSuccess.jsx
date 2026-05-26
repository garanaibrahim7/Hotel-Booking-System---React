import React, { useEffect } from 'react';

const PaymentSuccess = () => {
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         window.close();
    //     }, 4000);
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-off-white px-3">
            <div className="card border-0 shadow-lg p-5 text-center bg-white rounded-0 text-dark position-relative" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="gold-accent-line"></div>

                <div className="success-icon-wrap mx-auto mb-4 d-flex align-items-center justify-content-center">
                    <i className="bi bi-check-lg display-3"></i>
                </div>

                <h3 className="headingfonts fw-bold text-uppercase mb-2" style={{ letterSpacing: '2px' }}>
                    Payment Successful
                </h3>
                <div style={{ width: '40px', height: '2px', background: '#bca47f' }} className="mx-auto mb-4"></div>

                <p className="text-muted small px-3 mb-4">
                    Your secure transaction has been fully processed. You can safely close this browser tab now and return to the primary portal to check your reservation records.
                </p>

                {/* <div className="bg-light p-3 small text-secondary mb-4 border border-dashed text-uppercase fw-semibold" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                    <i className="bi bi-clock-history me-2"></i> Closing Window in 4 Seconds...
                </div>

                <button
                    onClick={() => window.close()}
                    className="btn btn-brand-dark w-100 py-3 fw-bold text-uppercase small"
                    style={{ borderRadius: '0', letterSpacing: '1px' }}
                >
                    Close Tab Now
                </button> */}
            </div>

            <style>{`
                .bg-off-white { background-color: #f8f5f0; }
                .gold-accent-line { position: absolute; top: 0; left: 0; width: 100%; height: 4px; background-color: #bca47f; }
                
                .success-icon-wrap {
                    width: 100px;
                    height: 100px;
                    background-color: #f4efe6;
                    color: #bca47f;
                    border-radius: 50%;
                    animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, pulseGlow 2s infinite ease-in-out;
                }

                .btn-brand-dark {
                    background-color: #1a1a1a;
                    color: white;
                    border: none;
                    transition: 0.3s ease;
                }
                .btn-brand-dark:hover {
                    background-color: #bca47f;
                }

                @keyframes scaleIn {
                    0% { transform: scale(0); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes pulseGlow {
                    0% { box-shadow: 0 0 0 0 rgba(188, 164, 127, 0.4); }
                    70% { box-shadow: 0 0 0 15px rgba(188, 164, 127, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(188, 164, 127, 0); }
                }
                .border-dashed { border-style: dashed !important; }
            `}</style>
        </div>
    );
};

export default PaymentSuccess;