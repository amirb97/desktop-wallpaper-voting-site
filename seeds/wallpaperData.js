const { Wallpaper } = require('../models');

const wallpaperdata = [
    {
        id: 1,
        title: 'Skyline GTR',
        wallpaper_url: 'https://wallpapercave.com/uwp/uwp1564391.jpeg',
        user_id: 1,
        elo_score: 1000,
        user: {
            username: 'alan'
        }
    },
    {
        id: 2,
        title: 'Black Panther',
        wallpaper_url: 'https://wallpapercave.com/wp/wp2553434.jpg',
        user_id: 1,
        elo_score: 1000,
        user: {
            username: 'alan'
        }
    },    {
        id: 3,
        title: 'Rengoku Fight',
        wallpaper_url: 'https://wallpapercave.com/uwp/uwp953419.jpeg',
        user_id: 1,
        elo_score: 1000,
        user: {
            username: 'alan'
        }
    },    {
        id: 4,
        title: 'Minimalist Mountain',
        wallpaper_url: 'https://wallpapercave.com/wp/wp4668250.jpg',
        user_id: 2,
        elo_score: 1000,
        user: {
            username: 'amir'
        }
    },    {
        id: 5,
        title: 'Island Paradise',
        wallpaper_url: 'https://wallpapercave.com/wp/wp4844791.jpg',
        user_id: 2,
        elo_score: 1000,
        user: {
            username: 'amir'
        }
    },    {
        id: 6,
        title: 'Hidden Valley River',
        wallpaper_url: 'https://wallpapercave.com/wp/wp2580705.jpg',
        user_id: 2,
        elo_score: 1000,
        user: {
            username: 'amir'
        }
    },    {
        id: 7,
        title: 'Space Mountains',
        wallpaper_url: 'https://wallpapercave.com/wp/wp4844813.jpg',
        user_id: 3,
        elo_score: 1000,
        user: {
            username: 'adam'
        }
    },
    {
        id: 8,
        title: 'Neo Noir Planet',
        wallpaper_url: 'https://wallpaperaccess.com/full/2637581.jpg',
        user_id: 3,
        elo_score: 1000,
        user: {
            username: 'adam'
        }
    },
    {
        id: 9,
        title: 'Blue/Purple Ring Light',
        wallpaper_url: 'https://wallpaperaccess.com//full/2029165.jpg',
        user_id: 3,
        elo_score: 1000,
        user: {
            username: 'adam'
        }
    },
    {
        id: 10,
        title: 'Mountain Range',
        wallpaper_url: 'https://wallpaperaccess.com//full/2029169.jpg',
        user_id: 4,
        elo_score: 1000,
        user: {
            username: 'arnold'
        }
    },
    {
        id: 11,
        title: 'I Like Turtles',
        wallpaper_url: 'https://wallpapercave.com/uwp/uwp893354.jpeg',
        user_id: 5,
        elo_score: 1000,
        user: {
            username: 'cory'
        }
    }
]

const seedWallpapers = () => Wallpaper.bulkCreate(wallpaperdata);

module.exports = seedWallpapers;