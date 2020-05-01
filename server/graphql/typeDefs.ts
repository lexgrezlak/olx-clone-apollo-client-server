import { gql } from 'apollo-server';

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

export default typeDefs;
