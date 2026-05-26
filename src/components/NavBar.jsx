import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGetStayRoomsCountQuery, useGetUserQuery } from '../redux/store/apiSlice';

const NavBar = () => {
    const location = useLocation();
    const { data: apiResponse, isFetching, isLoading: isInitialLoading } = useGetStayRoomsCountQuery();
    const [roomsCount, setRoomsCount] = useState(0);
    const { data: user, isSuccess: isAuthenticated } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: false,
    });

    const menuItems = [
        { title: 'Home', path: '/' },
        { title: 'Hotels', path: '/hotels' },
        { title: 'Rooms', path: '/rooms' },
        { title: 'Bookings', path: '/bookings' },
        { title: 'Stay Summary', path: '/stay-list' },
        // { title: isAuthenticated ? 'Profile' : 'Login', path: isAuthenticated ? '/profile' : '/login' }
    ];

    if(!isAuthenticated){
        menuItems.push({ title: 'Login', path: '/login' });
    }

    const isActive = (path) => location.pathname === path ? 'active-link' : '';


    useEffect(() => {
        if (!isInitialLoading && !isFetching) {
            setRoomsCount(apiResponse?.rooms_count ?? 0);
        }
    }, [isFetching]);

    if (location.pathname === '/home' || location.pathname === '/') {
        document.body.classList.add('is-home');
        window.addEventListener('scroll', function () {
            const nav = document.querySelector('.custom-nav');
            if (window.scrollY > 700) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    } else {
        document.body.classList.remove('is-home');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top custom-nav py-3" style={{ zIndex: 1050 }}>
                <div className="container-fluid px-4 px-md-5">
                    <Link className="navbar-brand headingfonts text-light" to="/">HOTEL LOGO</Link>

                    <button className="navbar-toggler border-0 shadow-none bg-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse d-none d-lg-block">
                        <ul className="navbar-nav ms-auto gap-4">
                            {menuItems.map((item, index) => (
                                <li key={index} className="nav-item">
                                    <Link className={`nav-link position-relative ${isActive(item.path)}`} to={item.path}>
                                        <span>{item.title}</span>
                                        {item.title === 'Stay Summary' && !isFetching && roomsCount > 0 && (
                                            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-circle">
                                                {roomsCount}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 className="offcanvas-title headingfonts" id="mobileMenuLabel">MENU</h5>
                    <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-0">
                    <ul className="list-group list-group-flush">
                        {menuItems.map((item, index) => (
                            <li key={index} className="list-group-item border-0 py-3 px-4" data-bs-dismiss="offcanvas">
                                <Link to={item.path} className={`text-decoration-none text-dark fw-bold d-block ${isActive(item.path)}`}>
                                    {item.title} {item.title === 'Stay Summary' && roomsCount > 0 && `(${roomsCount})`}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavBar;