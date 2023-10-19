// generate unique secret key 

const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(64).toString('hex');

console.log('Generated secret key: ', secretKey);

module.exports = {
  secret: secretKey,
};