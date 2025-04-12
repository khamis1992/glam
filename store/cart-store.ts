import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        
        return {
          items: [...state.items, { ...item, quantity: 1 }],
        };
      }),
      
      removeItem: (itemId) => set((state) => ({
        items: state.items.filter((i) => i.id !== itemId),
      })),
      
      updateQuantity: (itemId, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i
        ),
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
      },
    }),
    {
      name: 'glamora-cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);