import { gql } from 'apollo-boost';

export const addProductMutation = gql`
    mutation($name: String!, $quantity: Int!, $price: Float!) {
        addProduct(name: $name, quantity: $quantity, price: $price){
            name
        }
     }
`;