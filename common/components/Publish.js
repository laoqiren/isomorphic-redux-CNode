import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch'
import {Input,Button} from 'antd'
import {invalidatePosts} from '../actions/actions'
class Publish extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            title: '',
            content: ''
        }
    }
    handleClick(){
        const {dispatch} = this.props
        const title = this.state.title,
            postContent = this.state.content,
            access_token = localStorage.getItem('token')
        const content = JSON.stringify({
                title,
                content:postContent,
                access_token
            })
        fetch('http://localhost:3000/api/post',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                this.state.title = '';
                this.state.content = '';
                dispatch(invalidatePosts())
            }
        })
    }
    render(){
        return (
            <div>
                <h3>发表文章</h3>
                    <Input ref="title" onChange={(e)=>this.setState({title: e.target.value})}>
                    </Input>
                    内容:<Input type="textarea" ref="content" autosize={{minRows:10}} onChange={(e)=>this.setState({content: e.target.value})}>
                    </Input>
                    <Button type="primary" onClick={this.handleClick}>发表</Button>
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
export default connect(mapStateToProps)(Publish)