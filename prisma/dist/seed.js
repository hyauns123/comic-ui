"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt_1 = require("bcrypt");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var adminPassword, userPassword, admin, user, alexChen, mariaRodriguez, hiroshiTanaka, genres, wastelandSurvivor, crimsonDefender, enchantedForest, wastelandChapters, _loop_1, i, crimsonChapters, _loop_2, i, enchantedChapters, _loop_3, i, favorites, postApocalyptic, wastelandBookmark, wastelandLatestChapter, crimsonLatestChapter, enchantedLatestChapter, comment1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Start seeding...');
                    return [4 /*yield*/, (0, bcrypt_1.hash)('admin123', 10)];
                case 1:
                    adminPassword = _a.sent();
                    return [4 /*yield*/, (0, bcrypt_1.hash)('user123', 10)];
                case 2:
                    userPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'admin@example.com' },
                            update: {},
                            create: {
                                email: 'admin@example.com',
                                username: 'admin',
                                name: 'Admin User',
                                password: adminPassword,
                                role: client_1.UserRole.ADMIN,
                                bio: 'Website administrator',
                                avatar: 'https://f004.backblazeb2.com/file/comicsiteimage/avatars/admin-avatar.png',
                            },
                        })];
                case 3:
                    admin = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'user@example.com' },
                            update: {},
                            create: {
                                email: 'user@example.com',
                                username: 'testuser',
                                name: 'Test User',
                                password: userPassword,
                                role: client_1.UserRole.FREE,
                                bio: 'Comic enthusiast',
                                avatar: 'https://f004.backblazeb2.com/file/comicsiteimage/avatars/user-avatar.png',
                            },
                        })];
                case 4:
                    user = _a.sent();
                    console.log('Created users:', { admin: admin.id, user: user.id });
                    return [4 /*yield*/, prisma.author.create({
                            data: {
                                name: 'Alex Chen',
                                bio: 'Alex Chen is a renowned comic artist known for post-apocalyptic storytelling.',
                                avatar: 'https://f004.backblazeb2.com/file/comicsiteimage/authors/alex-chen.png',
                            },
                        })];
                case 5:
                    alexChen = _a.sent();
                    return [4 /*yield*/, prisma.author.create({
                            data: {
                                name: 'Maria Rodriguez',
                                bio: 'Maria Rodriguez specializes in superhero comics with strong female protagonists.',
                                avatar: 'https://f004.backblazeb2.com/file/comicsiteimage/authors/maria-rodriguez.png',
                            },
                        })];
                case 6:
                    mariaRodriguez = _a.sent();
                    return [4 /*yield*/, prisma.author.create({
                            data: {
                                name: 'Hiroshi Tanaka',
                                bio: 'Hiroshi Tanaka is a master of fantasy world-building and intricate character design.',
                                avatar: 'https://f004.backblazeb2.com/file/comicsiteimage/authors/hiroshi-tanaka.png',
                            },
                        })];
                case 7:
                    hiroshiTanaka = _a.sent();
                    console.log('Created authors');
                    return [4 /*yield*/, Promise.all([
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
                        ])];
                case 8:
                    genres = _a.sent();
                    console.log('Created genres');
                    return [4 /*yield*/, prisma.manga.create({
                            data: {
                                slug: 'wasteland-survivor',
                                title: 'Wasteland Survivor',
                                originalTitle: 'Wasteland Survivor',
                                coverImage: 'https://f004.backblazeb2.com/file/comicsiteimage/manga/wasteland-survivor/cover.png',
                                authorId: alexChen.id,
                                status: client_1.MangaStatus.ONGOING,
                                rating: 4.7,
                                year: '2022',
                                ageRating: '16+',
                                publisher: 'Dystopia Comics',
                                description: 'In a world devastated by environmental catastrophe, a young survivor navigates the harsh wasteland while uncovering the secrets of the past civilization.',
                                featured: true,
                                viewCount: 15000,
                                mangaGenres: {
                                    create: [
                                        { genreId: genres.find(function (g) { return g.name === 'Action'; }).id },
                                        { genreId: genres.find(function (g) { return g.name === 'Adventure'; }).id },
                                        { genreId: genres.find(function (g) { return g.name === 'Post-Apocalyptic'; }).id },
                                    ],
                                },
                            },
                        })];
                case 9:
                    wastelandSurvivor = _a.sent();
                    return [4 /*yield*/, prisma.manga.create({
                            data: {
                                slug: 'crimson-defender',
                                title: 'Crimson Defender',
                                coverImage: 'https://f004.backblazeb2.com/file/comicsiteimage/manga/crimson-defender/cover.png',
                                authorId: mariaRodriguez.id,
                                status: client_1.MangaStatus.ONGOING,
                                rating: 4.5,
                                year: '2021',
                                ageRating: '12+',
                                publisher: 'Hero Publications',
                                description: 'When a laboratory accident grants college student Maya Rodriguez extraordinary powers, she takes on the mantle of the Crimson Defender to protect her city from emerging threats.',
                                viewCount: 12000,
                                mangaGenres: {
                                    create: [
                                        { genreId: genres.find(function (g) { return g.name === 'Action'; }).id },
                                        { genreId: genres.find(function (g) { return g.name === 'Superhero'; }).id },
                                    ],
                                },
                            },
                        })];
                case 10:
                    crimsonDefender = _a.sent();
                    return [4 /*yield*/, prisma.manga.create({
                            data: {
                                slug: 'enchanted-forest-duel',
                                title: 'Enchanted Forest Duel',
                                originalTitle: 'Majo no Mori no Kettō',
                                coverImage: 'https://f004.backblazeb2.com/file/comicsiteimage/manga/enchanted-forest-duel/cover.png',
                                authorId: hiroshiTanaka.id,
                                status: client_1.MangaStatus.COMPLETED,
                                rating: 4.9,
                                year: '2020',
                                ageRating: '13+',
                                publisher: 'Fantasy Press',
                                description: 'Two rival magic academies compete in an ancient tournament held within the mysterious Enchanted Forest, where the very rules of magic are unpredictable.',
                                viewCount: 20000,
                                mangaGenres: {
                                    create: [
                                        { genreId: genres.find(function (g) { return g.name === 'Fantasy'; }).id },
                                        { genreId: genres.find(function (g) { return g.name === 'Adventure'; }).id },
                                    ],
                                },
                            },
                        })];
                case 11:
                    enchantedForest = _a.sent();
                    console.log('Created manga');
                    wastelandChapters = [];
                    _loop_1 = function (i) {
                        wastelandChapters.push({
                            number: i,
                            title: "Chapter ".concat(i),
                            date: new Date(Date.now() - (25 - i) * 7 * 24 * 60 * 60 * 1000), // Một chapter mỗi tuần
                            pages: Array.from({ length: 30 }, function (_, j) { return "https://f004.backblazeb2.com/file/comicsiteimage/manga/wasteland-survivor/chapter-".concat(i, "/page-").concat(j + 1, ".jpg"); }),
                            mangaId: wastelandSurvivor.id,
                        });
                    };
                    for (i = 1; i <= 25; i++) {
                        _loop_1(i);
                    }
                    return [4 /*yield*/, prisma.chapter.createMany({
                            data: wastelandChapters,
                        })];
                case 12:
                    _a.sent();
                    crimsonChapters = [];
                    _loop_2 = function (i) {
                        crimsonChapters.push({
                            number: i,
                            title: "Chapter ".concat(i),
                            date: new Date(Date.now() - (12 - i) * 14 * 24 * 60 * 60 * 1000), // Một chapter mỗi hai tuần
                            pages: Array.from({ length: 24 }, function (_, j) { return "https://f004.backblazeb2.com/file/comicsiteimage/manga/crimson-defender/chapter-".concat(i, "/page-").concat(j + 1, ".jpg"); }),
                            mangaId: crimsonDefender.id,
                        });
                    };
                    for (i = 1; i <= 12; i++) {
                        _loop_2(i);
                    }
                    return [4 /*yield*/, prisma.chapter.createMany({
                            data: crimsonChapters,
                        })];
                case 13:
                    _a.sent();
                    enchantedChapters = [];
                    _loop_3 = function (i) {
                        enchantedChapters.push({
                            number: i,
                            title: "Chapter ".concat(i),
                            date: new Date(Date.now() - (36 - i) * 7 * 24 * 60 * 60 * 1000 - 60 * 24 * 60 * 60 * 1000), // Hoàn thành 60 ngày trước
                            pages: Array.from({ length: 45 }, function (_, j) { return "https://f004.backblazeb2.com/file/comicsiteimage/manga/enchanted-forest-duel/chapter-".concat(i, "/page-").concat(j + 1, ".jpg"); }),
                            mangaId: enchantedForest.id,
                        });
                    };
                    for (i = 1; i <= 36; i++) {
                        _loop_3(i);
                    }
                    return [4 /*yield*/, prisma.chapter.createMany({
                            data: enchantedChapters,
                        })];
                case 14:
                    _a.sent();
                    console.log('Created chapters');
                    // Thêm reviews
                    return [4 /*yield*/, prisma.review.createMany({
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
                        })];
                case 15:
                    // Thêm reviews
                    _a.sent();
                    console.log('Created reviews');
                    // Thêm bookmarks
                    return [4 /*yield*/, prisma.bookmark.createMany({
                            data: [
                                {
                                    userId: user.id,
                                    mangaId: wastelandSurvivor.id,
                                    notes: 'Great world-building and character development',
                                    status: client_1.BookmarkStatus.READING,
                                },
                                {
                                    userId: user.id,
                                    mangaId: crimsonDefender.id,
                                    notes: 'Need to catch up on the latest arc',
                                    status: client_1.BookmarkStatus.ON_HOLD,
                                },
                                {
                                    userId: user.id,
                                    mangaId: enchantedForest.id,
                                    notes: 'Amazing ending, might re-read later',
                                    status: client_1.BookmarkStatus.COMPLETED,
                                },
                            ],
                        })];
                case 16:
                    // Thêm bookmarks
                    _a.sent();
                    console.log('Created bookmarks');
                    return [4 /*yield*/, prisma.comicCollection.create({
                            data: {
                                name: 'Favorites',
                                description: 'My all-time favorite comics',
                                userId: user.id,
                            },
                        })];
                case 17:
                    favorites = _a.sent();
                    return [4 /*yield*/, prisma.comicCollection.create({
                            data: {
                                name: 'Post-Apocalyptic',
                                description: 'Comics set in apocalyptic and post-apocalyptic worlds',
                                userId: user.id,
                            },
                        })];
                case 18:
                    postApocalyptic = _a.sent();
                    console.log('Created collections');
                    return [4 /*yield*/, prisma.bookmark.findFirst({
                            where: {
                                userId: user.id,
                                mangaId: wastelandSurvivor.id,
                            },
                        })];
                case 19:
                    wastelandBookmark = _a.sent();
                    if (!wastelandBookmark) return [3 /*break*/, 21];
                    return [4 /*yield*/, prisma.bookmarkCollection.createMany({
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
                        })];
                case 20:
                    _a.sent();
                    _a.label = 21;
                case 21:
                    console.log('Added bookmarks to collections');
                    return [4 /*yield*/, prisma.chapter.findFirst({
                            where: { mangaId: wastelandSurvivor.id, number: 24 },
                        })];
                case 22:
                    wastelandLatestChapter = _a.sent();
                    return [4 /*yield*/, prisma.chapter.findFirst({
                            where: { mangaId: crimsonDefender.id, number: 12 },
                        })];
                case 23:
                    crimsonLatestChapter = _a.sent();
                    return [4 /*yield*/, prisma.chapter.findFirst({
                            where: { mangaId: enchantedForest.id, number: 36 },
                        })];
                case 24:
                    enchantedLatestChapter = _a.sent();
                    if (!(wastelandLatestChapter && crimsonLatestChapter && enchantedLatestChapter)) return [3 /*break*/, 26];
                    return [4 /*yield*/, prisma.readingProgress.createMany({
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
                        })];
                case 25:
                    _a.sent();
                    _a.label = 26;
                case 26:
                    console.log('Added reading progress');
                    // Thêm reading preferences
                    return [4 /*yield*/, prisma.readingPreferences.create({
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
                        })];
                case 27:
                    // Thêm reading preferences
                    _a.sent();
                    console.log('Added reading preferences');
                    return [4 /*yield*/, prisma.comment.create({
                            data: {
                                userId: user.id,
                                mangaId: wastelandSurvivor.id,
                                content: 'I love how the author builds tension in the latest chapter!',
                                likes: 5,
                            },
                        })];
                case 28:
                    comment1 = _a.sent();
                    return [4 /*yield*/, prisma.reply.create({
                            data: {
                                userId: admin.id,
                                commentId: comment1.id,
                                content: 'Agreed! The character development is fantastic as well.',
                                likes: 2,
                            },
                        })];
                case 29:
                    _a.sent();
                    console.log('Added comments and replies');
                    console.log('Seeding finished.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
