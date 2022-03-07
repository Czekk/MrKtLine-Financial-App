import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Layout';
import DataContext from './Context/DataContext'
import DataService from './Services/DataService';
import { useState, useCallback, useEffect } from 'react';
import ControlContext from './Context/ControlContext';
import useAuth from './Auth/UseAuth';
import { history } from './helpers/history.js';
import AuthProvider from './Auth/AuthProvider';

function App() {
  const [state, setState] = useState(
    {"_id": "",
	"period": "YTD",
	"revenue": {
		"percentage": [],
		"interest": [],
		"serviceCharge": [],
		"capitalMarkets": [],
		"mortgage": [],
		"fees": [],
		"other": [],
    "regional":{
      "northEast": [],
      "atlantic": [],
      "south": [],
      "southWest": [],
      "pacific": [],
      "northWest": [],
      "midWest":[]
    }
	},
	"totalDebt": [],
	"totalEquity": [],
	"totalAssets": [],
	"netIncome": [],
	"shareholdersEquity": [],
	"currentAssets": [],
	"curentLiability": [],
	"der": [],
	"dar": [],
	"roa": [],
	"roe": [],
	"wcr": []});
  const [error, setError] = useState(null);
  const user= JSON.parse(localStorage.getItem('userInfo'));
  const [currentPeriod, setCurrentPeriod] = useState(user?.preference.defaultPeriod);
  const [currentPage, setCurrentPage] = useState('/');

  const auth = useAuth();

  const currentPeriodHandler=(period)=>{
    setCurrentPeriod(period);
  }

  const  currentPageHandler=(page)=>{
    setCurrentPage(page);
  }
  const getData =useCallback( async ()=>{
      setError(null);
      const user= JSON.parse(localStorage.getItem('userInfo'));
      try {
          if(user){
            const token= `Bearer ${user.token}`;
            const requestOptions= {
              headers:{
                'Content-Type':'application/json',
                'Authorization': token}
            }
           const response = await DataService.get(currentPeriod, requestOptions);
          
          if (!response.ok) {
            if([401, 403].includes(response.status)){
              auth.signOut();
              history.push('logIn');
              throw new Error('401 or 403 unauthorized')
            }
              throw new Error('Something went wrong!');
          }
          const data = await response.json();
          setState(data);
        }
      }
      catch (error){
          setError(error.message);
      }

},[currentPeriod, auth]);

  useEffect(()=>{
      getData();
  }, [getData]);

  
  return (
    <AuthProvider>
    <ControlContext.Provider value={{currentPage: currentPage, currentPeriod: currentPeriod, deleted: false, currentPageHandler: currentPageHandler, currentPeriodHandler:currentPeriodHandler }}>
    <DataContext.Provider value={
    {
    _id: state._id,
	  period: state.period,
  	revenue: {
		percentage: [...state.revenue.percentage],
		interest: [...state.revenue.interest],
		serviceCharge: [...state.revenue.serviceCharge],
		capitalMarkets: [...state.revenue.serviceCharge],
		mortgage: [...state.revenue.mortgage],
		fees: [...state.revenue.fees],
		other: [...state.revenue.other],
    regional:{
      northEast: [...state.revenue.regional.northEast],
      atlantic: [...state.revenue.regional.atlantic],
      south: [...state.revenue.regional.south],
      southWest: [...state.revenue.regional.southWest],
      pacific: [...state.revenue.regional.pacific],
      northWest: [...state.revenue.regional.northWest],
      midWest:[...state.revenue.regional.midWest]
    }
	},
	totalDebt: [...state.totalDebt],
	totalEquity: [...state.totalEquity],
	totalAssets: [...state.totalAssets],
	netIncome: [...state.netIncome],
	shareholdersEquity: [...state.shareholdersEquity],
	currentAssets: [...state.currentAssets],
	curentLiability: [...state.curentLiability],
	der: [...state.der],
	dar: [...state.dar],
	roa: [...state.roa],
	roe: [...state.roe],
	wcr: [...state.wcr]}}>
        <>
        <Home error={error}/>
        </>
    </DataContext.Provider>
    </ControlContext.Provider>
    </AuthProvider>
  );
}

export default App;
