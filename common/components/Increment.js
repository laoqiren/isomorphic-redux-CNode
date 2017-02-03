import React from 'react';

export default class Increment extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <button className="increment" onClick={e=>this.handleClick(e)}>
                increment
            </button>
        )
    }
    handleClick(e){
        this.props.onIncrement();
    }
}