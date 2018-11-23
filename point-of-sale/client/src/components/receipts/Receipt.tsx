import * as React from 'react';

interface ReceiptProps {
    receipt: any // FIX TYPE
}

interface ReceiptState { }

class Receipt extends React.Component<ReceiptProps, ReceiptState> {

    render(): React.ReactNode {

        return (
            <React.Fragment>
                <div className="col wide">{ this.props.receipt.creationDate }</div>
                <div className="col wide">10</div>
                <div className="col">110.00</div>
                <div className="col">
                    <a href="#">Details</a>
                    <a href="#">Edit</a>
                </div>
            </React.Fragment>
        );
    }
}

export default Receipt;