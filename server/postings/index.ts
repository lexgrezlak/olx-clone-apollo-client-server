import {
  gql,
  AuthenticationError,
  UserInputError,
} from "apollo-server-express";
import Posting, { IPosting } from "../models/Posting";
import { CloudinaryUploader } from "../lib/cloudinary";
import { Parent } from "../types";
import {
  IAddPostingArgs,
  IEditPostingArgs,
  IPostingIdArgs,
  IPostingTitleArgs,
  IQueries,
} from "./types";
import { GraphQLDateTime } from "graphql-iso-date";
import { IContext } from "../context";

const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
} = process.env;

const cloudinaryUploader = new CloudinaryUploader({
  cloudName: CLOUDINARY_CLOUD_NAME,
  apiKey: CLOUDINARY_API_KEY,
  apiSecret: CLOUDINARY_API_SECRET,
});

const toCursorHash = (string: string) => Buffer.from(string).toString("base64");

const fromCursorHash = (string: string) =>
  Buffer.from(string, "base64").toString("ascii");

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
    phone: String!
    updatedAt: DateTime!
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

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type PostingConnection {
    edges: [Posting!]!
    pageInfo: PageInfo!
  }

  scalar DateTime

  extend type Query {
    allPostings: [Posting!]!
    postingsByTitle(
      title: String!
      cursor: String
      limit: Int
    ): PostingConnection!
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
      phone: String!
    ): Posting!

    editPosting(
      id: ID!
      title: String!
      category: String!
      description: String!
      imageUrls: [String!]!
      price: Int!
      condition: String!
      city: String!
      phone: String!
    ): Posting!
    followPosting(id: ID!): Posting!
    unfollowPosting(id: ID!): Posting!
    deletePosting(id: ID!): Posting!

    singleUpload(file: Upload!): UploadedFileResponse!
    multipleUpload(files: [Upload!]!): [UploadedFileResponse!]!
  }
`;

export const postingResolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    postingById: async (_parent: Parent, { id }: IPostingIdArgs) =>
      Posting.findById(id),
    postingsByTitle: async (
      _parent: Parent,
      { title, cursor, limit = 12 }: IPostingTitleArgs
    ) => {
      const words = title.split(" ");
      const queries: IQueries[] = [];
      words.forEach((word: string) => {
        queries.push({ title: { $regex: word, $options: "i" } });
      });

      const cursorOptions = cursor
        ? {
            updatedAt: {
              $lt: fromCursorHash(cursor),
            },
            $and: queries,
          }
        : { $and: queries };

      const postings = await Posting.find(cursorOptions as any, null, {
        sort: { updatedAt: -1 },
        limit: limit + 1,
      });

      const hasNextPage = postings.length > limit;
      const edges = hasNextPage ? postings.slice(0, -1) : postings;
      const endCursor = toCursorHash(
        edges[edges.length - 1]
          ? edges[edges.length - 1].updatedAt.toString()
          : ""
      );

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor,
        },
      };
    },
  },

  Mutation: {
    addPosting: async (
      _parent: Parent,
      args: IAddPostingArgs,
      { user }: IContext
    ) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      const newPosting = new Posting({ ...args });
      user.ownPostings = user.ownPostings.concat(newPosting) as any;

      try {
        await Promise.all([newPosting.save(), user.save()]);
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return newPosting;
    },

    editPosting: async (
      _parent: Parent,
      args: IEditPostingArgs,
      { user }: IContext
    ) => {
      if (
        !user ||
        // own postings' ids
        !user.ownPostings.map((posting: any) => posting._id).includes(args.id)
      )
        throw new AuthenticationError("Not authenticated");

      const newPosting = { ...args };
      const updatedPosting = await Posting.findByIdAndUpdate(
        args.id,
        newPosting,
        { new: true }
      );
      user.ownPostings = user.ownPostings.map((posting: IPosting) =>
        posting.id === args.id ? updatedPosting : posting
      ) as any;

      try {
        await user.save();
      } catch (error) {
        throw new Error(error.message);
      }
      return updatedPosting;
    },

    followPosting: async (
      _parent: Parent,
      { id }: IPostingIdArgs,
      { user }: IContext
    ) => {
      if (!user) throw new AuthenticationError("Not authenticated");

      const posting = (await Posting.findById(id)) as any;
      if (!posting) throw new Error("Posting not found");

      const userFollowedPostingsIds = user.followedPostings.map(
        (followedPosting: any) => followedPosting.id
      );

      if (!userFollowedPostingsIds.includes(posting.id)) {
        user.followedPostings = user.followedPostings.concat(posting) as any;
      }

      try {
        await user.save();
        return posting;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    unfollowPosting: async (
      _parent: Parent,
      { id }: IPostingIdArgs,
      { user }: IContext
    ) => {
      if (!user) throw new AuthenticationError("Not authenticated");

      const posting = (await Posting.findById(id)) as any;
      if (!posting) throw new Error("Posting not found");

      const userFollowedPostingsIds = user.followedPostings.map(
        (followedPosting: any) => followedPosting.id
      );
      if (userFollowedPostingsIds.includes(posting.id)) {
        user.followedPostings = user.followedPostings.filter(
          (userFollowedPosting: any) => userFollowedPosting.id !== posting.id
        ) as any;
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
      { user }: IContext
    ) => {
      if (!user) throw new AuthenticationError("Not authenticated");

      const posting = (await Posting.findById(id)) as any;
      if (!posting) throw new Error("This posting has already been deleted");

      const userPostingsIds = user.ownPostings.map(
        (userPosting: any) => userPosting.id
      );

      if (userPostingsIds.includes(posting.id)) {
        try {
          await Posting.deleteOne(posting);
          user.ownPostings = user.ownPostings.filter(
            (userPosting: any) => userPosting.id !== posting.id
          ) as any;

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
