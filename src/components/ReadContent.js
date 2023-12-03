import React, { Component } from 'react';

class ReadContent extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        <span id='info'>{this.props.desc}<br></br></span>
        <img src={this.props.image} alt={this.props.title}></img>        
      </article>
    );
  }
}

export default ReadContent;