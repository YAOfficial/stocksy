import React from "react"
import '../Stylesheets/CompanyComp.css';
import Card from 'react-bootstrap/Card'
// here we use the values from the api basic react resuable component stuff 
class CompanyInfo extends React.Component {   
    render(){
        return (
            <Card >
            <Card.Img fluid variant="top" src={this.props.src} />
            <Card.Body>
              <Card.Title>{this.props.title.substring(0, 70)}...</Card.Title>
              <Card.Text>
              {this.props.source}
            
              </Card.Text>
            </Card.Body>
            
            <Card.Body>
            <Card.Text>
              {this.props.words.substring(0, 70)}...
            </Card.Text>
              <Card.Link href={this.props.url}>View Story</Card.Link>
              
            </Card.Body>
          </Card>
        )
        }
  }

export default CompanyInfo