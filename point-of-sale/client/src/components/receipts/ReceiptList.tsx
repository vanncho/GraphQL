import * as React from 'react';
import Receipt from './Receipt';

class ReceiptList extends React.Component {

    render() {

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
                    <div className="row">
                        <Receipt />
                    </div>
                    <div className="row">
                        <Receipt />
                    </div>
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