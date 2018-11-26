const graphql = require('graphql');

// queries
const { getUserByUsernameQuery } = require('./queries/user-query');
const { getReceiptsQuery, getReceiptById } = require('./queries/receipt-query');

// mutations
const { 
    registerUserMutation,
    loginUserMutation,
    logoutUserMutation
} = require('./mutations/auth-mutation');
const {
    createReceiptMutation
} = require('./mutations/receipt-mutation');
const {
    GraphQLSchema,
    GraphQLObjectType
} = graphql;



const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getUserByUsername: getUserByUsernameQuery,
        getReceipts: getReceiptsQuery,
        getReceiptById: getReceiptById
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: registerUserMutation,
        login: loginUserMutation,
        logout: logoutUserMutation,
        createReceipt: createReceiptMutation
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});