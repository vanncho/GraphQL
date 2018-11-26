import * as React from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import toastr from 'toastr';
import ReceiptList from '../receipts/ReceiptList';

import { getReceipts } from '../../queries/receipt';
import { getUsers } from '../../queries/auth';

interface HomeProps {
    history: any,
    data: any,
    client: any,
    getUsers: Function
    getReceipts: any
};

interface HomeState {
    username: string,
    password: string,
    repeatPassword: string
};

class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);

        this.compon = this.compon.bind(this);
    }

    compon(): void {

        // TEST
        this.props.client.query({
            query: getUsers,
            variables: {
                username: 'vancho'
            }
        }).then((res: any) => {

            if (res.data.getUserByUsername === null && !res.data.loading) {
                toastr.error(res.errors[0].message);
            } else {
                console.log(res.data.getUserByUsername);
            }
        });
    }

    render(): React.ReactNode {

        const isAuthenticated: boolean = localStorage.getItem('token') !== null || false;

        if (isAuthenticated) {

            if (!this.props.getReceipts.loading) {
                return (
                    <ReceiptList receipts={this.props.getReceipts.getReceipts}/>
                );
            }

        }

        return (
            <section className="clearfix" id="welcome-section">
                <div className="welcome-text">
                    <h1>What is Lorem Ipsum?</h1>
                    <p onClick={ this.compon }>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                        it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
                        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                        PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </section>
        );
    }
}

export default compose(
    graphql<HomeProps, HomeState>(getReceipts, { name: 'getReceipts' }),
    withApollo
)(Home);