import React from "react"
import '../Stylesheets/CompanyComp.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
// CREATING THE COMPANY INFO DIV AND GIIVING THE IMG AND H1 TAG VALUES 
class CompanyComp extends React.Component {   
    render(){
        return (
            <Jumbotron id="container"fluid>
       <div  id="companyContainer"></div>
       </Jumbotron>
        )
        }
  }

export default CompanyComp