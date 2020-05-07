import { userResolvers } from "./users";
import { postingResolvers } from "./postings";
import { authResolvers } from "./auth";

export default {
  Query: Object.assign({}, userResolvers.Query, postingResolvers.Query),
  Mutation: Object.assign(
    {},
    authResolvers.Mutation,
    postingResolvers.Mutation
  ),
};
