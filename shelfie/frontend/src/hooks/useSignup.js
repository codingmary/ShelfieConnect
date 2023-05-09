import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';




export default function useSignup() {
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext()


    const signup = async (fname, email, password, passwordConfirm) => {

        setIsLoading(true);
        setErrors([]); //reset the error everytime a new user signs up

        try {
            //signup user
            const response = await axios.post('http://localhost:3000/users/signup', JSON.stringify({ fname, email, password, passwordConfirm }), { headers: { 'Content-Type': 'application/json' } })
            // console.log(response)
            if (response.status === 200) {
                setIsLoading(false);
                alert(response.data.message)
                localStorage.setItem('user', JSON.stringify(response));
                dispatch({ type: 'LOGIN', payload: response });
            }
        } catch (err) {
            console.log(err.response)
            if (err.response.status === 400) {
                setIsLoading(false);
                setErrors(err.response.data.errors)
            }
        }
    }

    return { errors, signup, isLoading }
}