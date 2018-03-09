import React, { Component } from 'react';

import { Inspector } from './Inspector';

export class Jwt extends React.Component {
  state = { jwt: '' };

  setJwt = ({ target: { value: jwt } }) => this.setState({ jwt });

  render () {
    const { jwt } = this.state;
    return (
      <div className="split">
        <div>
          <textarea value={jwt} placeholder="JWT" onChange={this.setJwt} />
        </div>
        <div>
          {jwt ? <Inspector jwt={jwt} /> : null}
        </div>
      </div>
    );
  }
}