import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, Link } from 'react-router'
import {fetchUser,selectAuthor} from '../actions/actions'
import List from './List'
import MyHeader from './Header'
import Side from './Side'
import fetch from 'isomorphic-fetch'
import {logOut} from '../actions/actions'
import {Button,Menu, Icon,Input, Layout} from 'antd'
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

require('../../assets/styles/app.scss')
class App extends React.Component {
    constructor(props){
       super(props);
       this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout(){
        const {dispatch} = this.props;
        localStorage.removeItem('token');
        dispatch(logOut());
    }
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(fetchUser())
    }
    render() {
        const {user,posts} = this.props;
        return (
            <div id="hey">
                <Layout>
                    <MyHeader logOut={this.handleLogout} user={user}/>
                    <Content style={{backgroundColor: '#EDEDED', padding:"15px 5%"}}>
                        {this.props.children}
                    </Content>
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