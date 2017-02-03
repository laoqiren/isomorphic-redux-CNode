import React from 'react';

export default class Decrement extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <button className="decrement" onClick={e=>this.handleClick(e)}>
                Decrement
            </button>
        )
    }
    handleClick(e){
        this.props.onDecrement();
    }
}