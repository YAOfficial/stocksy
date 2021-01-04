import React from "react"
import Card from 'react-bootstrap/Card'
import {ListGroup} from 'react-bootstrap'
// CREATING THE COMPANY INFO DIV AND GIIVING THE IMG AND H1 TAG VALUES 
class PredictComp extends React.Component {   

    render(){
     
        return (
            <>
            
            <Card >
  <Card.Header>Stock Predictions for {this.props.name}</Card.Header>
  <ListGroup variant="flush">
  <ListGroup.Item>Last updataed current price: {this.props.current}</ListGroup.Item>
    <ListGroup.Item>Highest price targeted to reach: {this.props.high}</ListGroup.Item>
    <ListGroup.Item>Lowest price targeted to reach: {this.props.low}</ListGroup.Item>
    <ListGroup.Item>average price targeted to reach: {this.props.mean}</ListGroup.Item>
  </ListGroup>
</Card>
            </>
        )
        }
  }

export default PredictComp