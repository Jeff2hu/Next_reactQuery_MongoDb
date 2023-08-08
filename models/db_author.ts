import mongoose, { Schema } from 'mongoose';

const authorSchema = new Schema(
  {
    name: String,
    age: Number,
    residence: String,
  },
  {
    timestamps: true,
  },
);

const Author = mongoose.models.authors || mongoose.model('authors', authorSchema);

export default Author;
