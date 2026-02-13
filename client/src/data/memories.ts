// Memory data interface
export interface Memory {
  id: number;
  imageUrl: string;
  caption: string;
  date: string;
}

// Add your images to client/public/images/ folder
// Then update the imageUrl paths below

export const MEMORIES: Memory[] = [
  {
    id: 1,
    imageUrl: "/images/memory-1.jpg",
    caption: "Our first meet ❤️",
    date: "2024-07-07"
  },
  {
    id: 2,
    imageUrl: "/images/memory-2.jpg",
    caption: "Beach day together 🌊",
    date: "2024-07-07"
  },
  {
    id: 3,
    imageUrl: "/images/memory-3.jpg",
    caption: "Vibing with some pics🍿",
    date: "2024-07-07"
  },
  {
    id: 4,
    imageUrl: "/images/memory-4.jpg",
    caption: "Birthday celebration 🎂",
    date: "2024-07-07"
  },
  {
    id: 5,
    imageUrl: "/images/memory-5.jpg",
    caption: "Our first shoot 💕",
    date: "2024-07-07"
  },
  {
    id: 6,
    imageUrl: "/images/memory-6.jpg",
    caption: "With your son Zzero ☔",
    date: "2024-07-07"
  },
  {
    id: 7,
    imageUrl: "/images/memory-7.jpg",
    caption: "Talking shit about people 🚗",
    date: "2024-07-08"
  },
  {
    id: 8,
    imageUrl: "/images/memory-8.jpg",
    caption: "More photos and bonding🍳",
    date: "2024-08-12"
  },
  {
    id: 9,
    imageUrl: "/images/memory-9.jpg",
    caption: "A boring and a funny day ⭐",
    date: "2024-08-24"
  } 
];

