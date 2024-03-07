const { Status, SUCCESS, USER_NOT_EXISTS } = require("../../status/");
const User = require("../models/loginSchema");

async function getUserById(userId) {
  // Fetch the user from the database
  const user = await User.findById(userId);

  // Check if user was found
  if (!user) {
    // User not found, return an error status
    return new Status(404, USER_NOT_EXISTS, "User Not Found");
  }

  // User found, return a success status with the user data
  return new Status(200, SUCCESS, user);
}

module.exports = { getUserById };
