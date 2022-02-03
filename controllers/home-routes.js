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
          const posts = dbPostData.map(post =>  post.get({ plain: true }));
          res.render('homepage', { posts });
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

module.exports = router;
