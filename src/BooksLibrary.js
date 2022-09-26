import CurrentlyReading from "./CurrentlyReading";
import Read from "./Read";
import WantsToRead from "./WantsToRead";
import { Link } from "react-router-dom";

const BooksLibrary = ({booksFromServer, updateBooksLibrary}) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <CurrentlyReading booksFromServer={booksFromServer} updateBooksLibrary={updateBooksLibrary}/>
                <WantsToRead booksFromServer={booksFromServer} updateBooksLibrary={updateBooksLibrary}/>
                <Read booksFromServer={booksFromServer} updateBooksLibrary={updateBooksLibrary}/>
            </div>
            <div className="open-search">
                <Link to="/search">
                    add
                </Link>
            </div>
        </div>
    )
}

export default BooksLibrary;