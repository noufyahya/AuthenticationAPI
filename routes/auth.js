//This is the basic file of the Authintcation
//use the file several times to create an auth auth_router
const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  registerValidation,
  loginValidation
} = require("../valid");

router.post("/register", async (req, res) => {
  const {
    error
  } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Checking if the user already exits
  const emailExists = await User.findOne({
    email: req.body.email,
  });
  if (emailExists) return res.status(400).send("email already exist");

  //hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(req.body.password, salt);

  //create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({
      id: user._id
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const {
    error
  } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //email
  const user = await User.findOne({
    email: req.body.email,
  });
  //what if email not in db
  if (!user) return res.status(400).send("email doesn't exist, register first");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("invalid Password ");

  //token creation
  const token = jwt.sign({
    _id: user._id
  }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);

});

module.exports = router;