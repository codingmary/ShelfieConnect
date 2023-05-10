import React, { useState } from 'react'
import styles from '../styles/loginModal.module.css';
import useSignup from '../hooks/useSignup'




export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [fname, setFname] = useState('');


    const { errors, signup, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(fname, email, password, passwordConfirm)

    }
    return (
        <div className={styles.modalBackground}>


            <div className={styles.loginModalContainer} >
                <form onSubmit={handleSubmit} className={styles.signUpModalContainer}>
                    <input
                        type="text"
                        required
                        onChange={(e) => setFname(e.target.value)}
                        value={fname}
                        placeholder="Fullname"
                        id="fname" />


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

                    <input
                        required
                        type="password"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        value={passwordConfirm}
                        placeholder="Password Confirmation" id="passwordConfirm" />
                    <button disabled={isLoading}>Sign Up</button>
                    {errors.length > 0 && <ul>{errors.map((error, idx) => <li key={idx} className='errorMessage'>{error.msg}</li>)}</ul>}
                </form>

            </div>
        </div>


    )
}


