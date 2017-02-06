import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, Link } from 'react-router'
import {fetchUser} from '../actions/actions'
import List from './List'
import fetch from 'isomorphic-fetch'
import {Button,Menu, Icon,Input} from 'antd'
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
        const {user} = this.props;
        return (
            <div>
                <h3>用户{user.name}</h3>
                <Menu selectedKeys={[this.state.current]} onClick={this.handleNavigator} mode="horizontal">
                    <Menu.Item key="list">
                        <Link to="/">所有文章</Link>
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
                    <Menu.Item key="search">
                        <Search
                            placeholder="搜索用户"
                            style={{ width: 200 }}
                            onSearch={value => console.log(value)}
                        />
                    </Menu.Item>
                </Menu>
                <div>
                    {this.props.children}
                </div>

            </div>
        )
  }
}

function mapStateToProps(state) {
  const { user } = state
  return {
    user
  }
}
export default connect(mapStateToProps)(App)