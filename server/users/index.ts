import { Parent } from "../types";
import { IContext } from "../context";
import { gql } from "apollo-server";

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    postings: [Posting!]!
  }

  extend type Query {
    currentUser: User
  }
`;

export const userResolvers = {
  Query: {
    currentUser: (_parent: Parent, _args: any, { user }: IContext) => user,
  },
};
