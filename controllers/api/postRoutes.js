const router = require('express').Router();
const { Post , User} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {

  Post.findAll().then((PostData) => {
    res.json(PostData);
  });
});

router.get('/:id', async (req, res) => {
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
    res.status(200).json(dbPostData)

  })
    .catch(err => {
      res.status(500, "error here cant find the post").json(err);
    });
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

module.exports = router;
