import React from 'react';
import { withLDConsumer } from 'launchdarkly-react-client-sdk';
import Header from './Header';
import Ticker from './Ticker';

class BtcPrice extends React.Component {
  render() {
    // guard statement
    if (this.props.flags.showBtcPrice === false) {
      return (<h3>Ticker Disabled</h3>);
    }

    return (
      <div>
        <Header/>
        <Ticker price={this.props.price}/>
      </div>
    );
  }
}


export default withLDConsumer()(BtcPrice);





