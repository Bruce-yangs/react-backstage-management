import React, {Component, Fragment} from 'react';
import TodoItem from './TodoItem';
import './App.css';
import store from './store';

import {Input, List, Typography, Divider} from 'antd';


class TodoList extends Component {

    constructor(props) {
        super(props);
        /* this.state = {
         inputValue: 'sss',
         list: []
         }*/
        this.state = store.getState();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addData = this.addData.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);

        // 订阅
        store.subscribe(this.handleStoreChange);
        console.log(store.getState());
        console.log(store);
    }


    // 在组件即将被挂载到页面的时刻自动执行
    /*componentWillMount() {
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
     }*/


    render() {
        const {Search} = Input;

        console.log('render');
        return (
            <Fragment>
                <h1>TodoList</h1>
                <div><label htmlFor="in">任务名称</label>
                    {/*<input id="in" value={this.state.inputValue}
                     onChange={this.handleInputChange}
                     ref={(input) => {
                     this.input = input
                     }}
                     type="text"/>
                     <button onClick={this.addData}>添加</button>*/}
                    <Search
                        style={{width: 300}}
                        placeholder="input  text"
                        enterButton="Add"
                        size="large"
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                        allowClear
                        onSearch={value => this.addData(value)}
                    />
                </div>
                <Divider orientation="left">TodoList 清单</Divider>
                <List
                    style={{width: 300}}
                    header={<div>各项待完成工作</div>}
                    footer={<div>今日事，今日毕</div>}
                    bordered
                    dataSource={this.state.list}
                    renderItem={item => (
                        <List.Item className="break">
                            <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        </List.Item>
                    )}
                />

                {/*<ul ref={(ul) => {
                 this.ul = ul
                 }}>{this.getTodoItem()} </ul>*/}
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

        const action = {
            type:'change_input_value',
            value: val
        };
        store.dispatch(action);
        // console.log(val);
        // const val = this.input.value; // 也可以这样写 ref

        // this.setState(() => ({inputValue: val}));
        // console.log(e.target.value);
    }

    handleStoreChange(e) {

        this.setState(store.getState);

    }

    addData(val) {
        if (!val) return;

        const action = {
            type:'add_todo_item'
        };
        store.dispatch(action);




        /*this.setState((prevState) => ({
            list: [...this.state.list, val],// 两种写法 list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }), () => {// setState 的异步回调
            // console.log(this.ul.querySelectorAll('li').length);
        });*/

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
            this.setState((prevState) => {
                const list = [...prevState.list];
                list.splice(i, 1);
                return {list};
            })
        }
    }
}


export default TodoList;
