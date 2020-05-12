import { model, Schema, Document } from "mongoose";
import { IPosting } from "./Posting";
import { IMessage } from "./Message";
import validator from "validator";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  ownPostings: [IPosting["_id"]];
  followedPostings: [IPosting["_id"]];
  messages: [IMessage["_id"]];
}

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: (value: string) => validator.isEmail(value),
  },
  passwordHash: String,
  ownPostings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posting",
    },
  ],
  followedPostings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posting",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
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

export default model<IUser>("User", UserSchema);
