import { PrismaClient, UserRole, MangaStatus, BookmarkStatus } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Tạo users
  const adminPassword = await hash('admin123', 10);
  const userPassword = await hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      name: 'Admin User',
      password: adminPassword,
      role: UserRole.ADMIN,
      bio: 'Website administrator',
      avatar: 'https://f004.backblazeb2.com/file/comicsiteimage/avatars/admin-avatar.png',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      username: 'testuser',
      name: 'Test User',
      password: userPassword,
      role: UserRole.FREE,
      bio: 'Comic enthusiast',
      avatar: 'https://f004.backblazeb2.com/file/comicsiteimage/avatars/user-avatar.png',
    },
  });

  console.log('Created users:', { admin: admin.id, user: user.id });

  // Tạo authors
  const alexChen = await prisma.author.create({
    data: {
      name: 'Alex Chen',
      bio: 'Alex Chen is a renowned comic artist known for post-apocalyptic storytelling.',
      avatar: 'https://f004.backblazeb2.com/file/comicsiteimage/authors/alex-chen.png',
    },
  });

  const mariaRodriguez = await prisma.author.create({
    data: {
      name: 'Maria Rodriguez',
      bio: 'Maria Rodriguez specializes in superhero comics with strong female protagonists.',
      avatar: 'https://f004.backblazeb2.com/file/comicsiteimage/authors/maria-rodriguez.png',
    },
  });

  const hiroshiTanaka = await prisma.author.create({
    data: {
      name: 'Hiroshi Tanaka',
      bio: 'Hiroshi Tanaka is a master of fantasy world-building and intricate character design.',
      avatar: 'https://f004.backblazeb2.com/file/comicsiteimage/authors/hiroshi-tanaka.png',
    },
  });

  console.log('Created authors');

  // Tạo genres
  const genres = await Promise.all([
    prisma.genre.create({ data: { name: 'Action' } }),
    prisma.genre.create({ data: { name: 'Adventure' } }),
    prisma.genre.create({ data: { name: 'Comedy' } }),
    prisma.genre.create({ data: { name: 'Drama' } }),
    prisma.genre.create({ data: { name: 'Fantasy' } }),
    prisma.genre.create({ data: { name: 'Horror' } }),
    prisma.genre.create({ data: { name: 'Mystery' } }),
    prisma.genre.create({ data: { name: 'Romance' } }),
    prisma.genre.create({ data: { name: 'Sci-Fi' } }),
    prisma.genre.create({ data: { name: 'Slice of Life' } }),
    prisma.genre.create({ data: { name: 'Superhero' } }),
    prisma.genre.create({ data: { name: 'Post-Apocalyptic' } }),
  ]);

  console.log('Created genres');

  // Tạo manga
  const wastelandSurvivor = await prisma.manga.create({
    data: {
      slug: 'wasteland-survivor',
      title: 'Wasteland Survivor',
      originalTitle: 'Wasteland Survivor',
      coverImage: 'https://f004.backblazeb2.com/file/comicsiteimage/manga/wasteland-survivor/cover.png',
      authorId: alexChen.id,
      status: MangaStatus.ONGOING,
      rating: 4.7,
      year: '2022',
      ageRating: '16+',
      publisher: 'Dystopia Comics',
      description: 'In a world devastated by environmental catastrophe, a young survivor navigates the harsh wasteland while uncovering the secrets of the past civilization.',
      featured: true,
      viewCount: 15000,
      mangaGenres: {
        create: [
          { genreId: genres.find(g => g.name === 'Action')!.id },
          { genreId: genres.find(g => g.name === 'Adventure')!.id },
          { genreId: genres.find(g => g.name === 'Post-Apocalyptic')!.id },
        ],
      },
    },
  });

  const crimsonDefender = await prisma.manga.create({
    data: {
      slug: 'crimson-defender',
      title: 'Crimson Defender',
      coverImage: 'https://f004.backblazeb2.com/file/comicsiteimage/manga/crimson-defender/cover.png',
      authorId: mariaRodriguez.id,
      status: MangaStatus.ONGOING,
      rating: 4.5,
      year: '2021',
      ageRating: '12+',
      publisher: 'Hero Publications',
      description: 'When a laboratory accident grants college student Maya Rodriguez extraordinary powers, she takes on the mantle of the Crimson Defender to protect her city from emerging threats.',
      viewCount: 12000,
      mangaGenres: {
        create: [
          { genreId: genres.find(g => g.name === 'Action')!.id },
          { genreId: genres.find(g => g.name === 'Superhero')!.id },
        ],
      },
    },
  });

  const enchantedForest = await prisma.manga.create({
    data: {
      slug: 'enchanted-forest-duel',
      title: 'Enchanted Forest Duel',
      originalTitle: 'Majo no Mori no Kettō',
      coverImage: 'https://f004.backblazeb2.com/file/comicsiteimage/manga/enchanted-forest-duel/cover.png',
      authorId: hiroshiTanaka.id,
      status: MangaStatus.COMPLETED,
      rating: 4.9,
      year: '2020',
      ageRating: '13+',
      publisher: 'Fantasy Press',
      description: 'Two rival magic academies compete in an ancient tournament held within the mysterious Enchanted Forest, where the very rules of magic are unpredictable.',
      viewCount: 20000,
      mangaGenres: {
        create: [
          { genreId: genres.find(g => g.name === 'Fantasy')!.id },
          { genreId: genres.find(g => g.name === 'Adventure')!.id },
        ],
      },
    },
  });

  console.log('Created manga');

  // Tạo chapters cho Wasteland Survivor
  const wastelandChapters = [];
  for (let i = 1; i <= 25; i++) {
    wastelandChapters.push({
      number: i,
      title: `Chapter ${i}`,
      date: new Date(Date.now() - (25 - i) * 7 * 24 * 60 * 60 * 1000), // Một chapter mỗi tuần
      pages: Array.from({ length: 30 }, (_, j) => `https://f004.backblazeb2.com/file/comicsiteimage/manga/wasteland-survivor/chapter-${i}/page-${j + 1}.jpg`),
      mangaId: wastelandSurvivor.id,
    });
  }

  await prisma.chapter.createMany({
    data: wastelandChapters,
  });

  // Tạo chapters cho Crimson Defender
  const crimsonChapters = [];
  for (let i = 1; i <= 12; i++) {
    crimsonChapters.push({
      number: i,
      title: `Chapter ${i}`,
      date: new Date(Date.now() - (12 - i) * 14 * 24 * 60 * 60 * 1000), // Một chapter mỗi hai tuần
      pages: Array.from({ length: 24 }, (_, j) => `https://f004.backblazeb2.com/file/comicsiteimage/manga/crimson-defender/chapter-${i}/page-${j + 1}.jpg`),
      mangaId: crimsonDefender.id,
    });
  }

  await prisma.chapter.createMany({
    data: crimsonChapters,
  });

  // Tạo chapters cho Enchanted Forest Duel
  const enchantedChapters = [];
  for (let i = 1; i <= 36; i++) {
    enchantedChapters.push({
      number: i,
      title: `Chapter ${i}`,
      date: new Date(Date.now() - (36 - i) * 7 * 24 * 60 * 60 * 1000 - 60 * 24 * 60 * 60 * 1000), // Hoàn thành 60 ngày trước
      pages: Array.from({ length: 45 }, (_, j) => `https://f004.backblazeb2.com/file/comicsiteimage/manga/enchanted-forest-duel/chapter-${i}/page-${j + 1}.jpg`),
      mangaId: enchantedForest.id,
    });
  }

  await prisma.chapter.createMany({
    data: enchantedChapters,
  });

  console.log('Created chapters');

  // Thêm reviews
  await prisma.review.createMany({
    data: [
      {
        userId: user.id,
        mangaId: wastelandSurvivor.id,
        rating: 4.8,
        content: 'Absolutely love the world-building and character development!',
        likes: 15,
      },
      {
        userId: user.id,
        mangaId: crimsonDefender.id,
        rating: 4.5,
        content: 'Great superhero comic with a strong female lead. Can\'t wait for more chapters!',
        likes: 8,
      },
      {
        userId: user.id,
        mangaId: enchantedForest.id,
        rating: 5.0,
        content: 'One of the best fantasy comics I\'ve ever read. The ending was perfect!',
        likes: 22,
      },
    ],
  });

  console.log('Created reviews');

  // Thêm bookmarks
  await prisma.bookmark.createMany({
    data: [
      {
        userId: user.id,
        mangaId: wastelandSurvivor.id,
        notes: 'Great world-building and character development',
        status: BookmarkStatus.READING,
      },
      {
        userId: user.id,
        mangaId: crimsonDefender.id,
        notes: 'Need to catch up on the latest arc',
        status: BookmarkStatus.ON_HOLD,
      },
      {
        userId: user.id,
        mangaId: enchantedForest.id,
        notes: 'Amazing ending, might re-read later',
        status: BookmarkStatus.COMPLETED,
      },
    ],
  });

  console.log('Created bookmarks');

  // Thêm collections
  const favorites = await prisma.comicCollection.create({
    data: {
      name: 'Favorites',
      description: 'My all-time favorite comics',
      userId: user.id,
    },
  });

  const postApocalyptic = await prisma.comicCollection.create({
    data: {
      name: 'Post-Apocalyptic',
      description: 'Comics set in apocalyptic and post-apocalyptic worlds',
      userId: user.id,
    },
  });

  console.log('Created collections');

  // Lấy bookmarks
  const wastelandBookmark = await prisma.bookmark.findFirst({
    where: {
      userId: user.id,
      mangaId: wastelandSurvivor.id,
    },
  });

  // Thêm bookmark vào collections
  if (wastelandBookmark) {
    await prisma.bookmarkCollection.createMany({
      data: [
        {
          bookmarkId: wastelandBookmark.id,
          comicCollectionId: favorites.id,
        },
        {
          bookmarkId: wastelandBookmark.id,
          comicCollectionId: postApocalyptic.id,
        },
      ],
    });
  }

  console.log('Added bookmarks to collections');

  // Thêm reading progress
  const wastelandLatestChapter = await prisma.chapter.findFirst({
    where: { mangaId: wastelandSurvivor.id, number: 24 },
  });

  const crimsonLatestChapter = await prisma.chapter.findFirst({
    where: { mangaId: crimsonDefender.id, number: 12 },
  });

  const enchantedLatestChapter = await prisma.chapter.findFirst({
    where: { mangaId: enchantedForest.id, number: 36 },
  });

  if (wastelandLatestChapter && crimsonLatestChapter && enchantedLatestChapter) {
    await prisma.readingProgress.createMany({
      data: [
        {
          userId: user.id,
          mangaId: wastelandSurvivor.id,
          chapterId: wastelandLatestChapter.id,
          currentPage: 12,
          totalPages: 30,
          lastReadAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 ngày trước
        },
        {
          userId: user.id,
          mangaId: crimsonDefender.id,
          chapterId: crimsonLatestChapter.id,
          currentPage: 8,
          totalPages: 24,
          lastReadAt: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000), // 38 ngày trước
        },
        {
          userId: user.id,
          mangaId: enchantedForest.id,
          chapterId: enchantedLatestChapter.id,
          currentPage: 45,
          totalPages: 45,
          lastReadAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 ngày trước
        },
      ],
    });
  }

  console.log('Added reading progress');

  // Thêm reading preferences
  await prisma.readingPreferences.create({
    data: {
      userId: user.id,
      direction: 'VERTICAL',
      pageLayout: 'CONTINUOUS',
      backgroundColor: 'BLACK',
      brightness: 100,
      contrast: 100,
      imageQuality: 'AUTO',
      pageTransition: 'SLIDE',
      autoAdvanceTime: 0,
      showPageNumber: true,
      rememberLastRead: true,
      fullscreenOnOpen: false,
    },
  });

  console.log('Added reading preferences');

  // Thêm comments và replies
  const comment1 = await prisma.comment.create({
    data: {
      userId: user.id,
      mangaId: wastelandSurvivor.id,
      content: 'I love how the author builds tension in the latest chapter!',
      likes: 5,
    },
  });

  await prisma.reply.create({
    data: {
      userId: admin.id,
      commentId: comment1.id,
      content: 'Agreed! The character development is fantastic as well.',
      likes: 2,
    },
  });

  console.log('Added comments and replies');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });