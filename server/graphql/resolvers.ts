import { JWT_SECRET } from './../utils/config';
import User from '../models/User';
import Posting from '../models/Posting';
import { UserInputError } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface Posting {
  id: number;
  title: string;
  description: string;
  price: number;
  phone: number;
  category: string;
}

const resolvers = {
  Query: {
    postingCount: () => Posting.collection.countDocuments(),
    postings: async (_root: any, args: any) => {
      // no args returns all postings
      let allPostings: any = await Posting.find({});
      if (Object.keys(args).length === 0) return allPostings;

      // check for filters

      if (args.title) {
        allPostings = allPostings.filter((posting: Posting) =>
          posting.title.toLowerCase().includes(args.title.toLowerCase()),
        );
      }

      return allPostings;
    },
  },

  Mutation: {
    addPosting: async (_root: any, args: any) => {
      const newPosting = new Posting({ ...args });

      try {
        newPosting.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return newPosting;
    },
    register: async (_root: any, args: any) => {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(args.password, saltRounds);

      const user = new User({
        username: args.username,
        passwordHash,
        name: args.name,
      });

      try {
        return user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (_root: any, args: any) => {
      const user: any = await User.findOne({ username: args.username });

      const isPasswordCorrent =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.passwordHash);

      if (!user || !isPasswordCorrent) {
        throw new UserInputError('Wrong username or password.');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

export default resolvers;
