import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, Link } from 'react-router'
import {fetchUser} from '../actions/actions'
import List from './List'
import fetch from 'isomorphic-fetch'
import {Button,Menu, Icon,Input, Layout} from 'antd'
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;
require('../../assets/styles/app.scss')
class App extends React.Component {
    constructor(props){
       super(props);
       this.handleNavigator = this.handleNavigator.bind(this)
       this.state = {
           current: 'list'
       }
    }
    handleNavigator(e){
        this.setState({
            current: e.key
        })
    }
    componentDidMount(){
        const {dispatch} = this.props;
        const token = localStorage.getItem('token');
        const content = JSON.stringify({
                access_token: token
            })
        fetch('http://localhost:3000/api/user',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                return res.json();
            } else {
                console.log('获取用户失败')
            }
        }).then(json=>{
            dispatch(fetchUser(json))
        })
    }
    render() {
        
        const {user,posts} = this.props;
        let postsHaveNoComment = posts;
        return (
            <div id="hey">
                <Menu selectedKeys={[this.state.current]} theme="dark" onClick={this.handleNavigator} mode="horizontal">
                    <Menu.Item key="search">
                        <Search
                            placeholder="搜索用户"
                            style={{ width: 200 }}
                            onSearch={value => console.log(value)}
                        />
                    </Menu.Item>
                    <Menu.Item key="list">
                        <Link to="/">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="space" key="space">
                        <Link to="/space">个人中心</Link>
                    </Menu.Item>
                    {
                        user.name && (
                            <Menu.Item key="publish">
                                <Link to="/publish">发表文章</Link>
                            </Menu.Item>
                        )
                    }
                    {
                        user.name && <Menu.Item>用户:{user.name}</Menu.Item>
                    }
                    {
                        !user.name && <Menu.Item><Link to="/logIn">未登录</Link></Menu.Item>
                    }
                    
                </Menu>
                <Layout >
                    <Layout>
                        <Content style={{backgroundColor: '#EDEDED', padding:"0 50px"}}>
                            <Layout>
                                <Content style={{marginRight:'20px'}}>
                                    <div>
                                        {this.props.children}
                                    </div>
                                </Content>
                                <Sider width="300" style={{backgroundColor:"#EDEDED"}}>
                                    <div style={{backgroundColor:'white',height:'180px',margin:'20px 0 10px 0'}}>
                                        <h4 style={{backgroundColor:'#F0FFF0'}}>个人信息</h4>
                                        <div style={{padding:'8px'}}>
                                            <img src="https://avatars.githubusercontent.com/u/16136702?v=3&s=120" style={{height:'80px'}}></img>
                                            <span style={{fontSize:'18px',marginLeft:'10px'}}>{user.name}</span>
                                            <br/>
                                            <span style={{color:'red'}}>积分:</span> 266
                                            <br/>
                                            <span>"这家伙很懒，什么都没留下"</span>
                                        </div>
                                    </div>
                                    <div style={{backgroundColor:'white',height:'180px',marginBottom:'10px',overflow:'hidden'}}>
                                        <h4 style={{backgroundColor:'#F0FFF0'}}>无人回复的话题</h4>
                                        <div style={{padding:'8px'}}>
                                            <ul>
                                                {
                                                    postsHaveNoComment.map((post,i)=>
                                                        <li key={i}>
                                                        <Link className="link" to={"/item/" + post.flag} >{post.title}
                                                        </Link>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div style={{backgroundColor:'white',height:'180px',marginBottom:'10px'}}>
                                        <h4 style={{backgroundColor:'#F0FFF0'}}>积分榜</h4>
                                    </div>
                                </Sider>
                            </Layout>
                        </Content>
                    </Layout>
                    <Footer style={{ textAlign: 'center' }}>
                        created by Xia Luo
                    </Footer>
                </Layout>
            </div>
        )
  }
}

function mapStateToProps(state) {
  const { user,postsByAuthor,selectedAuthor } = state
  const {
    items: posts
  } = postsByAuthor[selectedAuthor] || {
    items: []
  }
  return {
    user,
    posts: posts||[]
  }
}
export default connect(mapStateToProps)(App)