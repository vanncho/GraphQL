import * as React from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import Product from '../products/Product';
import ProductType from '../products/ProductType';

import { getProductsQuery } from '../../queries/auth.js';
import { addProductMutation } from '../../mutations/product';

interface CreateReceiptProps {
    products: any,
    addProduct: Function
}

interface CreateReceiptState {
    name: string,
    quantity: number,
    price: number
}

class CreateReceipt extends React.Component<CreateReceiptProps, CreateReceiptState> {

    constructor(props: CreateReceiptProps) {
        super(props);

        this.state = {
            name: '',
            quantity: 0,
            price: 0
        }
    }

    displayProducts() {

        let products: Array<ProductType> = [];

        if (this.props.products.loading) {
            return <div className="col wide">Product loading...</div>;
        } else {
            
            products = this.props.products.getProducts;

            return products.map(product => {
                return <div className="row" key={product.id}>
                            <Product
                                productName={product.name}
                                quantity={product.quantity}
                                price={product.price}
                            />
                            <div className="col right">
                                <a href="#">✖</a>
                            </div>
                        </div>
            });
        }
    }

    inputHandler(e: React.FormEvent<HTMLInputElement>): void {
        let target = e.target as HTMLInputElement;

        switch (target.name) {
            case 'name': this.setState({ name: target.value });
            case 'quantity': this.setState({ quantity: Number(target.value) });
            case 'price': this.setState({ price: Number(target.value) });
            default: break;
        }
    }

    submithProduct(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();

        // INPUT VERIFICATIONS 

        this.props.addProduct({
            variables: {
                name: this.state.name,
                quantity: this.state.quantity,
                price: this.state.price
            },
            // refetchQueries: [{ query: getProductsQuery }]   // Throws exception !
        }).then((res: any) => {
                console.log(res)
        }).catch((err: any) => {
            console.log(err);
        });;
    }

    render() {

        return(
            <section id="create-receipt-view">
                <h1>Create Receipt</h1>
                <div className="table">
                    <div className="table-head">
                        <div className="col wide">Product Name</div>
                        <div className="col wide">Quantity</div>
                        <div className="col wide">Price per Unit</div>
                        <div className="col">Sub-total</div>
                        <div className="col">Action</div>
                    </div>
                    <div id="active-entries">
                        { this.displayProducts() }
                    </div>
                    <div className="row">
                        <form id="create-entry-form" onSubmit={ this.submithProduct.bind(this) } >
                            <div className="col wide">
                                <input
                                    name="name"
                                    placeholder="Product name"
                                    onChange={ this.inputHandler.bind(this) }
                                />
                            </div>
                            <div className="col wide">
                                <input
                                    name="quantity"
                                    placeholder="Quantity"
                                    onChange={ this.inputHandler.bind(this) }
                                />
                            </div>
                            <div className="col wide">
                                <input
                                    name="price"
                                    placeholder="Price per Unit"
                                    onChange={ this.inputHandler.bind(this) }
                                />
                            </div>
                            <div className="col">Sub-total</div>
                            <div className="col">
                                <input id="addItemBtn" type="submit" value="Add" />
                            </div>
                        </form>
                    </div>
                    <div className="table-foot">
                        <form id="create-receipt-form">
                            <div className="col wide">
                            </div>
                            <div className="col wide">
                            </div>
                            <div className="col wide right">Total:</div>
                            <div className="col">76.50</div>
                            <div className="col">
                                <input id="checkoutBtn" type="submit" value="Checkout" />
                            </div>
                            <input type="hidden" name="receiptId" />
                            <input type="hidden" name="productCount" />
                            <input type="hidden" name="total" />
                        </form>
                    </div>
                </div>
            </section>
        );
    };
}

export default compose(
    graphql<CreateReceiptProps, CreateReceiptState>(getProductsQuery, { name: 'products' }),
    graphql<CreateReceiptProps, CreateReceiptState>(addProductMutation, { name: 'addProduct' }),
)(CreateReceipt);