const express = require('express');
const {
  fetchPosts,
  fetchImagesForPosts,
  fetchUsersForPosts,
} = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

const totalNoOfPosts = 100;

router.get('/', async (req, res) => {
  const { start = 0, limit = 10 } = req.query;
  const posts = await fetchPosts({ start, limit });

  await Promise.all([fetchImagesForPosts(posts), fetchUsersForPosts(posts)]);

  res.json({
    posts: posts,
    remaining: totalNoOfPosts - (Number(start) + posts.length),
  });
});

module.exports = router;
