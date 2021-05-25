const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all post and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_Text', 'post_id', 'user_id', 'comment_Date'],
          include: {
            model: User,
            attributes: ['name'],
          },
        }
      ]
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'name', 'description', 'date_created'],
    include: [{
      model: User,
      attributes: ['name'],
    },
    {
      model: Comment,
      attributes: ['id', 'comment_Text', 'post_id', 'user_id', 'comment_Date'],
      include: {
        model: User,
        attributes: ['name'],
      },
    }]
  }).then((dbPostData) => {

    if (!dbPostData) {
      res.status(404).json({ message: 'No Post has been found with that id !' });
      return;
    }

    res.status(200).json(dbPostData).get({ plain: true });

    res.render( 'post', {
      posts,
      logged_in: req.session.logged_in

    }); console.log ("can not render post")
  })
    .catch(err => {
      res.status(500).json(err);
      console.log("looking up post aint working!!!!!")
    })
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
