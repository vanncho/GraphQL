const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean
} = graphql;



const ReceiptType = new GraphQLObjectType({
    name: 'Receipt',
    fields: () => ({
        id: { type: GraphQLString },
        products: { type: GraphQLString },
        active: { type: GraphQLBoolean },
        productCount: { type: GraphQLInt },
        total: { type: GraphQLFloat },
        creationDate: { type: GraphQLString },
        user: { type: GraphQLString },
    })
});

const ProductInput = new GraphQLInputObjectType({
    name: 'Product',
    fields: () => ({
        name: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLFloat }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        salt: { type: GraphQLString }
    })
});

module.exports = { UserType, ProductInput, ReceiptType };