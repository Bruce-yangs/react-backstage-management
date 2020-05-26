import React, {Component} from 'react';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.handleDelItem = this.handleDelItem.bind(this);
  }

  render() {
    const {item} = this.props;
    return (
      <li onClick={this.handleDelItem}>{item}</li>
    )
  }

  handleDelItem() {
    const {delFn, index} = this.props;
    delFn(index);
  }
}


export default TodoItem;
