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
    caption: "You created this using ChatGPT ❤️",
    date: "2024-07-07"
  },
  {
    id: 2,
    imageUrl: "/images/memory-2.jpg",
    caption: "What a beautiful smile 🌊",
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
    caption: "Kinda off a beach day i really enjoyed your company 💕",
    date: "2024-07-07"
  },
  {
    id: 6,
    imageUrl: "/images/memory-6.jpg",
    caption: "Random snaps ☔",
    date: "2024-07-07"
  },
  {
    id: 7,
    imageUrl: "/images/memory-7.jpg",
    caption: "Some day one pic's that you.....🚗",
    date: "2024-07-08"
  },
  {
    id: 8,
    imageUrl: "/images/memory-8.jpg",
    caption: "This picture is still killing me 🍳",
    date: "2024-08-12"
  },
  {
    id: 9,
    imageUrl: "/images/memory-9.jpg",
    caption: "Still in love with that smile ⭐",
    date: "2024-08-24"
  } 
];

