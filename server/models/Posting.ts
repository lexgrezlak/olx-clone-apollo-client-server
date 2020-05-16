import { Schema, Document, model } from "mongoose";
import { IUser } from "./User";
import validator from "validator";

const CATEGORIES = ["Health", "Electronics", "Fashion"];
const CONDITIONS = ["New", "Used"];

export interface IPosting extends Document {
  updatedAt: Date;
  createdAt: Date;
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
      minlength: 2,
      maxlength: 15,
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
      min: 10,
      maxlength: 250,
    },
    imageUrls: {
      type: [String],
      required: true,
      minlength: 1,
      maxlength: 2,
    },
    price: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
      validate: (value: string) => validator.isIn(value, CONDITIONS),
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 15,
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
