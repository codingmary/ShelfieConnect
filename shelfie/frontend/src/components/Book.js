import React, { useState } from 'react';
import styles from '../styles/Home.module.css';


export default function Book({ book, updateBook }) {
    const [isLent, setIsLent] = useState(book.isLent);
    const [lentToWhom, setLentToWhom] = useState(book.lentToWhom);
    const [lentWhen, setLentWhen] = useState(book.lentWhen);
    const [isBack, setIsBack] = useState(book.isBack);
    const [isRead, setIsRead] = useState(book.isRead);

    const handleUpdate = () => {
        updateBook({
            ...book,
            isLent,
            lentToWhom,
            lentWhen,
            isBack,
            isRead
        });
    };

    return (
        <div >
            <img
                className={styles.bookImage}
                src={book.bookImage}
                alt="book post"
            />
            <h2 className={styles.bookTitle}>{book.bookTitle}</h2>

            <h4 className={styles.bookAuthor}> {book.bookAuthor}</h4>
            <div>
                <label>
                    Is Read:
                    <input type="checkbox" checked={isRead} onChange={(e) => setIsRead(e.target.checked)} />
                </label>
                <label>
                    Is Lent:
                    <input type="checkbox" checked={isLent} onChange={(e) => setIsLent(e.target.checked)} />
                </label>

                {isLent && <div>
                    <input
                        type="text"
                        value={lentToWhom}
                        onChange={(e) => setLentToWhom(e.target.value)}
                        placeholder="Lent to"
                    />

                    <label>
                        Lent When:
                        <input type="text" value={lentWhen} onChange={(e) => setLentWhen(e.target.value)} />
                    </label>
                    <label>
                        Is Back:
                        <input type="checkbox" checked={isBack} onChange={(e) => setIsBack(e.target.checked)} />
                    </label></div>}


                <button onClick={handleUpdate}>Update Book</button>
            </div>

        </div>
    );
}