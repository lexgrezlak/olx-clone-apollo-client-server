import { MONGODB_URI, JWT_SECRET } from "./utils/config";
import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import mongoose from "mongoose";
import * as jwt from "jsonwebtoken";

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDB"))
  .catch((error: any) =>
    console.log("connecting to MongoDB failed:", error.message),
  );

const getUser = (token: string) => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET);
    }

    return null;
  } catch (error) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const tokenWithBearer = req.headers.authorization || "";
    const token = tokenWithBearer.split(" ")[1] || "";
    const user = getUser(token);

    return { user };
  },
});

server.listen().then(({ url }: any) => {
  console.log(`Server ready at ${url}`);
});
