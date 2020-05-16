import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import mongoose from "mongoose";
import context from "./context";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

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
  playground: true,
  introspection: true,
});

server.applyMiddleware({ app, path: "/graphql" });
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`Server ready!`);
});
