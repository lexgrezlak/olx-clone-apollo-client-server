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
    allPostings: () => postings,
    findPostings: (root: Posting, args: any) => {
      postings.find((posting) => posting.title === args.title);
    },
  },
};

export default resolvers;
