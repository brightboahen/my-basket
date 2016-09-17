import React, { Component } from 'react';
import { Grid, Row, Col, Navbar, Jumbotron, SplitButton, MenuItem} from 'react-bootstrap';
import http from './http';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import ShopItem from './comps/shop_item';
import Checkout from './comps/checkout';
import './App.css';

const CURRENCY = ['£', '$', '€'];
const NAMES = ['GBP', 'USD', 'EUR'];

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          basket : [],
          currency : CURRENCY[0],
          rateName : NAMES[0]
      }
  }

  componentWillMount(){
      http(`http://www.apilayer.net/api/live`)
          .get({access_key: '25a025ec8605dece53768bf646ad1e73',currencies: ['EUR', 'GBP'],source : 'USD'})
          .then((res) => {
              console.log(res);
          });
  }

  updateBasketData(data){
      let currentBasket = this.state.basket;
      let itemExistsInBasket = currentBasket.some((entry) => {
          return entry.label === data.label;
      });
      if(!itemExistsInBasket){
          currentBasket.push(data);
          this.setState({basket:currentBasket});
      }
  }
  renderShopItems(){
      const self = this;
      if(this.props.arrayOfItemsToDisplay && this.props.arrayOfItemsToDisplay.length >= 1){
          return this.props.arrayOfItemsToDisplay.map( (entry ,index) => {
              return (
                  <Col key={index} md={3}>
                      <ShopItem itemCurrency={this.state.currency} displayImage={entry.imageURL}
                                displayLabel={entry.label}
                                displayDesc={entry.desc}
                                displayPrice={entry.price}
                                dataInfo={entry}
                                basketCallBack={self.updateBasketData.bind(self)}
                      />
                  </Col>
              )
          });
      }
  }

  _onCurrencySelected(eventKey){
      this.setState({currency:CURRENCY[eventKey], rateName:NAMES[eventKey]});
  }

  render() {
    return (
        <div>
            <Navbar inverse fixedTop>
                <Grid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Shop</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <span style={{margin : 10+'px',color:'white', display:'inline-block', float:'right', height:30+'px', width: 140+'px'}}>
                        <SplitButton title="Currency" id={`split-button-basic`}>
                                <MenuItem onSelect={this._onCurrencySelected.bind(this)} eventKey="0">UK Pounds</MenuItem>
                                <MenuItem onSelect={this._onCurrencySelected.bind(this)} eventKey="1">US Dollars</MenuItem>
                                <MenuItem onSelect={this._onCurrencySelected.bind(this)} eventKey="2">Euro</MenuItem>
                        </SplitButton>
                    </span>
                    <Checkout basketCurrency={this.state.currency} basketItems={this.state.basket} numOfItems={this.state.basket.length}/>
                </Grid>
            </Navbar>
            <Jumbotron>
                <h1>Welcome to our groceries shop!</h1>
                <p>Where you can only buy 4 items. Click on the add to basket button to add an item to the basket</p>
            </Jumbotron>
            <Grid bsClass="container">
                <Row className="show-grid">
                    {this.renderShopItems()}
                </Row>
            </Grid>
        </div>
      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}

export default App;

App.propTypes = {
    arrayOfItemsToDisplay : React.PropTypes.array //Number of shop items to render
};
