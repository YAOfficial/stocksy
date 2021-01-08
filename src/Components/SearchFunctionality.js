import '../Stylesheets/Content.css';
import React, { useState } from 'react';
import ReactDom from "react-dom"
import axios from "axios";
import Companyinfo from "./CompanyInfo"
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { FaGithub } from 'react-icons/fa';
import CompanyNews from "./CompanyNews.js"
import PredictComp from "./PredictComp.js"
import Plot from 'react-plotly.js';
class App extends React.Component {
  
 render(){
  

  const { DateTime } = require("luxon");
 
 function loadDoc(){

// getting the value of the input and saving it to a "stock" variable
  const stock = document.getElementById("stocks").value;

  // api call :
  const request3 = require('request');
  const request4 = require('request');

  // this following code is a mistake but after working on it i got burned out to fix , ill come back to this 
  // and fix it 

  //intrepolating the value of the variable "stock" which = the value of the input and we do an api call on it
  request3(`https://finnhub.io/api/v1/stock/price-target?symbol=${stock}&token=bv5umqf48v6phr4c2icg`, { json: true }, (err, res, body) => {
  
  if (err) { return console.log(err); } 
  // interpolating stock  as explained above
  request4(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=bv5umqf48v6phr4c2icg`, { json: true }, (err, res, mane) => {
    if (err) { return console.log(err); }
    
    // simple react reusable component to get the api values and use them in our componenet on another file
    class PredictionComponent extends React.Component{
      render(){
          return (
              <>
             <PredictComp name={body.symbol} high={body.targetHigh} low={body.targetLow} mean={body.targetMean} ></PredictComp>
              </>
          )
      }
  }ReactDom.render(<PredictionComponent/>, document.getElementById("pricesContainer"))
  });});

 // getting the time using luxon framework 
  var now = DateTime.local();
  // formating time 
  let a = now.toFormat('dd');
  var format = { month: '2-digit'};
  let b =  Intl.DateTimeFormat('en-US', format).format(now)
  console.log(b)

  // getting the years month and day 
  let year =`${now.c.year}-${b}-${a}`
 
  // minus year by 1 
  let pe = now.minus({year: 1});
  let past1 = `${pe.c.year}-${b}-${a}`

       // another api call 
        const request2 = require('request');
       // using the stock variable and the time values we made above to do an api call
request2(`https://finnhub.io/api/v1/company-news?symbol=${stock.toUpperCase()}&from=${past1}&to=${year}&token=bv5umqf48v6phr4c2icg`, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); } 
  // get only 6 latest news articles
 body.length = 6
 
 // same react reusable component i mentioned above
  class CompanyComponent extends React.Component{
    render(){

      // if there is no Company mews remove "Company info" text
if(!body[0]){
  document.getElementById("companyInfo").innerHTML = ""
} else{
  // else let the text equal to the the value below
  document.getElementById("companyInfo").innerHTML = "Company Info"
}
     // getting the api value and using it on a react component in another file
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
           // if there is api error remove all content expect error message and header 
           document.getElementById("themain").style.display = "none"
          }
          
else {
 // LOG THE RETURNED VALUE FROM THE API and save it to an array named "dataArray"
   var dataArray = []
   dataArray.push(body)

   // RUN THROUGH THE ARRAY AND ADD VALUES TO VARIABLES TO USE ON ELEMENTS
    class CompanyDiv extends React.Component {
   
        render() {
        // the market cap was presented as a full number example: "23232323232" i wanted to present in a formated way example "32,3232,32" so users can better understand
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
    // here we make the symbol we are getting equal to the input value
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

      // getting the qoutes array
      let arr = response.data.chart.result[0].indicators.quote[0]

      // getting timestamp array
     var times = response.data.chart.result[0].timestamp
     document.getElementById("mains").style.display = "none"

     // formatting date for the api
     var format = {year: 'numeric', month: '2-digit' , day: 'numeric'};

     // if api is a succes show the content
     document.getElementById("themain").style.display = "inherit"
     
      class StockChart extends React.Component {
        render() {
          
          return (
          
  <Plot
   
              data={[
                {
                  // we map through timestamp array and convert them into real dates example: "343434343" into "2020 01 03"
                  x: times.map(unix => Intl.DateTimeFormat('en-US', format).format(unix*1000)),
                  // read plotly doc for more info on the bottom since its not important to describe each line
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
        document.getElementById("mains").style.display = "inherit"
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
        <a   href="https://github.com/YAOfficial/stocksy"  target="_blank" rel="noopener noreferrer">
              <FaGithub  id="github" />
            </a>
        </div>
      </header> 
      <div id="mains" ></div>
    </div>
  );
 }
}

export default App;
