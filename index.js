import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';

import authRouter from './routes/auth.js';
import noteRouter from './routes/notes.js'; // Pastikan file ini ada
import local from './strategies/local.js';

const app = express();

// 1. Middleware Dasar
app.use(cors());
app.use(express.json()); // Supaya bisa baca JSON dari React [cite: 505]
app.use(express.urlencoded({ extended: true })); // Supaya bisa baca data form [cite: 59]

// 2. Setup Session (Wajib sebelum Passport) [cite: 217, 227]
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

// 3. Setup Passport [cite: 222, 223]
app.use(passport.initialize());
app.use(passport.session());
passport.use(local); // Mendaftarkan strategi local [cite: 206]

// 4. Session Management (Serialize & Deserialize) [cite: 232, 234]
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// 5. Registrasi Routes
app.use('/auth', authRouter); // Untuk signup & login 
app.use('/notes', noteRouter); // INI YANG TADI MATI, sekarang sudah aktif kembali

// 6. Test Routes (Opsional)
app.get('/', (req, res) => {
  res.send('Server HANMATE APP Alena sudah aktif!');
});

// 7. Koneksi Database
const connectDB = async () => {
  try {
    // Memastikan skema koneksi benar sesuai pesan error sebelumnya
    await mongoose.connect('mongodb+srv://kmediario13_db_user:alena@cluster0.xf879y1.mongodb.net/test?retryWrites=true&w=majority');
    console.log('Terhubung ke MongoDB!');
  } catch (e) {
    console.log('Gagal koneksi MongoDB:', e.message);
    process.exit(1);
  }
}
connectDB();

app.listen(3000, () => console.log('Server KADA jalan di port 3000'));

// import express from 'express';
// import cors from 'cors';
// import session from 'express-session';
// import passport from 'passport';
// import mongoose from 'mongoose';
// import authRouter from './routes/auth.js';
// import local from './strategies/local.js'
// import './strategies/local.js';

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(session({
//   secret: 'secret_key',
//   resave: false,
//   saveUninitialized: true
// }));

// passport.use(local);
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//     done(null, obj);
// });

// app.use('/auth', authRouter);

// const connectDB = async () => {
//   try{
//     await mongoose.connect('mongodb+srv://kmediario13_db_user:alena@cluster0.xf879y1.mongodb.net/?appName=Cluster0');
//   }catch(e){
//     console.log('error message:', e.message);
//     process.exit(1);
//   }
// }
// connectDB();

// app.listen(3000, () => console.log('Server KADA jalan di port 3000'));

// // import express from 'express';
// // import noteRouter from './routes/notes.js';
// // import mongoose from 'mongoose';
// // import cors from 'cors';
// // import { Post } from './models/index.js'; 
// // import authRouter from './routes/auth.js';
// // import session from 'express-session';
// // import passport from 'passport';
// // import local from './strategies/local.js';


// // const connectDB = async () => {
// //   try{
// //     await mongoose.connect('mongodb+srv://kmediario13_db_user:alena@cluster0.xf879y1.mongodb.net/?appName=Cluster0');
// //   }catch(e){
// //     console.log('error message:', e.message);
// //     process.exit(1);
// //   }
// // }
// // connectDB();
// // const app = express();

// // app.use(session({
// //   secret: 'secret_key',
// //   resave: false,
// //   saveUninitialized: true
// // }));

// // app.use(passport.initialize());
// // app.use(passport.session());

// // passport.use(local);

// // passport.serializeUser((user, done) => {
// //   done(null, user);
// // });

// // passport.deserializeUser((obj, done) => {
// //   done(null, obj); 
// // });

// // app.use(express.json()); 
// // app.use(express.urlencoded({ extended: true }));

// // app.use(cors({
// //   origin: "*"
// // }));

// // app.use('/auth', authRouter);
// // app.use('/notes', noteRouter);

// // app.get('/join', (req, res) => {
// //     res.send('Ini adalah endpoint untuk pendaftaran. Gunakan form POST untuk mendaftar!');
// // });

// // app.get('/', (req, res) => {
// //     res.send('hello world');
// // });

// // app.get('/admin', (req, res) => {
// //     res.status(401).send('Gak boleh masuk! ELO BUKAN MOMAA!!');
// // });

// // app.get('/say:moma', (req, res) => {
// //     res.send ('ELO MOMAA!!')
// // });

// // // Contoh route dengan path parameter yang benar
// // app.get('/say/:greeting', (req, res) => {
// //     const { greeting } = req.params;
// //     res.send(greeting);
// // });

// // // Error handling middleware
// // app.use((err, req, res, next) => {
// //     res.status(500).json({
// //         result: 'fail',
// //         error: err.message,
// //     });
// // });



// // app.listen(3000, () => {
// //     console.log('Server jalan di http://localhost:3000');
// // });

// // export default app;
