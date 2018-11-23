import * as React from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import Product from '../products/Product';
import ProductType from '../products/ProductType';
import toastr from 'toastr';

import { createReceiptMutation } from '../../mutations/receipt';

interface CreateReceiptProps {
    history: any,
    createReceipt: Function
    client: any
}

interface CreateReceiptState {
    name: string,
    quantity: number,
    price: number,
    allProductsQuantity: number,
    total: number,
    products: Array<ProductType>
}

class CreateReceipt extends React.Component<CreateReceiptProps, CreateReceiptState> {

    constructor(props: CreateReceiptProps) {
        super(props);

        this.state = {
            name: '',
            quantity: 0,
            price: 0,
            allProductsQuantity: 0,
            total: 0,
            products: []
        }
    }

    deleteProduct(id: number): void {

        const productsArr = this.state.products;
        productsArr.splice(id, 1);

        this.setState({ products: productsArr });

        toastr.info('Entry removed.');
    }

    displayProducts(): React.ReactNode {

        return this.state.products.map((product, id) => {
            return <div className="row" key={id}>
                        <Product
                            productName={product.name}
                            quantity={product.quantity}
                            price={product.price}
                        />
                        <div className="col right">
                            <a href="#" onClick={ () => this.deleteProduct(id) }>✖</a>
                        </div>
                    </div>
        });
    }

    inputHandler(e: React.FormEvent<HTMLInputElement>): void {

        let target: HTMLInputElement = e.target as HTMLInputElement;

        switch (target.name) {
            case 'name': this.setState({ name: target.value }); break;
            case 'quantity': this.setState({ quantity: Number(target.value) }); break;
            case 'price': this.setState({ price: Number(target.value) }); break;
            default: break;
        }
    }

    submithProduct(e: React.FormEvent<HTMLInputElement>): void {
        
        e.preventDefault();
        let correct: boolean = true;

        if (this.state.name.length === 0) {
            toastr.error('Name must not be an empty string!');
            correct = false;
        }

        if (isNaN(this.state.quantity) || this.state.quantity === 0) {
            toastr.error('Quantity field is empty or not a number!');
            correct = false;
        }

        if (isNaN(this.state.price) || this.state.price === 0) {
            toastr.error('Price field is empty or not a number!');
            correct = false;
        }

        if (correct) {

            const currentProduct: ProductType = { 
                name: this.state.name, 
                quantity: this.state.quantity,
                price: this.state.price
            }

            const productsArr = this.state.products;
            productsArr.push(currentProduct);

            this.setState({ products: productsArr });
            this.setState({ total: this.state.total + (this.state.price * this.state.quantity) });
            this.setState({ allProductsQuantity: this.state.allProductsQuantity + this.state.quantity });

            toastr.success('Entry added.');
        }
    }

    createReceipt(e: React.FormEvent<HTMLInputElement>): void {

        e.preventDefault();

        const productCount = this.state.allProductsQuantity;
        const total = this.state.total;

        this.props.createReceipt({
            variables: {
                products: this.state.products,
                productCount, 
                total
            }
        }).then((res: any) => {
            
            if (res.data.createReceipt === null && !res.data.loading) {
                toastr.error(res.errors[0].message);
            } else {
                this.props.history.push('/');
                toastr.success('Receipt created.');
            }
        }).catch((err: any) => {
            console.log(err)
        });
    }

    render(): React.ReactNode {

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
                                    type="text"
                                    name="name"
                                    placeholder="Product name"
                                    onChange={ this.inputHandler.bind(this) }
                                />
                            </div>
                            <div className="col wide">
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantity"
                                    onChange={ this.inputHandler.bind(this) }
                                />
                            </div>
                            <div className="col wide">
                                <input
                                    type="number"
                                    step="0.01"
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
                            <div className="col">{ this.state.total.toFixed(2) }</div>
                            <div className="col">
                                <input
                                    id="checkoutBtn"
                                    type="submit"
                                    value="Checkout" onClick={ this.createReceipt.bind(this) }
                                />
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
    graphql<CreateReceiptProps, CreateReceiptState>(createReceiptMutation, { name: 'createReceipt' }),
    withApollo
)(CreateReceipt);