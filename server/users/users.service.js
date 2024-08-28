const axios = require('axios').default;

async function fetchAllUsers() {
  const { data: users } = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );

  return users;
}
// Route to fetch user are https://jsonplaceholder.typicode.com/users/:userId
async function fetchUserById(userId) {
  const { data: user } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  return { id: user.id, name: user.name, email: user.email };
}

module.exports = { fetchAllUsers, fetchUserById };
