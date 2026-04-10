import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETKEY, {
    expiresIn: "7d",
  });
};

// @desc Register new user
// @route POST/api/auth/register
// @acccesss Public

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill in all the fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      return res.status(201).json({
        msg: "User created successfully",
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ msg: "SERVER ERROR", err: error.message });
  }
};

// @desc Login User
// @route POST/api/auth/login
// @acccesss Public

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      res.json({
        msg: "Login Sucesssful",
        _id: user._id,
        name: user.name,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ msg: "SERVER ERROR", err: error.message });
  }
};

// @desc Get current logged in user
// @route Get/api/auth/profile
// @acccesss Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isPro: user.isPro,
      });
    } else {
      res.status(400).json({ msg: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "SERVER ERROR" });
  }
};

// @desc Update user profile
// @route Put/api/auth/me
// @acccesss Private

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;

      const updatedUser = await user.save();

      res.json({
        msg: "updation success",
        _id: updatedUser._id,
        name: updatedUser.name,
      });
    } else {
      return res.status(404).json({ msg: "updation failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "SERVER ERROR" });
  }
};

export { updateUserProfile, getProfile, loginUser, registerUser };
