import React from "react"
import Card from 'react-bootstrap/Card'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
// here we use the values from the api basic react resuable component stuff 
class Companyinfo extends React.Component {   

    render(){
     
        return (
            <>
            
    <Card    text="dark"  >
  <Card.Img variant="top"  className="stocklogo" src={this.props.imglink} />
  <Card.Body  >
    <Card.Title id="names" text="primary">{this.props.name}</Card.Title>
    
  </Card.Body>
  <ListGroup className="flush listG">
    <ListGroupItem>Industry:  {this.props.industry}</ListGroupItem>
    <ListGroupItem>Market Cap: <span id="marketcap">{this.props.networth1}</span>  </ListGroupItem>
    <ListGroupItem>Ipo'ed at : {this.props.ipo} </ListGroupItem>
  </ListGroup>
  
</Card>
            </>
        )
        }
  }

export default Companyinfo