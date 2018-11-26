import * as React from 'react';
import { Link } from 'react-router-dom';

import ReceiptType from './ReceiptType';

interface ReceiptProps {
    receipt: ReceiptType
}

interface ReceiptState { }

class Receipt extends React.Component<ReceiptProps, ReceiptState> {

    render(): React.ReactNode {

        return (
            <React.Fragment>
                <div className="col wide">{ this.props.receipt.creationDate }</div>
                <div className="col wide">{ this.props.receipt.productCount }</div>
                <div className="col">{ this.props.receipt.total.toFixed(2) }</div>
                <div className="col">
                    <Link to={ "/details/" + this.props.receipt.id }>Details</Link>
                </div>
            </React.Fragment>
        );
    }
}

export default Receipt;