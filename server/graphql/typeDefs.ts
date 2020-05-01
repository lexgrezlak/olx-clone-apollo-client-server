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
    postings(title: String, price: Int): [Posting!]!
  }
`;

export default typeDefs;
