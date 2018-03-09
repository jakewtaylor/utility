import React, { Component } from 'react';

export class Json extends Component {
  getColor = (type) => {
    switch (type) {
      case 'number':
        return '#B15534';
      case 'key':
        return '#D44A3E';
      case 'string':
        return '#96B753';
      case 'null':
      case 'boolean':
        return '#56B6C2';
      default:
        return '#ABB2BF';
    }
  }
  
  parse = (json) => {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const testRe = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
    return json.replace(testRe, (match) => {
        let type = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                type = 'key';
            } else {
                type = 'string';
            }
        } else if (/true|false/.test(match)) {
            type = 'boolean';
        } else if (/null/.test(match)) {
            type = 'null';
        }
      
        const color = this.getColor(type);
      
        return `<span style="color: ${color};">${match}</span>`;
    });
  }
  
  render () {
    const { json } = this.props;
    const parsed = this.parse(json);
    
    return (
      <pre style={{ fontSize: 16, fontWeight: 'bold', color: '#ABB2BF' }} dangerouslySetInnerHTML={{ __html: parsed }} />
    );
  }
}