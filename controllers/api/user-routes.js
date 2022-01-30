const router = require('express').Router();
const { User, Wallpaper } = require('../../models');

// get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// gets a single user's info
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include:  [
            {
                model: Wallpaper,
                attributes: ['id', 'title', 'wallpaper_url', 'user_id', 'elo_score']
            }
        ]
    })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      })
});

module.exports = router;
