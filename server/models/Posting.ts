import { Schema, Document, model, Model } from "mongoose";

export interface IPosting extends Document {
  title: String;
  category: String;
  description: String;
  imageUrls: [String];
  price: Number;
  condition: String;
  city: String;
  phone: String;
  user: Schema.Types.ObjectId;
}

export const PostingSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: [String],
    required: true,
    minlength: 1,
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
  },
  phone: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

PostingSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Posting: Model<IPosting> = model<IPosting>(
  "Posting",
  PostingSchema
);
