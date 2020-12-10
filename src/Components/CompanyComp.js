import React from "react"
import ReactDom from "react-dom"
import '../Stylesheets/CompanyComp.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import MarketInfo from "./MarketInfo.js"
import Card from 'react-bootstrap/Card'


const request = require('request');

request('https://finnhub.io/api/v1/news?category=general&token=bv5umqf48v6phr4c2icg', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
 
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
        return (
            <Jumbotron id="container"fluid>
       <div  id="companyContainer"></div>
       <div id="CompanyNews" >
           <Card.Body>
              <Card.Title  >Company News</Card.Title>
              </Card.Body>
             
       <div  id="companyNewsContainer">
       </div>
       </div>
       <div > <Card.Body>
              <Card.Title>Market News</Card.Title>
              </Card.Body>
       <div  id="marketNewsContainer">
           </div>
           </div>
      
      
       </Jumbotron>
        )
        }
  }

export default CompanyComp