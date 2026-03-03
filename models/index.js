import mongoose from 'mongoose';
import noteSchema from './schemas/board.js';
import userSchema from './user.js'

export const Post = mongoose.model('Post', noteSchema);
export const User = mongoose.model('User', userSchema)