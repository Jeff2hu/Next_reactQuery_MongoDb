import mongoose, { Schema } from 'mongoose';

const topicSchema = new Schema(
  {
    title: String,
    description: String,
    author: String,
  },
  {
    timestamps: true,
  },
);

const Topic = mongoose.models.topics || mongoose.model('topics', topicSchema);

export default Topic;
