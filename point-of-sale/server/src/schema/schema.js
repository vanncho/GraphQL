const graphql = require('graphql');
const { getUserByUsernameQuery } = require('./queries');
const { 
    registerUserMutation,
    loginUserMutation,
    logoutUserMutation
} = require('../schema/mutations');
const {
    GraphQLSchema,
    GraphQLObjectType
} = graphql;



const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getUserByUsername: getUserByUsernameQuery
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: registerUserMutation,
        login: loginUserMutation,
        logout: logoutUserMutation
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});