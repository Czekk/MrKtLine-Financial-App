import React from 'react';

export default React.createContext({
 address: null,
email: null,
firstname: "",
hash: "",
isLoggedIn: true,
lastname: "",
phone: null,
position: null,
preference: {showQuickPoints: true, defaultPeriod: ""},
defaultPeriod: "",
showQuickPoints: true,
status: "",
token: "",
username: "",
_id: "",
    signIn: ()=>{},
    signOut: ()=>{}
});