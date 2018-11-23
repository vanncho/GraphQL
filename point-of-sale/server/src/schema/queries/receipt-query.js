// Mongoose
const Receipt = require('../../models/receipt');
const UserReceipt = require('../../models/user-receipt');

// GraphQL
const { ReceiptType } = require('../types');
const graphql = require('graphql');
const {
    GraphQLString,
    GraphQLList
} = graphql;
const UnauthorizedError = require('../../errors/unauthorized-error');

const getReceiptsQuery = {
    type: new GraphQLList(ReceiptType),
    args: { },
    async resolve(parent, args, { SECRET, user }) {

        if (user) {

            return Receipt.find({ user: user.id });
        }

        throw new UnauthorizedError();
    }
};

module.exports = { getReceiptsQuery };