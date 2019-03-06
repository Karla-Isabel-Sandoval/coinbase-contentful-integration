import React from 'react';

class Ticker extends React.Component {
    render() {
      return (
        <div>
          <h3>{this.props.price} BTC-USD </h3>
          </div>
      );
    }
  }

  export default Ticker;