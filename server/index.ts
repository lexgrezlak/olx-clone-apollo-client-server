import { MONGODB_URI, JWT_SECRET } from './utils/config';
import { ApolloServer, gql } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import mongoose from 'mongoose';
import User from './models/User';
import * as jwt from 'jsonwebtoken';

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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken: any = jwt.verify(auth.substring(7), JWT_SECRET);
      console.log(decodedToken);
      const currentUser = await User.findById(decodedToken.id).populate(
        'postings',
      );
      return { currentUser };
    }

    return null;
  },
});

server.listen().then(({ url }: any) => {
  console.log(`Server ready at ${url}`);
});
