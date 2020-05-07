import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  name: {
    type: String,
  },
  passwordHash: String,
  postings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posting",
    },
  ],
});

UserSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UserSchema);

export default User;
