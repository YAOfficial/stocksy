import React from "react"
import Card from 'react-bootstrap/Card'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
// CREATING THE COMPANY INFO DIV AND GIIVING THE IMG AND H1 TAG VALUES 
class Companyinfo extends React.Component {   
    render(){
        return (
            <>
            
            
            <Card id="myCard" border="primary"  style={{ width: "20vw" }}>
  <Card.Img variant="top"  className="stocklogo" src={this.props.imglink} />
  <Card.Body>
    <Card.Title>{this.props.name}</Card.Title>
    
  </Card.Body>
  <ListGroup  className="flush listG">
    <ListGroupItem > Industry: {this.props.industry}</ListGroupItem>
    <ListGroupItem>Market-Cap: {this.props.networth1} (in millions)  </ListGroupItem>
    <ListGroupItem>Ipo'ed at : {this.props.ipo} </ListGroupItem>
  </ListGroup>
  
</Card>
            </>
        )
        }
  }

export default Companyinfo