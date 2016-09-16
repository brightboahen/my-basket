/**
 * Created by brightdarkoboahen on 16/09/2016.
 */
import React from 'react';
import { Thumbnail, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// import logo from '../logo.svg';

/**
 * @constructor
 * @name ShopItem
 * ShopItem component represents a single item on the shop page eg. Eggs
 * */

export default class ShopItem extends React.Component{
    constructor(props){
        super(props);
    }
    _onMouseClick(){

        if(this.props.basketCallBack){
            this.props.basketCallBack(this.props.dataInfo);
        }
    }
    render(){
        return (
            <div>
                <Thumbnail src={this.props.displayImage}>
                    <h3>{this.props.displayLabel}</h3>
                    <p>{this.props.displayDesc}</p>
                    <p>{this.props.displayPrice}</p>
                    <p>
                        <Button bsStyle="primary" onClick={this._onMouseClick.bind(this)}>Add to basket</Button>
                    </p>
                </Thumbnail>
            </div>
        )
    }
}

ShopItem.propTypes = {
    displayImage    : React.PropTypes.string,
    displayPrice    : React.PropTypes.string,
    displayLabel    : React.PropTypes.string,
    displayDesc     : React.PropTypes.string,
    dataInfo        : React.PropTypes.object,
    basketCallBack  : React.PropTypes.func
};