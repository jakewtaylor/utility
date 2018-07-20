const { icpRenderer } = require('electron');

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

icpRenderer.send('async', 1);

icpRenderer.on('async-reply', (event, arg) => {
    console.log(arg);
});

ReactDOM.render(
	<App />,
    document.getElementById('root'),
);
