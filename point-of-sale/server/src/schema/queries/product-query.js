// Mongoose
const Product = require('../../models/product');

// GraphQL
const { ProductType } = require('../types');
const graphql = require('graphql');
const {
    GraphQLList
} = graphql;
const UnauthorizedError = require('../../errors/unauthorized-error');



const getProductsQuery = {
    type: new GraphQLList(ProductType),
    args: { },
    resolve(parent, args, { SECRET, user }) {

        if (user) {

            return Product.find({});
        }

        throw new UnauthorizedError();
    }
};

module.exports = { getProductsQuery };