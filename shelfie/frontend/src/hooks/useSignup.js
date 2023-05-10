import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export default function useSignup() {
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();


    const signup = async (fname, email, password, passwordConfirm) => {

        setIsLoading(true);
        setErrors([]); //reset the error everytime a new user signs up

        try {
            //signup user
            const response = await axios({
                method: "POST",
                url: 'https://shelfiebackend.onrender.com/users/signup',
                data: { fname, email, password, passwordConfirm },
                withCredentials: true,
            });

            if (response.status === 201) {
                setIsLoading(false);
                dispatch({ type: 'LOGIN', payload: response });
                navigate('/');
                alert(`Hey, ${response.data.data.user.fname}! Welcome to Shelfie!`)
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