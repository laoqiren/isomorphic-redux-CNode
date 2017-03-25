import React, { PropTypes, Component } from 'react'
import Item from './Item';
import { Router, Route, Link } from 'react-router'
import fetch from 'isomorphic-fetch'
import { Card,Row,Col,Rate,Icon,Pagination } from 'antd';
export default class Posts extends Component {
  constructor(props){
        super(props);
        const {posts} = this.props;
        this.state = {
          currentPage: 1,
          currentPosts: posts.slice(0,15)
        };
        this.onChange = this.onChange.bind(this);
        
    }
  onChange(page,total){
    const {posts} = this.props;
    console.log(posts.length)
    this.setState({
      currentPage: page,
      currentPosts: page*15>posts.length?posts.slice((page-1)*15): posts.slice((page-1)*15,page*15)
    })
  }
  render() {
    const {onShow,posts} = this.props;
    return (
      <div style={{ background: 'white', padding: '30px', minHeight:'600px', fontSize:'16px' }}>
        {this.state.currentPosts.map((post, i) =>
          <Row  key={i} style={{borderBottom:'1px solid #EDEDED',height:'50px',lineHeight:'50px',overflow:'hidden'}}>
            <Col span="2">{post.author}:</Col>
            <Col span="2"><span style={{backgroundColor:'green',color:'white'}}>{post.type}</span></Col>
            <Col span="12"><Link className="link" to={"/item/" + post.flag} >{post.title}</Link></Col>
            <Col span="2"><span style={{color:'red'}}>{post.discussion.length}</span>条评论</Col>
            <Col span="6"><span>{post.time.minute}</span></Col>
          </Row>
        )}
        <Pagination style={{marginTop:'5px'}}showQuickJumper defaultCurrent={1} total={posts.length}  onChange={this.onChange} />
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}