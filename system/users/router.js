const express = require("express");
const router = express.Router();
const userControlller = require("./userController");
const { SUCCESS, FAIL } = require("../status");
const authorize = require("../middleware/authorize");
const asyncErrorHandler = require("../utilities/asyncErrorHandler");

// Register user.
router.post(
  "/register",
  asyncErrorHandler(async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const statusObject = await userControlller.registerUser(
      username,
      email,
      password
    );
    res.status(statusObject.httpStatus).send({ message: statusObject.message });
  })
);

// Login user.
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const statusObject = await userControlller.login(email, password);
  res.status(statusObject.httpStatus).send({ token: statusObject.message });
});

// Logout user.
router.post(
  "/logout",
  authorize,
  asyncErrorHandler(async (req, res, next) => {
    const statusObject = await userControlller.logout(res);
    res.status(statusObject.httpStatus).send({ message: statusObject.message });
  })
);

// Helper endpoint for testing.
router.post("/verify", authorize, (req, res) => {
  res.send("verified");
});

router.put(
  "/editUser",
  authorize,
  asyncErrorHandler(async (req, res, next) => {
    const statusObject = await userControlller.editUserInfo(req.body);
    res.status(statusObject.httpStatus).send({ message: statusObject.message });
  })
);

router.get(
  "/getUser/:userId",
  //authorize,
  asyncErrorHandler(async (req, res, next) => {
    let userId = req.params?.userId;
    const statusObject = await userControlller.getUserInfo(userId);
    res.status(statusObject.httpStatus).send(statusObject.message);
  })
);

module.exports = router;
