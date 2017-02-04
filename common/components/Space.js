import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, Link } from 'react-router'
import {logOut} from '../actions/actions'

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
        const {user} = this.props;
        return (
            <div>
                {
                    user.name && <div>
                        <Link to="/publish">发表文章</Link>
                        <button onClick={this.handleLogOut}>退出登录</button>
                    </div>
                }
                {
                    !user.name && <div>
                        <Link to="/logIn">登录</Link>
                        <Link to="/reg">注册</Link>
                    </div>
                }
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
export default connect(mapStateToProps)(Space)