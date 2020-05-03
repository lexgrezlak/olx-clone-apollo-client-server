import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  passwordHash: String,
  postings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posting',
    },
  ],
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
