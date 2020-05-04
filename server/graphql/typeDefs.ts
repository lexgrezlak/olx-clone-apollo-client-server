import { gql } from 'apollo-server';

const typeDefs = gql`
  type Posting {
    id: ID!
    title: String!
    category: String!
    description: String!
    imageUrls: [String!]!
    postingType: String!
    price: Int!
    isNegotiable: Boolean!
    isBusiness: Boolean!
    isUsed: Boolean!
    city: String!
    phone: Int
    user: User!
  }

  type UploadedFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    id: ID!
    email: String!
    name: String
    phone: Int
    postings: [Posting!]!
  }

  type LoginResponse {
    token: String
    user: User
  }

  type Query {
    currentUser: User!
    postingCount: Int!
    postings(title: String, price: Int): [Posting!]!
    uploads: [File]
  }

  type Mutation {
    # postings related
    addPosting(
      title: String!
      category: String!
      description: String!
      imageUrls: [String!]!
      postingType: String!
      price: Int!
      isNegotiable: Boolean!
      isBusiness: Boolean!
      isUsed: Boolean!
      city: String!
      phone: Int
    ): Posting

    # user related
    register(email: String!, password: String!): User
    login(email: String!, password: String!): LoginResponse!

    singleUpload(file: Upload!): UploadedFileResponse!
    multipleUpload(files: [Upload!]!): [UploadedFileResponse!]!
  }
`;

export default typeDefs;
