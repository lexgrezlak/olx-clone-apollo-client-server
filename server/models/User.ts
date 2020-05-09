import { model, Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IPosting } from "./Posting";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  ownPostings: [IPosting["_id"]];
  followedPostings: [IPosting["_id"]];
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
});

UserSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

UserSchema.plugin(uniqueValidator);

export default model<IUser>("User", UserSchema);
