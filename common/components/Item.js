import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router';
import {Button, Icon,Input, Layout,Row, Col} from 'antd'
import {invalidatePosts} from '../actions/actions'
import Side from './Side'
const { Header, Footer, Sider, Content } = Layout;
class Item extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleVote = this.handleVote.bind(this)
        const {posts,params,user} = this.props
        let item = posts.filter((post)=>post.flag === params.id)[0];
        let isLiked = false;
        for(let i=0; i<item.votes.length; i++){
            if(item.votes[i] === user.name){
                isLiked = true;
                break;
            }
        }
        this.state = {
            discussions: item.discussion,
            content: '',
            liked: isLiked,
            authorInfo: {},
            votesNum: item.votes.length
        }
        
    }
    componentDidMount(){
        
        const {posts,params} = this.props
        let item = posts.filter((post)=>post.flag === params.id)[0];
        
        const content = JSON.stringify({
            access_token: localStorage.getItem('token'),
            author: item.author
        })
        fetch('/api/getUserInfo',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                
                return res.json()
            }
        }).then(json=>{
            this.setState({
                authorInfo: json
            })
            console.log('接受到的用户信息')
            console.log(json)
        })
    }
    handleVote(){
        const {posts,params,user,dispatch} = this.props;
        let item = posts.filter((post)=>post.flag === params.id)[0];
        if(user.name){
            const content = JSON.stringify({
                flag: params.id,
                access_token: localStorage.getItem('token')
            })
            fetch('/api/vote',{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Content-Length": content.length.toString()
                },
                body: content
            }).then(res=>{
                if(res.ok){
                    dispatch(invalidatePosts(this.props.selectedAuthor));
                    this.setState({
                        liked: true,
                        votesNum: this.state.votesNum + 1
                    })
                }
            })
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
        fetch('/api/comment',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                dispatch(invalidatePosts(this.props.selectedAuthor))
                this.setState({
                    discussions: [...this.state.discussions,{
                        content: this.state.content,
                        author: user,
                        time: minute
                    }]
                })
            }
        })
    }
    render(){
        const {posts,params,user} = this.props;
        let item = posts.filter((post)=>post.flag === params.id)[0]
        let postsHaveNoComment = posts.filter((post)=>post.discussion.length === 0);
        return (
            <div>
                <Layout>
                    <Content style={{marginRight:'20px',minHeight:'600px'}}>
                        <Layout style={{backgroundColor:'white',padding:'15px'}}>
                            <Header style={{backgroundColor:'white',minHeight:'120px',padding:'0px',borderBottom:'1px solid #EDEDED'}}>
                                <span>
                                    <span style={{backgroundColor:'green',color:'white',fontSize:'18px',textAlign:'center'}}>{item.type}</span>
                                    <span style={{fontSize:'20px',fontWeight:'bold',marginLeft:'20px'}}>{item.title}</span>
                                </span>
                                <br/>
                                <span><span style={{fontSize:'bold',color:'red'}}>发布于:</span>{item.time.minute} <span style={{fontSize:'bold',color:'red'}}>作者:</span>{item.author}
                                </span>
                            </Header>
                            <Content style={{minHeight:'200px',marginTop:'20px',fontSize:'16px',overflow:'auto',borderBottom:'1px solid #EDEDED',backgroundColor:'white'}}>
                                <p>{item.content}</p>
                            </Content>
                            <Footer style={{padding:'0'}}>
                                <Row>
                                    <Col span="20"></Col>
                                    <Col span="2">  
                                        {
                                            this.state.liked ? <Icon type="like" style={{color: 'red',fontSize:'20px'}}/>:<Icon type="like-o" onClick={this.handleVote} style={{color: 'black',fontSize:'20px'}}/>
                                        }
                                    </Col>
                                    <Col span="2">已获得{this.state.votesNum}个赞</Col>
                                </Row>
                                <div style={{borderBottom:'1px solid #EDEDED'}}>
                                    <h3>{this.state.discussions.length}条回复:</h3>
                                    
                                        <ul>
                                        {
                                        this.state.discussions.map((discussion,i)=>
                                            <li key={i} style={{borderBottom:'1px solid #EDEDED',marginBottom:'5px'}}>
                                                <h4>{discussion.author.name} <span style={{color:'blue'}}>{i+1}楼 > {discussion.time} </span></h4>
                                                <p style={{fontSize:'14px'}}>{discussion.content || '空'}</p>
                                            </li>
                                        )}
                                        </ul>
                                </div>
                                {
                                user.name && <div style={{marginTop:'10px'}}>
                                    <h3>添加回复:</h3>
                                    <Input type="textarea" ref="content" autosize={{minRows:10}} onChange={(e)=>this.setState({content: e.target.value})}>
                                    </Input>
                                    <Button type="primary" onClick={this.handleClick}>回复</Button>
                                </div>
                                }
                            </Footer>
                        </Layout>
                    </Content>
                    <Sider width="300" style={{backgroundColor:'#EDEDED',height:'180px'}}>
                        <Side user={this.state.authorInfo} isOther={true}postsHaveNoComment={postsHaveNoComment}/>
                    </Sider>
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