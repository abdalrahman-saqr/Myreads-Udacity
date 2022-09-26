import "./App.css";
import BooksLibrary from "./BooksLibrary";
import SearchBooks from "./SearchBooks";
import { useState, useEffect } from "react";
import * as BooksAPI from './BooksAPI';
import {Route, Routes} from 'react-router-dom'


function App(){

const [booksFromServer, setBooksFromServer] = useState([])

  // getting books from the backend 
  useEffect (()=> {
    const getAll = async ()=> {
      const res = await BooksAPI.getAll();
      setBooksFromServer([...res]);
    }
    getAll();
  }, [])


  // the name 'changedOrAddedBook' means if the action was taken on BooksLibrary page,
  // then the book shelf will be changed.
  // if the action was taken on searchBooks page,
  // then it's added to the server and BooksLibrrary.
  const updateBooksLibrary = (selectedShelf, changedOrAddedBook) => {

    // updating server with the new book
    BooksAPI.update(changedOrAddedBook, selectedShelf)

    // removing the book form its old shelf
    const updatedBooks = booksFromServer.filter((book) => (
      changedOrAddedBook.id !== book.id
    ))

    // adding the book on its new shelf
    changedOrAddedBook.shelf = selectedShelf;
    setBooksFromServer([...updatedBooks, changedOrAddedBook])
  }


  return (
    <Routes>
      <Route exact path="/" element={
        <BooksLibrary booksFromServer={booksFromServer}
                      updateBooksLibrary={updateBooksLibrary}
                      />
      }/>
      <Route path="/search" element={
      <SearchBooks booksFromServer={booksFromServer}
                  updateBooksLibrary={updateBooksLibrary}
                  />

      }/>
    </Routes>
  )
}
export default App;
      