import * as React from 'react';
import { compose, withApollo } from 'react-apollo';

import { getReceiptByID } from '../../queries/receipt';
import Product from '../products/Product';
import ProductType from '../products/ProductType';

interface ReceiptDetailsProps {
    match: any,
    client: any
}

interface ReceiptDetailsState { 
    products: Array<ProductType>
}

class ReceiptDetails extends React.Component<ReceiptDetailsProps, ReceiptDetailsState> {

    constructor(props: ReceiptDetailsProps) {
        super(props);

        this.state = {
            products: []
        }
    }

    async componentDidMount() {

        const promiseResult = await this.props.client.query({
            query: getReceiptByID,
            variables: {
                id: this.props.match.params.id
            }
        });

        this.setState({ products: JSON.parse(promiseResult.data.getReceiptById.products) });
    }


    dispalyProducts(): React.ReactNode {

        return (

            this.state.products.map((product: ProductType, id: number) => {
                return(
                    <div className="row" key={id}>
                        <Product price={product.price} productName={product.name} quantity={product.quantity} />
                    </div>
                )
            })
        );
    }

    render(): React.ReactNode {

        return (
            <section id="receipt-details-view">
                <h1>Receipt Details</h1>
                <div className="table">
                    <div className="table-head">
                        <div className="col wide">Product Name</div>
                        <div className="col wide">Quantity</div>
                        <div className="col wide">Price per Unit</div>
                        <div className="col">Sub-total</div>
                    </div>
                    { this.dispalyProducts() }
                </div>
            </section>
        );
    }
}

export default compose(withApollo)(ReceiptDetails);