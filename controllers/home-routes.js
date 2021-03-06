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
        const wallpapers = dbPostData.map(wallpaper =>  wallpaper.get({ plain: true }));
        wallpapers.sort((a,b) => (a.elo_score >= b.elo_score) ? -1: 1);
        const slicedWallpapers = wallpapers.slice(0,10);
        res.render('homepage', {
           slicedWallpapers,
          loggedIn: req.session.loggedIn});
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
  if(req.session.loggedIn){
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
  } else {
    res.render('login');
  }
});

router.get('/leaderboard', (req, res) => {
  Wallpaper.findAll({
      order: [['elo_score', 'DESC']],
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
      ],
      limit: 10
    })
      .then(dbPostData => {
        // pass a single wallpapers object into the homepage template
        const slicedWallpapers = dbPostData.map(wallpaper =>  wallpaper.get({ plain: true }));
        res.render('leaderboard', {
           slicedWallpapers,
          loggedIn: req.session.loggedIn});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/vote', (req, res) => {
  if (req.session.loggedIn) {
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
        
        let numOne = Math.floor(Math.random()*wallpapers.length);
        let numTwo = Math.floor(Math.random()*wallpapers.length);

        do {
          numTwo = Math.floor(Math.random()*wallpapers.length);
        } while(numOne === numTwo);

        const voteImgs = [wallpapers[numOne], wallpapers[numTwo]];

        res.render('voting', { 
        voteImgs,
        loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  } else {
    res.render('login');
  }
});

module.exports = router;
