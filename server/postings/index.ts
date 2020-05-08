import { gql, AuthenticationError, UserInputError } from "apollo-server";
import { Posting } from "../models/Posting";
import { CloudinaryUploader } from "../lib/cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../utils/config";
import { Parent } from "../types";

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

    deletePosting(id: ID!): Posting!

    singleUpload(file: Upload!): UploadedFileResponse!
    multipleUpload(files: [Upload!]!): [UploadedFileResponse!]!
  }
`;

export const postingResolvers = {
  Query: {
    //TODO args interface
    allPostings: () => Posting.find({}),
    // TODO
    postingsByTitle: async (_parent: Parent, { title }: any) =>
      Posting.find({ title }),
  },

  Mutation: {
    addPosting: async (_parent: Parent, args: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      const newPosting = new Posting({ ...args });

      try {
        await newPosting.save();
        user.postings = user.postings.concat(newPosting);
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return newPosting;
    },

    deletePosting: async (_parent: Parent, { id }: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");

      const posting = (await Posting.findById(id)) as any;
      if (!posting) throw new Error("This posting has already been deleted");

      const userPostingsIds = user.postings.map(
        (userPosting: any) => userPosting.id
      );

      if (userPostingsIds.includes(posting.id)) {
        try {
          await Posting.deleteOne(posting);
          user.postings = user.postings.filter(
            (userPosting: any) => userPosting.id !== posting.id
          );

          await user.save();

          return posting;
        } catch (error) {
          throw new Error(error.message);
        }
      } else {
        throw new AuthenticationError("Not authenticated");
      }
    },

    singleUpload: cloudinaryUploader.singleFileUploadResolver.bind(
      cloudinaryUploader
    ),
    multipleUpload: cloudinaryUploader.multipleUploadsResolver.bind(
      cloudinaryUploader
    ),
  },
};
