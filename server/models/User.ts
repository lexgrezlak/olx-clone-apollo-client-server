import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new mongoose.Schema({
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

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);

export default User;
