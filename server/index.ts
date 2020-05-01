const { ApolloServer, gql } = require('apollo-server');

interface Posting {
  id: number;
  title: String;
  views: number;
  user_id: number;
}

let postings: Posting[] = [
  { id: 1, title: 'Suzuki GSX-F Katana', views: 254, user_id: 123 },
  { id: 2, title: 'HP Pavillion DV9700', views: 65, user_id: 456 },
  { id: 3, title: 'Buty Nike', views: 323, user_id: 456 },
];

const typeDefs = gql`
  type Posting {
    id: Int!
    title: String!
    views: Int!
    user_id: Int!
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
