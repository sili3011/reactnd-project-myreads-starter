import React from 'react'

function BookComponent(props) {
    return (
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ width: props.width, height: props.height, backgroundImage: `url("${props.img}")` }}></div>
                <div className="book-shelf-changer">
                    <select>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.author}</div>
    </div>)
}

export default BookComponent;