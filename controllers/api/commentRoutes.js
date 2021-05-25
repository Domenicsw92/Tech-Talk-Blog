const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
  
    Comment.findAll().then((commentData) => {
        res.json(commentData);
    });
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);
        if (!commentData) {
            res.status(404).json({ message: 'No comemnt with this id!' });
            return;
        }
        const comment = commentData.get({ plain: true });
        res.render('comment', comment);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', (req, res) => {
    
    Comment.update(
        {
            
            comment_Text: req.body.comment_Text,
        },
        {
            
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
