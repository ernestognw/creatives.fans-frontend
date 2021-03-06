import { gql } from "@apollo/client";

const GET_SUPPORTS_RECEIVED = gql`
  query supports(
    $params: QueryParams!
    $search: SupportSearchInput!
    $sortBy: SupportSortInput!
    $creative: QueryOperators
  ) {
    supports(
      params: $params
      search: $search
      sortBy: $sortBy
      creative: $creative
    ) {
      info {
        next
        count
      }
      results {
        id
        description
        amount
        fan {
          id
          username
          firstName
          lastName
          profileImg
        }
      }
    }
  }
`;

export { GET_SUPPORTS_RECEIVED };
