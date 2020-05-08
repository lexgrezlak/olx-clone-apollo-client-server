import { model, Schema, Document, Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser extends Document {
  name: String;
  email: String;
  passwordHash: String;
  postings: [Schema.Types.ObjectId];
}

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  passwordHash: String,
  postings: [
    {
      type: Schema.Types.ObjectId,
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

export const User: Model<IUser> = model<IUser>("User", UserSchema);
