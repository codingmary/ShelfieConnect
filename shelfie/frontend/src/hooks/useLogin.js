import { useState } from 'react'
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';


export default function useLogin() {
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();


    const login = (email, password) => {
        setError(null)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                dispatch({ type: 'LOGIN', payload: userCredential.user })
                console.log('user logged in:', userCredential.user);
            })
            .catch((err) => {
                setError(err.message)
            })

    }
    return { error, login }
}
