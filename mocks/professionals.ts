import { Professional } from '@/types';

const professionals: Professional[] = [
  {
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
  {
    id: 'pro2',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    profession: 'Hair Stylist',
    rating: 4.8,
    reviewCount: 94,
    location: 'Brooklyn, NY',
    distance: '2.5 miles',
    featured: true,
    bio: 'Celebrity hair stylist with experience in high-fashion runway shows and editorial shoots. Specializing in cutting-edge styles and color techniques.',
    portfolio: [
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1552642986-ccb41e7059e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    services: [
      {
        id: 'serv3',
        name: 'Haircut & Styling',
        description: 'Precision cut and professional styling',
        price: 85,
        duration: '45 minutes',
        categoryId: 'cat2'
      },
      {
        id: 'serv4',
        name: 'Color & Highlights',
        description: 'Full color or highlights with toner',
        price: 150,
        duration: '2 hours',
        categoryId: 'cat2'
      }
    ],
    availability: ['Tue 10AM-6PM', 'Thu 10AM-6PM', 'Sat 9AM-4PM']
  },
  {
    id: 'pro3',
    name: 'Emma Johnson',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    profession: 'Nail Artist',
    rating: 4.7,
    reviewCount: 86,
    location: 'Manhattan, NY',
    distance: '0.8 miles',
    bio: 'Specialized in nail art and extensions with 5 years of experience. Known for intricate designs and long-lasting manicures.',
    portfolio: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    services: [
      {
        id: 'serv5',
        name: 'Gel Manicure',
        description: 'Long-lasting gel polish application',
        price: 45,
        duration: '45 minutes',
        categoryId: 'cat3'
      },
      {
        id: 'serv6',
        name: 'Nail Art',
        description: 'Custom nail art designs',
        price: 65,
        duration: '1 hour',
        categoryId: 'cat3'
      }
    ],
    availability: ['Mon 11AM-7PM', 'Wed 11AM-7PM', 'Fri 11AM-7PM', 'Sun 12PM-5PM']
  },
  {
    id: 'pro4',
    name: 'Olivia Chen',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    profession: 'Esthetician',
    rating: 4.9,
    reviewCount: 112,
    location: 'Queens, NY',
    distance: '3.1 miles',
    bio: 'Licensed esthetician specializing in facials, chemical peels, and anti-aging treatments. Certified in medical-grade skincare procedures.',
    portfolio: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    services: [
      {
        id: 'serv7',
        name: 'Signature Facial',
        description: 'Customized facial treatment for your skin type',
        price: 95,
        duration: '1 hour',
        categoryId: 'cat4'
      },
      {
        id: 'serv8',
        name: 'Chemical Peel',
        description: 'Professional-grade chemical exfoliation',
        price: 120,
        duration: '45 minutes',
        categoryId: 'cat4'
      }
    ],
    availability: ['Tue 9AM-5PM', 'Thu 9AM-5PM', 'Sat 10AM-2PM']
  },
  {
    id: 'pro5',
    name: 'Daniel Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    profession: 'Massage Therapist',
    rating: 4.8,
    reviewCount: 78,
    location: 'Manhattan, NY',
    distance: '1.5 miles',
    bio: 'Licensed massage therapist with expertise in Swedish, deep tissue, and hot stone massage. Specialized in stress relief and muscle recovery.',
    portfolio: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    services: [
      {
        id: 'serv9',
        name: 'Swedish Massage',
        description: 'Relaxing full-body massage',
        price: 90,
        duration: '1 hour',
        categoryId: 'cat5'
      },
      {
        id: 'serv10',
        name: 'Deep Tissue Massage',
        description: 'Targeted massage for muscle tension',
        price: 110,
        duration: '1 hour',
        categoryId: 'cat5'
      }
    ],
    availability: ['Mon 10AM-6PM', 'Wed 10AM-6PM', 'Fri 10AM-6PM', 'Sun 11AM-4PM']
  },
  {
    id: 'pro6',
    name: 'Aisha Williams',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    profession: 'Lash Technician',
    rating: 4.9,
    reviewCount: 64,
    location: 'Brooklyn, NY',
    distance: '2.8 miles',
    featured: true,
    bio: 'Certified lash artist specializing in extensions, lifts, and tints. Known for natural-looking, customized lash designs.',
    portfolio: [
      'https://images.unsplash.com/photo-1583001809873-a128495da465?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1561577102-9f349a6ab857?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1587909209111-5097ee578ec3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ],
    services: [
      {
        id: 'serv11',
        name: 'Classic Lash Extensions',
        description: 'Full set of classic individual lashes',
        price: 120,
        duration: '1.5 hours',
        categoryId: 'cat6'
      },
      {
        id: 'serv12',
        name: 'Lash Lift & Tint',
        description: 'Natural lash enhancement with curl and color',
        price: 85,
        duration: '1 hour',
        categoryId: 'cat6'
      }
    ],
    availability: ['Tue 11AM-7PM', 'Thu 11AM-7PM', 'Sat 10AM-4PM']
  }
];

export default professionals;