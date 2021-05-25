const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: { user_id: req.session.user_id },
        attributes: ['id', 'name', 'description', 'date_created'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_Text', 'post_id', 'user_id', 'comment_Date'],
            include: {
                model: User,
                attributes: ['name'],
            },
        }]
    }).then((dbPostData) => {

        if (!dbPostData) {
            res.status(404).json({ message: 'No Post have been found !' });
            return;
        }
        res.status(200).json(dbPostData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
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
        res.status(200).json(dbPostData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});


router.get('/post/:id', withAuth, (req, res) => {
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
        res.status(200).json(dbPostData).get({plain:true});
        res.render('post',{
            post,
            logged_in: req.session.logged_in
        })
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/new', (req, res)=>{
    res.render('new-post')
});

module.exports = router
