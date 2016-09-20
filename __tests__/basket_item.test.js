/**
 * Created by brightdarkoboahen on 20/09/2016.
 */
import React from 'react';
import BasketItem from  '../src/comps/basket_item';
import ReactDOM from 'react-dom';

const data = [
    {
        imageURL : 'https://placehold.it/350x150',
        label : 'Peas',
        desc : 'Healthy peas at an affordable price',
        price : '0.95'
    },
    {
        imageURL : 'https://placehold.it/350x150',
        label : 'Eggs',
        desc : 'You cannot get Eggs this cheap',
        price : '2.10'
    },
    {
        imageURL : 'https://placehold.it/350x150',
        label : 'Milk',
        desc : 'Cheap milk for cheapos',
        price : '1.30'
    },
    {
        imageURL : 'https://placehold.it/350x150',
        label : 'Beans',
        desc : 'Cheap beans',
        price : '0.73'
    },
];

describe('<BasketItem />', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BasketItem content={data[0]} itemAmount={1} currency={'£'}/>,div);
    });
});