import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch'
import {logIn} from '../actions/actions'
class Reg extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        const {dispatch} = this.props;
        const name = this.refs.name.value,
            passwd = this.refs.passwd.value;
        const content = JSON.stringify({
                name,
                passwd
            })
        fetch('http://localhost:3000/api/reg',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                console.log('注册成功')
                return res.json()
            }
        }).then(json=>{
            localStorage.setItem('token',json)
            dispatch(logIn({
                name
            }))
        })
    }
    render(){
        return (
            <div>
                <h3>注册</h3>
                    账号:
                    <input type="text" ref="name"/>
                    密码:
                    <input type="password" ref="passwd"/>
                    <button onClick={this.handleClick}>发表</button>
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
export default connect(mapStateToProps)(Reg)