import {useState, useEffect} from 'react'
import Book from './Book';
import * as bookAPI from './BooksAPI'
import { Link } from 'react-router-dom';

const SearchBooks = ({booksFromServer, updateBooksLibrary})=> {

  const [query, setquery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // search the query
  useEffect(() => {
    let mounted = true;

    if (query) {
      const search = async () => {
        await bookAPI.search(query, 10)
        .then((res) =>
        mounted && setSearchResults(res)
        )
      }
      search();
    }else {
      setSearchResults([])
    }

    return () => mounted = false
  }, [query]);


  const checkIfSearchedBookExistsOnTheMainPage = (searchedBook) => {
    booksFromServer.forEach((book) => {
      if (searchedBook.id === book.id){
        searchedBook.shelf = book.shelf;
      }
    })
  }


  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => setquery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
      <ol className="books-grid">
        {
            !searchResults.error ? searchResults.map((book)=> {
              checkIfSearchedBookExistsOnTheMainPage(book)
              return(
                <li key={book.id}>
                  <Book book={book}
                        updateBooksLibrary={updateBooksLibrary}
                  />
                </li>
              )
            }) : <p>Try Something Else :)</p>
        }
      </ol>
      </div>
    </div>
  ) 
  
}

export default SearchBooks;
