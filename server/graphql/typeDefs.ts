import { gql } from 'apollo-server';

const typeDefs = gql`
  type Posting {
    id: ID!
    title: String!
    description: String!
    price: Int!
    phone: Int!
    category: String!
  }

  type Query {
    postingCount: Int!
    postings(title: String, price: Int): [Posting!]!
  }

  type Mutation {
    addPosting(
      title: String!
      description: String!
      price: Int!
      phone: Int!
      category: String!
    ): Posting
  }
`;

export default typeDefs;
