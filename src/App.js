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
          rateName : NAMES[0],
          rate : 1
      }
  }

  componentWillMount(){
      http(`http://www.apilayer.net/api/live`)
          .get({access_key: '25a025ec8605dece53768bf646ad1e73',currencies: ['EUR', 'GBP'],source : 'USD'})
          .then((res) => {
              let currencyObj = JSON.parse(res);
              this.currencyQuotes = currencyObj.quotes;
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

  removeItemFromBasket(itemLabel){
      let filteredBag = this.state.basket.filter( (item) => {
          return item.label !== itemLabel
      });

      this.setState({ basket : filteredBag});
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
                                displayPrice={String((entry.price/this.state.rate).toFixed(2))}
                                dataInfo={entry}
                                basketCallBack={self.updateBasketData.bind(self)}
                      />
                  </Col>
              )
          });
      }
  }

  _onCurrencySelected(eventKey){
      const quotes = this.currencyQuotes;
      let currencyRate  = 0;
      switch (eventKey){
          case '0':
              currencyRate = 1;
              break;
          case '1':
              currencyRate = quotes["USDGBP"];
              break;
          case '2':
              currencyRate = quotes["USDEUR"];
              break;
          default:
              break;
      }
      this.setState({currency:CURRENCY[eventKey], rateName:NAMES[eventKey], rate : currencyRate});
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
                    <Checkout basketCurrency={this.state.currency}
                              basketItems={this.state.basket}
                              checkoutRate={this.state.rate}
                              numOfItems={this.state.basket.length}
                              removeBasketItemCallback={this.removeItemFromBasket.bind(this)}
                    />
                </Grid>
            </Navbar>
            <Jumbotron>
                <div className="App-jumbotron">
                    <h1>Welcome to our groceries shop!</h1>
                    <p>Where you can only buy 4 items. Click on the add to basket button to add an item to the basket</p>
                </div>
            </Jumbotron>
            <Grid bsClass="container">
                <Row className="show-grid">
                    {this.renderShopItems()}
                </Row>
            </Grid>
        </div>
    );
  }
}

export default App;

App.propTypes = {
    arrayOfItemsToDisplay : React.PropTypes.array //Number of shop items to render
};
