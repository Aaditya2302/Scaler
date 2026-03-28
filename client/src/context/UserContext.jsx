import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  // Placeholder dynamic user state
  const [user, setUser] = useState({
    firstName: "Aaditya",
    fullName: "Aaditya Sharma",
    city: "New Delhi",
    pinCode: "110085",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
