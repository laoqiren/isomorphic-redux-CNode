import React from 'react';
import { Router, Route, Link } from 'react-router'
import {Button,Menu, Icon,Input, Layout} from 'antd'

export default class Side extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            sortUsers: []
        }
    }
    componentDidMount(){
        fetch('http://localhost:3000/api/sortUsers',{
            method: 'GET'
        }).then(res=>{
            if(res.ok){
                return res.json();
            } else {
                console.log('获取排名失败')
            }
        }).then(json=>{
            this.setState({
                sortUsers: json
            })
        })
    }
    render(){
        const {user,postsHaveNoComment,isOther} = this.props;
        return (
            <div>
                <div style={{backgroundColor:'white',marginBottom:'10px'}}>
                    <h4 style={{backgroundColor:'#F0FFF0'}}>
                        {
                            isOther ? <span>作者信息</span> : <span>用户信息</span>
                        }
                    </h4>
                    <div style={{padding:'8px'}}>
                        {
                            (user.name || isOther) &&  <div><img src="https://avatars.githubusercontent.com/u/16136702?v=3&s=120" style={{height:'80px'}}></img>                        <span style={{fontSize:'18px',marginLeft:'10px'}}>{user.name}</span>                
                            <br/> 
                            <span style={{color:'red'}}>积分:</span> {user.score}
                            <br/>
                            <span>"这家伙很懒，什么都没留下"</span></div>
                        }
                        {
                          (!isOther && !user.name) && <Button type="primary"><Link to="/logIn">登录</Link></Button>
                        }
                        
                    </div>
                </div>
                <div style={{backgroundColor:'white',height:'180px',marginBottom:'10px',overflow:'hidden'}}>
                    <h4 style={{backgroundColor:'#F0FFF0'}}>无人回复的话题</h4>
                    <div style={{padding:'8px'}}>
                        {
                            postsHaveNoComment.length === 0 && <span>暂无</span>
                        }
                        <ul>
                            {
                                postsHaveNoComment.map((post,i)=>
                                    <li key={i} >
                                    <Link className="link" to={"/item/" + post.flag} >{post.title}
                                    </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div style={{backgroundColor:'white',height:'180px',overflow:'hidden',marginBottom:'10px'}}>
                    <h4 style={{backgroundColor:'#F0FFF0'}}>积分榜</h4>
                    <div style={{padding:'8px'}}>
                    <ul>
                        {
                            this.state.sortUsers.map((user,i)=><li key={i}>{user.name}: {user.score}</li>)
                        }
                    </ul>
                    </div>
                </div>
            </div>
        )
    }
}