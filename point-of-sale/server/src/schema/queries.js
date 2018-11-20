const User = require('../models/user');
const { UserType } = require('./types');
const graphql = require('graphql');
const {
    GraphQLString
} = graphql;
const UnauthorizedError = require('../errors/unauthorized-error');



const getUserByUsernameQuery = {
    type: UserType,
    args: { username: { type: GraphQLString} },
    resolve(parent, args, { SECRET, user }) {

        if (user) {
            return User.findOne({ username: args.username });
        }

        throw new UnauthorizedError();
    }
};

module.exports = { getUserByUsernameQuery };