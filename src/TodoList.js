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

  // 在组件即将被挂载到页面的时刻自动执行
    componentWillMount() {
    console.log('componentWillMount')
    }

  // 在组件被挂载到页面的时刻自动执行  一般在此生命周期里写请求接口
    componentDidMount() {
    console.log('componentDidMount')
    }


  // 在组件被更新之前自动执行 返回 布尔值
    shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
    }

  // 在组件被更新之前，且在shouldComponentUpdate 返回true 后会自动执行，false不执行  render在更新生命周期后才执行
    componentWillUpdate() {
    console.log('componentWillUpdate');
    }

    // 在组件被更新之后自动执行 在render之后
    componentDidUpdateUpdate() {
        console.log('componentDidUpdateUpdate');
    }


  render() {
      console.log('render');
      return (
      <Fragment>
        <h1>TodoList</h1>
        <div><label htmlFor="in">任务名称</label>
          <input id="in" value={this.state.inputValue}
                    onChange={this.handleInputChange}
                 ref={(input) => {this.input = input}}
                    type="text"/>
          <button onClick={this.addData}>添加</button>
        </div>
        <ul ref={(ul) =>{this.ul = ul}}>{this.getTodoItem()} </ul>
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
    // const val = this.input.value; // 也可以这样写 ref
    this.setState(() =>({inputValue: val}));
    console.log(e.target.value);
  }

  addData() {
    if (!this.state.inputValue) return;
    this.setState((prevState) =>({
      list: [...this.state.list, this.state.inputValue],// 两种写法 list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }),() => {// setState 的异步回调
        console.log(this.ul.querySelectorAll('li').length);
    });
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
