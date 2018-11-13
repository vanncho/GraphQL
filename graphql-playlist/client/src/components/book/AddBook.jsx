import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { addBookMutation, getBooks } from '../../queries/book';
import { getAuthors } from '../../queries/author';

class AddBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submithBook = this.submithBook.bind(this);
    }

    submithBook(event) {
        event.preventDefault();

        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooks }]
        });
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    displayAuthors() {

        let data = this.props.getAuthors;

        if (data.loading) {
            return (<option disabled>Loading authors...</option>);
        } else {
            return data.authors.map(author => {
                return (<option key={ author.id } value={ author.id }>{ author.name }</option>);
            });
        }
    }

    render() {

        return (
            <form onSubmit={ this.submithBook }>

                <div className="field">
                    <label>Book name:</label>
                    <input
                        type="text"
                        name="name"
                        onChange={ this.handleInputChange }
                    />
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input
                        type="text"
                        name="genre"
                        onChange={ this.handleInputChange }
                    />
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select name="authorId" onChange={ this.handleInputChange }>
                        <option> - select author - </option>
                        { this.displayAuthors() }
                    </select>
                </div>

                <button>+</button>

            </form>
        );
    }
}

export default compose(
    graphql(getAuthors, { name: "getAuthors" }),
    graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook);