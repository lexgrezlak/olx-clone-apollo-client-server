import { Parent } from "../types";
import { IContext } from "../context";
import { gql } from "apollo-server";
import { IUserIdArgs } from "./types";

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
    currentUser: (_parent: Parent, _args: IUserIdArgs, { user }: IContext) =>
      user,
  },
};
