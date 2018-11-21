// Mongoose
const User = require('../models/user');
const Token = require('../models/token');

// GraphQL
const { UserType } = require('./types');
const graphql = require('graphql');
const {
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
} = graphql;

const jwt = require('jsonwebtoken');
const encryption = require('../utils/encryption');



const registerUserMutation = {
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
};

const loginUserMutation = {
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
                expiresIn: '1d'
            }
        );

        return token;
    }
};

const logoutUserMutation = {
    type: GraphQLBoolean,
    args: {
        token: { type: GraphQLString }
    },
    async resolve(parent, args) {

        const { token } = args;
        console.log(token);
        const tokenModel = new Token({ token, valid: false });

        try {

            const saveToken = await tokenModel.save();
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = { registerUserMutation, loginUserMutation, logoutUserMutation };