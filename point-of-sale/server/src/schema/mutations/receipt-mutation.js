// Mongoose
const Receipt = require('../../models/receipt');
const User = require('../../models/user');

// GraphQL
const { ReceiptType, ProductInput } = require('../types');
const graphql = require('graphql');
const {
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLList
} = graphql;

const UnauthorizedError = require('../../errors/unauthorized-error');



const createReceiptMutation = {
    type: ReceiptType,
    args: {
        products: { type: new GraphQLNonNull(new GraphQLList(ProductInput)) },
        productCount: { type: new GraphQLNonNull(GraphQLInt) },
        total: { type: new GraphQLNonNull(GraphQLFloat) }
    },
    async resolve(parent, args, { SECRET, user }) {

        if (user) {
            const dbUser = await User.findOne({ username: user.username });
            
            if (dbUser) {
    
                const receipt = new Receipt({
                    products: JSON.stringify(args.products),
                    productCount: args.productCount,
                    total: args.total,
                    user: dbUser._id
                });

                return receipt.save();
            }
        }

        throw new UnauthorizedError();
    }
};

module.exports = { createReceiptMutation };