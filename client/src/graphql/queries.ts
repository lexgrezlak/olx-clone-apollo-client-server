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

export const GET_CURRENT_USER_FOLLOWED_POSTINGS_IDS = gql`
  query CurrentUserFollowedPostings {
    currentUserFollowedPostings {
      id
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
      name
      ownPostings {
        id
        title
        imageUrls
        price
        updatedAt
      }
      followedPostings {
        id
        title
        imageUrls
        price
        updatedAt
      }
    }
  }
`;

export const GET_CURRENT_USER_FOLLOWED_POSTINGS = gql`
  query CurrentUserFollowedPostings {
    currentUserFollowedPostings {
      id
      title
      imageUrls
      price
      updatedAt
    }
  }
`;

export const GET_ALL_POSTINGS = gql`
  query AllPostings {
    allPostings {
      id
      title
      imageUrls
      price
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

export const FOLLOW_POSTING = gql`
  mutation FollowPosting($id: ID!) {
    followPosting(id: $id) {
      title
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

export const GET_POSTING_BY_ID = gql`
  query PostingById($id: ID!) {
    postingById(id: $id) {
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

export const DELETE_POSTING = gql`
  mutation DeletePosting($id: ID!) {
    deletePosting(id: $id) {
      title
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
