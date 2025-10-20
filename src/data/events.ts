export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  price: number;
  seatsAvailable: number;
  totalSeats: number;
  category: string;
  image: string;
  organizer: string;
}

export const dummyEvents: Event[] = [
  {
    id: "evt-001",
    title: "Summer Music Festival 2025",
    description: "Join us for an unforgettable night of live music featuring top artists from around the world. Experience amazing performances, food trucks, and great vibes!",
    date: "2025-07-15",
    time: "18:00",
    location: "Central Park, New York",
    venue: "Main Stage Arena",
    price: 89.99,
    seatsAvailable: 450,
    totalSeats: 1000,
    category: "Music",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    organizer: "MusicEvents Inc."
  },
  {
    id: "evt-002",
    title: "Tech Conference 2025",
    description: "The biggest tech conference of the year. Learn from industry leaders, network with professionals, and discover the latest innovations in technology.",
    date: "2025-06-20",
    time: "09:00",
    location: "San Francisco Convention Center",
    venue: "Hall A",
    price: 299.99,
    seatsAvailable: 120,
    totalSeats: 500,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    organizer: "Tech Summit Org"
  },
  {
    id: "evt-003",
    title: "Food & Wine Tasting",
    description: "Indulge in an exquisite evening of gourmet food and fine wines. Meet renowned chefs and sommeliers while enjoying culinary masterpieces.",
    date: "2025-05-10",
    time: "19:00",
    location: "Downtown Hotel Ballroom",
    venue: "Grand Ballroom",
    price: 125.00,
    seatsAvailable: 80,
    totalSeats: 150,
    category: "Food & Drink",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
    organizer: "Culinary Events Co."
  },
  {
    id: "evt-004",
    title: "Startup Pitch Night",
    description: "Watch innovative startups pitch their ideas to top investors. Network with entrepreneurs and VCs in this exciting startup ecosystem event.",
    date: "2025-06-05",
    time: "18:30",
    location: "Innovation Hub, Austin",
    venue: "Pitch Arena",
    price: 0,
    seatsAvailable: 200,
    totalSeats: 250,
    category: "Business",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    organizer: "Startup Network"
  },
  {
    id: "evt-005",
    title: "Yoga & Wellness Retreat",
    description: "A rejuvenating day of yoga, meditation, and wellness workshops. Connect with your inner self and meet like-minded individuals.",
    date: "2025-05-25",
    time: "08:00",
    location: "Sunset Beach Resort",
    venue: "Beachfront Pavilion",
    price: 65.00,
    seatsAvailable: 35,
    totalSeats: 50,
    category: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    organizer: "Wellness Collective"
  },
  {
    id: "evt-006",
    title: "Comedy Night Extravaganza",
    description: "Laugh out loud with the funniest comedians in town. An evening full of humor, entertainment, and good times.",
    date: "2025-06-12",
    time: "20:00",
    location: "Comedy Club Downtown",
    venue: "Main Stage",
    price: 45.00,
    seatsAvailable: 75,
    totalSeats: 100,
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80",
    organizer: "Laugh Factory"
  },
  {
    id: "evt-007",
    title: "Art Gallery Opening",
    description: "Experience contemporary art from emerging and established artists. Wine, networking, and artistic inspiration await.",
    date: "2025-05-18",
    time: "18:00",
    location: "Modern Art Museum",
    venue: "Gallery Hall",
    price: 25.00,
    seatsAvailable: 150,
    totalSeats: 200,
    category: "Arts & Culture",
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80",
    organizer: "Art Collective NYC"
  },
  {
    id: "evt-008",
    title: "Marathon 2025",
    description: "Join thousands of runners in the city's biggest marathon event. Challenge yourself and support a great cause!",
    date: "2025-08-01",
    time: "06:00",
    location: "City Center",
    venue: "Starting Point Plaza",
    price: 55.00,
    seatsAvailable: 800,
    totalSeats: 1500,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80",
    organizer: "City Marathon Committee"
  }
];

export interface Booking {
  id: string;
  eventId: string;
  event: Event;
  userName: string;
  userEmail: string;
  ticketCount: number;
  totalPrice: number;
  bookingDate: string;
  qrCode: string;
}
