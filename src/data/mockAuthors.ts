export interface Author {
  id: number
  name: string
  bio: string
  slug: string
  comicCount: number
  metaTitle: string
  metaDescription: string
}

export const mockAuthors: Author[] = [
  {
    id: 1,
    name: "Koyoharu Gotouge",
    bio: "Koyoharu Gotouge is a Japanese manga artist, best known for creating the manga series Demon Slayer: Kimetsu no Yaiba. Gotouge's work has received critical acclaim and commercial success, with Demon Slayer becoming one of the best-selling manga series of all time.",
    slug: "koyoharu-gotouge",
    comicCount: 1,
    metaTitle: "Koyoharu Gotouge - Author of Demon Slayer",
    metaDescription:
      "Learn more about Koyoharu Gotouge, the creator of the hit manga series Demon Slayer: Kimetsu no Yaiba.",
  },
  {
    id: 2,
    name: "Eiichiro Oda",
    bio: "Eiichiro Oda is a Japanese manga artist best known as the creator of the One Piece manga series, which has sold over 500 million copies worldwide, making it the best-selling manga series in history.",
    slug: "eiichiro-oda",
    comicCount: 1,
    metaTitle: "Eiichiro Oda - Creator of One Piece",
    metaDescription:
      "Explore the world of Eiichiro Oda, the legendary manga artist behind the global phenomenon One Piece.",
  },
  {
    id: 3,
    name: "Akira Toriyama",
    bio: "Akira Toriyama is a Japanese manga artist and character designer. He is best known as the creator of the Dragon Ball series, one of the most popular and influential manga series of all time.",
    slug: "akira-toriyama",
    comicCount: 1,
    metaTitle: "Akira Toriyama - Author of Dragon Ball",
    metaDescription:
      "Discover the works of Akira Toriyama, the mastermind behind the iconic Dragon Ball manga and anime series.",
  },
  {
    id: 4,
    name: "Kentaro Miura",
    bio: "Kentaro Miura was a Japanese manga artist best known for his dark fantasy manga series Berserk. He was highly respected for his detailed artwork and compelling storytelling.",
    slug: "kentaro-miura",
    comicCount: 1,
    metaTitle: "Kentaro Miura - Creator of Berserk",
    metaDescription: "Remembering Kentaro Miura, the brilliant creator of the dark fantasy epic Berserk.",
  },
  {
    id: 5,
    name: "Naoko Takeuchi",
    bio: "Naoko Takeuchi is a Japanese manga artist, best known as the creator of Sailor Moon. Sailor Moon is one of the most influential manga series in the magical girl genre.",
    slug: "naoko-takeuchi",
    comicCount: 1,
    metaTitle: "Naoko Takeuchi - Author of Sailor Moon",
    metaDescription: "Dive into the magical world of Naoko Takeuchi, the creator of the beloved Sailor Moon series.",
  },
]
