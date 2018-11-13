import { gql } from 'apollo-boost';

export const getBooks = gql`
    {
        books{
            name
            id
        }
    }
`;

export const getBook = gql`
    query($id: String){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    id
                    name
                }
            }
        }
    }
`;

export const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: String!) {
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;