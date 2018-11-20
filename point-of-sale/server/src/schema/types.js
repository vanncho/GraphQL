const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;



const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        salt: { type: GraphQLString }
    })
});

module.exports = { UserType };