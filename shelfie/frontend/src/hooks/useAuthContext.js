import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

//this hook is for accessing the dispatch function inside AuthContext.js
export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be inside an AuthContextProvider')
    }


    return context
}