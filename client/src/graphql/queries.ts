import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const GET_POSTINGS = gql`
  query Postings($title: String, $price: Int) {
    postings(title: $title, price: $price) {
      id
      title
      description
      price
      phone
      category
    }
  }
`;

export const ADD_POSTING = gql`
  mutation AddPosting(
    $title: String!
    $description: String!
    $price: Int!
    $phone: Int!
    $category: String!
  ) {
    addPosting(
      title: $title
      description: $description
      price: $price
      phone: $phone
      category: $category
    ) {
      id
      title
      description
      price
      phone
      category
    }
  }
`;

export const MULTIPLE_UPLOAD = gql`
  mutation MultipleUpload($files: [Upload!]!) {
    multipleUpload(files: $files) {
      filename
      mimetype
      encoding
      url
    }
  }
`;
