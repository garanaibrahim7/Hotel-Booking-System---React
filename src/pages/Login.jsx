import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/components/login.css'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        console.log('Submitting login:', formData);
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light mt-4" style={{ backgroundColor: '#f8f5f0' }}>
            <div className="row g-0 shadow-lg w-100" style={{ maxWidth: '500px' }}>
                <div className="col-md-12 bg-white p-5">
                    <div className="mb-5 text-center text-md-start">
                        <h3 className="fw-bold text-uppercase mb-2" style={{ letterSpacing: '1px', color: '#1a1a1a' }}>Login</h3>
                        <div style={{ width: '50px', height: '3px', backgroundColor: '#bca47f' }} className="mx-auto mx-md-0"></div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="small fw-bold text-uppercase text-muted mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoFocus
                            />
                            {errors.email && (
                                <span className="invalid-feedback"><strong>{errors.email[0]}</strong></span>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="small fw-bold text-uppercase text-muted mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <Link to="/forgot-password" Brass class="small text-decoration-none" style={{ color: '#a18151' }}>
                                Forgot Password ?
                            </Link>
                            {errors.password && (
                                <span className="invalid-feedback"><strong>{errors.password[0]}</strong></span>
                            )}
                        </div>

                        <div className="mb-4 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="remember"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                            />
                            <label className="form-check-label small text-uppercase fw-semibold" htmlFor="remember">
                                Keep me signed in
                            </label>
                        </div>

                        <button type="submit" className="btn btn-brand btn-lg w-100 py-3 fw-bold mb-4">
                            Sign In
                        </button>

                        <div className="text-center">
                            <p className="small text-muted mb-0">Don't have an account?</p>
                            <Link to="/register" className="fw-bold text-decoration-none text-uppercase text-dark small">
                                Create Account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;