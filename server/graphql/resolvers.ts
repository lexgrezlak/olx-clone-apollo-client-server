interface Posting {
  id: number;
  title: string;
  views: number;
  price: number;
  location: string;
  user_id: number;
  date: Date;
}

let postings: Posting[] = [
  {
    id: 1,
    title: 'Suzuki GSX-F Katana',
    views: 254,
    user_id: 123,
    price: 20,
    location: 'Warsaw',
    date: new Date(),
  },
  {
    id: 2,
    title: 'HP Pavillion DV9700',
    views: 65,
    user_id: 456,
    price: 30,
    location: 'Szczecin',
    date: new Date(),
  },
  {
    id: 3,
    title: 'Buty Nike',
    views: 323,
    user_id: 456,
    price: 40,
    location: 'Krakow',
    date: new Date(),
  },
];

const resolvers = {
  Query: {
    postingCount: () => postings.length,
    postings: (root: Posting, args: any) => {
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
};

export default resolvers;
