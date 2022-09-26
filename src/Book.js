import { useState } from "react";

const Book = ({book, updateBooksLibrary}) => {


    const [selectedShelf, setSelectedShelf] = useState('moveTo')
    const hanndleChange = (selectedShelf) => {
        setSelectedShelf(selectedShelf);
        updateBooksLibrary(selectedShelf, book)
    }

    // creating an array to push the 's' after 'http' of the image
    function convertHttpToHttps() {
        const imageUrlInArray  = book.imageLinks.smallThumbnail.split('');

        // check first if the Url served in Https or not
        if(imageUrlInArray[4] !== 's'){
            imageUrlInArray.splice(4,0,'s');
            const imageUrlInString = imageUrlInArray.join('');
            return imageUrlInString
        }else{
            return book.imageLinks.smallThumbnail;
        }
    }

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover">
                    {
                        book.imageLinks ?
                            <img src={convertHttpToHttps()}
                                 alt={book.title}
                                 width="128"
                                 height="192"
                            />
                        : undefined
                    }
                </div>
                <div className="book-shelf-changer">
                <select
                        value={book.shelf ? book.shelf : selectedShelf}
                        onChange={e => hanndleChange(e.target.value)}
                    >
                    <option value="moveTo" disabled>
                    Move to...
                    </option>
                    <option value="currentlyReading">
                    Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
            </div>
            <div className="book-title">
                {book.title}
            </div>
            <div className="book-authors">{book.authors}</div>
        </div>
    )
}

export default Book;