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
import Card from 'react-bootstrap/Card'
import PredictComp from "./PredictComp.js"
import Plot from 'react-plotly.js';
class App extends React.Component {
  
 render(){
  

  const { DateTime } = require("luxon");
 
 function loadDoc(){


  const stock = document.getElementById("stocks").value;

 
  const request3 = require('request');
  const request4 = require('request');
  setInterval(function(){ 
  request3(`https://finnhub.io/api/v1/stock/price-target?symbol=${stock}&token=bv5umqf48v6phr4c2icg`, { json: true }, (err, res, body) => {
    
  if (err) { return console.log(err); }
  request4(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=bv5umqf48v6phr4c2icg`, { json: true }, (err, res, mane) => {
    if (err) { return console.log(err); }
    console.log(mane)
 
    console.log(body);
    class PredictionComponent extends React.Component{
      render(){
          return (
              <>
             <PredictComp current={mane.c}  name={body.symbol} high={body.targetHigh} low={body.targetLow} mean={body.targetMean} />
              </>
          )
      }
  }ReactDom.render(<PredictionComponent/>, document.getElementById("pricesContainer"))
  });});
}, 5000);
 
  var now = DateTime.local();
  let a = now.toFormat('dd');
  var format = { month: '2-digit'};
  let b =  Intl.DateTimeFormat('en-US', format).format(now)
  console.log(b)
  let year =`${now.c.year}-${b}-${a}`
 
  let pe = now.minus({year: 1});
  

 
  let past1 = `${pe.c.year}-${b}-${a}`
  
    
  
  console.log(year)
  console.log(past1)
        // GETS VALUE OF THE STOCKS TEXT 
        const request2 = require('request');
       
request2(`https://finnhub.io/api/v1/company-news?symbol=${stock.toUpperCase()}&from=${past1}&to=${year}&token=bv5umqf48v6phr4c2icg`, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); } 
  
 body.length = 6
 
 console.log(body)

  class CompanyComponent extends React.Component{
    render(){
if(!body[0]){
  document.getElementById("companyInfo").innerHTML = ""
} else{
  document.getElementById("companyInfo").innerHTML = "Company Info"
}
     
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
           document.getElementById("themain").style.display = "none"
         
          }
          
else {
 // LOG THE RETURNED VALUE FROM THE API 

    console.log(body)
   var dataArray = []
   dataArray.push(body)

   var amo = dataArray

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
    range: 'max',
    
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
      let arr = response.data.chart.result[0].indicators.quote[0]
     console.log(response)
    
     var times = response.data.chart.result[0].timestamp
   
     console.log(times)

     document.getElementById("mains").style.display = "none"
     var format = {year: 'numeric', month: '2-digit' , day: 'numeric'};

     document.getElementById("themain").style.display = "inherit"
     
      class StockChart extends React.Component {
        render() {
          
          return (
          
  <Plot
   
              data={[
                {
                  x: times.map(unix => Intl.DateTimeFormat('en-US', format).format(unix*1000)),
                  close: arr.close,
                  decreasing: {line: {color: 'red'}},
                  high:arr.high,
                  increasing: {line: {color: 'green'}},
                  line: {color: 'rgba(31,119,180,1)'},
                  low: arr.low,
                  open: arr.open,
                  type: 'candlestick',
                },
              ]}
                layout={{
                 
                width: "700",
                  title: stock.toUpperCase(),
                  dragmode: 'zoom',
                  showlegend: false,
                  xaxis: {
                      rangeslider: {
                          visible: true
                      }

                  },
                  yaxis: {
                      autorange: true,
                  }
          }}
          
         
            />
 
         
          );
        }
      }ReactDom.render(<StockChart/>, document.getElementById("stocksContainer"))
     
        // IF THE API DOESNT WORK SHOW ERROR ALERT
       
    }).catch(function (error) {
    
        console.log(error)  
        if(error){
        document.getElementById("themain").style.display = "none"
        

        function AlertDismissibleExample() {
          const [show, setShow] = useState(true);
        
          if (show) {
            return (
              <Alert id="errorBox" variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading variant="success">Oh snap! we couldnt find market data for {document.getElementById("stocks").value}</Alert.Heading>
                <p>
                  You may not be connected to the internet! Also keep in mind this site is only for Us and Canadian stocks either write the stock correctly or try a different symbol.
                </p>
              </Alert>
            );
          } 
         
        
        } ReactDom.render(<AlertDismissibleExample/>, document.getElementById("mains"));
      }
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
        <div id="inputs">
        <input type="text" id="stocks"  onKeyUp={ (e) => validateBtn(e.target.value) }></input>
        <Button variant="light" type="button" id="button"  onClick={loadDoc}>Enter a stock symbol  </Button>
        <FaGithub className="col-sm-10 col-md-9 col-lg-6 col-xl-3" id="github" />
        </div>
      </header> 
      <div id="mains" ></div>
    </div>
  );
 }
}

export default App;
