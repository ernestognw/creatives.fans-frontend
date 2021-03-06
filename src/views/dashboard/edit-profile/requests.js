import { gql } from "@apollo/client";

const UPDATE_USER = gql`
  mutation updateUserByToken($user: UserUpdateInput!) {
    updateUserByToken(user: $user) {
      id
      username
      firstName
      lastName
      description
      profileImg
    }
  }
`;

export { UPDATE_USER };
