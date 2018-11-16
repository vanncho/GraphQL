import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getUsers } from '../../queries/auth';

class Home extends Component {

    constructor(props) {
        super(props);

        this.compon = this.compon.bind(this);
    }

    compon() {
        const { data } = this.props.data;
        console.log("compon")
        console.log("compon")
        console.log(this.props.data.getUserByUsername)

        if (data && data.loading) {
            console.log(data.getUserByUsername)
        }
    }

    render () {
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

// export default Home;
export default graphql(getUsers, {
    options: (props) => {
        return {
            variables: {
                username: 'vancho'
            }
        }
    }
})(Home);