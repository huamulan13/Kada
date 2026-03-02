import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token']; 
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: 'secret_key',
};

passport.use('jwt', new JwtStrategy(opts, (payload, done) => {
  return done(null, payload);
}));