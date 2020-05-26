import React, {Component, Fragment} from 'react';
import TodoItem from './TodoItem';
// import './App.css';

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: 'sss',
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addData = this.addData.bind(this);
    this.handleDel = this.handleDel.bind(this);
  }

  render() {
    return (
      <Fragment>
        <h1>TodoList</h1>
        <div><label htmlFor="in">任务名称</label><input id="in" value={this.state.inputValue}
                    onChange={this.handleInputChange}
                    type="text"/>
          <button onClick={this.addData}>添加</button>
        </div>
        <ul>{this.getTodoItem()} </ul>
      </Fragment>
    )
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
        return <TodoItem key={index} item={item} index={index} delFn={this.handleDel}/>
      }
    )
  }
  handleInputChange(e) {
    const val = e.target.value;
    this.setState(() =>({inputValue: val}));
    console.log(e.target.value);
  }

  addData() {
    if (!this.state.inputValue) return;
    this.setState((prevState) =>({
      list: [...this.state.list, this.state.inputValue],// 两种写法 list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }));
  }

  handleDel(i) {
    console.log(i);
    let res = window.confirm('are u ready?...del');
    if (res) {
      /*immutable 不允许state直接做改变，后期优化有影响*/
    /*  const List = this.state.list;
      List.splice(i,1);
      this.setState(() =>({list: List}));*/

    //优化 后
      this.setState((prevState) =>{
        const list = [...prevState.list];
        list.splice(i,1);
        return {list};
      })
    }
  }
}


export default TodoList;
