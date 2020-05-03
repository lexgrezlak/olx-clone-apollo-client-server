import { MONGODB_URI } from './utils/config';
import { ApolloServer, gql } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to MongoDB'))
  .catch((error: any) =>
    console.log('connecting to MongoDB failed:', error.message),
  );

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: any) => {
  console.log(`Server ready at ${url}`);
});
