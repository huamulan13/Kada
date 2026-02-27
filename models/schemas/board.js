import { Schema } from 'mongoose';

const PostSchema = new Schema({
  author: Sting,
  title: String,
  content: String,
}, {
  timestamps: true,
});

export default PostSchema;
