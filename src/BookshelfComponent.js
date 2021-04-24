import React, {Component} from 'react'
import BookComponent from './BookComponent'

class BookshelfComponent extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/*
                        I dont include the <li> tags in BookComponent as it makes the component less reusable as i might want to use it outside of lists aswell.
                        */}
                        {this.props.books.map(book => 
                        <li key={book.id}>
                            <BookComponent id={book.id} width={130} height={190} img={book.imageLinks.thumbnail} title={book.title} author={book.author} handleMoveSelected={(selected, id) => this.props.handleMoveSelected(selected, id)} current={book.shelf}/>
                        </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookshelfComponent