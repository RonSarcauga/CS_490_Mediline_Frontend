import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    console.log("UserProvider is rendering, currentUser:", currentUser);
    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

export { UserContext };