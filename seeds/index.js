const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedWallpapers = require('./wallpaperData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();

    await seedWallpapers();
    
    process.exit(0);
};

seedAll();