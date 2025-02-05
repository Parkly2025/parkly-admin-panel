import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store';
import type { User } from '@/features/users/data/schema';
import UniversalCookie from 'universal-cookie';

// =======================================================
// Schema Types (based on OpenAPI definitions)
// =======================================================

export interface CreateUserDTO {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
}

export interface LoginDTO {
  username: string;
}

export interface CreateReservationDTO {
  parkingSpotId: number;
  userId: number;
  startTime: string; // ISO date-time string
  endTime: string;
  totalCost: number;
}

export interface ReturnReservationDTO {
  id: number;
  parkingSpotId: number;
  userId: number;
  startTime: string;
  endTime: string;
  totalCost: number;
}

export interface ParkingArea {
  id: number;
  name: string;
  address: string;
  city: string;
  hourlyRate: number;
  longitude: number;
  latitude: number;
}

export interface ParkingSpot {
  id: number;
  spotNumber: string;
  parkingArea: ParkingArea;
  isAvailable: boolean;
}

export interface ReturnParkingSpotDTO {
  Id: number;
  spotNumber: string;
  parkingAreaId: number;
  isAvailable: boolean;
}

export interface CreateParkingSpotDTO {
  spotNumber: string;
  parkingAreaId: number;
  isAvailable: boolean;
}

export interface CreateParkingAreaDTO {
  name: string;
  address: string;
  city: string;
  hourlyRate: number;
  longitude: number;
  latitude: number;
}

// --- Pagination types ---
export interface SortObject {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableObject {
  offset: number;
  sort: SortObject;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

export interface Page<T> {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: T[];
  number: number;
  sort: SortObject;
  pageable: PageableObject;
  numberOfElements: number;
  empty: boolean;
}

// --- Actuator Link (for completeness) ---
export interface Link {
  href: string;
  templated?: boolean;
}

// =======================================================
// Create the RTK Query API service with endpoints
// =======================================================

const cookies = new UniversalCookie;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://parkly-parkly.azuremicroservices.io/api/',
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as RootState;
      if (auth.isAuthenticated && auth.user && auth.user?.role) {
        cookies.set('userRole', auth.user.role, {
          path: '/',
          domain: '.azuremicroservices.io',
          secure: true,
          sameSite: 'lax', 
        });
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ---------------------------
    // USERS endpoints
    // ---------------------------
    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
    }),
    updateUser: builder.mutation<User, { id: number; data: User }>({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
    createUser: builder.mutation<User, CreateUserDTO>({
      query: (data) => ({
        url: `users`,
        method: 'POST',
        body: data,
      }),
    }),
    loginUser: builder.mutation<User, LoginDTO>({
      query: (data) => ({
        url: `users/login`,
        method: 'POST',
        body: data,
      }),
    }),
    getAllUsers: builder.query<
      Page<User>,
      {
        page: number;
        size?: number;
        sortDirection?: string;
        searchQuery?: string;
        searchQueryParameter?: string;
      }
    >({
      query: ({ page, size = 10, sortDirection = 'asc', searchQuery, searchQueryParameter }) => ({
        url: `users/page/${page}`,
        params: { size, sortDirection, searchQuery, searchQueryParameter },
      }),
    }),

    // ---------------------------
    // RESERVATIONS endpoints
    // ---------------------------
    getReservationById: builder.query<ReturnReservationDTO, number>({
      query: (id) => `reservations/${id}`,
    }),
    updateReservation: builder.mutation<ReturnReservationDTO, { id: number; data: CreateReservationDTO }>({
      query: ({ id, data }) => ({
        url: `reservations/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteReservation: builder.mutation<void, number>({
      query: (id) => ({
        url: `reservations/${id}`,
        method: 'DELETE',
      }),
    }),
    createReservation: builder.mutation<ReturnReservationDTO, CreateReservationDTO>({
      query: (data) => ({
        url: `reservations`,
        method: 'POST',
        body: data,
      }),
    }),
    getAllUserReservations: builder.query<
      Page<ReturnReservationDTO>,
      { id: number; page: number; size?: number; sortDirection?: string }
    >({
      query: ({ id, page, size = 10, sortDirection = 'asc' }) => ({
        url: `reservations/user/${id}/page/${page}`,
        params: { size, sortDirection },
      }),
    }),
    getAllReservations: builder.query<
      Page<ReturnReservationDTO>,
      { page: number; size?: number; sortDirection?: string }
    >({
      query: ({ page, size = 10, sortDirection = 'asc' }) => ({
        url: `reservations/page/${page}`,
        params: { size, sortDirection },
      }),
    }),

    // ---------------------------
    // PARKING SPOTS endpoints
    // ---------------------------
    getParkingSpotById: builder.query<ReturnParkingSpotDTO, number>({
      query: (id) => `parking-spots/${id}`,
    }),
    updateParkingSpot: builder.mutation<ReturnParkingSpotDTO, { id: number; data: ParkingSpot }>({
      query: ({ id, data }) => ({
        url: `parking-spots/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteParkingSpot: builder.mutation<void, number>({
      query: (id) => ({
        url: `parking-spots/${id}`,
        method: 'DELETE',
      }),
    }),
    createParkingSpot: builder.mutation<ReturnParkingSpotDTO, CreateParkingSpotDTO>({
      query: (data) => ({
        url: `parking-spots`,
        method: 'POST',
        body: data,
      }),
    }),
    getAllParkingSpots: builder.query<
      Page<ReturnParkingSpotDTO>,
      { page: number; size?: number; sortBy?: string; sortDirection?: string }
    >({
      query: ({ page, size = 10, sortBy = 'spotNumber', sortDirection = 'asc' }) => ({
        url: `parking-spots/page/${page}`,
        params: { size, sortBy, sortDirection },
      }),
    }),
    getAllParkingSpotsByParkingAreaId: builder.query<ReturnParkingSpotDTO[], number>({
      query: (paId) => ({
        url: `parking-spots/pa`,
        params: { paId },
      }),
    }),

    // ---------------------------
    // PARKING AREAS endpoints
    // ---------------------------
    getParkingAreaById: builder.query<ParkingArea, number>({
      query: (id) => `parking-areas/${id}`,
    }),
    updateParkingArea: builder.mutation<ParkingArea, { id: number; data: ParkingArea }>({
      query: ({ id, data }) => ({
        url: `parking-areas/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteParkingArea: builder.mutation<void, number>({
      query: (id) => ({
        url: `parking-areas/${id}`,
        method: 'DELETE',
      }),
    }),
    createParkingArea: builder.mutation<ParkingArea, CreateParkingAreaDTO>({
      query: (data) => ({
        url: `parking-areas`,
        method: 'POST',
        body: data,
      }),
    }),
    getAllParkingAreas: builder.query<
      Page<ParkingArea>,
      {
        page: number;
        size?: number;
        sortDirection?: string;
        searchQuery?: string;
        searchQueryParameter?: string;
      }
    >({
      query: ({ page, size = 10, sortDirection = 'asc', searchQuery, searchQueryParameter }) => ({
        url: `parking-areas/page/${page}`,
        params: { size, sortDirection, searchQuery, searchQueryParameter },
      }),
    }),

    // ---------------------------
    // ACTUATOR endpoints
    // ---------------------------
    actuatorLinks: builder.query<Record<string, Record<string, Link>>, void>({
      query: () => `actuator`,
    }),
    actuatorHealth: builder.query<Record<string, any>, void>({
      query: () => `actuator/health`,
    }),
    actuatorEnv: builder.query<Record<string, any>, void>({
      query: () => `actuator/env`,
    }),
    actuatorEnvToMatch: builder.query<Record<string, any>, string>({
      query: (toMatch) => `actuator/env/${toMatch}`,
    }),
  }),
});

// =======================================================
// Export hooks for usage in functional components
// =======================================================
export const {
  // Users
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  // Reservations
  useGetReservationByIdQuery,
  useUpdateReservationMutation,
  useDeleteReservationMutation,
  useCreateReservationMutation,
  useGetAllUserReservationsQuery,
  useGetAllReservationsQuery,
  // Parking Spots
  useGetParkingSpotByIdQuery,
  useUpdateParkingSpotMutation,
  useDeleteParkingSpotMutation,
  useCreateParkingSpotMutation,
  useGetAllParkingSpotsQuery,
  useGetAllParkingSpotsByParkingAreaIdQuery,
  // Parking Areas
  useGetParkingAreaByIdQuery,
  useUpdateParkingAreaMutation,
  useDeleteParkingAreaMutation,
  useCreateParkingAreaMutation,
  useGetAllParkingAreasQuery,
  // Actuator
  useActuatorLinksQuery,
  useActuatorHealthQuery,
  useActuatorEnvQuery,
  useActuatorEnvToMatchQuery,
} = api;
