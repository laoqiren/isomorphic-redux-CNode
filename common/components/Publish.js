import React from 'react';
import {connect} from 'react-redux';

class Publish extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <h3>发表文章</h3>
                <form>
                    <input type="text" name="title">
                    </input>
                    内容:<textarea name="content">
                    </textarea>
                    <button onClick={this.handleClick}></button>
                </form>
            </div>
        )
    }
}