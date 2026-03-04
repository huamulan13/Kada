import express from 'express';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendemail.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Password salah" });

    const payload = { 
      _id: user._id,
      email: user.email, 
      name: user.name 
    };

    const secret = process.env.JWT_SECRET
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret_key', { 
      expiresIn: '1d'
    });

    console.log("Token berhasil dibuat:", token);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,  
      sameSite: 'none', 
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ result: 'success', user: payload, token: token });

    res.status(200).json({ 
      message: "Login Successful",
      user: { id: user._id, email: user.email, name: user.name },
      token: 'token' 
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

function generateRandomPassword() {
  return Math.floor(Math.random() * (10 ** 8)).toString().padStart(8, '0');
}
router.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  try {
    const randomPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword, passwordReset: true },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

    await sendEmail(email, 'Password Reset Lenkada', `Password baru kamu: ${randomPassword}`);
    
    res.json({ result: 'success', message: "udah dikirim nih brok!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/join', async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: "Semua kolom wajib diisi" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email sudah terdaftar, silakan login" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      email,
      name,
      password: hashedPassword
    });

    res.status(201).json({ 
      result: 'success', 
      message: "Pendaftaran berhasil! Silakan login." 
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
//     const secret = process.env.JWT_SECRET || 'secret_key';

//     const token = jwt.sign(
//         { _id: req.user._id, name: req.user.name, email: req.user.email },
//         secret
//     );

//     res.cookie('token', token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: 'none',
//     });

//     res.redirect('http://localhost:3000'); 
// });

export default router;