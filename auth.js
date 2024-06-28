import {createContext} from "react"
export const AuthContext = createContext({
	credential: {
	  "Email":"",
	  "Bin": ""
  }, 
  setCredential: () => {},
  hasUser: false,
  setHasUser: () => {}
});