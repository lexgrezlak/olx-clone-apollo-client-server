import { gql } from "apollo-server";
import { userTypeDefs } from "./users";
import { authTypeDefs } from "./auth";
import { postingTypeDefs } from "./postings";
import { messageTypeDefs } from "./messages";

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export default [
  baseTypeDefs,
  userTypeDefs,
  authTypeDefs,
  postingTypeDefs,
  messageTypeDefs,
];
