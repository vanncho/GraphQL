import { gql } from 'apollo-boost';

export const registerUserMutation = gql`
    mutation($username: String!, $password: String!) {
        registerUser(username: $username, password: $password) {
            username
        }
     }
`;

export const loginMutation = gql`
    mutation($username: String!, $password: String!) {
        login(username: $username, password: $password)
     }
`;

export const getUsers = gql`
    query($username: String){
        getUserByUsername(username: $username) {
            id
            username
        }
    }
`;