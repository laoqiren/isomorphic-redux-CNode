import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, Link } from 'react-router'
import {logOut} from '../actions/actions'
import {Button} from 'antd';

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
                        <Button onClick={this.handleLogOut} type="primary">退出登录</Button>
                    </div>
                }
                {
                    !user.name && <div>
                        <Button type="primary"><Link to="/logIn">登录</Link></Button>
                        <Button type="primary"><Link to="/reg">注册</Link></Button>
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