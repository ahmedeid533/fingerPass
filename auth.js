import {createContext} from "react"
export const AuthContext = createContext({
	credential: {
	  "Email":"",
	  "Password": ""
  }, 
  setCredential: () => {},
  hasUser: false,
  setHasUser: () => {}
});