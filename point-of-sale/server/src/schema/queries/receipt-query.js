// Mongoose
const Receipt = require('../../models/receipt');

// GraphQL
const { ReceiptType } = require('../types');
const graphql = require('graphql');
const {
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
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

const getReceiptById = {
    type: ReceiptType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args, { SECRET, user }) {

        if (user) {
            return await Receipt.findOne({_id: args.id});
        }

        throw new UnauthorizedError();
    }
}

module.exports = { getReceiptsQuery, getReceiptById };