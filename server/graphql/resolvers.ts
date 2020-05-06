import { CloudinaryUploader } from "../lib/cloudinary";
import {
  JWT_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../utils/config";
import User from "../models/User";
import Posting from "../models/Posting";
import { UserInputError, AuthenticationError } from "apollo-server";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const cloudinaryUploader = new CloudinaryUploader({
  cloudName: CLOUDINARY_CLOUD_NAME,
  apiKey: CLOUDINARY_API_KEY,
  apiSecret: CLOUDINARY_API_SECRET,
});

const resolvers = {
  Query: {
    currentUser: (_parent: any, _args: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      return user;
    },
    postingCount: () => Posting.collection.countDocuments(),
    postings: async (_parent: any, args: any, context: any) => {
      console.log(context);
      // if (!context.currentUser) return null;
      // no args returns all postings
      let allPostings: any = await Posting.find({});
      if (Object.keys(args).length === 0) return allPostings;

      // check for filters
      if (args.title) {
        allPostings = allPostings.filter((posting: any) =>
          posting.title.toLowerCase().includes(args.title.toLowerCase())
        );
      }

      return allPostings;
    },
  },

  Mutation: {
    // postings related
    addPosting: async (_root: any, args: any, { user }: any) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      const newPosting = new Posting({ ...args });

      try {
        await newPosting.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return newPosting;
    },

    // # user related
    register: async (
      _root: any,
      { email, password }: { email: string; password: string }
    ) => {
      if (password.length < 4)
        throw new UserInputError(
          "Password should be at least 4 characters long.",
          {
            invalidArgs: { password },
          }
        );

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        email,
        passwordHash,
      });

      try {
        return user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { email, password },
        });
      }
    },
    login: async (
      _root: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user: any = await User.findOne({ email });

      const isPasswordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!user || !isPasswordCorrect) {
        throw new UserInputError("Wrong username or password.");
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return { token, user };
    },

    singleUpload: cloudinaryUploader.singleFileUploadResolver.bind(
      cloudinaryUploader
    ),
    multipleUpload: cloudinaryUploader.multipleUploadsResolver.bind(
      cloudinaryUploader
    ),
  },
};

export default resolvers;
