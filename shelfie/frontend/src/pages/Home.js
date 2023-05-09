import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import SearchBar from '../components/SearchBar'

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { APIKEY } from '../config/environment';

import noCover from '../img/noCover.png'

import { useAuthContext } from '../hooks/useAuthContext';
export default function Home() {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const { user } = useAuthContext;
    const [openModal, setOpenModal] = useState(false)

    //perform search and fetch data from google book api
    const searchBook = (e) => {
        if (e.key === 'Enter') {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${APIKEY}`)
                .then(res => res.json())
                .then(data => {
                    setBooks(data.items)
                    setSearch("")
                })
        }
    };
    const searchOnClick = () => {

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${APIKEY}`)
            .then(res => res.json())
            .then(data => {
                setBooks(data.items)
                setSearch("")
            })
    }



    //add books to the bookshelf
    const handleAddBook = async (book) => {
        if (!user) {
            setOpenModal(true)
        }
        else {
            const blogRef = collection(db, 'bookshelf');
            await addDoc(blogRef, {
                bookTitle: book.volumeInfo.title,
                bookAuthor: book.volumeInfo.authors.join(' '),
                bookImage: book.volumeInfo.imageLinks.thumbnail,
                isBack: false,
                isLent: false,
                isRead: false,
                lentToWhom: "",
                lentWhen: "",
                isUpdate: true
            });
        }

    };

    //add books to the wishlist
    const handleAddWishList = async (book) => {
        if (!user) {
            setOpenModal(true)
        }
        else {
            const blogRef = collection(db, 'wishlist');
            await addDoc(blogRef, {
                bookTitle: book.volumeInfo.title,
                bookAuthor: book.volumeInfo.authors.join(' '),
                bookImage: book.volumeInfo.imageLinks.thumbnail,
                comments: ""
            });
        }

    }

    return (
        <main>
            <div className={styles.mainContainer}>
                <h1>Find your Books</h1>
                <h2>And </h2>
                <h2> add them to your</h2>
                <h2>Online Bookshelf</h2>
                <SearchBar search={search} setSearch={setSearch} searchBook={searchBook} searchOnClick={searchOnClick} />
            </div>
            <div className={styles.searchResults}>
                {books.map(book => (
                    <div className={styles.card} key={book.id}>
                        <div className={styles.bookImageWrapper}>
                            {book.volumeInfo.readingModes.image ? <img className={styles.bookImage} src={book.volumeInfo.imageLinks.thumbnail} alt="book cover" /> : <img className={styles.noCoverImage} src={noCover} alt="book without cover" />}</div>
                        <h1 className={styles.bookTitle}>{book.volumeInfo.title.substring(0, 80)}</h1>
                        <h2 className={styles.bookAuthor}>{book.volumeInfo.authors}</h2>
                        <div className={styles.btnContainer}>
                            <button onClick={() => handleAddBook(book)}>Add to Bookshelf</button>
                            <button onClick={() => handleAddWishList(book)}>Add to WishList</button>
                        </div>
                        {openModal && (
                            <div className={styles.modalBackground}>
                                <div className={styles.modalContainer}>
                                    <div className={styles.loginCloseBtn}> <button onClick={() => setOpenModal(false)}>X</button>
                                    </div>
                                    <p>Please log in or create an account to start adding</p>
                                </div>
                            </div>)}
                    </div>
                ))}
            </div>
        </main>
    )
}
