import React, { Component } from 'react';

class TOC extends Component {
  render() {
    var lists = [];
    var data = this.props.data;//App.js에서 TOC에서 전송 <TOC data={this.state.contents}></TOC>
    var i = 0;
    while (i < data.length){
      lists.push(
        <li key={data[i].id}> 
         
       
        <a id='hed' href={"/content/" + data[i].id} 
        data-id={data[i].id} 
        onClick={function(e){
        e.preventDefault(e);
       // this.props.mode = 'welcome';
       
        this.props.onChangePage(e.target.dataset.id);
        }.bind(this)}
        >{data[i].title}</a></li>);// data[i].id이거는 App.js에서 가져온거
      i = i + 1;      
    }

    return (
      <nav>
        {lists}
      </nav>
    );
  }
}

export default TOC;