import React from 'react';
import BookList from '../components/BookList';

import useBook from '../hooks/useBook'

import styles from '../styles/Home.module.css'


export default function BookShelf() {

    const { listOfBooks, loading } = useBook('bookshelf')

    return (
        <main>
            <div className={styles.mainContainer}>

                <h1>Welcome to your Bookshelf</h1>

            </div>

            {loading
                ? (<p className={styles.loading}>Loading...</p>)
                : (<BookList listOfBooks={listOfBooks} />)}
        </main>
    )
}
