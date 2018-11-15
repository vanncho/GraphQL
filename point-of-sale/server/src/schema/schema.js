const graphql = require('graphql');
const User = require('../models/user');
const encryption = require('../utils/encryption');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        salt: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getUserByName: {
            type: UserType,
            args: { name: { type: GraphQLString} },
            resolve(parent, args) {

                return User.findOne({ name: args.name });
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {

                const salt = encryption.generateSalt();

                let user = new User({
                    name: args.name,
                    password: encryption.generateHashedPassword(salt, args.password),
                    salt: salt
                });

                return user.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});