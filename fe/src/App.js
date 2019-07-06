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

    // (function() {
    //   this.a = 10;
    //   function sayHello() {
    //     this.b = 20;
    //     function addNumbers() {
    //       return this.a + this.b;
    //     }
    //     alert(addNumbers());
    //   }
    //   sayHello();
    // })();

    // What we did:
    // 1. use setInterval in the componentDidMount method and trigger an update to our API every 1000 ms
    // 2. used arrow function (es6) to lock the value of `this`
    // 3. call setState with the response from the coinbase API example

    // TODO:
    // 1. refactor code (no longer need 2 api calls to the same endpoint)
    // 2. commit and push


    const updateBtcPrice = () => {
      fetch('http://localhost:3000/price')
      .then(function(response) {
        return response.json();
      })
      .then((data) => {
        this.setState({
          bitcoinPrice: data.amount
        });
      });
  
    }
    
    setInterval(updateBtcPrice, 1000);

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
  
