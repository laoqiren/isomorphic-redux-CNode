import React from 'react';
import {connect} from 'react-redux';
import {selectAuthor,fetchPostsIfNeeded,invalidatePosts,fetchItem} from '../actions/actions'
import Picker from './Picker'
import Posts from './Posts'
import Item from './Item'
require('../../assets/styles/app.scss')
class App extends React.Component {
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
    render() {
        const { item,selectedAuthor, posts, isFetching, lastUpdated } = this.props
        console.log(`posts:${posts}`)
        return (
            <div>
                <Picker value={selectedAuthor}
                        onChange={this.handleChange}
                        options={[ 'all', 'luoxia' ]} />
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
                    Refresh
                    </a>
                }
                </p>
                {isFetching && posts.length === 0 &&
                <h2>Loading...</h2>
                }
                {!isFetching && posts.length === 0 &&
                <h2>Empty.</h2>
                }
                {posts.length > 0 &&
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Posts posts={posts} onShow={this.handleShow}/>
                </div>
                }
                <div>
                    {this.props.children}
                </div>

            </div>
        )
  }
}

function mapStateToProps(state) {
  const { selectedAuthor, postsByAuthor, item } = state
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
    item
  }
}
export default connect(mapStateToProps)(App)