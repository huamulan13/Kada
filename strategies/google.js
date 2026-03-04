// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { User } from '../models/index.js';
// import passport from 'passport';

// const config = {
//     clientID: 'MASUKKAN_CLIENT_ID_DARI_GCP',
//     clientSecret: 'MASUKKAN_CLIENT_SECRET_DARI_GCP',
//     callbackURL: '/auth/google/callback',
// };

// const google = new GoogleStrategy(config, async (accessToken, refreshToken, profile, done) => {
//     try {
//         const { email, name } = profile._json;

//         const user = await User.findOneAndUpdate(
//             { email },
//             { name },
//             { upsert: true, new: true }
//         );
        
//         done(null, user);
//     } catch (err) {
//         done(err);
//     }
// });

// export default google;