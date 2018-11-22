import * as React from 'react';

class Receipt extends React.Component {

    render(): React.ReactNode {

        return (
            <React.Fragment>
                <div className="col wide">2018-04-15 14:58</div>
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