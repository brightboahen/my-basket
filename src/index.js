import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
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
ReactDOM.render(
  <App arrayOfItemsToDisplay={data} />,
  document.getElementById('root')
);
