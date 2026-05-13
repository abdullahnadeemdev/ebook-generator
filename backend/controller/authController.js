import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill in all the fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Please provide a valid email address" });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = await User.create({ name, email: email.toLowerCase(), password });

    if (user) {
      return res.status(201).json({
        msg: "User created successfully",
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (user && (await user.matchPassword(password))) {
      res.json({
        msg: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isPro: user.isPro,
      });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (req.body.name) user.name = req.body.name;

    const updatedUser = await user.save();

    res.json({
      msg: "Profile updated successfully",
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export { updateUserProfile, getProfile, loginUser, registerUser };
