import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch'
import {Button, Icon,Input, Layout,Row, Col} from 'antd'
import {invalidatePosts} from '../actions/actions'
const { Header, Footer, Sider, Content } = Layout;
class Item extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            content: ''
        }
    }
    handleClick(e){
        const {params,user,dispatch} = this.props;
        const date = new Date();
        const minute = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        const content = JSON.stringify({
            content: this.state.content,
            author: user,
            flag: params.id,
            time: minute,
            access_token: localStorage.getItem('token')
        })
        fetch('http://localhost:3000/api/comment',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                this.state.content = '';
                dispatch(invalidatePosts(this.props.selectedAuthor))
            }
        })
    }
    render(){
        const {posts,params} = this.props;
        let item = posts.filter((post)=>post.flag === params.id)[0]
        return (
            <div>
                <Layout>
                    <Content style={{padding:'20px'}}>
                        <Layout style={{backgroundColor:'white',padding:'20px 15px'}}>
                            <Header style={{backgroundColor:'white',minHeight:'120px',padding:'0px',borderBottom:'1px solid #EDEDED'}}>
                                <span>
                                    <span style={{backgroundColor:'green',color:'white',fontSize:'18px',textAlign:'center'}}>{item.type}</span>
                                    <span style={{fontSize:'20px',fontWeight:'bold',marginLeft:'20px'}}>{item.title}</span>
                                </span>
                                <br/>
                                <span><span style={{fontSize:'bold',color:'red'}}>发布于:</span>{item.time.minute} <span style={{fontSize:'bold',color:'red'}}>作者:</span>{item.author}
                                </span>
                            </Header>
                            <Content style={{minHeight:'200px',marginTop:'20px',fontSize:'16px',overflow:'auto',borderBottom:'1px solid #EDEDED'}}>
                            <p>{item.content}</p>
                            </Content>
                            <Footer style={{padding:'0'}}>
                                <div style={{borderBottom:'1px solid #EDEDED'}}>
                                    <h3>{item.discussion.length}条回复:</h3>
                                    
                                        <ul>
                                        {
                                        item.discussion.map((discussion,i)=>
                                            <li key={i} style={{borderBottom:'1px solid #EDEDED',marginBottom:'5px'}}>
                                                <h4>{discussion.author.name} <span style={{color:'blue'}}>{i+1}楼 > {discussion.time} </span></h4>
                                                <p style={{fontSize:'14px'}}>{discussion.content || '空'}</p>
                                            </li>
                                        )}
                                        </ul>
                                </div>
                                <div style={{marginTop:'10px'}}>
                                    <h3>添加回复:</h3>
                                    <Input type="textarea" ref="content" autosize={{minRows:10}} onChange={(e)=>this.setState({content: e.target.value})}>
                                    </Input>
                                    <Button type="primary" onClick={this.handleClick}>回复</Button>
                                </div>
                            </Footer>
                        </Layout>
                    </Content>
                </Layout>
            </div>
        )
    }
}

function mapStateToProps(state) {
  const { postsByAuthor,selectedAuthor,user} = state
  const {
    items: posts
  } = postsByAuthor[selectedAuthor] || {
    items: []
  }
  return {
    posts: posts||[],
    user,
    selectedAuthor
  }
}
export default connect(mapStateToProps)(Item)