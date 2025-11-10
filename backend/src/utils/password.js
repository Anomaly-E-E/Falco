const bcrypt = require('bcrypt');


async function hashPassword(plainPassword) {
  
  const saltRounds = 10;
  
  try {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
}


async function comparePassword(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords: ' + error.message);
  }
}

module.exports = {
  hashPassword,
  comparePassword
};

