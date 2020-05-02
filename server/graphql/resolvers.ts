import { v1 as uuid } from 'uuid';

interface Posting {
  id: number;
  title: string;
  description: string;
  price: number;
  phone: number;
  category: string;
}

let postings: Posting[] = [
  {
    id: 1,
    title: 'Suzuki GSX-F Katana',
    description: 'interestring product',
    price: 20,
    phone: 123123324,
    category: 'fashion',
  },
  {
    id: 2,
    title: 'HP Pavillion DV9700',
    description: 'interestring product',
    price: 30,
    phone: 123123324,
    category: 'fashion',
  },
  {
    id: 3,
    title: 'Nike Shoes',
    description: 'interestring product',
    price: 40,
    phone: 123123324,
    category: 'fashion',
  },
];

const resolvers = {
  Query: {
    postingCount: () => postings.length,
    postings: (root: any, args: any) => {
      // no args returns all postings
      if (Object.keys(args).length === 0) return postings;

      // check for filters
      let foundPostings: Posting[] = [...postings];
      if (args.title) {
        foundPostings = foundPostings.filter((posting) =>
          posting.title.toLowerCase().includes(args.title.toLowerCase()),
        );
      }

      return foundPostings;
    },
  },

  Mutation: {
    addPosting: (root: any, args: any) => {
      const newPosting = { ...args, id: uuid() };
      postings = [...postings, newPosting];

      return newPosting;
    },
  },
};

export default resolvers;
