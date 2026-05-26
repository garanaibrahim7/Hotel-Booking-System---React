import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import DateModal from '../components/DateModal';
import { useGetRoomsQuery, useAddRoomToStayMutation, useGetStaySummaryQuery } from '../redux/store/apiSlice';
import SideBarFilter from '../components/SideBarFilter';
import SearchForm from '../components/Home/SearchForm';


const Rooms = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { data: summary } = useGetStaySummaryQuery();
    const currentStayHotelId = summary?.hotel_id || null;

    const [checkInOut, setCheckInOut] = useState(null);

    const [hotelGroups, setHotelGroups] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [modalState, setModalState] = useState({ show: false, roomId: null, hotelId: null });

    const queryParams = { ...Object.fromEntries([...searchParams]), page };
    // console.log(queryParams);
    const filters = useMemo(
        () => ({
            ...Object.fromEntries([...searchParams]),
            page
        }),
        [searchParams, page]
    );

    // console.log(searchParams);


    const { data: apiResponse, isFetching, isLoading: isInitialLoading } = useGetRoomsQuery(filters);

    const [addRoomToStay] = useAddRoomToStayMutation();


    useEffect(() => {
        setHotelGroups([]);
        setPage(1);
        setHasMore(true);

    }, [searchParams]);

    useEffect(() => {
        if (apiResponse?.data) {
            const newGroups = apiResponse.data;
            const currentPage = apiResponse.meta.current_page;
            const lastPage = apiResponse.meta.last_page;

            setHotelGroups(prev => page === 1 ? newGroups : [...prev, ...newGroups]);
            setHasMore(currentPage < lastPage);

            const checkIn = new Date(apiResponse.check_in);
            const checkOut = new Date(apiResponse.check_out);
            if (checkIn.getMonth() === checkOut.getMonth() && checkIn.getFullYear() === checkOut.getFullYear()) {
                setCheckInOut(checkIn.getDate() + ' - ' + checkOut.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }));
            } else {
                setCheckInOut(checkIn.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ' - ' +
                    checkOut.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }));
            }

            // setCheckInOut(checkIn.getDate() + ' - ' + checkOut.getDate() + ' ' + checkOut.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }));

            // console.log(activeFilters);
        }
    }, [apiResponse, page, searchParams]);

    const observer = useRef();
    const lastHotelElementRef = useCallback(node => {
        if (isFetching) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [isFetching, hasMore]);

    const handleAddToCartClick = async (roomId, hotelId, checkIn = null, checkOut = null, discount = null) => {

        // console.log(discount);

        try {
            const payload = { room_detail_id: roomId, hotel_id: hotelId };
            if (checkIn && checkOut) {
                payload.check_in = checkIn;
                payload.check_out = checkOut;
            }

            if (discount && discount.coupon_code) {
                payload.coupon_code = discount.coupon_code;
                payload.offer_message = discount.offer;
                payload.offer_type = discount.offer_type;
            }

            // console.log(payload);
            const response = await addRoomToStay(payload).unwrap();
            // console.log(response);


            if (response.show_modal) {
                setModalState({ show: true, roomId: response.room_id, hotelId: response.hotel_id });
            } else {
                setModalState({ show: false, roomId: null, hotelId: null });
                // setCheckIn(checkIn);
                // setCheckOut(checkOut);
                alert('Room added to your stay list successfully!');
            }
        } catch (err) {
            console.error('Redux mutation execution failed:', err);
        }
    };

    if (isInitialLoading && page === 1) {
        return <div className="text-center py-5 fs-4 mt-5">Loading Available Rooms...</div>
    }

    const cityName = apiResponse?.selected || 'Selected City';
    const totalHotels = apiResponse?.data.length || 0;
    const totalRooms = apiResponse?.meta?.total || 0;

    return (
        <div className="container py-4">
            {hotelGroups.length === 0 ? (
                <div className="row my-5 pt-4">
                    <div className="col-12 mb-4 text-center py-5">
                        <h2 className="headingfonts fw-bold text-muted">No Rooms Found Matching Your Criteria</h2>
                        <p className="text-secondary mt-2">Try adjusting your filters, dates, or search range.</p>
                    </div>
                    <SearchForm cities={apiResponse.filters.cities ?? null} />
                </div>
            ) : (
                <>
                    <div className="row mt-4 pt-4">
                        <div className="col-12 mb-2">
                            <div className="py-4 border-bottom d-flex justify-content-between align-items-end">
                                <div>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb mb-2 small text-uppercase" style={{ letterSpacing: '1px' }}>
                                            <li className="breadcrumb-item text-muted">Exploration</li>
                                            <li className="breadcrumb-item active text-dark">{cityName}</li>
                                        </ol>
                                    </nav>
                                    <h2 className="headingfonts fw-bold display-6 mb-0">
                                        Discover Stays in <span className="text-classic">{cityName}</span>
                                    </h2>
                                    <div className="mt-2 text-muted small">
                                        {checkInOut ? (
                                            <span className="me-3">
                                                <i className="bi bi-calendar3 me-1"></i>
                                                {checkInOut}
                                            </span>
                                        ) : ''}
                                        <span>
                                            <i className="bi bi-houses me-1"></i> <strong>{totalRooms}</strong> Rooms Found&nbsp;
                                            {/* <i className="bi bi-houses me-1"></i>  */}
                                            from <strong>{totalHotels}</strong> Hotels
                                        </span>

                                    </div>
                                </div>
                                <div className="text-end d-none d-md-block">
                                    <span className="badge rounded-pill bg-dark px-3 py-2">Best Prices Guaranteed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-3">
                            <SideBarFilter
                                cities={apiResponse.filters.cities ?? null}
                                filtersData={apiResponse.filters}
                                initialFilters={apiResponse.filters}
                                onFilterApply={(updatedFilters) => setSearchParams(updatedFilters)}
                            />
                        </div>

                        <div className="col-lg-9">
                            {hotelGroups.map((group, index) => {
                                const isLastElement = hotelGroups.length === index + 1;

                                return (
                                    <div
                                        key={group.hotel.id}
                                        className="hotel-group mb-5"
                                        ref={isLastElement ? lastHotelElementRef : null}
                                    >
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="flex-grow-1">
                                                <h4 className="headingfonts fw-bold text-uppercase mb-0" style={{ letterSpacing: '2px' }}>
                                                    {group.hotel.name}
                                                </h4>
                                                <p className="text-muted small mb-0">
                                                    <i className="bi bi-geo-alt me-1"></i> {group.hotel.address}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="row g-4">
                                            <div className="col-12">
                                                {group.rooms?.map((room) => (
                                                    <RoomCard
                                                        key={room.id + Date.now()}
                                                        room={{ ...room, hotel: group.hotel }}
                                                        currentStayHotelId={currentStayHotelId}
                                                        onChooseToBook={(rId, hId, discount) => handleAddToCartClick(rId, hId, null, null, discount)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {isFetching && page > 1 && (
                                <div className="text-center py-4 text-muted fs-5">
                                    Fetching more luxury retreats...
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            <DateModal
                show={modalState.show}
                modalData={modalState}
                onClose={() => setModalState({ show: false, roomId: null, hotelId: null })}
                onConfirm={(rId, hId, cIn, cOut) => handleAddToCartClick(rId, hId, cIn, cOut)}
            />
        </div>
    );
};

export default Rooms;