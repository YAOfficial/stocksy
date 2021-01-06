import React from "react"
import ReactDom from "react-dom"
import '../Stylesheets/CompanyComp.css';
import MarketInfo from "./MarketInfo.js"

// api call 
const request = require('request');

// here we get the general market news 
request('https://finnhub.io/api/v1/news?category=general&token=bv5umqf48v6phr4c2icg', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
 
  console.log(body)
  // get latest 6 news articles
 body.length = 6
// and we map  through array and use their values
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



// this is our main content component now we make the layout and sort it out 
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