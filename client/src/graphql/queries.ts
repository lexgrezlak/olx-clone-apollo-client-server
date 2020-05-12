import { gql } from "@apollo/client";

export const GET_IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn
  }
`;

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

export const GET_POSTINGS_BY_TITLE = gql`
  query PostingsByTitle($title: String!) {
    postingsByTitle(title: $title) {
      edges {
        title
        id
        imageUrls
        price
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

export const GET_CURRENT_USER_AND_OWN_POSTINGS = gql`
  query CurrentUser {
    currentUser {
      name
      email
      ownPostings {
        id
        title
        price
        updatedAt
        imageUrls
      }
    }
  }
`;

export const FOLLOW_POSTING = gql`
  mutation FollowPosting($id: ID!) {
    followPosting(id: $id) {
      id
    }
  }
`;

export const UNFOLLOW_POSTING = gql`
  mutation UnfollowPosting($id: ID!) {
    unfollowPosting(id: $id) {
      id
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
    $phone: String!
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
    }
  }
`;

export const GET_CURRENT_USER_ID = gql`
  query CurrentUser {
    currentUser {
      id
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($content: String!, $postingId: ID!) {
    sendMessage(content: $content, postingId: $postingId) {
      id
      content
      fromUser
      toUser
      posting {
        id
        title
        imageUrls
      }
    }
  }
`;

export const GET_CURRENT_USER_MESSAGES = gql`
  query CurrentUserMessages {
    currentUserMessages {
      id
      content
      fromUser
      posting {
        id
        title
        imageUrls
      }
    }
  }
`;

export const GET_POSTING_BY_ID = gql`
  query PostingById($id: ID!) {
    postingById(id: $id) {
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

export const EDIT_POSTING = gql`
  mutation EditPosting(
    $id: ID!
    $title: String!
    $category: String!
    $description: String!
    $imageUrls: [String!]!
    $price: Int!
    $condition: String!
    $city: String!
    $phone: String!
  ) {
    editPosting(
      id: $id
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
