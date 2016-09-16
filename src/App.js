import React, { Component } from 'react';
import { Grid, Row, Col, Navbar, Jumbotron} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import ShopItem from './comps/shop_item';
import Checkout from './comps/checkout';
import './App.css';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          basket : []
      }
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
                      <ShopItem displayImage={entry.imageURL}
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
                    <Checkout basketItems={this.state.basket} numOfItems={this.state.basket.length}/>
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
