import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import fetch from 'isomorphic-fetch'
import {logIn} from '../actions/actions'
import { Input, Button,Icon } from 'antd';

class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            name: '',
            passwd: ''
        }
    }
    handleClick(){
        const {dispatch} = this.props;
        const name = this.state.name,
            passwd = this.state.passwd;
        const content = JSON.stringify({
                name,
                passwd
            })
        fetch('http://localhost:3000/api/log',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                console.log('登录成功')
                dispatch(logIn({
                    name
                }))
                return res.json()
            }
        }).then(token=>{
                localStorage.setItem('token',token)
                browserHistory.push('/')
        })
    }
    render(){
        const { name,passwd } = this.state;
        const suffix = name ? <Icon type="close-circle" onClick={()=>{
            this.setState({ name: '' });
        }} /> : null;
        return (
            <div>
                <h3>登录</h3>
                    <Input
                        placeholder="Enter your userName"
                        prefix={<Icon type="user" />}
                        suffix={suffix}
                        value={name}
                        onChange={(e)=>{
                            this.setState({name:e.target.value})
                        }}
                    />
                    <Input
                        type="password"
                        placeholder="Enter your passwd"
                        prefix={<Icon type="user" />}
                        value={passwd}
                        onChange={(e)=>{
                            this.setState({passwd:e.target.value})
                        }}
                    />
                    <Button type="primary" onClick={this.handleClick}>登录</Button>
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
export default connect(mapStateToProps)(LogIn)