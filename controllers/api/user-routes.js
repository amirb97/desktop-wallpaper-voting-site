const router = require('express').Router();
const { json } = require('express/lib/response');
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
        }
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

// posts a new user to the DB
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
    });
});

// post route for user login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(400).json({ message: 'No user with that email address!' });
              return;
          }

          const validPassword = dbUserData.checkPassword(req.body.password);

          if (!validPassword) {
              res.status(400).json({ message: 'Incorrect Password!' });
              return;
          }

          res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
});

module.exports = router;
