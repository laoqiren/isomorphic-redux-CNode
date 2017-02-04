import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch'
import {Input,Button} from 'antd'
class Publish extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        const title = this.refs.title.value,
            postContent = this.refs.content.value;
        const content = JSON.stringify({
                title,
                content:postContent
            })
            console.log(`文章:${content}`)
        fetch('http://localhost:3000/api/post',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                console.log('发表文章成功')
                this.refs.title = '';
                this.refs.content = '';
            }
        })
    }
    render(){
        return (
            <div>
                <h3>发表文章</h3>
                    <Input ref="title">
                    </Input>
                    内容:<Input type="textarea" ref="content" autosize={{minRows:10}}>
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