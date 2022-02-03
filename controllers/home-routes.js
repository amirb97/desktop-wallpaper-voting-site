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

          res.render('homepage', { wallpapers });
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
        const profile = dbPostData.map(post =>  post.get({ plain: true }));
        res.render('profile', { profile });
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
