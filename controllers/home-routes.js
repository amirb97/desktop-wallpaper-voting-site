const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Wallpaper } = require('../models');

router.get('/', (req, res) => {
    Wallpaper.findAll({
        attributes: [
          'id',
          'title',
          'wallpaper_url',
          'user_id',
          'elo_score'
        ],
        include: [
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbPostData => {

          // pass a single wallpapers object into the homepage template
          const wallpapers = dbPostData.map(post =>  post.get({ plain: true }));

          res.render('homepage', {
             wallpapers,
            loggedIn: req.session.loggedIn
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('login');
});

router.get('/profile', (req, res) => {
  User.findOne({
      attributes: { exclude: ['password'] },
      where: {
          id: req.session.user_id
      },
      include: [
        {
          model: Wallpaper,
          attributes: ['id', 'title','wallpaper_url', 'user_id', 'elo_score']
        }
      ]
  })
  .then(dbPostData => {

    // pass a single wallpapers object into the homepage template
    const profile = dbPostData.dataValues;
    const wallpapers = profile.wallpapers.map(wallpaper => wallpaper.get({plain: true}));
    res.render('profile', { 
      profile,
      wallpapers,
      loggedIn: req.session.loggedIn
     });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/leaderboard', (req, res) => {
  Wallpaper.findAll({
      attributes: [
        'id',
        'title',
        'wallpaper_url',
        'user_id',
        'elo_score'
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // pass a single wallpapers object into the homepage template
        const wallpapers = dbPostData.map(wallpaper =>  wallpaper.get({ plain: true }));
        wallpapers.sort((a,b) => (a.elo_score >= b.elo_score) ? -1: 1);
        const slicedWallpapers = wallpapers.slice(0,10);
        res.render('leaderboard', { slicedWallpapers });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/vote', (req, res) => {
  Wallpaper.findAll({
      attributes: [
        'id',
        'title',
        'wallpaper_url',
        'user_id',
        'elo_score'
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // pass a single wallpapers object into the homepage template
        const wallpapers = dbPostData.map(wallpaper =>  wallpaper.get({ plain: true }));
        const voteImgs = [wallpapers[Math.floor(Math.random()*wallpapers.length)], wallpapers[Math.floor(Math.random()*wallpapers.length)]];
        res.render('voting', { voteImgs });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
