import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
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
  mutation addPosting(
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
