import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BookComponent from './BookComponent'
import * as BooksAPI from './BooksAPI'

class BookshelfComponent extends Component {
    state = {
        searchPhrase: '',
        searchResponse: []
    }

    handleQueryChange = (input) => {
        this.setState((currentState) => ({
            searchPhrase: input
        }));
        BooksAPI.search(input).then(ret => this.setState((currentState) => ({
            searchResponse: ret
        })));
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleQueryChange(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    { this.state.searchResponse && this.state.searchResponse.length > 0 && 
                    <ol className="books-grid">{this.state.searchResponse.map(book => 
                        <li key={book.id}>
                            <BookComponent id={book.id} width={150} height={200} title={book.title} author={book.author} img={book.imageLinks.thumbnail} handleMoveSelected={(selected, id) => this.props.handleMoveSelected(selected, id)} current={book.shelf}/>
                        </li>)}
                    </ol>
                    }
                    {this.state.searchPhrase === '' && <div className="center-text">Start searching by entering keywords in the input above.</div>}
                    {(this.state.searchPhrase !== '' && this.state.searchResponse && this.state.searchResponse.error) && <div className="center-text">Sorry! Couldnt find anything matching your keywords!</div>}
                </div>
            </div>
        )
    }
}

export default BookshelfComponent