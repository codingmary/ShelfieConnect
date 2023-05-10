// import { useState } from 'react'
// import { auth } from '../firebase/config';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { useAuthContext } from './useAuthContext';


// export default function useLogin() {
//     const [error, setError] = useState(null);
//     const { dispatch } = useAuthContext();


//     const login = (email, password) => {
//         setError(null)
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 dispatch({ type: 'LOGIN', payload: userCredential.user })
//                 console.log('user logged in:', userCredential.user);
//             })
//             .catch((err) => {
//                 setError(err.message)
//             })

//     }
//     return { error, login }
// }


import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export default function useLogin() {
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();

    const login = async (email, password) => {

        setIsLoading(true);
        setErrors([]); //reset the error everytime a new user signs up

        try {
            //login user
            const response = await axios({
                method: "POST",
                url: 'http://localhost:3000/users/login',
                data: { email, password },
                withCredentials: true,
            });

            if (response.status === 200) {
                setIsLoading(false);
                dispatch({ type: 'LOGIN', payload: response });

                navigate('/bookshelf');

                alert(`Hey, ${response.data.data.user.fname}! Welcome back to Shelfie!`)
            }
        } catch (err) {
            console.log(err.response)
            if (err.response.status === 400) {
                setIsLoading(false);
                setErrors(err.response.data.errors)
            }
        }
    }

    return { errors, login, isLoading }
}