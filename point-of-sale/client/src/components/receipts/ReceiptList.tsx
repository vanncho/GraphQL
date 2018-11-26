import * as React from 'react';

import Receipt from './Receipt';
import ReceiptType from './ReceiptType';

interface ReceiptListProps {
    receipts: Array<ReceiptType>
}

interface ReceiptListState { 
    total: number
}

class ReceiptList extends React.Component<ReceiptListProps, ReceiptListState> {

    constructor(props: ReceiptListProps) {
        super(props);

        this.state = {
            total: 0
        }
    }

    componentDidMount(){

        if (this.props.receipts) {

            let totalSum: number = 0;

            for (let i = 0; i < this.props.receipts.length; i++) {
                
                totalSum += this.props.receipts[i].total;
            }

            this.setState({ total: totalSum });
        }
    }

    displayReceipts():  React.ReactNode {

        if (this.props.receipts) {
            return (this.props.receipts.map((receipt: ReceiptType) => {
                return (
                    <div className="row" key={receipt.id}>
                        <Receipt receipt={receipt} />
                    </div>
                )
            }));
        } else {
            return (<div className="row"></div>);
        }
    }

    render(): React.ReactNode {

        return (
            <section id="all-receipt-view">
                <h1>All Receipts</h1>
                <div className="table">
                    <div className="table-head">
                        <div className="col wide">Creation Date</div>
                        <div className="col wide">Items</div>
                        <div className="col">Total</div>
                        <div className="col">Actions</div>
                    </div>
                    { this.displayReceipts() }
                    <div className="table-foot">
                        <form id="create-receipt-form">
                            <div className="col wide">
                            </div>
                            <div className="col wide right">Total:</div>
                            <div className="col">{ this.state.total.toFixed(2) }</div>
                            <div className="col">
                            </div>
                        </form>
                    </div>
                </div>
        </section>
        );
    };
}

export default ReceiptList;