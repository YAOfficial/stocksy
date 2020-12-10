import logo from '../Images/logo.png';
import '../Stylesheets/Content.css';
import React, { useState } from 'react';
import ReactDom from "react-dom"
import axios from "axios";
import Companyinfo from "./CompanyInfo"
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { FaGithub } from 'react-icons/fa';
import CompanyNews from "./CompanyNews.js"





class App extends React.Component {
  
 render(){

 function loadDoc(){
        // GETS VALUE OF THE STOCKS TEXT 
        const stock = document.getElementById("stocks").value;
        
        const request2 = require('request');

request2(`https://finnhub.io/api/v1/company-news?symbol=${stock}&from=2020-04-30&to=2020-05-01&token=bv5umqf48v6phr4c2icg`, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
 body.length = 6
  class CompanyComponent extends React.Component{
    render(){

     
        return (
            <>
            {body.map(item => <CompanyNews src={item.image} title={item.headline} words={item.summary} url={item.url} source={item.source} />)}
            </>
        )
    }
} ReactDom.render(<CompanyComponent/>, document.getElementById("companyNewsContainer"))
});
        
      
    
        // API INITALIZE
        const request = require('request');
                                                          //INTREPOLATING THE STOCK VARIABLE INTO THE API CALL
        request(`https://finnhub.io/api/v1/stock/profile2?symbol=${stock}&token=bv5umqf48v6phr4c2icg`, { json: true }, (err, res, body) => {
          if (err) { 
           console.log(err)
          
          }
          
else {
 // LOG THE RETURNED VALUE FROM THE API 
    console.log(body)
   let dataArray = []
   
   dataArray.push(body)
   if(!dataArray[0].name){
    document.getElementById("companyContainer").style.display = "none"
  }else {
    document.getElementById("companyContainer").style.display = "initial"
  }
   // RUN THROUGH THE ARRAY AND ADD VALUES TO VARIABLES TO USE ON ELEMENTS
    class CompanyDiv extends React.Component {
   
        render() {
         console.log()
         let networth = parseInt(dataArray[0].marketCapitalization).toLocaleString()
         
          return (
            
            <>
               {dataArray.map(item => <Companyinfo ipo={item.ipo} networth1={networth} industry={item.finnhubIndustry}  imglink={item.logo} name={item.name}/>)}
            </>
          );
        }
      }
      ReactDom.render(<CompanyDiv/>, document.getElementById("companyContainer"))
    
          
}
 
 })
       
      
   // ESTABLISHING PARAMETERS FOR THE YAHOO FINANCE API READ THE YAHOO API DOC FOR INFO 
    const options = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts',
  params: {
    symbol:  stock,
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
        // IF THE API DOESNT WORK SHOW ERROR ALERT
        if(!response.data.chart.result){
          function AlertDismissibleExample() {
            const [show, setShow] = useState(true);
          
            if (show) {
              return (
                <Alert id="errorBox" variant="danger" onClose={() => setShow(false)} dismissible>
                  <Alert.Heading variant="success">Oh snap! we couldnt find market data for {document.getElementById("stocks").value}</Alert.Heading>
                  <p>
                    Keep in mind this site is only for Us and Canadian stocks either write the stock correctly or try a different symbol
                  </p>
                </Alert>
              );
            }
           
          
          }
          document.getElementById("CompanyNews").style.display = "none"
          document.getElementById("container").style.display = "none"
          document.getElementById("companyContainer").style.display = "none"
          ReactDom.render(<AlertDismissibleExample/>, document.getElementById("mains"));
        } else {
          // REMOVE ALERT BOX
          document.getElementById("errorBox").style.display = "none"
          document.getElementById("container").style.display = "initial"
          document.getElementById("CompanyNews").style.display = "flex"
         
        }
    }).catch(function (error) {
        console.log(error)
        
    });
    
}



// FUNCTION TO VALIDATE THE BUTTON 
function validateBtn (val)  {
    let btnDOM = document.getElementById("button")
   
    // IF THE INPUT HAS A VALUE LENGTH LESS THEN 1 BUTTON IS DISABLED 
    if( val.length <1 ) { 
        btnDOM.disabled = true 
        btnDOM.innerHTML="Enter stock symbol"
  }  // ELSE BUTTON IS ENABLED WITH SOME ADDED TEXT
    else { btnDOM.disabled = false; btnDOM.innerHTML="Request Data" }
}


  return (
    <div className="Content" >
    
     
      <header  className="Content-header col-sm-10 col-md-9 col-lg-6 col-xl-3">
        
        <p id="results"> Stock Info </p>
        <input type="text" id="stocks"  onKeyUp={ (e) => validateBtn(e.target.value) }></input>
        <Button variant="dark" type="button" id="button"  onClick={loadDoc}>Enter a stock symbol  </Button>
        <FaGithub className="col-sm-10 col-md-9 col-lg-6 col-xl-3" id="github" />
      </header> 
      <div id="mains" ></div>
    </div>
  );
 }
}

export default App;
