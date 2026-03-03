import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();
const secret = 'secret_key';

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ _id: req.user._id, name: req.user.name, email: req.user.email }, secret);

  // Perbaikan di sini:
  res.cookie('token', token, { 
    httpOnly: true,
    secure: false,     // Set ke false karena di localhost biasanya tidak pakai HTTPS
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({ result: 'success', user: req.user });
});

router.get('/logout', (req, res) => {
  res.cookie('token', null, { maxAge: 0 }); 
  res.json({ result: 'success' });
});

export default router;

// ----------

// import { Router } from 'express';
// import { User } from '../models/user.js';
// import { getHash } from '../utils/hash.js';
// import passport from 'passport';

// const router = Router();

// router.get('/join', (req, res) => {
//     res.send('Berhasil akses lewat router!');
// });

// router.post('/join', async (req, res) => {
//   const { email, name, password } = req.body;

//   try {
//     const exists = await User.findOne({ email });
//     if (exists) {
//       throw new Error('Email ini sudah terdaftar');
//     }

//     const pwHash = getHash(password);

//     await User.create({
//       email,
//       name,
//       password: pwHash,
//     });

//     res.redirect('/');
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/', // Jika berhasil, ke halaman utama
//   failureRedirect: '/login-gagal', // Jika gagal
// }));

// export default router;