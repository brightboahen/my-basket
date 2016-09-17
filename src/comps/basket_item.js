/**
 * Created by brightdarkoboahen on 16/09/2016.
 */
import React from 'react';
import { Panel } from 'react-bootstrap';

export default class BasketItem extends React.Component{
    render(){
        return(
            <div>
                <Panel header={[(this.props.content.label + ' x '+ this.props.itemAmount),
                    ( ' @ ' + this.props.currency+' '+ this.props.content.price + ' each ')]}
                       footer={this.props.children}>
                </Panel>
            </div>
        )
    }
}

BasketItem.propTypes = {
    content : React.PropTypes.object,
    itemAmount : React.PropTypes.number,
    currency   : React.PropTypes.string
};