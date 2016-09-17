/**
 * Created by brightdarkoboahen on 16/09/2016.
 */

//Shop item unit test

import React from 'react';
import ShopItem from  '../src/comps/shop_item';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { mount } from 'enzyme';

describe('<ShopItem />', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ShopItem/>,div);
    });

    it('should be able to set props', () => {
        const shopItem = mount(<ShopItem displayImage="imageurl"/>);
        expect(shopItem.props().displayImage).toEqual("imageurl");
    });

    // it('should trigger click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = mount(<ShopItem onButtonClick={onButtonClick}/>);
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick.calledOnce).toEqual(true);
    // });
});

