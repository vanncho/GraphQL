import { gql } from 'apollo-boost';

export const getUsers = gql`
    query($username: String){
        getUserByUsername(username: $username){
            id
            username
        }
    }
`;
