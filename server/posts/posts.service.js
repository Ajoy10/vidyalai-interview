const { fetchUserById } = require('../users/users.service');

const axios = require('axios').default;

/**
 * Fetches posts from a remote API.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
async function fetchPosts(params) {
  const { start = 0, limit = 10 } = params || {};
  const { data: posts } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts?limit',
    {
      params: {
        _start: start,
        _limit: limit,
      },
    },
  );

  return posts;
}

/**
 * Fetches images for each post from a remote API and return the list of posts with images attached.
 * @async
 * @param {Array} [posts] - The list of posts for fetching images.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
async function fetchImagesForPosts(posts) {
  const result = await Promise.all(
    posts.map(async post => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`,
        );
        post.images = res.data.map(img => {
          return { url: img.url };
        });
        return post;
      } catch (err) {
        console.error(err);
        post.images = [];
        return post;
      }
    }),
  );

  return result;
}

/**
 * Fetches users for each post from a remote API and return the list of posts with users attached.
 * @async
 * @param {Array} [posts] - The list of posts for fetching users.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
async function fetchUsersForPosts(posts) {
  const result = await Promise.all(
    posts.map(async post => {
      try {
        post.user = await fetchUserById(post.userId);
        return post;
      } catch (err) {
        console.error(err);
        post.user = { id: '-1', name: 'Unknown', email: 'Unknown' };
        return post;
      }
    }),
  );

  return result;
}

module.exports = { fetchPosts, fetchImagesForPosts, fetchUsersForPosts };
