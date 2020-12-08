import React from "react"

// CREATING THE COMPANY INFO DIV AND GIIVING THE IMG AND H1 TAG VALUES 
class Companyinfo extends React.Component {   
    render(){
        return (
            <>
            <img src={this.props.imglink} />
            <h1>{this.props.name}</h1>
            </>
        )
        }
  }

export default Companyinfo