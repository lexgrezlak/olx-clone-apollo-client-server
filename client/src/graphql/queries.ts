import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
    }
  }
`;

export const GET_ALL_POSTINGS = gql`
  query AllPostings {
    allPostings {
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

export const GET_CURRENT_USER_POSTINGS = gql`
  query CurrentUserPostings {
    currentUserPostings {
      id
      title
      imageUrls
      price
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
