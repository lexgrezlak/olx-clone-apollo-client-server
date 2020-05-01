import { gql } from '@apollo/client';

export const ALL_POSTINGS = gql`
  query {
    allPostings {
      title
    }
  }
`;
