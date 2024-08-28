function mod(n, m) {
  return ((n % m) + m) % m;
}

function fullnameToAbbrivation(name) {
  const names = name.split(' ');
  if (names.length <= 0) {
    return 'UN';
  } else if (names.length == 1) {
    return names[0][0].toUpperCase();
  } else {
    return names[0][0].toUpperCase() + names[1][0].toUpperCase();
  }
}

module.exports = {
  mod,
  fullnameToAbbrivation,
};
