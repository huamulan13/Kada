import mongoose from 'mongoose';
import noteSchema from './schemas/board.js';

export const Post = mongoose.model('Post', noteSchema);