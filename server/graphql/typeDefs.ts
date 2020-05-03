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

  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
    postings: [Posting!]!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
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
    register(username: String!, password: String!, name: String!): User
    login(username: String!, password: String!): Token
  }
`;

export default typeDefs;
