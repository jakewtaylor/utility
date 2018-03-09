import React from 'react';

import { Json } from '../../Json';

export class Inspector extends React.Component {
  state = {
    jwt: false,
    loading: true,
    error: false,
  }

  getDecodeJwtResponseState = (state) => {
    console.log(state);
    if (state.reason && state.part) {
      return { error: state, jwt: false, loading: false };
    } else {
      return { jwt: state, error: false, loading: false };
    }
  }

  setDecodeJwtResponseState = (state) => {
    this.setState(this.getDecodeJwtResponseState(state));
  }

  componentDidMount () {
    this.setState((prev, props) => {
      const jwt = this.decodeJwt(props.jwt);
      
      return this.getDecodeJwtResponseState(jwt);
    });
  }

  componentWillReceiveProps ({ jwt }) {
    if (jwt !== this.props.jwt) {
      this.setState({ loading: true }, () => {
        jwt = this.decodeJwt(jwt);
        
        this.setDecodeJwtResponseState(jwt);
      });
    }
  }

  decodeJwt = (jwt) => {
    jwt = jwt.trim();
    let error;
    const [header, payload, signature] = jwt.split('.').map((part, i) => {
      if (i === 2) return part;
      
      try {
        part = atob(part);
      } catch (e) {
        error = {
          reason: 'Could not decode:',
          part,
        };
        return part;
      }
      
      try {
        part = JSON.parse(part);
      } catch (e) {
        error = {
          reason: 'Could not parse:',
          part,
        };
      }
      
      return part;
    });
    
    return error ? error : { header, payload, signature };
  }
  
  render () {
    const { jwt, error, loading } = this.state;
    
    if (loading) {
      return <p>Loading...</p>;
    }
    
    if (error) {
      return (
        <React.Fragment>
          <p>
            <strong>
              <small>An error occured!</small>
              <br />
              {error.reason}
            </strong>
            <br />
          </p>
          <pre>{error.part}</pre>
        </React.Fragment>
      );
    }
      
    const { header, payload, signature } = jwt;
    return (
      <React.Fragment>
        <p>Header</p>
        <Json json={JSON.stringify(header, null, 4)} />
        
        <p>Payload</p>
        <Json json={JSON.stringify(payload, null, 4)} />
        
        <p>Signature</p>
        <Json json={JSON.stringify(signature)} />
      </React.Fragment>
    );
  }
}