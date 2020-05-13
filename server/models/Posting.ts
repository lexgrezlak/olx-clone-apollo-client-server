import { Schema, Document, model } from "mongoose";
import { IUser } from "./User";
import validator from "validator";

const CATEGORIES = ["Health", "Electronics", "Fashion"];

export interface IPosting extends Document {
  updatedAt: any;
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
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    category: {
      type: String,
      required: true,
      validate: (value: string) => validator.isIn(value, CATEGORIES),
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
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
      trim: true,
      maxlength: 30,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate: (value: string) => validator.isMobilePhone(value),
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

PostingSchema.index({ title: "text" });

export default model<IPosting>("Posting", PostingSchema);
