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

  mapBook = (id, shelf) => {
    const currentBook = this.state.books.find(book => book.id === id);
    currentBook.shelf = shelf;
    return currentBook;
  }

  handleMoveSelected = (selected, id) => {
    if(this.state.books.find(book => book.id === id) === undefined) {
       BooksAPI.get(id).then(book => {
        book.shelf = selected;
        this.setState(currentValue => ({
          books: [...currentValue.books, book]
        }));
      });
    }
    BooksAPI.update(id, selected).then(bookIds =>
      {
        const newBooks = [];
        for (const [shelfName, books] of Object.entries(bookIds)) {
          for(const id of books){
            newBooks.push(this.mapBook(id, shelfName));
          }
        }
        this.setState(currentValue => ({
          books: newBooks
        }));
      }
    );
  }

  findCurrent = (book) => {
    const cur = this.state.books.find(b => b.id === book.id);
    if(cur) {
      return cur.shelf;
    }
    return "none";
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
              <BookshelfComponent title='Currently Reading' books={this.state.books.filter(book => book.shelf === 'currentlyReading')} handleMoveSelected={(selected, id) => this.handleMoveSelected(selected, id)}/>
              <BookshelfComponent title='Want to Read' books={this.state.books.filter(book => book.shelf === 'wantToRead')} handleMoveSelected={(selected, id) => this.handleMoveSelected(selected, id)}/>
              <BookshelfComponent title='Read' books={this.state.books.filter(book => book.shelf === 'read')} handleMoveSelected={(selected, id) => this.handleMoveSelected(selected, id)}/>
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
            }}
            handleMoveSelected={(selected, id) => this.handleMoveSelected(selected, id)}
            findCurrent={(book) => this.findCurrent(book)}/>
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
