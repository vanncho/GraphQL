const graphql = require('graphql');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList
 } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {

                // parent.authorId
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {

                // parent.id
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args) {
                // code to get data from db / other source
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args) {
                // code to get data from db / other source
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // code to get data from db / other source
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // code to get data from db / other source
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});