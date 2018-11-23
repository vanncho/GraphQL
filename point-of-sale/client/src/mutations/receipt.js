import { gql } from 'apollo-boost';

export const createReceiptMutation = gql`
    mutation($products: [Product!]!, $productCount: Int!, $total: Float!) {
        createReceipt(products: $products, productCount: $productCount, total:$total){
            id
        }
    }
`;