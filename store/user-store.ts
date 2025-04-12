import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Booking } from '@/types';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  addToFavorites: (professionalId: string) => void;
  removeFromFavorites: (professionalId: string) => void;
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        id: 'user1',
        name: 'Guest User',
        email: 'guest@example.com',
        favorites: [],
        bookings: [],
      },
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      addToFavorites: (professionalId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                favorites: state.user.favorites.includes(professionalId)
                  ? state.user.favorites
                  : [...state.user.favorites, professionalId],
              }
            : null,
        })),
      removeFromFavorites: (professionalId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                favorites: state.user.favorites.filter((id) => id !== professionalId),
              }
            : null,
        })),
      addBooking: (booking) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                bookings: [...state.user.bookings, booking],
              }
            : null,
        })),
      cancelBooking: (bookingId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                bookings: state.user.bookings.map((booking) =>
                  booking.id === bookingId
                    ? { ...booking, status: 'cancelled' as const }
                    : booking
                ),
              }
            : null,
        })),
      logout: () =>
        set({
          user: {
            id: 'user1',
            name: 'Guest User',
            email: 'guest@example.com',
            favorites: [],
            bookings: [],
          },
        }),
    }),
    {
      name: 'glamora-user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);