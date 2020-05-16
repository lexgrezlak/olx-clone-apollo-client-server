import { Parent } from "../types";
import { IContext } from "../context";
import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    ownPostings: [Posting!]!
    followedPostings: [Posting!]!
    messages: [Message!]!
  }

  extend type Query {
    currentUser: User
    isLoggedIn: Boolean!
    currentUserFollowedPostings: [Posting!]!
  }
`;

export const userResolvers = {
  Query: {
    currentUser: (_parent: Parent, _args: any, { user }: IContext) => user,
    isLoggedIn: (_parent: Parent, _args: any, { user }: IContext) =>
      user ? true : false,
    currentUserFollowedPostings: (
      _parent: Parent,
      _args: any,
      { user }: IContext
    ) => {
      if (!user) return [];
      // first are the most lately updated
      const sortedPostings = user.followedPostings.sort(
        (a, b) => b.updatedAt - a.updatedAt
      );
      return sortedPostings;
    },
  },
};
