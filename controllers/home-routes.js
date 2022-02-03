const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Wallpaper } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

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

          // pass a single post object into the homepage template
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

    // pass a single post object into the homepage template
    const profile = dbPostData.dataValues;
    const wallpapers = profile.wallpapers.map(wallpaper => wallpaper.get({plain: true}));
    console.log(wallpapers);
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
  console.log(req.session);

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
        // pass a single post object into the homepage template
        const posts = dbPostData.map(post =>  post.get({ plain: true }));
        res.render('leaderboard', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/vote', (req, res) => {
  console.log(req.session);

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
        // pass a single post object into the homepage template
        const posts = dbPostData.map(post =>  post.get({ plain: true }));
        res.render('voting', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;