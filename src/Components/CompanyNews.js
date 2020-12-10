import React from "react"
import '../Stylesheets/CompanyComp.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'
import {ListGroup, ListGroupItem} from 'react-bootstrap'


class CompanyNews extends React.Component {   
    render(){
        return (
            <>
            <Card className="col-sm-6 col-md-6 col-lg-4 col-xl-12" >
           
            <Card.Img variant="top" src={this.props.src} />
            <Card.Body>
              <Card.Title>{this.props.title}</Card.Title>
              <Card.Text>
              {this.props.source}
            
              </Card.Text>
            </Card.Body>
            
            <Card.Body>
            <Card.Text>
              {this.props.words}
            </Card.Text>
              <Card.Link href={this.props.url}>View Story</Card.Link>
              
            </Card.Body>
          </Card>
         
          </>
        )
        }
  }

export default CompanyNews