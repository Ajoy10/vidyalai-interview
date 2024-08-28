const express = require('express');
const { fetchPosts, fetchImagesForPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const postsWithImages = await fetchImagesForPosts(posts);

  res.json(postsWithImages);
});

module.exports = router;
