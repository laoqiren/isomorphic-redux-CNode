import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, Link } from 'react-router'
import fetch from 'isomorphic-fetch'
import {logOut} from '../actions/actions'
import Side from './Side'
import Posts from './Posts'
import { Button,Card,Row,Col,Rate,Icon,Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
class Space extends React.Component {
    constructor(props){
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.state = {
            myposts: []
        }
    }
    handleLogOut(){
        const {dispatch,user} = this.props;
        localStorage.removeItem('token');
        dispatch(logOut())
    }
    componentDidMount(){
        const {dispatch,user} = this.props;
        fetch(`http://localhost:3000/api/post?author=${user.name}`,{
            method: 'GET'
        }).then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(json=>{
            this.setState({
                myposts: json
            })
        })
    }
    render(){
        const {user,posts} = this.props;
        let postsHaveNoComment = posts.filter((post)=>post.discussion.length === 0);
        return (
            <div>
                <Layout>
                    <Content style={{marginRight:'20px'}}>
                        {
                            !user.name && <div style={{minHeight:'400px'}}>
                                <Button type="primary"><Link to="/logIn">登录</Link></Button>/
                                <Button type="primary"><Link to="/reg">注册</Link></Button>
                            </div>
                        }
                        {
                            user.name && <div>
                                <div style={{backgroundColor:'white'}}>
                                    <h3 style={{backgroundColor:'#F0F8FF',padding:'0 10px',marginBottom:'8px'}}><Link to="/"><span style={{color:'#9ACD32'}}>主页/</span></Link></h3>
                                    <div style={{padding:'0 10px'}}>
                                        <img src="https://avatars.githubusercontent.com/u/16136702?v=3&s=120" style={{height:'80px'}}></img>
                                        <span style={{fontSize:'18px',marginLeft:'10px'}}>{user.name}</span>
                                        <br/>
                                        <span style={{color:'red'}}>积分:</span> {user.score}
                                        <br/>
                                        <span>"这家伙很懒，什么都没留下"</span>
                                        <div style={{backgroundColor:'white'}}>
                                            <Link to="/publish">发表文章</Link>
                                            <Button onClick={this.handleLogOut} type="primary">退出登录</Button>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div style={{backgroundColor:'white',marginTop:'20px'}}>
                                    <h3 style={{backgroundColor:'#F0F8FF',padding:'0 10px',marginBottom:'8px'}}><span>我发表的文章</span></h3>
                                    {
                                        this.state.myposts.length ? <Posts posts={this.state.myposts} /> : <span>还没有发表任何文章，去发表一篇让大家开心开心吧</span>
                                    }
                                    
                                </div>
                            </div>
                        }
                        
                </Content>
                <Sider width="300" style={{backgroundColor:"#EDEDED"}}>
                    <Side user={user} postsHaveNoComment={postsHaveNoComment}/>
                </Sider>
                </Layout>
            </div>
        )
    }
}

function mapStateToProps(state) {
  const { selectedAuthor, postsByAuthor,user } = state
  const {
    items: posts
  } = postsByAuthor[selectedAuthor] || {
    items: []
  }
  return {
    posts: posts||[],
    user
  }
}
export default connect(mapStateToProps)(Space)