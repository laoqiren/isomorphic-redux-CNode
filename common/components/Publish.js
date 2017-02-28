import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router';
import {Input,Button,Menu,Dropdown} from 'antd'
import {invalidatePosts,fetchUser} from '../actions/actions'
class Publish extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.state = {
            title: '',
            content: '',
            type:'分享',
            isFailed: false
        }
    }
    handleSelect(e){
        this.setState({
            type: e.key
        })
    }
    handleClick(){
        const {dispatch} = this.props
        const title = this.state.title,
            postContent = this.state.content,
            type = this.state.type,
            access_token = localStorage.getItem('token')
        const content = JSON.stringify({
                title,
                type,
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
                dispatch(invalidatePosts(this.props.selectedAuthor));
                dispatch(fetchUser())
                browserHistory.push('/')
            } else {
                this.setState({
                    isFailed: true
                })
            }
        })
    }
    render(){
        const types = (
            <Menu onClick={this.handleSelect} selectedKeys={[this.state.type]}>
                <Menu.Item key="分享">分享</Menu.Item>
                <Menu.Item key="笑话">笑话</Menu.Item>
                <Menu.Item key="提问">提问</Menu.Item>
            </Menu>
        )
        return (
            <div>
                <h3>发表文章</h3>
                    <Input ref="title" onChange={(e)=>this.setState({title: e.target.value})}>
                    </Input>
                    文章版块:<Dropdown.Button overlay={types}>
                        {this.state.type}
                    </Dropdown.Button><br/>
                    内容:<Input type="textarea" ref="content" autosize={{minRows:10}} onChange={(e)=>this.setState({content: e.target.value})}>
                    </Input>
                    <Button type="primary" onClick={this.handleClick}>发表</Button>
                    {
                        this.state.isFailed && <span>发表失败</span>
                    }
            </div>
        )
    }
}

function mapStateToProps(state) {
  const { selectedAuthor,user } = state
  return {
    user,
    selectedAuthor
  }
}
export default connect(mapStateToProps)(Publish)