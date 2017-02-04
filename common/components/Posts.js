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
    const {onShow} = this.props
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row>
        {this.props.posts.map((post, i) =>
          <Col span={10} key={i}><Card extra={
            <span>
            author:{post.author}
            time:{post.time.minute}
            <Icon type="heart-o" style={{color:'red'}}/></span>
          }style={{marginLeft: "16px",marginBottom:"16px"}}title={post.title}><Link onClick={()=>onShow(post.id)} to={'/detail/'+post.id}>{post.content}</Link></Card></Col>
        )}
        </Row>
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}