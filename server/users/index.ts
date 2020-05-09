import { Parent } from "../types";
import { IContext } from "../context";
import { gql } from "apollo-server";

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    ownPostings: [Posting!]!
    followedPostings: [Posting!]!
  }

  extend type Query {
    currentUser: User
    currentUserFollowedPostings: [Posting!]!
  }
`;

export const userResolvers = {
  Query: {
    currentUser: (_parent: Parent, _args: any, { user }: IContext) => user,
    currentUserFollowedPostings: (
      _parent: Parent,
      _args: any,
      { user }: IContext
    ) => {
      if (!user) return [];
      return user.followedPostings;
    },
  },
};
