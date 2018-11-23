import * as React from 'react';
import Receipt from './Receipt';

interface ReceiptListProps {
    receipts: any // FIX TYPE
}

interface ReceiptListState { }

class ReceiptList extends React.Component<ReceiptListProps, ReceiptListState> {

    render(): React.ReactNode {
        console.log('ReceiptList')
console.log(this.props.receipts)
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
                    {
                        this.props.receipts.map((receipt: any) => { // FIX TYPE
                            return (
                                <div className="row">
                                    <Receipt key={receipt.id} receipt={receipt} />
                                </div>
                            )

                        })
                    }
                    <div className="table-foot">
                        <form id="create-receipt-form">
                            <div className="col wide">
                            </div>
                            <div className="col wide right">Total:</div>
                            <div className="col">270.50</div>
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