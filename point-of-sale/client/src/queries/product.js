import { gql } from 'apollo-boost';

export const getProductsQuery = gql`
    query{
        getProducts{
            id
            name
            quantity
            price
        }
    }
`;