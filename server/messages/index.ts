import { Parent } from "../types";
import { IContext } from "../context";
import { gql, AuthenticationError } from "apollo-server";
import User from "../models/User";
import Message from "../models/Message";
import Posting from "../models/Posting";

export const messageTypeDefs = gql`
  type Message {
    id: ID!
    fromUser: ID!
    toUser: ID!
    content: String!
    posting: Posting!
  }

  extend type Query {
    currentUserMessages: [Message!]!
  }

  extend type Mutation {
    sendMessage(postingId: ID!, content: String!): Message!
  }
`;

export const messageResolvers = {
  Query: {
    currentUserMessages: (_parent: Parent, _args: any, { user }: IContext) => {
      if (!user) throw new AuthenticationError("Unauthorized");
      // newest on the very top
      return user.messages.sort(
        (messageA, messageB) => messageB.createdAt - messageA.createdAt
      );
    },
  },

  Mutation: {
    sendMessage: async (
      _parent: Parent,
      // { content, toUserId, postingId }: any,
      { content, postingId }: any,
      { user }: any
    ) => {
      if (!user) throw new AuthenticationError("Unauthenticated");

      const posting = await Posting.findById(postingId);
      if (!posting) throw new Error("Posting not found");
      const postingOwner = (await User.findOne({
        ownPostings: posting,
      })) as any;
      if (!postingOwner) throw new Error("User not found");
      const newMessage = new Message({
        content,
        fromUser: user._id,
        toUser: postingOwner._id,
        posting,
      });

      try {
        const savedMessage = await newMessage.save();
        user.messages = user.messages.concat(savedMessage);
        postingOwner.messages = postingOwner.messages.concat(savedMessage);
        await Promise.all([user.save(), postingOwner.save()]);
        return savedMessage;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
