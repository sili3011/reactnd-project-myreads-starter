import React from 'react'
import BookComponent from './BookComponent'

const BookshelfComponent = ({title, books, handleMoveSelected}) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {/*
                    I dont include the <li> tags in BookComponent as it makes the component less reusable as i might want to use it outside of lists aswell.
                    */}
                    {books.map(book => 
                    <li key={book.id}>
                        <BookComponent id={book.id} width={130} height={190} imgs={book.imageLinks} title={book.title} authors={book.authors} handleMoveSelected={(selected, id) => handleMoveSelected(selected, id)} current={book.shelf}/>
                    </li>
                    )}
                </ol>
            </div>
        </div>
    )
}

export default BookshelfComponent