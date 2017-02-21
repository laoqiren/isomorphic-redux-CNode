import React, { PropTypes, Component } from 'react'
import Item from './Item';
import { Router, Route, Link } from 'react-router'
import fetch from 'isomorphic-fetch'
import { Card,Row,Col,Rate,Icon } from 'antd';
export default class Posts extends Component {
  constructor(props){
        super(props);
    }
  render() {
    const {onShow,posts} = this.props
    return (
      <div style={{ background: 'white', padding: '30px', minHeight:'600px', fontSize:'16px' }}>
        {posts.map((post, i) =>
          <Row  key={i} style={{borderBottom:'1px solid #EDEDED',height:'50px',lineHeight:'50px',overflow:'hidden'}}>
            <Col span="2">{post.author}:</Col>
            <Col span="2"><span style={{backgroundColor:'green',color:'white'}}>{post.type}</span></Col>
            <Col span="12"><Link className="link" to={"/item/" + post.flag} >{post.title}</Link></Col>
            <Col span="2"><span style={{color:'red'}}>{post.discussion.length}</span>条评论</Col>
            <Col span="6"><span>{post.time.minute}</span></Col>
          </Row>
        )}
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}