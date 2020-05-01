const { ApolloServer, gql } = require('apollo-server');

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

const typeDefs = gql`
  type Posting {
    id: Int!
    title: String!
    views: Int!
    user_id: Int!
    price: Int!
    location: String!
    date: String!
  }

  type Query {
    postingCount: Int!
    allPostings: [Posting!]!
    findPostings(title: String!): Posting
  }
`;

const resolvers = {
  Query: {
    postingCount: () => postings.length,
    allPostings: () => postings,
    findPostings: (root: Posting, args: any) => {
      postings.find((posting) => posting.title === args.title);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: any) => {
  console.log(`Server ready at ${url}`);
});
