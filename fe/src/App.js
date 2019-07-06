import React, { Component } from 'react';
import './App.css';
import Post from './Post.js';
import { withLDProvider } from 'launchdarkly-react-client-sdk';
import BtcPrice from './BtcPrice';


class App extends Component {
  //constructor sets default state of properties loaded from the API
  constructor() {
    super();
    this.state = { bitcoinPrice: 0.0, contentfulData:[] };
  }

  //getPrice is a helper method to extract the bitcoin price from the state
  getPrice = () => {
    return this.state.bitcoinPrice;
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/price')
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      this.setState({
        bitcoinPrice: data.amount
      });
    });

    fetch('http://localhost:3000/content')
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      this.setState({
        contentfulData: data 
      })
    });
  }

   
  //getContentfulData is a helper method to extract contentful data from the state
  getContentfulData = () => {
    return this.state.contentfulData;
  }

  render() {
    const postComponents = this.getContentfulData().map(function(element, index){
      return(<Post title={element.title} body={element.body} key={index}/>)
    })

    return (
      <div className="App">
          <h1>Contentful-Coinbase Integration</h1>
          <h2>Made by Karla</h2>
          <BtcPrice price={this.getPrice()}/>
          {postComponents}
      </div>
    );
  }

}

export default withLDProvider({ 
  clientSideID: '5d210846fda0f10766fdfd94',
  options: { }
})(App);
  
