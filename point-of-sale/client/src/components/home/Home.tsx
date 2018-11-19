import * as React from 'react';
import { graphql } from 'react-apollo';
import toastr from 'toastr';

import { getUsers } from '../../queries/auth';

interface HomeProps {
    history: any,
    data: any,
    getUsers: Function
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

        this.props.getUsers({
            variables: {
                username: 'vancho'
            }
        }).then((res: any) => {
            

            if (res.data.getUserByUsername) {
                console.log(res.data.getUserByUsername);
            } else {
                toastr.error(res.errors[0].message);
            }
        }).catch((err: any) => {
            console.log(err);
        });
    }

    render() {
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

export default graphql<HomeProps, HomeState>(getUsers, { name: 'getUsers' })(Home);
// export default graphql<HomeProps, HomeState>(getUsers, {
//     options: (props) => {
//         return {
//             variables: {
//                 username: 'vancho'
//             }
//         }
//     }
// })(Home);