import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('currentUser');  
        setCurrentUser(null);
        window.history.replaceState(null, "", "/");
    };

    //console.log("UserProvider is rendering, currentUser:", currentUser);
    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

export { UserContext };