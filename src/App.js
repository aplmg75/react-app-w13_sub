import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from "./components/Control";
// import CreateContent from './components/CreateContent';
// import UpdateContent from './components/UpdateContent';

import './App.css';


import coverImg from "./img/cover.jpg";
import sub1Img from "./img/sub1.png";
import sub2Img from "./img/sub2.jpg";
import sub3Img from "./img/sub3.webp";
import sub4Img from "./img/sub4.jpg";

import PropTypes from "prop-types"






const CreateContent = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target.title.value, e.target.desc.value);
  };

  return (
    <article>
      <h2>Create</h2>
      <form action="/create_process" method="post" onSubmit={handleSubmit}>
        <p><input type='text' name='title' placeholder='title'/></p>
        <p><textarea name="desc" placeholder='description'></textarea></p>
        <p><input type='submit'></input></p>
      </form>
    </article>
  );
};

const UpdateContent = ({ data, onSubmit }) => {
  const [state, setState] = React.useState({
    id: data.id,
    title: data.title,
    desc: data.desc,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state.id, state.title, state.desc);
  };

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value });
  };

  const handleDescChange = (e) => {
    setState({ ...state, desc: e.target.value });
  };

  return (
    <article>
      <h2>Update</h2>
      <form action="/update_process" method="post" onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={state.id} />
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={state.title}
            onChange={handleTitleChange}
          />
        </p>
        <p>
          <textarea
            name="desc"
            placeholder="description"
            value={state.desc}
            onChange={handleDescChange}
          ></textarea>
        </p>
        <p>
          <input type="submit" />
        </p>
      </form>
    </article>
  );
};


class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id=4;
    this.state = {
      mode:'read',
      selected_content_id: 1,
      subject:{title:'정처기', sub:'정보처리기능사'},
      welcome:{title:'Welcome', desc:'정보처리기능사',image:coverImg},
      contents:[
        {id:1, title:'제1과목', desc:'제1과목에는 운영체제의 기초활용/데이터베이스 기초활용/네트워크 기초활용 이 있습니다.운영체제에서는 windows와 unix/linux의 명령어와 프로세스 관리 및 스케줄링에 대하여 배웁니다. 데이터 베이스 에서는 개념과 데이터 모델 구조 기능 등에 관하여 배웁니다. 네트워크 에서는 OSI7계층과 인터넷에 관하여 배웁니다',image:sub1Img},
        {id:2, title:'제2과목', desc:'제2과목에서는 프로그래밍 언어의 종류/C언어/Java/Python에 대하여 배웁니다.프로그래밍 언어의 종류에서는 라이브러리 객체지향 프로그래밍 언어 , 스크립트 언어에 대하여 배웁니다.C언어 에서는 순서도와 C언어의 제어문,포인터와 배열,사용자 정의 함수에 대하여 배웁니다. Java 와 Pyhton에서는 기초와 활용을 배웁니다.',image:sub2Img},
        {id:3, title:'제3과목', desc:'제3과목에서는 애플리케이션 테스트 수행/결함조치 에 대하여 배웁니다.애플리케이션 테스트 수행에서는 애플리케이션의 분류,테스트기법,개발단계,테스트자동화에 관하여 배웁니다.애플리케이션 결함 조치에서는 결함관리와 결함조치 우선순위,결함조치관리 에 대하여 배웁니다.',image:sub3Img},
        {id:4, title:'제4과목', desc:'제4과목에서는 기본 SQL작성하기/고급SQL작성하기를 배웁니다.  sql은 데이터베이스 시스템에서 자료를 처리하는 용도로 사용되는 구조적 데이터 질의 언어. 에스큐엘, 혹은 시퀄이라고 읽습니다.기본에서는 개념과 DDL,DCL,DML,DML-SELECT에 관하여 배웁니다.고급에서는 SQL-JOIN을 배웁니다. SQL은 학습량이 많지만 그만큼 시험에 출제되는 빈도가 높습니다',image:sub4Img},
      ]//여기가 데이터 있는곳
    }
  }

  

  getReadContent(){
    var i =0;
    while(i<this.state.contents.length){var data= this.state.contents[i];
    if(data.id === this.state.selected_content_id){
      return data;
      break;
    }
    i=i+1
  }
  }

  getContent(){
    var _title,
    _desc,
    _image,
    _article= null;
  if(this.state.mode === "welcome"){
    _title = this.state.welcome.title;
    _desc =this.state.welcome.desc;
    _image = this.state.welcome.image;
    _article = (<ReadContent title={_title} desc={_desc} image={_image}></ReadContent>)
  } else if (this.state.mode ==='read'){
    var _content=this.getReadContent()
    
  _article = (<ReadContent title={_content.title} desc={_content.desc} image={_content.image}></ReadContent>)
  } else if (this.state.mode === "create"){
    _article = (<CreateContent onSubmit={function(_title,_desc){
      this.max_content_id = this.max_content_id + 1;
      var _contents = this.state.contents.concat({
        id: this.max_content_id,
        title: _title,
        desc: _desc,
        image:"",
    });
      this.setState({contents: _contents}); 
      
    }.bind(this)}></CreateContent>);
  } else if(this.state.mode === "update"){
    var _content = this.getReadContent();{
      _article = (<UpdateContent 
        data={_content}
        onSubmit={function(_id,_title,_desc){
          var _contents =Array.from(this.state.contents);
          var i = 0;
          while(i <_contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id,title:_title,desc:_desc};
              break;
            }
            i=i+1;
          }
        this.setState({contents: _contents}); 
      }.bind(this)}
      ></UpdateContent>
      )
    }
  }
    return _article;
  }


  render() {//리턴값으로 정보들 전송
    
    return (//여기서 각 파일로 데이터 전송
      <div className='App'>       
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){
            //this.state.mode='welcome'
            this.setState({mode:'welcome'});
          }.bind(this)}> </Subject>
        <TOC onChangePage={function(id){
          this.setState({
            mode: 'read',
            selected_content_id: Number(id)
          });          
        }.bind(this)}
        data={this.state.contents}></TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === "delete"){
            if (window.confirm("really?")){
              var _contents =Array.from(this.state.contents);
              var i = 0;
              while(i <_contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                }
                i=i+1;
              } 
            }
            this.setState({mode:"welcome",contents : _contents});
          }else {
            this.setState({mode: _mode});
          }   
        }.bind(this)}></Control>
        
        {this.getContent()}
      </div>
    );
  }  
}
export default App;