import React from 'react';
import {connect} from 'react-redux';
class Item extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const {posts,params} = this.props;
        let item = posts.filter((post)=>post.flag === params.id)[0]
        return (
            <div>
                <h3>文章标题{item.title}</h3>
                文章内容
                <p>{item.content}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
  const { postsByAuthor,selectedAuthor } = state
  const {
    items: posts
  } = postsByAuthor[selectedAuthor] || {
    items: []
  }
  return {
    posts: posts||[]
  }
}
export default connect(mapStateToProps)(Item)