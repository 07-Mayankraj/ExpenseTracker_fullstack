import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    // loading user data from start of app
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) setUser(JSON.parse(user));
    }, [])

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }
    const logout = (userData) => {
        setUser(null);
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider >
    )        

}