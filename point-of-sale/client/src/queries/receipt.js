import { gql } from 'apollo-boost';

export const getReceipts = gql`
    query{
        getReceipts{
            id
            active
            creationDate
            products
            productCount
            total
        }
    }
`;
