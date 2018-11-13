import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBook } from '../../queries/book';

class BookDetails extends Component {

    displayBook() {

        let data = this.props.data;

        if (data.book) {

            const book = data.book;

            return (
                <div>
                    <h2>name: { book.name }</h2>
                    <p>genre: { book.genre }</p>
                    <p>author name: { book.author.name }</p>
                    <h4>All books by this author</h4>
                    <ul className="other-books">
                        {
                            book.author.books.map(book => {
                                return (<li key={ book.id }>{ book.name }</li>)
                            })
                        }
                    </ul>
                </div>
            );
        } else {
            return (<div>No books selected</div>);
        }
    }

    render() {
        return (
            <div id="book-details">
                { this.displayBook() }
            </div>
        );
    }
}

export default graphql(getBook, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);