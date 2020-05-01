import { gql } from '@apollo/client';

export const GET_POSTINGS = gql`
  query Postings($title: String, $price: Int) {
    postings(title: $title, price: $price) {
      id
      title
      location
      date
      price
    }
  }
`;
