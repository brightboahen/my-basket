/**
 * Created by brightdarkoboahen on 16/09/2016.
 */

import React from 'react';
import { Badge, Popover, Overlay, Glyphicon, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
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
        this.state = { show : false, total : 0, itemCount : []};
        this.isRoot = true;
        this.handleClick = evt => {
            if(this.isRoot){
                this.setState({ target : evt.target, show : !this.state.show});
            }
        };
    }

    componentWillReceiveProps(nextProps){
        this.initItemInBasketSize(nextProps);
    }

    initItemInBasketSize (props){
        this.setState({ itemCount : props.basketItems.map( item => ({label : item.label, amount: 1, price: item.price})) });
    }

    updateItemCount(itemObj, sign) {
        this.isRoot = false;
        let itemCount = this.state.itemCount.map((item) => {
            if (item.label === itemObj.label) {
                if(sign === 'plus'){
                    let v = item.amount;
                    v += 1;
                    item.amount = v;
                    return item;
                }else{
                    item.amount -= 1;
                    return item;
                }
            }
            return item;
        });
        this.setState({ itemCount : itemCount });
        this._calculateTotalAmount();
    }

    renderItemsInBasket(){
        if(this.props.basketItems && this.props.basketItems.length >=1){
            return this.props.basketItems.map((entry, index)  => {
                return (
                    <div className="App-basket-item" key={index}>
                        <BasketItem basketRate={this.props.checkoutRate} currency={this.props.basketCurrency} content={entry} itemAmount={this._findItemAmountInProps(entry)}>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <Button onClick={this.updateItemCount.bind(this,entry,'minus')}>
                                        <Glyphicon glyph="glyphicon glyphicon-minus"/>
                                    </Button>
                                    <Button onClick={this.updateItemCount.bind(this,entry,'plus')}>
                                        <Glyphicon glyph="glyphicon glyphicon-plus"/>
                                    </Button>
                                    <Button onClick={this.callBackParentNodeToDeleteItemFromBasket.bind(this,entry.label)}>
                                        <Glyphicon glyph="glyphicon glyphicon-trash"/>
                                    </Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </BasketItem>
                    </div>
                )
            });
        }
    }

    callBackParentNodeToDeleteItemFromBasket(label){
        this.isRoot = false;
        if(this.props.removeBasketItemCallback){
            this.props.removeBasketItemCallback(label);
        }
    }

    _onHide(){
        this.isRoot = true;
        this.setState({show : !this.state.show});
    }

    _calculateTotalAmount(){
        return this.state.itemCount.reduce((prev, cur) => {
            return (prev + cur.amount * ((cur.price / this.props.checkoutRate).toFixed(2)));
        }, 0);
    }

    _findItemAmountInProps(param){
        let indexPos = this.state.itemCount.findIndex( item => {
            return item.label === param.label;
        });
        if(indexPos !== -1){
            return this.state.itemCount[indexPos].amount;
        }
        return 1;
    }

    render(){
        return (
            <div onClick={this.handleClick} className="App-checkout">
                <div style={{float:'right'}}>
                    <h4 style={{color:'white'}}>Checkout <Badge>{this.props.numOfItems}</Badge>
                        <Glyphicon glyph="glyphicon glyphicon-shopping-cart"/>
                    </h4>
                </div>
                <Overlay rootClose onHide={this._onHide.bind(this)}  show={this.state.show} target={this.state.target} placement="bottom" container={this} containerPadding={20}>
                    <Popover id="popover-contained" title="Basket">
                        {this.renderItemsInBasket()}
                        <div>
                            <span>Total </span>
                            <span>{ this.props.basketCurrency+' '+this._calculateTotalAmount()}</span>
                        </div>
                    </Popover>
                </Overlay>
            </div>
        )
    }
}

Checkout.propTypes = {
    numOfItems : React.PropTypes.number,
    basketItems : React.PropTypes.array,
    basketCurrency : React.PropTypes.string,
    checkoutRate : React.PropTypes.number,
    removeBasketItemCallback : React.PropTypes.func
};