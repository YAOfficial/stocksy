import React from "react"
import ReactDom from "react-dom"
import '../Stylesheets/CompanyComp.css';
import MarketInfo from "./MarketInfo.js"
/// make a card containg rechart stock market data and put it within cardcollum comapny info
const request = require('request');

request('https://finnhub.io/api/v1/news?category=general&token=bv5umqf48v6phr4c2icg', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
 
  console.log(body)
 body.length = 6

  class MarketComponent extends React.Component{
      render(){

      
          return (
              <>
              {body.map(item => <MarketInfo src={item.image} title={item.headline} words={item.summary} url={item.url} source={item.source} />)}
              </>
          )
      }
  } ReactDom.render(<MarketComponent/>, document.getElementById("marketNewsContainer"))


});



// CREATING THE COMPANY INFO DIV AND GIIVING THE IMG AND H1 TAG VALUES 
class CompanyComp extends React.Component {   
    render(){
    
        return(
        <div id="themain" >
         <div className="card-columns">
       <div  id="companyContainer"></div>
       <div  id="pricesContainer"></div>
       </div>
       <div  id="stocksContainer"></div>
       <div style={{color: "white"}}  id="companyInfo" className="row heads">
         
        </div>
       <div class="card-columns">

       <div  id="companyNewsContainer"></div>
       </div>
        <div style={{color: "white"}} className="row heads">
          Market Info 
        </div>
        <div className="card-columns">
       <div  id="marketNewsContainer"></div>
           </div>
      </div> 
         ) 
        }
  }

export default CompanyComp