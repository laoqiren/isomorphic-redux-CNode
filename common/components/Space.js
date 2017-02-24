import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, Link } from 'react-router'
import {logOut} from '../actions/actions'
import Side from './Side'
import { Button,Card,Row,Col,Rate,Icon,Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
class Space extends React.Component {
    constructor(props){
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    handleLogOut(){
        const {dispatch} = this.props;
        localStorage.removeItem('token');
        dispatch(logOut())
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
                        <div style={{padding:'0 10px 20px'}}>
                        {
                                user.name ? <div><img src="https://avatars.githubusercontent.com/u/16136702?v=3&s=120" style={{height:'80px'}}></img>
                            <span style={{fontSize:'18px',marginLeft:'10px'}}>{user.name}</span>
                            <br/>
                            <span style={{color:'red'}}>积分:</span> {user.score}
                            <br/>
                            <span>"这家伙很懒，什么都没留下"</span></div>:<Button type="primary"><Link to="/logIn">登录</Link></Button>
                        }
                        </div>
                    </div>
                    {
                        user.name && <div>
                            <Link to="/publish">发表文章</Link>
                            <Button onClick={this.handleLogOut} type="primary">退出登录</Button>
                        </div>
                    }
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