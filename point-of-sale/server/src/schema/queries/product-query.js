// Mongoose
const Product = require('../../models/product');

// GraphQL
const { ProductType, SubTotalType } = require('../types');
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

const getSubSumQuery = {
    type: SubTotalType,
    args: { },
    async resolve(parent, args, { SECRET, user }) {

        if (user) {

            let promise = await new Promise(function(resolve, reject) {
                resolve(
                    Product.aggregate([{
                        $group: {
                        _id: {},
                        total: { $sum: { $multiply: [ "$price", "$quantity" ] } },
                        }
                    }]).exec()
                )
            });

            return promise[0];
        }

        throw new UnauthorizedError();
    }
};

module.exports = { getProductsQuery, getSubSumQuery };
