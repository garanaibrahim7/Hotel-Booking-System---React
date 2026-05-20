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

        initializeHandshake: builder.query({
            query: () => 'sanctum/csrf-cookie',
        }),

        getRooms: builder.query({
            query: (params) => ({
                url: 'rooms',
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

        addRoomToStay: builder.mutation({
            query: (payload) => ({
                url: 'booking/stay/add',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['StaySummary', 'StayRoomsCount'],
        }),
    }),
});

export const {
    useInitializeHandshakeQuery,
    useGetRoomsQuery,
    useGetStaySummaryQuery,
    useGetStayRoomsCountQuery,
    useAddRoomToStayMutation
} = hotelApi;