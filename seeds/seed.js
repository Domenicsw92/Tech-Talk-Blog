const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.js');
const postData = require('./postData.js');
const commentData = require('./commentData.js')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log("|n-------------------------DATABASE___SYNCED---------------------n|");

  // await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
    
  // }, console.log("|n-------------------------USER___DATABASE___SYNCED---------------------n|")
  // );

  await userData();
  console.log("|n-------------------------USER___DATABASE___SYNCED---------------------n|");

  await postData();
  console.log("|n-------------------------POST___DATABASE___SYNCED---------------------n|");

  await commentData();
  console.log("|n-------------------------COMMENT___DATABASE___SYNCED---------------------n|");

  process.exit(0);
};

seedDatabase();
