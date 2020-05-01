import { gql } from '@apollo/client';

export const ALL_POSTINGS = gql`
  query {
    allPostings {
      id
      title
      location
      date
      price
    }
  }
`;
