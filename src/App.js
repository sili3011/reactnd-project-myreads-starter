import React from 'react'
import './App.css'
import { Route, Link } from 'react-router-dom'
import BookshelfComponent from './BookshelfComponent';
import SearchComponent from './SearchComponent';
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => 
      this.setState(currentValue => ({
        books: books
      }))
    );
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookshelfComponent title='Currently Reading' books={this.state.books.filter(book => book.shelf === 'currentlyReading')}/>
              <BookshelfComponent title='Want to Read' books={this.state.books.filter(book => book.shelf === 'wantToRead')}/>
              <BookshelfComponent title='Read' books={this.state.books.filter(book => book.shelf === 'read')}/>
              <Link to='/search' className="open-search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )}>
        </Route>
        <Route path='/search' render={(history) => (
          <SearchComponent onCreateContact={(newContact) => {
              this.createContact(newContact);
              history.pushState('/');
            }}/>
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
