import { gql } from 'apollo-boost';

export const registerUserMutation = gql`
    mutation($name: String!, $password: String!) {
        registerUser(name: $name, password: $password) {
            name
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