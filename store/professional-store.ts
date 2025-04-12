import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Professional, Service } from '@/types';

interface ProfessionalState {
  professional: Professional | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (updatedProfile: Professional) => void;
  updateServices: (services: Service[]) => void;
}

export const useProfessionalStore = create<ProfessionalState>()(
  persist(
    (set) => ({
      professional: {
        id: 'pro1',
        name: 'Sophia Martinez',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        profession: 'Makeup Artist',
        rating: 4.9,
        reviewCount: 127,
        location: 'New York, NY',
        distance: '1.2 miles',
        featured: true,
        bio: 'Professional makeup artist with 8+ years of experience in bridal, editorial, and special events makeup. Certified by MAC Cosmetics and trained in the latest techniques.',
        portfolio: [
          'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1526510747491-58f928ec870f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        ],
        services: [
          {
            id: 'serv1',
            name: 'Bridal Makeup',
            description: 'Complete bridal makeup with trial session',
            price: 250,
            duration: '2 hours',
            categoryId: 'cat1'
          },
          {
            id: 'serv2',
            name: 'Special Event Makeup',
            description: 'Full face makeup for special occasions',
            price: 120,
            duration: '1 hour',
            categoryId: 'cat1'
          }
        ],
        availability: ['Mon 9AM-5PM', 'Wed 9AM-5PM', 'Fri 9AM-5PM', 'Sat 10AM-3PM']
      },
      isLoading: false,
      error: null,
      updateProfile: (updatedProfile) => set({ professional: updatedProfile }),
      updateServices: (services) => set((state) => ({
        professional: state.professional
          ? { ...state.professional, services }
          : null
      })),
    }),
    {
      name: 'glamora-professional-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);