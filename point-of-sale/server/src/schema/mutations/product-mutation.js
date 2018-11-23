// // Mongoose
// const User = require('../../models/user');
// const Product = require('../../models/product');

// // GraphQL
// const { ProductType } = require('../types');
// const graphql = require('graphql');
// const {
//     GraphQLString,
//     GraphQLNonNull,
//     GraphQLInt,
//     GraphQLFloat
// } = graphql;

// const UnauthorizedError = require('../../errors/unauthorized-error');


// const addProductMutation = {
//     type: ProductType,
//     args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         quantity: { type: new GraphQLNonNull(GraphQLInt) },
//         price: { type:  new GraphQLNonNull(GraphQLFloat) }
//     },
//     async resolve(parent, args, { SECRET, user }) {

//         const product = new Product({
//             name: args.name,
//             quantity: args.quantity,
//             price: args.price,
//         });

//         if (user) {
//             const dbUser = await User.findOne({ username: user.username });

//             if (dbUser) {
//                 return product.save();
//             }
//         }

//         throw new UnauthorizedError();
//     }
// };

// const deleteProductMutation = {
//     type: ProductType,
//     args: {
//         id: { type: new GraphQLNonNull(GraphQLString) }
//     },
//     async resolve(parent, args, { SECRET, user }) {

//         if (user) {
//             const dbUser = await User.findOne({ username: user.username });

//             if (dbUser) {
//                 return Product.findOneAndDelete({_id: args.id});
//             }
//         }

//         throw new UnauthorizedError();
//     }
// }

// module.exports = { 
//     addProductMutation,
//     deleteProductMutation
// };