import React, { PropTypes, Component } from 'react'
import Item from './Item';
import { Router, Route, Link } from 'react-router'

export default class Posts extends Component {
  constructor(props){
        super(props);
    }
  render() {
    const {onShow} = this.props
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}><Link onClick={()=>onShow(post.id)} to={'/item/'+post.id}>{post.title}</Link></li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}