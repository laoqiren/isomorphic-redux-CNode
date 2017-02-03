import React from 'react';
import {connect} from 'react-redux';
class Item extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const {item} = this.props;
        return (
            <div>
                <h3>文章标题{item.title}</h3>
                文章内容
                <p>{item.content}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
  const { item } = state
  return {
      item
  }
}
export default connect(mapStateToProps)(Item)