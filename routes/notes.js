import { Router } from "express";
import Note from "../models/note.js";
import {Post} from "../models/index.js";

const router = Router();

router.get("/", async( req, res, next) => {
    try{
        const notes = await Post.find();
        res.json(notes);
    } catch (e){
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try{
        console.log(id);
        const note = await Post.findById(id); 
        
        res.json(note);
    } catch (e){
        next(e);
    }
});

router.post('/', async(req, res, next) => {
    const { title, content, author } = req.body;
    
    if (!title || !content){
        return res.status(400).json({
            message: "Title and content are required",
        });
    }

    try {
        const note = await Post.create({
            title,
            content,
            author,
        });
        res.status(201).json(note);
    
    } catch (e) {
        next(e);
    } 

});

router.put("/:id", async (req, res, next) => {
    try{
        const note = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        
        );

        res.json(note);
    } catch (e){
        next(e);
    }
});

router.delete("/:id", async(req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({result: "success"});
    } catch (e){
        next(e);
    }
});

export default router;

// import { Router } from 'express';
// import { Post } from '../models/index.js';

// const router = Router();

// // 1. GET ALL (READ) - Mengambil semua post dari MongoDB
// router.get('/', async (req, res, next) => {
//     try {
//         // Menggunakan Post.find() dari Mongoose
//         const posts = await Post.find({}); 
//         res.json(posts);
//     } catch (e) {
//         next(e);
//     }
// });

// // 2. GET BY ID (READ) - Mengambil satu post berdasarkan ID
// router.get('/:id', async (req, res, next) => {
//     const { id } = req.params; // MongoDB ID biasanya string, tidak perlu Number()
//     try {
//         // Menggunakan Post.findById() dari Mongoose
//         const post = await Post.findById(id);
        
//         if (!post) {
//             return res.status(404).json({ message: "Post tidak ditemukan" });
//         }
        
//         res.json(post);
//     } catch (e) {
//         next(e);
//     }
// });

// // 3. POST (CREATE) - Membuat data baru
// router.post('/', async (req, res, next) => {
//     const { title, content } = req.body;
    
//     if (!title || !content) {
//         return res.status(400).json({ message: "Title dan content harus diisi" });
//     }

//     try {
//         const post = await Post.create({ title, content });
//         res.status(201).json(post);
//     } catch (e) {
//         next(e);
//     }
// });

// router.put('/:id', async (req, res, next) => {
//     const { id } = req.params;
//     const { title, content } = req.body;

//     try {
//         // findByIdAndUpdate langsung mencari dan memperbarui data
//         const updatedPost = await Post.findByIdAndUpdate(
//             id, 
//             { title, content }, 
//             { new: true, runValidators: true } 
//         );

//         if (!updatedPost) {
//             return res.status(404).json({ message: "Post tidak ditemukan untuk diupdate" });
//         }

//         res.json(updatedPost);
//     } catch (e) {
//         next(e);
//     }
// });

// router.delete('/:id', async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         const deletedPost = await Post.findByIdAndDelete(id);

//         if (!deletedPost) {
//             return res.status(404).json({ message: "Post tidak ditemukan untuk dihapus" });
//         }

//         res.json({ message: "Post berhasil dihapus", data: deletedPost });
//     } catch (e) {
//         next(e);
//     }
// });

// export default router;
