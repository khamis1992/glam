interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  imageUrl: string;
  expiryDate: string;
  code: string;
  terms: string[];
}

const offers: Offer[] = [
  {
    id: 'offer1',
    title: 'First-Time Client Special',
    description: 'Enjoy a special discount on your first beauty service booking',
    discount: '20% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    expiryDate: 'December 31, 2023',
    code: 'WELCOME20',
    terms: [
      'Valid for first-time clients only',
      'Cannot be combined with other offers',
      'Valid on services over $50',
      'Must be redeemed within 30 days of account creation'
    ]
  },
  {
    id: 'offer2',
    title: 'Summer Beauty Package',
    description: 'Complete beauty package including facial, manicure, and hair styling',
    discount: '15% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b5e2b6a2216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    expiryDate: 'August 31, 2023',
    code: 'SUMMER15',
    terms: [
      'Valid on the Summer Beauty Package only',
      'Appointment must be booked at least 48 hours in advance',
      'Subject to availability',
      'Valid at participating locations only'
    ]
  },
  {
    id: 'offer3',
    title: 'Refer a Friend',
    description: 'Get a discount when you refer a friend to Glamora',
    discount: '$15 Credit',
    imageUrl: 'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    expiryDate: 'No expiration',
    code: 'REFERRAL',
    terms: [
      'Credit applied after friend completes their first appointment',
      'Friend must be a new Glamora client',
      'No limit on number of referrals',
      'Credit valid for 6 months from date of issue'
    ]
  },
  {
    id: 'offer4',
    title: 'Loyalty Reward',
    description: 'Special discount for our loyal customers after 5 bookings',
    discount: '25% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    expiryDate: '60 days after qualification',
    code: 'LOYALTY25',
    terms: [
      'Automatically applied after 5 completed appointments',
      'Valid on any service',
      'Cannot be combined with other offers',
      'Expires 60 days after becoming eligible'
    ]
  }
];

export default offers;