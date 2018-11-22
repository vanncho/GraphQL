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

export const getSubTotalQuery = gql`
    query{
        subSum{
            total
        }
    }
`;