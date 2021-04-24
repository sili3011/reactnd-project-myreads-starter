import React from 'react'

function correctThumbnail(imgs) {
    if(!imgs) {
        return 'data:image/png;base64,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';
    }
    return imgs.thumbnail;
}

function checkAuthors(props) {
    let authors = '';
    if(props.authors) {
        let i = 1;
        for(const author of props.authors) {
            authors += author;
            if(i < props.authors.length) {
                authors += ', '
            }
            ++i;
        }
    }
    return authors;
}

function BookComponent(props) {
    return (
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ width: props.width, height: props.height, backgroundImage: `url("${correctThumbnail(props.imgs)}")` }}></div>
                <div className="book-shelf-changer">
                    <select value={props.current} onChange={(e) => props.handleMoveSelected(e.target.value, props.id)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{checkAuthors(props)}</div>
    </div>)
}

export default BookComponent;