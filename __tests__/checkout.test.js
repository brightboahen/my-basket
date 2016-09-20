/**
 * Created by brightdarkoboahen on 20/09/2016.
 */
import React from 'react';
import Checkout from  '../src/comps/checkout';
import ReactDOM from 'react-dom';

describe('<Checkout />', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Checkout/>,div);
    });
});