export interface Genre {
  id: number
  name: string
  slug: string
  description: string
  thumbnail: string
  comicCount: number
  metaTitle: string
  metaDescription: string
  imageAlt: string
}

export const mockGenres: Genre[] = [
  {
    id: 1,
    name: "Action",
    slug: "action",
    description: "Comics featuring intense physical activity, violence, and fast-paced storylines.",
    thumbnail: "/genres/action.jpg",
    comicCount: 45,
    metaTitle: "Action Manga & Comics - Read Online",
    metaDescription:
      "Browse and read the best action manga and comics online. Featuring intense battles, martial arts, and thrilling adventures.",
    imageAlt: "Action manga genre illustration showing dynamic battle scene",
  },
  {
    id: 2,
    name: "Adventure",
    slug: "adventure",
    description: "Comics featuring journeys, quests, and exploration of new places.",
    thumbnail: "/genres/adventure.jpg",
    comicCount: 38,
    metaTitle: "Adventure Manga & Comics - Read Online",
    metaDescription:
      "Browse and read the best adventure manga and comics online. Featuring epic journeys, exploration, and discovery.",
    imageAlt: "Adventure manga genre illustration showing characters exploring a fantasy world",
  },
  {
    id: 3,
    name: "Comedy",
    slug: "comedy",
    description: "Comics intended to be humorous and make readers laugh.",
    thumbnail: "/genres/comedy.jpg",
    comicCount: 30,
    metaTitle: "Comedy Manga & Comics - Read Online",
    metaDescription:
      "Browse and read the best comedy manga and comics online. Featuring hilarious situations, jokes, and lighthearted stories.",
    imageAlt: "Comedy manga genre illustration showing characters in humorous situations",
  },
  {
    id: 4,
    name: "Drama",
    slug: "drama",
    description: "Comics with serious plots and emotional themes.",
    thumbnail: "/genres/drama.jpg",
    comicCount: 25,
    metaTitle: "Drama Manga & Comics - Read Online",
    metaDescription:
      "Browse and read the best drama manga and comics online. Featuring emotional stories, character development, and serious themes.",
    imageAlt: "Drama manga genre illustration showing emotional character moment",
  },
  {
    id: 5,
    name: "Fantasy",
    slug: "fantasy",
    description: "Comics set in fictional worlds with magic, mythical creatures, and supernatural elements.",
    thumbnail: "/genres/fantasy.jpg",
    comicCount: 42,
    metaTitle: "Fantasy Manga & Comics - Read Online",
    metaDescription:
      "Browse and read the best fantasy manga and comics online. Featuring magical worlds, mythical creatures, and epic adventures.",
    imageAlt: "Fantasy manga genre illustration showing magical world with mythical creatures",
  },
  {
    id: 6,
    name: "Horror",
    slug: "horror",
    description: "Comics intended to frighten, scare, or startle readers with disturbing content.",
    thumbnail: "/genres/horror.jpg",
    comicCount: 18,
    metaTitle: "Horror Manga & Comics - Read Online",
    metaDescription:
      "Browse and read the best horror manga and comics online. Featuring scary stories, monsters, and psychological terror.",
    imageAlt: "Horror manga genre illustration showing dark and frightening scene",
  },
  {
    id: 7,
    name: "Romance",
    slug: "romance",
    description: "Comics focusing on romantic relationships and love stories.",
    thumbnail: "/genres/romance.jpg",
    comicCount: 35,
    metaTitle: "Romance Manga & Comics - Read Online",
    metaDescription:
      "Browse and read the best romance manga and comics online. Featuring love stories, relationships, and emotional connections.",
    imageAlt: "Romance manga genre illustration showing couple in romantic moment",
  },
  {
    id: 8,
    name: "Sci-Fi",
    slug: "sci-fi",
    description: "Comics based on scientific concepts, futuristic technology, and space exploration.",
    thumbnail: "/genres/sci-fi.jpg",
    comicCount: 22,
    metaTitle: "Sci-Fi Manga & Comics - Read Online",
    metaDescription:
      "Browse and read the best sci-fi manga and comics online. Featuring futuristic technology, space exploration, and scientific concepts.",
    imageAlt: "Sci-Fi manga genre illustration showing futuristic cityscape with advanced technology",
  },
  {
    id: 9,
    name: "Slice of Life",
    slug: "slice-of-life",
    description: "Comics portraying everyday experiences and realistic situations.",
    thumbnail: "/genres/slice-of-life.jpg",
    comicCount: 20,
    metaTitle: "Slice of Life Manga & Comics - Read Online",
    metaDescription:
      "Browse and read the best slice of life manga and comics online. Featuring everyday stories, realistic situations, and relatable characters.",
    imageAlt: "Slice of Life manga genre illustration showing characters in everyday situations",
  },
  {
    id: 10,
    name: "Supernatural",
    slug: "supernatural",
    description:
      "Comics featuring phenomena beyond scientific understanding, such as ghosts, spirits, and psychic abilities.",
    thumbnail: "/genres/supernatural.jpg",
    comicCount: 28,
    metaTitle: "Supernatural Manga & Comics - Read Online",
    metaDescription:
      "Browse and read the best supernatural manga and comics online. Featuring ghosts, spirits, and mysterious phenomena.",
    imageAlt: "Supernatural manga genre illustration showing characters with mystical powers",
  },
]
