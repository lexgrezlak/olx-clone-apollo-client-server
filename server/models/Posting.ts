import mongoose from 'mongoose';

const postingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  price: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Posting', postingSchema);
