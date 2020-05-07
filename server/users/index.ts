import { Parent } from "../types";
import { IContext } from "../context";
import { gql, AuthenticationError } from "apollo-server";
import { IUserIdArgs } from "./types";

export const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  extend type Query {
    currentUser: User!
  }
`;

export const userResolvers = {
  Query: {
    currentUser: async (
      _parent: Parent,
      _args: IUserIdArgs,
      { user }: IContext
    ) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      // //@ts-ignore
      // const userInDb = await User.findById(user.id);
      // return userInDb;
      return user;
    },
  },
};
