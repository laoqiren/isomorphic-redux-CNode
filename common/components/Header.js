import React from 'react';
import { Router, Route, Link } from 'react-router'
import {Button,Menu, Icon,Input, Layout} from 'antd'
const Search = Input.Search;
export default class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
           current: 'list'
       }
        this.handleNavigator = this.handleNavigator.bind(this)
    }
    handleNavigator(e){
        this.setState({
            current: e.key
        })
    }
    render(){
        const {user,logOut} = this.props;
        return (
            <div>
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
                        !user.name && <Menu.Item><Link to="/Space">未登录</Link></Menu.Item>
                    }
                    {
                        user.name && (
                            <Menu.Item key="logout">
                                <span onClick={()=>logOut()}>退出</span>
                            </Menu.Item>
                        )
                    }
                </Menu>
            </div>
        )
    }
}