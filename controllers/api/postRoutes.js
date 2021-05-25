const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  
  Post.findAll().then((PostData) => {
      res.json(PostData);
  });
});

router.get('/:id', async (req, res) => {
  try {
      const PostData = await Post.findByPk(req.params.id);
      if (!PostData) {
          res.status(404).json({ message: 'No comemnt with this id!' });
          return;
      }
      const post = PostData.get({ plain: true });
      res.render('post', post);
  } catch (err) {
      res.status(500).json(err);
  };
});

router.post('/', withAuth, async (req, res) => {
  Post.create(
    {
      name: req.body.name,
      description: req.body.description,
      user_id: req.session.user_id
    },
    )
    .then((dbPostData) => {
        res.json(dbPostData);
    })
    .catch((err) => {
        console.log(err, "err 500");
        res.json(err);
    });
});


router.put('/:id', (req, res) => {
    
  Post.update(
      {
          
        description: req.body.description,
      },
      {
          
          where: {
              id: req.params.id,
          },
      }
  )
      .then((dbPostData) => {
          res.json(dbPostData);
      })
      .catch((err) => {
          console.log(err);
          res.json(err);
      });
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports  = router;
