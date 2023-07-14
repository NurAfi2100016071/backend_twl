const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createregisterUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Periksa apakah password dan konfirmasi password cocok
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password and Confirm Password don't match" });
    }

    // Periksa apakah email sudah terdaftar sebelumnya
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Enkripsi password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 12);

    // Buat instance user baru
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Simpan user ke database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createloginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Periksa apakah email terdaftar
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Periksa kecocokan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JSON Web Token (JWT)
    const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key', {
      expiresIn: '1h', // Token expiration time
    });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
