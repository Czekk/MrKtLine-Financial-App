import React from "react";

export default React.createContext({
    currentPage:'',
    currentPeriod:'',
    deleted:'',
    currentPeriodHandler:()=>{},
    currentPageHandler:()=>{}
});