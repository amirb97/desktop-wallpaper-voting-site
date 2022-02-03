const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const wallpaperRoutes = require('./wallpaper-routes.js');


router.use('/users', userRoutes);
router.use('/wallpapers', wallpaperRoutes);

module.exports = router;
