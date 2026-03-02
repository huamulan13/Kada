import { Router } from 'express';
import passport from 'passport';
//import { User } from '../models/user.js';
//import { getHash } from '../utils/hash.js';
import { setUserToken } from '../utils/jwt.js';

const router = Router();

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  setUserToken(res, req.user);
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