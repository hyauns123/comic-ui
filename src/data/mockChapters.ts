export interface Chapter {
  id: number
  comicId: number
  comicTitle: string
  number: number
  name: string
  publicationDate: string
  views: number
  imageUrls: string[]
  metaTitle: string
  metaDescription: string
}

export const mockChapters: Chapter[] = [
  {
    id: 1,
    comicId: 1,
    comicTitle: "Demon Slayer",
    number: 1,
    name: "Cruelty",
    publicationDate: "2020-05-10T09:15:00Z",
    views: 125000,
    imageUrls: [
      "https://example.com/storage/demon-slayer/chapter-1/page-1.jpg",
      "https://example.com/storage/demon-slayer/chapter-1/page-2.jpg",
      "https://example.com/storage/demon-slayer/chapter-1/page-3.jpg",
      // More URLs would be here
    ],
    metaTitle: "Demon Slayer Chapter 1: Cruelty - Read Online",
    metaDescription:
      "Read Demon Slayer Chapter 1: Cruelty online. Tanjiro's peaceful life is shattered when his family is attacked by demons.",
  },
  {
    id: 2,
    comicId: 1,
    comicTitle: "Demon Slayer",
    number: 2,
    name: "Trainer Sakonji Urokodaki",
    publicationDate: "2020-05-17T09:15:00Z",
    views: 118000,
    imageUrls: [
      "https://example.com/storage/demon-slayer/chapter-2/page-1.jpg",
      "https://example.com/storage/demon-slayer/chapter-2/page-2.jpg",
      "https://example.com/storage/demon-slayer/chapter-2/page-3.jpg",
      // More URLs would be here
    ],
    metaTitle: "Demon Slayer Chapter 2: Trainer Sakonji Urokodaki - Read Online",
    metaDescription:
      "Read Demon Slayer Chapter 2: Trainer Sakonji Urokodaki online. Tanjiro begins his training to become a Demon Slayer.",
  },
  {
    id: 3,
    comicId: 1,
    comicTitle: "Demon Slayer",
    number: 3,
    name: "Return by Dawn",
    publicationDate: "2020-05-24T09:15:00Z",
    views: 110000,
    imageUrls: [
      "https://example.com/storage/demon-slayer/chapter-3/page-1.jpg",
      "https://example.com/storage/demon-slayer/chapter-3/page-2.jpg",
      "https://example.com/storage/demon-slayer/chapter-3/page-3.jpg",
      // More URLs would be here
    ],
    metaTitle: "Demon Slayer Chapter 3: Return by Dawn - Read Online",
    metaDescription:
      "Read Demon Slayer Chapter 3: Return by Dawn online. Tanjiro faces his first challenge in his training.",
  },
  {
    id: 4,
    comicId: 2,
    comicTitle: "One Piece",
    number: 1,
    name: "Romance Dawn",
    publicationDate: "2019-01-05T08:30:00Z",
    views: 250000,
    imageUrls: [
      "https://example.com/storage/one-piece/chapter-1/page-1.jpg",
      "https://example.com/storage/one-piece/chapter-1/page-2.jpg",
      "https://example.com/storage/one-piece/chapter-1/page-3.jpg",
      // More URLs would be here
    ],
    metaTitle: "One Piece Chapter 1: Romance Dawn - Read Online",
    metaDescription:
      "Read One Piece Chapter 1: Romance Dawn online. The beginning of Luffy's journey to become the Pirate King.",
  },
  {
    id: 5,
    comicId: 2,
    comicTitle: "One Piece",
    number: 2,
    name: "They Call Him 'Straw Hat Luffy'",
    publicationDate: "2019-01-12T08:30:00Z",
    views: 240000,
    imageUrls: [
      "https://example.com/storage/one-piece/chapter-2/page-1.jpg",
      "https://example.com/storage/one-piece/chapter-2/page-2.jpg",
      "https://example.com/storage/one-piece/chapter-2/page-3.jpg",
      // More URLs would be here
    ],
    metaTitle: "One Piece Chapter 2: They Call Him 'Straw Hat Luffy' - Read Online",
    metaDescription:
      "Read One Piece Chapter 2: They Call Him 'Straw Hat Luffy' online. Luffy begins to make a name for himself.",
  },
  {
    id: 6,
    comicId: 3,
    comicTitle: "My Hero Academia",
    number: 1,
    name: "Izuku Midoriya: Origin",
    publicationDate: "2020-02-15T11:20:00Z",
    views: 180000,
    imageUrls: [
      "https://example.com/storage/my-hero-academia/chapter-1/page-1.jpg",
      "https://example.com/storage/my-hero-academia/chapter-1/page-2.jpg",
      "https://example.com/storage/my-hero-academia/chapter-1/page-3.jpg",
      // More URLs would be here
    ],
    metaTitle: "My Hero Academia Chapter 1: Izuku Midoriya: Origin - Read Online",
    metaDescription:
      "Read My Hero Academia Chapter 1: Izuku Midoriya: Origin online. The beginning of Izuku's journey to become a hero.",
  },
  {
    id: 7,
    comicId: 4,
    comicTitle: "Jujutsu Kaisen",
    number: 1,
    name: "Ryomen Sukuna",
    publicationDate: "2020-08-20T14:10:00Z",
    views: 190000,
    imageUrls: [
      "https://example.com/storage/jujutsu-kaisen/chapter-1/page-1.jpg",
      "https://example.com/storage/jujutsu-kaisen/chapter-1/page-2.jpg",
      "https://example.com/storage/jujutsu-kaisen/chapter-1/page-3.jpg",
      // More URLs would be here
    ],
    metaTitle: "Jujutsu Kaisen Chapter 1: Ryomen Sukuna - Read Online",
    metaDescription: "Read Jujutsu Kaisen Chapter 1: Ryomen Sukuna online. Yuji Itadori encounters a cursed object.",
  },
  {
    id: 8,
    comicId: 5,
    comicTitle: "Attack on Titan",
    number: 1,
    name: "To You, 2000 Years From Now",
    publicationDate: "2019-05-25T16:45:00Z",
    views: 220000,
    imageUrls: [
      "https://example.com/storage/attack-on-titan/chapter-1/page-1.jpg",
      "https://example.com/storage/attack-on-titan/chapter-1/page-2.jpg",
      "https://example.com/storage/attack-on-titan/chapter-1/page-3.jpg",
      // More URLs would be here
    ],
    metaTitle: "Attack on Titan Chapter 1: To You, 2000 Years From Now - Read Online",
    metaDescription:
      "Read Attack on Titan Chapter 1: To You, 2000 Years From Now online. The day the Colossal Titan appeared.",
  },
  {
    id: 9,
    comicId: 6,
    comicTitle: "Chainsaw Man",
    number: 1,
    name: "Dog & Chainsaw",
    publicationDate: "2021-01-30T13:25:00Z",
    views: 175000,
    imageUrls: [
      "https://example.com/storage/chainsaw-man/chapter-1/page-1.jpg",
      "https://example.com/storage/chainsaw-man/chapter-1/page-2.jpg",
      "https://example.com/storage/chainsaw-man/chapter-1/page-3.jpg",
      // More URLs would be here
    ],
    metaTitle: "Chainsaw Man Chapter 1: Dog & Chainsaw - Read Online",
    metaDescription: "Read Chainsaw Man Chapter 1: Dog & Chainsaw online. Denji's life as a Devil Hunter.",
  },
  {
    id: 10,
    comicId: 7,
    comicTitle: "Naruto",
    number: 1,
    name: "Uzumaki Naruto",
    publicationDate: "2018-11-10T10:30:00Z",
    views: 280000,
    imageUrls: [
      "https://example.com/storage/naruto/chapter-1/page-1.jpg",
      "https://example.com/storage/naruto/chapter-1/page-2.jpg",
      "https://example.com/storage/naruto/chapter-1/page-3.jpg",
      // More URLs would be here
    ],
    metaTitle: "Naruto Chapter 1: Uzumaki Naruto - Read Online",
    metaDescription:
      "Read Naruto Chapter 1: Uzumaki Naruto online. The beginning of Naruto's journey to become Hokage.",
  },
]
