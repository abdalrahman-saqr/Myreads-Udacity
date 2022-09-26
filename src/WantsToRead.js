import Book from "./Book";

const WantsToRead = ({booksFromServer, updateBooksLibrary}) => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Wants To Read</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    booksFromServer.map((book)=> (
                        book.shelf === 'wantToRead' &&
                        <li key={book.id} >
                            <Book book={book}
                                  updateBooksLibrary={updateBooksLibrary}
                            />
                        </li>
                    ))
                }
                </ol>
            </div>
        </div>
    ) 
}

export default WantsToRead;