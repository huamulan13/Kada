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
      throw new Error('Member tidak ditemukan.');
    }

    const pwHash = getHash(password);
    if (user.password !== pwHash) {
      throw new Error('Password tidak cocok.');
    }

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default local;