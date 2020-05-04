import mongoose from 'mongoose';

const postingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  imageUrls: {
    type: [String],
    required: true,
    minlength: 1,
  },
  postingType: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isNegotiable: {
    type: Boolean,
    required: true,
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  isUsed: {
    type: Boolean,
    required: true,
  },
  city: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Posting', postingSchema);
