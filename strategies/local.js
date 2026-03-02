import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models/user.js';
import { getHash } from '../utils/hash.js';

const config = {
  usernameField: 'email',
  passwordField: 'password',
};

const local = new LocalStrategy(config, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Member tidak ditemukan.' });
    }

    const pwHash = getHash(password);
    if (user.password !== pwHash) {
      return done(null, false, { message: 'Password tidak cocok.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.use('local', local); 

export default local;