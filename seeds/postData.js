const { Post } = require('../models');

const postData =

[
  {
    "name": " New Music App",
    "description": "A mobile app that will let you see what your favorite Celeb is listinign too.",
    "user_id": 1
  },
  {
    "name": "The New DeLL Laptop for Coding",
    "description": "This New Laptop is amazing just checkout the specs",
    "user_id": 2
  },
  {
    "name": "Roll 'Em Up",
    "description": "A game for Windows and macOS where players move a ball through a series of increasingly challenging mazes.",
    "user_id": 3
  }
]
const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;