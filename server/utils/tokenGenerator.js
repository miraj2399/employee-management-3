const jwt = require('jsonwebtoken');
require('dotenv').config();

async function generateToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        username: user.username,
        userId: user._id.toString(),
        organizationId: user.organizationId,
        role: user.role,
        moderatorPermissions: user.moderatorPermissions
      },
      process.env.ACCESS_TOKEN_SECRET,
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}

module.exports = generateToken;
