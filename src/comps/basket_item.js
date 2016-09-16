/**
 * Created by brightdarkoboahen on 16/09/2016.
 */
import React from 'react';
import { Thumbnail, Button } from 'react-bootstrap';

export default class BasketItem extends React.Component{
    render(){
        return(
            <div>
                <Thumbnail src="https://placehold.it/140x100">
                    <p>{this.props.content.label}</p>
                    <p>{this.props.content.desc}</p>
                    <p>{this.props.content.price}</p>
                </Thumbnail>
            </div>
        )
    }
}

BasketItem.propTypes = {
    content : React.PropTypes.object
};