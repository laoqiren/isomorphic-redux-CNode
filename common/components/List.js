import React from 'react';
import {connect} from 'react-redux';
import Picker from './Picker'
import Posts from './Posts'
import Side from './Side'
import {selectAuthor,fetchPostsIfNeeded,invalidatePosts,fetchItem} from '../actions/actions'
import { Spin ,Button,Menu, Icon,Input, Layout} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Row, Col } from 'antd';

class List extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
        this.handleShow = this.handleShow.bind(this)
    }
    componentDidMount(){
        const {dispatch,selectedAuthor} = this.props;
        dispatch(fetchPostsIfNeeded(selectedAuthor))
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.selectedAuthor !== this.props.selectedAuthor){
            console.log('我要加载新的subreddit了')
            const {dispatch,selectedAuthor} = nextProps;
            dispatch(fetchPostsIfNeeded(selectedAuthor))
        }
    }
    handleChange(nextAuthor){
        this.props.dispatch(selectAuthor(nextAuthor));
    }
    handleRefreshClick(e) {
        e.preventDefault()

        const { dispatch, selectedAuthor } = this.props
        dispatch(invalidatePosts(selectedAuthor))
        dispatch(fetchPostsIfNeeded(selectedAuthor))
    }
    handleShow(id){
        const {dispatch} = this.props;
        dispatch(fetchItem(id));
    }
    render(){
        const { item,selectedAuthor, posts, isFetching, lastUpdated,user} = this.props;
        let postsHaveNoComment = posts.filter((post)=>post.discussion.length === 0);
        return (
            <div>
                <Layout>
                    <Content style={{marginRight:'20px'}}>
                        <div>
                            <p>
                            {lastUpdated &&
                                <span>
                                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                                {' '}
                                </span>
                            }
                            {!isFetching &&
                                <a href='#'
                                onClick={this.handleRefreshClick}>
                                刷新
                                </a>
                            }
                            </p>
                            {isFetching && posts.length === 0 &&
                            <Spin/>
                            }
                            {!isFetching && posts.length === 0 &&
                            <h2>Empty.</h2>
                            }
                            {posts.length > 0 &&
                            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                                <Posts posts={posts} onShow={this.handleShow}/>
                            </div>
                            }
                        </div>
                    </Content>
                    <Sider width="300" style={{backgroundColor:"#EDEDED",marginTop:'20px'}}>
                        <Side user={user} postsHaveNoComment={postsHaveNoComment}/>
                    </Sider>
                </Layout>
            </div>
        )
    }
}

function mapStateToProps(state) {
  const { selectedAuthor, postsByAuthor, item, user } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByAuthor[selectedAuthor] || {
    isFetching: true,
    items: []
  }
  return {
    selectedAuthor,
    posts: posts||[],
    isFetching,
    lastUpdated,
    item,
    user
  }
}
export default connect(mapStateToProps)(List)