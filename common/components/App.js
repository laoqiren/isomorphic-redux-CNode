import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, Link } from 'react-router'
import {fetchUser} from '../actions/actions'
import List from './List'
import fetch from 'isomorphic-fetch'
require('../../assets/styles/app.scss')
class App extends React.Component {
    constructor(props){
        super(props);
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
                console.log('发表文章成功')
                return res.json();
            } else {
            }
        }).then(json=>{
            if(json){
                dispatch(fetchUser(json))
            }
        })
    }
    render() {
        const {user} = this.props;
        return (
            <div>
                <h3>用户{user.name}</h3>
                <Link to="/">所有文章</Link>
                <br/>
                {
                    user.name && <Link to="/publish">发表文章</Link>
                }
                
                <br/>
                <Link to="/space">我的</Link>
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