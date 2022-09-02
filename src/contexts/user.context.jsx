import { createContext, useState } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrectUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrectUser] = useState(null);
  const value = { currentUser, setCurrectUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
