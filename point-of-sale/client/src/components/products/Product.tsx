import * as React from 'react';
import ProductType from './ProductType';

interface ProductProps {
    productName: string,
    quantity: number,
    price: number
}

interface ProductState { }

class Product extends React.Component<ProductProps, ProductState> {

    constructor(props: ProductProps) {
        super(props);
    }

    render(): React.ReactNode {

        return (
            <React.Fragment>
                <div className="col wide">{ this.props.productName }</div>
                <div className="col wide">{ this.props.quantity }</div>
                <div className="col wide">{ this.props.price }</div>
                <div className="col">{ this.props.quantity * this.props.price }</div>
            </React.Fragment>
        );
    }
}

export default Product;