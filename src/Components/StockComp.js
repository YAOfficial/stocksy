import React from "react"
import Plot from 'react-plotly.js';
// react resuable component to show the stock chart read plotly doc for more info on the codes included
  class StockChart extends React.Component {
    render() {
      return (
        <Plot
          data={[
            {
             
              close: this.props.close,
              decreasing: {line: {color: 'red'}},
              high: this.props.high,
              increasing: {line: {color: 'green'}},
              line: {color: 'rgba(31,119,180,1)'},
              low: this.props.low,
              open: this.props.open,
              type: 'candlestick',
            },
          ]}
            layout={{
              width: 800,
              height: 440,
              title: this.props.stocksi,
              dragmode: 'zoom',
              showlegend: false,
              xaxis: {
                  rangeslider: {
                      visible: false
                  }
              },
              yaxis: {
                  autorange: true,
              }
      }}
          
          
        
        />
      );
    }
  }
export default StockChart