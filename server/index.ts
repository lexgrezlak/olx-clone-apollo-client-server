import { MONGODB_URI } from "./utils/config";
import { ApolloServer } from "apollo-server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import mongoose from "mongoose";
import context from "./context";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to MongoDB"))
  .catch((error: any) =>
    console.log("connecting to MongoDB failed:", error.message)
  );

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }: any) => {
  console.log(`Server ready at ${url}`);
});
