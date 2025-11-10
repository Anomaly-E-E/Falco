require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(payload, expiresIn = '7d') {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }

      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    }

    function verifyToken(token) {
        try {
          return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
          // Token is invalid or expired
          throw new Error('Invalid or expired token');
        }
      }
      function generateVerificationToken() {
        // Create random 32-character string
        return require('crypto').randomBytes(32).toString('hex');
      }

      module.exports = {
        generateToken,
        verifyToken,
        generateVerificationToken
      };

