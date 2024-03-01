import mongoose from 'mongoose';

const bucket = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  timeline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
}, {timestamps: true })

const Bucket = mongoose.model('Bucket', bucket);
export default Bucket;