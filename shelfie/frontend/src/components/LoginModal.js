import React, { useState } from 'react'
import styles from '../styles/loginModal.module.css'
import { NavLink } from 'react-router-dom'
import useLogin from '../hooks/useLogin';


export default function LoginModal({ setModalActiveLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, login } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }
    return (
        <div className={styles.modalBackground}>
            <div className={styles.loginModalContainer}>
                <div className={styles.loginCloseBtn}> <button onClick={() => setModalActiveLogin(false)}>X</button>
                </div>

                <div className={styles.loginModalContainer} >
                    <form onSubmit={handleSubmit} className={styles.loginModalContainer}>
                        <input
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="E-mail"
                            id="email" />
                        <input
                            required
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password" id="password" />
                        <button>Login</button>
                        {error && <p>{error}</p>}
                    </form>
                    <div className={styles.register}>
                        <p>Not registered yet?</p>
                        <NavLink className={styles.SignUp} id={styles.signUp} to="signUp" onClick={() => setModalActiveLogin(false)}>Sign up</NavLink>
                    </div>
                </div>
            </div>
        </div>

    )
}
