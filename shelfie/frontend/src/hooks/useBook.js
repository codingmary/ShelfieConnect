import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config'

const useBook = (c) => {
    const [listOfBooks, setListOfBooks] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getBooks = async () => {
            try {
                setLoading(true);
                const booksCollection = collection(db, c);
                const data = await getDocs(booksCollection);
                setListOfBooks(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getBooks();
    }, [c]);

    return { listOfBooks, loading }

}
export default useBook;
