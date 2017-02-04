import React from 'react';
import {connect} from 'react-redux';
import { Router, Route, Link } from 'react-router'
import {fetchUser} from '../actions/actions'
import List from './List'
require('../../assets/styles/app.scss')
class App extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {dispatch} = this.props;
        const token = localStorage.getItem('token');
        if(token){
            dispatch(fetchUser(token))
        }
    }
    render() {
        const {user} = this.props;
        return (
            <div>
                <h3>用户{user.name}</h3>
                <Link to="/list">所有文章</Link>
                <Link to="/publish">发表文章</Link>
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