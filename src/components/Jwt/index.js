import React, { Component } from 'react';
import uuid from 'uuid/v4';

import { Inspector } from './Inspector';

export class Jwt extends React.Component {
	state = {
		jwts: [
			{
				id: uuid(),
				value: '',
			},
		],
	};

	updateJwt = id => ({ target: { value } }) => {
		this.setState(prev => ({
			jwts: prev.jwts.map(jwt => {
				if (jwt.id === id) {
					return { id, value };
				}
				
				return jwt;
			}),
		}));
	}

	render () {
		const { jwts } = this.state;
		return (
			<div className="jwts">
				{jwts.map(({ id, value }) => (
					<div className="jwt" key={id}>
						<div className="input">
							<textarea value={value} placeholder="JWT" onChange={this.updateJwt(id)} />
						</div>
						<div className="inspector">
							{value ? <Inspector jwt={value} /> : null}
						</div>
					</div>
				))}
			</div>
		);
	}
}