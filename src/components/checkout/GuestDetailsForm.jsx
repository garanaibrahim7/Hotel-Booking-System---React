import React from 'react';

const GuestDetailsForm = ({ formData, onChange, onSubmit, errors = {} }) => {
  return (
    <div className="bg-white p-5">
      <h3 className="fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>
        Guest Information
      </h3>

      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-md-12">
            <label className="small fw-bold text-uppercase mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className={`form-control rounded-0 ${errors.name ? 'is-invalid' : ''}`}
              style={{ border: '1px solid #e0e0e0', padding: '12px' }}
              value={formData.name}
              onChange={onChange}
            />
            {errors.name && <small className="text-danger mt-1 d-block">{errors.name}</small>}
          </div>

          <div className="col-md-12">
            <label className="small fw-bold text-uppercase mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              className={`form-control rounded-0 ${errors.email ? 'is-invalid' : ''}`}
              style={{ border: '1px solid #e0e0e0', padding: '12px' }}
              value={formData.email}
              onChange={onChange}
            />
            {errors.email && <small className="text-danger mt-1 d-block">{errors.email}</small>}
          </div>

          <div className="col-md-12">
            <label className="small fw-bold text-uppercase mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className={`form-control rounded-0 ${errors.phone ? 'is-invalid' : ''}`}
              style={{ border: '1px solid #e0e0e0', padding: '12px' }}
              placeholder="+91 . . ."
              value={formData.phone}
              onChange={onChange}
            />
            {errors.phone && <small className="text-danger mt-1 d-block">{errors.phone}</small>}
          </div>

          <div className="col-md-12">
            <label className="small fw-bold text-uppercase mb-1">Any Special Instructions</label>
            <textarea
              name="instruction"
              className="form-control rounded-0"
              style={{ border: '1px solid #e0e0e0', padding: '12px' }}
              rows="3"
              placeholder="Any Special Instruction for Smooth Check IN"
              value={formData.instruction}
              onChange={onChange}
            />
          </div>
        </div>

        {/* Payment Methods block */}
        <div className="mt-5">
          <h5 className="fw-bold text-uppercase mb-3">Payment Method</h5>
          <div className="border p-3 d-flex align-items-center mb-2 rounded-0">
            <input className="form-check-input" type="radio" name="payment_method" value="stripe" checked readOnly />
            <label className="ms-3 fw-bold text-uppercase small mb-0">Credit / Debit Card (Stripe)</label>
            <i className="bi bi-stripe ms-auto fs-4 text-muted"></i>
          </div>
          <div className="border p-3 d-flex align-items-center mb-2 rounded-0 bg-light opacity-75">
            <input className="form-check-input" type="radio" name="payment_method" value="at_hotel" disabled />
            <label className="ms-3 fw-bold text-uppercase small text-muted mb-0">
              Pay at Hotel (Currently Not Available)
            </label>
            <i className="bi bi-cash ms-auto fs-4 text-muted"></i>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-dark btn-lg w-100 mt-5 py-3 fw-bold text-uppercase rounded-0"
          style={{ backgroundColor: '#d0ac77', border: 'none', letterSpacing: '2px', color: '#fff' }}
        >
          Complete Booking
        </button>
      </form>
    </div>
  );
};

export default GuestDetailsForm;