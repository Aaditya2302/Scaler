import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    firstName: "Aaditya",
    fullName: "Aaditya Sharma",
    city: "New Delhi",
    pinCode: "110085",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`);
        if (res.ok) {
          const data = await res.json();
          const defaultAddress = data.addresses?.find(a => a.isDefault) || data.addresses?.[0] || {};
          setUser({
            firstName: data.name.split(' ')[0],
            fullName: data.name,
            city: defaultAddress.city || "New Delhi",
            pinCode: defaultAddress.zipCode || "110085",
            id: data.id
          });
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
