import React from "react";

interface AppContextInterface {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}
const UserContext = React.createContext<AppContextInterface | null>(null);

export default UserContext;
