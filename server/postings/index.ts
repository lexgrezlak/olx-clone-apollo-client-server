import { gql, AuthenticationError, UserInputError } from "apollo-server";
import Posting from "../models/Posting";
import { CloudinaryUploader } from "../lib/cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../utils/config";
import { Parent } from "../types";
import User from "../models/User";

const cloudinaryUploader = new CloudinaryUploader({
  cloudName: CLOUDINARY_CLOUD_NAME,
  apiKey: CLOUDINARY_API_KEY,
  apiSecret: CLOUDINARY_API_SECRET,
});

export const postingTypeDefs = gql`
  type Posting {
    id: ID!
    title: String!
    category: String!
    description: String!
    imageUrls: [String!]!
    price: Int!
    condition: String!
    city: String!
    phone: Int
    user: User!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type UploadedFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  extend type Query {
    allPostings: [Posting!]!
    currentUserPostings: [Posting!]!
    postingsByTitle(title: String): [Posting!]!
  }

  extend type Mutation {
    addPosting(
      title: String!
      category: String!
      description: String!
      imageUrls: [String!]!
      price: Int!
      condition: String!
      city: String!
      phone: Int!
    ): Posting

    singleUpload(file: Upload!): UploadedFileResponse!
    multipleUpload(files: [Upload!]!): [UploadedFileResponse!]!
  }
`;

export const postingResolvers = {
  Query: {
    //TODO args interface
    allPostings: () => Posting.find({}),
    // TODO
    currentUserPostings: (_parent: Parent, _args: any, { user: { id } }: any) =>
      Posting.find({}),
    postingsByTitle: async (_parent: Parent, { title }: any) =>
      Posting.find({ title }),
  },

  Mutation: {
    addPosting: async (_root: any, args: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      const newPosting = new Posting({ ...args });

      try {
        await newPosting.save();
        const userInDb = (await User.findById(user.id)) as any;
        userInDb.postings = userInDb.postings.concat(newPosting);
        await userInDb.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return newPosting;
    },

    singleUpload: cloudinaryUploader.singleFileUploadResolver.bind(
      cloudinaryUploader
    ),
    multipleUpload: cloudinaryUploader.multipleUploadsResolver.bind(
      cloudinaryUploader
    ),
  },
};
