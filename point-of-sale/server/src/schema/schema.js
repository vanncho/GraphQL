const graphql = require('graphql');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const encryption = require('../utils/encryption');


const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean
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

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getUserByUsername12: {
            type: UserType,
            args: { username: { type: GraphQLString} },
            resolve(parent, args, { SECRET, user }) {

                if (user) {
                    return User.findOne({ username: args.username });
                }

                throw new Error('Unauthorized request!');
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
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {

                const salt = encryption.generateSalt();

                let user = new User({
                    username: args.username,
                    password: encryption.generateHashedPassword(salt, args.password),
                    salt: salt
                });

                return user.save();
            }
        },
        login: {
            type: GraphQLString,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args, { SECRET }) {

                const user = await User.findOne({ username: args.username });
                
                if (!user) {
                    throw new Error('No user with that email!');
                }

                const verifyPass = encryption.generateHashedPassword(user.salt, args.password);
                const valid = verifyPass === user.password;

                if (!valid) {
                    throw new Error('Incorrect password!');
                }
                
                const token = jwt.sign(
                    {
                        user: {
                            id: user.id,
                            username: args.username
                        }
                    },
                    SECRET,
                    {
                        expiresIn: 60
                    }
                );

                return token;
            }
        },
        logout: {
            type: GraphQLBoolean,
            resolve(parent, args, { SECRET }, req) {
                console.log(req);
            }
        },
        getUserByUsername: {
            type: UserType,
            args: { username: { type: GraphQLString} },
            resolve(parent, args, { SECRET, user }) {
        
                if (user) {
                    return User.findOne({ username: args.username });
                }

                throw new Error('Unauthorized request!');
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});