import React from 'react';


export default React.createContext({
    
	"_id": "",
	"period": "",
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
	"totalAssets": [[]],
	"netIncome": [],
	"shareholdersEquity": [],
	"currentAssets": [],
	"curentLiability": [],
	"der": [],
	"dar": [],
	"roa": [],
	"roe": [],
	"wcr": []
})