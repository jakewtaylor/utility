import React, { Component } from 'react';

import { Jwt } from './components/Jwt';

export class App extends Component {
	sidebarItems = [
		{
			text: 'JWT',
			value: 'jwt',
		},
		{
			text: 'Unix Epoch',
			value: 'unixepoch',
		},
	];
	
	state = { page: this.sidebarItems[0].value };

	handlePageChange = page => () => this.setState({ page });

	closeClicked = (e) => {
		e.preventDefault();
		console.log('close');
        }

	renderPage () {
		const { page } = this.state;
		
		switch (page) {
			case 'jwt':
				return <Jwt />;
			default:
				return <p>404</p>;
		}
	}
	
	render () {
		const { page } = this.state;
		return (
			<div className="app">
				<header className="header">
					<a onClick={this.closeClicked}>Close</a>
				</header>
				<aside className="sidebar">
					<ul>
						{this.sidebarItems.map((item) => (
							<li key={item.value}>
								<a
									href="#"
									className={item.value === page ? 'active' : ''}
									onClick={this.handlePageChange(item.value)}
								>
									{item.text}
								</a>
							</li>
						))}
					</ul>
				</aside>
				<main>
					{this.renderPage()}
				</main>
			</div>
		);
	}
}
