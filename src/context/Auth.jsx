import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")) || false);
    useEffect(()=>{
        localStorage.setItem("auth", auth);
    }, [auth])
    return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
}   