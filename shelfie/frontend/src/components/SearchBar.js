import React from 'react'
import { FaSearch } from "react-icons/fa";
import styles from '../styles/SearchBar.module.css'

export default function SearchBar({ search, setSearch, searchBook, searchOnClick }) {

    return (
        <div className={styles.searchBox}>
            <button className={styles.btnSearch} onClick={searchOnClick}><FaSearch /></button>
            <input
                type="text" className={styles.inputSearch}
                placeholder="Type to Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={searchBook} />
        </div>
    )
}
