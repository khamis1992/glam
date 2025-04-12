export interface Professional {
  id: string;
  name: string;
  avatar: string;
  profession: string;
  rating: number;
  reviewCount: number;
  location: string;
  distance?: string;
  featured?: boolean;
  bio?: string;
  services?: Service[];
  portfolio?: string[];
  availability?: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image?: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface Booking {
  id: string;
  professionalId: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorites: string[];
  bookings: Booking[];
}