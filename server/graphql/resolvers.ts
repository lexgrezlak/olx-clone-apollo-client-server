import Posting from '../models/Posting';
import { UserInputError } from 'apollo-server';

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
  },
};

export default resolvers;
