import { Property } from '../types';

export const properties: Property[] = [
  {
    id: 1,
    title: "Cozy Beachfront Cottage",
    host: "Sarah Johnson",
    rating: 4.9,
    price: 120,
    image: "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg",
    location: "Malibu, California",
    comments: [
      "Absolutely beautiful location! The cottage was spotless and Sarah was a wonderful host.",
      "Great stay, will definitely come back again!"
    ],
    hasBug: false
  },
  {
    id: 2,
    title: "Downtown Loft with City Views",
    host: "Michael Chen",
    rating: 4.7,
    price: 150,
    image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
    location: "New York, NY",
    comments: [
      "Perfect location for exploring the city. Very clean and comfortable.",
      "The view was amazing! Highly recommend for anyone visiting NYC."
    ],
    hasBug: false
  },
  {
    id: 3,
    title: "Mountain Cabin Retreat",
    host: "Robert Williams",
    rating: 4.8,
    price: 180,
    image: "https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg",
    location: "Aspen, Colorado",
    comments: [
      "The perfect getaway! So peaceful and cozy.",
      "We saw deer right outside our window every morning. Magical experience!"
    ],
    hasBug: true // This property has the intentional bug
  },
  {
    id: 4,
    title: "Luxury Apartment with Pool",
    host: "Emma Davis",
    rating: 4.6,
    price: 200,
    image: "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg",
    location: "Miami, Florida",
    comments: [
      "The pool was amazing! Everything was as described.",
      "Great location, just steps from the beach."
    ],
    hasBug: false
  },
  {
    id: 5,
    title: "Historic Townhouse",
    host: "James Wilson",
    rating: 4.9,
    price: 165,
    image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg",
    location: "Boston, Massachusetts",
    comments: [
      "So much character and history! James was very knowledgeable about the area.",
      "Perfect location for exploring historic Boston."
    ],
    hasBug: false
  },
  {
    id: 6,
    title: "Secluded Lakeside Cabin",
    host: "Olivia Brown",
    rating: 4.8,
    price: 140,
    image: "https://images.pexels.com/photos/128303/pexels-photo-128303.jpeg",
    location: "Lake Tahoe, California",
    comments: [
      "The most peaceful vacation we've ever had. The lake view is stunning!",
      "Great hiking trails nearby. Cabin was clean and comfortable."
    ],
    hasBug: false
  }
];