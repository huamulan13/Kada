import express from 'express';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export default router;