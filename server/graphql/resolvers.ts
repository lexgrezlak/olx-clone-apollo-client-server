import { JWT_SECRET } from './../utils/config';
import User from '../models/User';
import Posting from '../models/Posting';
import { UserInputError } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const resolvers = {
  Query: {
    currentUser: (_root: any, _args: any, context: any) => {
      return context.currentUser;
    },
    postingCount: () => Posting.collection.countDocuments(),
    postings: async (_root: any, args: any) => {
      // no args returns all postings
      let allPostings: any = await Posting.find({});
      if (Object.keys(args).length === 0) return allPostings;

      // check for filters
      if (args.title) {
        allPostings = allPostings.filter((posting: any) =>
          posting.title.toLowerCase().includes(args.title.toLowerCase()),
        );
      }

      return allPostings;
    },
  },

  Mutation: {
    // postings related
    addPosting: async (_root: any, args: any) => {
      const newPosting = new Posting({ ...args });

      try {
        newPosting.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return newPosting;
    },

    // # user related
    register: async (
      _root: any,
      { email, password }: { email: string; password: string },
    ) => {
      if (password.length < 4)
        throw new UserInputError(
          'Password should be at least 4 characters long.',
          {
            invalidArgs: { password },
          },
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
      { email, password }: { email: string; password: string },
    ) => {
      const user: any = await User.findOne({ email });

      const isPasswordCorrent =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!user || !isPasswordCorrent) {
        throw new UserInputError('Wrong username or password.');
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        JWT_SECRET,
        {
          expiresIn: '30d',
        },
      );

      console.log(token, user);

      return { token, user };
    },

    // helpers
  },
};

export default resolvers;
