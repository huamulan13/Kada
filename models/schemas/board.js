import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
}, { timestamps: true });

export default noteSchema;
