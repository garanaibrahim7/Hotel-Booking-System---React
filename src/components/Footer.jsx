import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mt-auto">
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 col-md-6 mb-4 mb-md-0">
                        <h2 className="fw-bold">Logo Here</h2>
                        <p className="text-muted pt-3">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat recusandae facilis inventore
                            mollitia architecto delectus.
                        </p>
                    </div>

                    <div className="col-12 col-sm-4 col-md-2">
                        <h5 className="fw-bold">Menu</h5>
                        <ul className="list-unstyled mt-4">
                            <li className="py-2"><Link className="text-decoration-none text-dark" to="/">Find Home</Link></li>
                            <li className="py-2"><Link className="text-decoration-none text-dark" to="/add-listing">Add Listing</Link></li>
                            <li className="py-2"><Link className="text-decoration-none text-dark" to="/hotels">Listings</Link></li>
                            <li className="py-2"><Link className="text-decoration-none text-dark" to="/blog">Blog</Link></li>
                        </ul>
                    </div>

                    <div className="col-12 col-sm-4 col-md-2">
                        <h5 className="fw-bold">Information</h5>
                        <ul className="list-unstyled mt-4">
                            <li className="py-2"><Link className="text-decoration-none text-dark" to="/about">About Us</Link></li>
                            <li className="py-2"><Link className="text-decoration-none text-dark" to="/contact">Contact Us</Link></li>
                            <li className="py-2"><Link className="text-decoration-none text-dark" to="/services">Services</Link></li>
                            <li className="py-2"><Link className="text-decoration-none text-dark" to="/faq">FAQ</Link></li>
                        </ul>
                    </div>

                    <div className="col-12 col-sm-4 col-md-2">
                        <h5 className="fw-bold">Legal</h5>
                        <ul className="list-unstyled mt-4">
                            <li className="py-2"><Link className="text-decoration-none text-dark" to="/privacy">Privacy Policy</Link></li>
                            <li className="py-2"><Link className="text-decoration-none text-dark" to="/refund">Refund Policy</Link></li>
                            <li className="py-2"><Link className="text-decoration-none text-dark" to="/cookies">Cookie Policy</Link></li>
                            <li className="py-2"><Link className="text-decoration-none text-dark" to="/terms">Legal Terms</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-top border-secondary py-3">
                <div className="container">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <p className="text-muted m-0">&copy; Copyright 2026 <b>Company Name</b>. All Rights Reserved.</p>
                        <div className="gap-3 d-flex">
                            <Link className="text-decoration-none text-dark small" to="/">Find Home</Link>
                            <Link className="text-decoration-none text-dark small" to="/add-listing">Add Listing</Link>
                            <Link className="text-decoration-none text-dark small" to="/agencies">View Agencies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;