/**
 * Created by brightdarkoboahen on 16/09/2016.
 */

import React from 'react';
import { Badge, Popover, Overlay, Glyphicon } from 'react-bootstrap';
import '../App.css';
import BasketItem from './basket_item';
/**
 * @constructor
 * @name Checkout
 * Checkout is the component responsible for presenting the basket with items
 * */

export default class Checkout extends React.Component{
    constructor(props){
        super(props);
        this.state = { show : false};
        this.handleClick = evt => {
            this.setState({ target : evt.target, show : !this.state.show});
        }
    }
    renderItemsInBasket(){
        if(this.props.basketItems && this.props.basketItems.length >=1){
            return this.props.basketItems.map((entry, index)  => {
                return (
                    <div key={index}>
                        <BasketItem content={entry} />
                    </div>
                )
            });
        }
    }
    render(){
        return (
            <div onClick={this.handleClick} className="App-checkout">
                <div style={{float:'right'}}>
                    <h4 style={{color:'white'}}>Checkout  <Badge>{this.props.numOfItems}</Badge> <Glyphicon glyph="glyphicon glyphicon-shopping-cart"/></h4>
                </div>
                <Overlay show={this.state.show} target={this.state.target} placement="bottom" container={this} containerPadding={20}>
                    <Popover id="popover-contained" title="Basket">
                        {this.renderItemsInBasket()}
                    </Popover>
                </Overlay>
            </div>
        )
    }
}

Checkout.propTypes = {
    numOfItems : React.PropTypes.number,
    basketItems : React.PropTypes.array
};