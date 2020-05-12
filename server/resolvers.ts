import { userResolvers } from "./users";
import { postingResolvers } from "./postings";
import { authResolvers } from "./auth";
import { messageResolvers } from "./messages";

export default {
  Query: Object.assign(
    {},
    userResolvers.Query,
    postingResolvers.Query,
    messageResolvers.Query
  ),
  Mutation: Object.assign(
    {},
    authResolvers.Mutation,
    postingResolvers.Mutation,
    messageResolvers.Mutation
  ),
};
