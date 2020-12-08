import logo from '../Images/logo.png';
import '../Stylesheets/Content.css';
import React, { useState } from 'react';
import ReactDom from "react-dom"
import axios from "axios";
import Companyinfo from "./CompanyInfo"


class App extends React.Component {

 render(){
 function loadDoc (){
    
    
        // GETS VALUE OF THE STOCKS TEXT 
        const stock = document.getElementById("stocks").value;

        // API INITALIZE
        const request = require('request');
                                                          //INTREPOLATING THE STOCK VARIABLE INTO THE API CALL
        request(`https://finnhub.io/api/v1/stock/profile2?symbol=${stock}&token=bv5umqf48v6phr4c2icg`, { json: true }, (err, res, body) => {
          if (err) { return console.log(err) }
else{
    console.log(body)
   let dataArray = []
   dataArray.push(body)
    class CompanyDiv extends React.Component {
   
        render() {
         
          return (
            <>
               {dataArray.map(item => <Companyinfo  imglink={item.logo} name={item.name}/>)}
            </>
          );
        }
      }
      ReactDom.render(<CompanyDiv/>, document.getElementById("companyContainer"))
    
          
}
 })
        // ALLOW A HEADER COMPONENT TO POP UP ON ERROR AND LET IT BE DISABLED ON API RETURN 
      
   // ESTABLISHING PARAMETERS FOR THE YAHOO FINANCE API 
    const options = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts',
  params: {
    symbol: 'ULVR',
    interval: '5m',
    range: '1d',
  
    comparisons: '^GDAXI,^FCHI'
  },
           // MY API KEY , CHECK THE YAHOO API DOC FOR MORE DETAILS
      headers: {
        'x-rapidapi-key': '3cf33b550fmsh79dc738d4c5cf88p159e46jsn093272dcf85c',
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      }
    };
   
    //CALLING THE YAHOO FINANCE API 
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
    
}



// FUNCTION TO VALIDATE THE BUTTON 
function validateBtn (val)  {
    let btnDOM = document.getElementById("button")
   
    // IF THE INPUT HAS A VALUE LENGTH LESS THEN 1 BUTTON IS DISABLED 
    if( val.length <1 ) { 
        btnDOM.disabled = true 
        btnDOM.innerHTML="Enter letter symbol"
  }  // ELSE BUTTON IS ENABLED WITH SOME ADDED TEXT
    else { btnDOM.disabled = false; btnDOM.innerHTML="Request Data" }
}


  return (
    <div className="Content">
      <header className="Content-header">
        
        <p id="results"> Stock Info </p>
        <input type="text" id="stocks" maxLength="4" onKeyUp={ (e) => validateBtn(e.target.value) }></input>
        <button type="button" id="button"  onClick={loadDoc}>Enter a letter symbol</button>
        <div id="companyContainer"></div>
      </header>
    </div>
  );
 }
}

export default App;
