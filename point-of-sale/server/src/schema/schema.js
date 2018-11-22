const graphql = require('graphql');

// queries
const { getUserByUsernameQuery } = require('./queries/user-query');
const { getProductsQuery } = require('./queries/product-query');

// mutations
const { 
    registerUserMutation,
    loginUserMutation,
    logoutUserMutation
} = require('./mutations/auth-mutation');
const { 
    addProductMutation,
    deleteProductMutation
} = require('./mutations/product-mutation');
const {
    GraphQLSchema,
    GraphQLObjectType
} = graphql;



const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getUserByUsername: getUserByUsernameQuery,
        getProducts: getProductsQuery
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: registerUserMutation,
        login: loginUserMutation,
        logout: logoutUserMutation,
        addProduct: addProductMutation,
        deleteProduct: deleteProductMutation
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});