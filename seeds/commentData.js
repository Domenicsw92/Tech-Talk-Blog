const { Comment } = require('../models');

const commentData =
[
    {
        "post_id": 2,
        "user_id": 1,
        "comment_Text": "that sounds awesome."
        
    },
    {
        "post_id": 1,
        "user_id": 2,
        "comment_Text": "great cant wait."
        
    },
    {
        "post_id": 3,
        "user_id": 1,
        "comment_Text": "looks great."
        
    },
    {
        "post_id": 1,
        "user_id": 3,
        "comment_Text": " awesome work"
        
    }

]
const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;