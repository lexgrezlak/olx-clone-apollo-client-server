import { gql, AuthenticationError, UserInputError } from "apollo-server";
import Posting from "../models/Posting";
import { CloudinaryUploader } from "../lib/cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../utils/config";
import { Parent } from "../types";
import { IPostingIdArgs, IPostingTitleArgs } from "./types";

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
    postingsByTitle(title: String!): [Posting!]!
    postingById(id: ID!): Posting
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

    followPosting(id: ID!): Posting!
    deletePosting(id: ID!): Posting!

    singleUpload(file: Upload!): UploadedFileResponse!
    multipleUpload(files: [Upload!]!): [UploadedFileResponse!]!
  }
`;

export const postingResolvers = {
  Query: {
    allPostings: () => Posting.find({}),
    postingById: async (_parent: Parent, { id }: any) => Posting.findById(id),
    postingsByTitle: async (_parent: Parent, { title }: IPostingTitleArgs) =>
      Posting.find({ title }),
  },

  Mutation: {
    addPosting: async (_parent: Parent, args: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      const newPosting = new Posting({ ...args });

      try {
        await newPosting.save();
        user.ownPostings = user.ownPostings.concat(newPosting);
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return newPosting;
    },

    followPosting: async (
      _parent: Parent,
      { id }: IPostingIdArgs,
      { user }: any,
    ) => {
      if (!user) throw new AuthenticationError("Not authenticated");

      const posting = (await Posting.findById(id)) as any;
      if (!posting) throw new Error("Posting not found");

      const userFollowedPostingsIds = user.followedPostings.map(
        (followedPosting: any) => followedPosting.id,
      );

      if (userFollowedPostingsIds.includes(posting.id)) {
        user.followedPostings = user.followedPostings.filter(
          (userFollowedPosting: any) => userFollowedPosting.id !== posting.id,
        );
      } else {
        user.followedPostings = user.followedPostings.concat(posting);
      }

      try {
        await user.save();
        return posting;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    deletePosting: async (
      _parent: Parent,
      { id }: IPostingIdArgs,
      { user }: any,
    ) => {
      if (!user) throw new AuthenticationError("Not authenticated");

      const posting = (await Posting.findById(id)) as any;
      if (!posting) throw new Error("This posting has already been deleted");

      const userPostingsIds = user.ownPostings.map(
        (userPosting: any) => userPosting.id,
      );

      if (userPostingsIds.includes(posting.id)) {
        try {
          await Posting.deleteOne(posting);
          user.ownPostings = user.ownPostings.filter(
            (userPosting: any) => userPosting.id !== posting.id,
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
      cloudinaryUploader,
    ),
    multipleUpload: cloudinaryUploader.multipleUploadsResolver.bind(
      cloudinaryUploader,
    ),
  },
};
