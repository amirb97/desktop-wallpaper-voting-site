const router = require('express').Router();
const { Wallpaper, User } = require('../../models');

// GET /api/wallpapers

router.get('/', (req, res) => {
    Wallpaper.findAll({
        order: [['elo_score', 'DESC']],
        // include: [
        //     {
        //         model: User,
        //         attributes: ['username']
        //     }
        // ]
    })
    .then(dbWallpaperData => res.json(dbWallpaperData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// GET /api/wallpapers/1

router.get('/:id', (req,res) => {
    Wallpaper.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbWallpaperData => {
        if (!dbWallpaperData) {
            res.status(404).json({ message: 'no image found with this id'});
            return;
        }
        res.json(dbWallpaperData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/wallpapers
router.post('/', (req, res) => {
    Wallpaper.create({
        title: req.body.title,
        wallpaper_url: req.body.wallpaper_url,
        user_id: req.body.user_id,
        elo_score: req.body.elo_score
    })
    .then(dbWallpaperData => res.json(dbWallpaperData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/wallpapers/1
router.delete('/:id', (req, res) => {
    Wallpaper.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbWallpaperData => {
        if (!dbWallpaperData) {
            res.status(404).json({ message: 'no wallpaper found with this id'});
            return;
        }
        res.json(dbWallpaperData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;

