import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String, // Tambahkan baris ini
}, { timestamps: true });

export default noteSchema;
