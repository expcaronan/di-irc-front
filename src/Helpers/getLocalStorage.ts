import { jwtDecode } from "jwt-decode";
import EmployeeUserModel from "../Interfaces/EmployeeUserModel";

 const storedJsonString = localStorage.getItem('Credentials');
  const hasLocalStorageData = !!localStorage.getItem('Credentials');
const getLocalStorage = (() =>{

     if (hasLocalStorageData) {
      if (storedJsonString !== null) {
        
        return storedJsonString;
        
    }
}

});

export default  getLocalStorage

