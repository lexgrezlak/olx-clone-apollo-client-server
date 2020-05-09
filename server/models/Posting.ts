import { Schema, Document, model } from "mongoose";
import { IUser } from "./User";

export interface IPosting extends Document {
  title: string;
  category: string;
  description: string;
  imageUrls: string[];
  price: number;
  condition: string;
  city: string;
  phone: string;
  user: IUser["_id"];
}

const PostingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    imageUrls: {
      type: [String],
      required: true,
      minlength: 1,
      maxlength: 8,
    },
    price: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      maxlength: 20,
    },
    phone: {
      type: Number,
      required: true,
      maxlength: 20,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

PostingSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<IPosting>("Posting", PostingSchema);
