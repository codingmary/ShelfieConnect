import React from 'react'
import styles from '../styles/About.module.css'

export default function About() {
    return (
        <div className={styles.mainAboutContainer}>
            <div className={styles.textContainer}>
                <h1>Welcome to Shelfie</h1>
                <h2>The leading online community for book aficionados!</h2>
                <p>Our website is made to bring passionate readers from all over the world together, building a lively community where you can share your love of books, find new books to read, and meet people who share your interests.</p>
                <p>Your favorite books can be added to your online bookshelf with Shelfie, and you can exchange reviews and suggestions with your friends. Also, you can interact with other bookworms, join groups based on your preferred authors or genres, and take part in conversations about the most recent developments in literature.</p>
                <p>Also, setting up reading groups, book clubs, and even friend book swaps is simple using our platform. Shelfie is the ideal place to be if you're seeking for your next great read or just want to connect with other enthusiastic readers.</p>
                <p>We at Shelfie are committed to encouraging a love of reading and building a vibrant community of readers. So why not register right away and take part in the discussion? We're eager to hear what you have to say!</p>
            </div>
        </div>
    )
}
