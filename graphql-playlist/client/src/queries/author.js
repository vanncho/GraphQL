import { gql } from 'apollo-boost';

export const getAuthors = gql`
    {
        authors{
            name
            id
        }
    }
`;