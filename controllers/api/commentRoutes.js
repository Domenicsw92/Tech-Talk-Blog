const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
    // Get all books from the book table
    Comment.findAll().then((commentData) => {
      res.json(commentData);
    });
  });

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
    //Calls the update method on the Book model
    Comment.update(
      {
        // All the fields you can update and the data attached to the request body.
      comment_description: req.body.comment_description,
      },
      {
        // Gets a book based on the book_id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedComment) => {
        res.json(updatedComment);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
