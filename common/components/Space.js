import React from 'react';
import {connect} from 'react-redux';

class Space extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                {
                    user && <div>
                        <Link to="/publish">发表文章</Link>
                        <button onClick={this.handleLogOut}>退出登录</button>
                    </div>
                }
                {
                    !user && <div>
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
export default connect(mapStateToProps)(App)