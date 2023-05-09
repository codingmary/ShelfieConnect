import BookList from '../components/BookList';
import useBook from '../hooks/useBook'
import styles from '../styles/Home.module.css'


export default function BookShelf() {

    const { listOfBooks, loading } = useBook('wishlist')

    return (
        <main>
            <div className={styles.mainContainer}>
                <h1>Welcome to your WishList</h1>
            </div>

            {loading
                ? (<p className={styles.loading}>Loading...</p>)
                : (<BookList listOfBooks={listOfBooks} />)}
        </main>
    )
}
