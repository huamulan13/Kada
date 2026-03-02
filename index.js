import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import noteRouter from './routes/notes.js';
import './strategies/local.js';
import './strategies/jwt.js';

const app = express();

app.use(cors({
  origin: '*',
  // credentials: true 
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/notes', noteRouter);

mongoose.connect('mongodb+srv://kmediario13_db_user:alena@cluster0.xf879y1.mongodb.net/test');

app.listen(3000, () => console.log('Server JWT Aktif!'));

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
