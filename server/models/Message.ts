import { model, Schema, Document } from "mongoose";
import { IUser } from "./User";
import { IPosting } from "./Posting";

export interface IMessage extends Document {
  content: string;
  posting: IPosting;
  fromUser: IUser["_id"];
  toUser: IUser["_id"];
}

const MessageSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 280,
      required: true,
    },
    posting: {
      type: Schema.Types.ObjectId,
      ref: "Posting",
    },
    fromUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    toUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

MessageSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<IMessage>("Message", MessageSchema);
