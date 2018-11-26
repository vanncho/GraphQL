import { gql } from 'apollo-boost';

export const getReceipts = gql`
    query{
        getReceipts{
            id
            active
            creationDate
            productCount
            total
        }
    }
`;

export const getReceiptByID = gql`
    query($id: String!){
        getReceiptById(id: $id) {
            id
            products
            active
            productCount
            total
            creationDate
            user
        }
    }
`;
