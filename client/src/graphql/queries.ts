import { gql } from "@apollo/client";

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
      category
      description
      imageUrls
      price
      condition
      city
      phone
    }
  }
`;

export const ADD_POSTING = gql`
  mutation AddPosting(
    $title: String!
    $category: String!
    $description: String!
    $imageUrls: [String!]!
    $price: Int!
    $condition: String!
    $city: String!
    $phone: Int!
  ) {
    addPosting(
      title: $title
      category: $category
      description: $description
      imageUrls: $imageUrls
      price: $price
      condition: $condition
      city: $city
      phone: $phone
    ) {
      id
      title
      category
      description
      imageUrls
      price
      condition
      city
      phone
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
