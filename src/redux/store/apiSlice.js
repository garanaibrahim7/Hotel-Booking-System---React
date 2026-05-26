import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hotelApi = createApi({
    reducerPath: 'hotelApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/',
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            headers.set('X-Requested-With', 'XMLHttpRequest');
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            if (token) {
                headers.set('X-XSRF-TOKEN', decodeURIComponent(token));
            }
            return headers;
        },
    }),
    tagTypes: ['StaySummary'],
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['StaySummary', 'StayRoomsCount'],
        }),

        getUser: builder.query({
            query: () => 'user',
        }),

        initializeHandshake: builder.query({
            query: () => ({
                url: 'http://localhost:8000/sanctum/csrf-cookie'
            }),
        }),

        getRooms: builder.query({
            query: (params) => ({
                url: 'rooms',
                params,
            }),
        }),

        getCities: builder.query({
            query: () => ({
                url: 'cities',
            }),
        }),

        getUserDetails: builder.query({
            query: (params) => ({
                url: 'user',
                params,
            }),
        }),

        getStaySummary: builder.query({
            query: () => 'booking/stay/summary',
            providesTags: ['StaySummary'],
        }),

        getStayRoomsCount: builder.query({
            query: () => 'booking/stay/rooms',
            providesTags: ['StayRoomsCount'],
        }),

        updateStayDates: builder.mutation({
            query: (payload) => ({
                url: 'booking/stay/update_dates',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['StaySummary'],
        }),

        addRoomToStay: builder.mutation({
            query: (payload) => ({
                url: 'booking/stay/add',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['StaySummary', 'StayRoomsCount'],
        }),

        removeRoomFromStay: builder.mutation({
            query: (roomId) => ({
                url: `booking/stay/remove/${roomId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['StaySummary'], 
        }),

        getCheckoutDetails: builder.query({
            query: () => 'booking/checkout',
            providesTags: ['CheckoutDetails'],
        }),

        applyCoupon: builder.mutation({
            query: (payload) => ({
                url: 'booking/apply-coupon',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['CheckoutManifest'],
        }),

        removeCoupon: builder.mutation({
            query: () => ({
                url: 'booking/remove-coupon',
                method: 'POST',
            }),
            invalidatesTags: ['CheckoutManifest'],
        }),

        processCheckout: builder.mutation({
            query: (payload) => ({
                url: 'book',
                method: 'POST',
                body: payload,
            }),
            providesTags: ['ProcessCheckout'],
        }),
        getBookingDetails: builder.query({
            query: (bookingId) => `booking/${bookingId}`,
            providesTags: (result, error, bookingId) => [
                { type: 'BookingDetails', id: bookingId }
            ],
        }),
        getBookings: builder.query({
            query: () => 'bookings',
            providesTags: ['Bookings'],
        }),
    }),
});

export const {
    useLoginMutation,
    useInitializeHandshakeQuery,
    useGetUserQuery,
    useGetCitiesQuery,
    useGetRoomsQuery,
    useGetStaySummaryQuery,
    useGetStayRoomsCountQuery,
    useUpdateStayDatesMutation,
    useAddRoomToStayMutation,
    useRemoveRoomFromStayMutation,
    useGetUserDetailsQuery,
    useGetCheckoutDetailsQuery,
    useApplyCouponMutation,
    useRemoveCouponMutation,
    useProcessCheckoutMutation,
    useGetBookingDetailsQuery,
    useGetBookingsQuery
} = hotelApi;