import React, {Component,Fragment} from 'react';
import TodoItem from './TodoItem';
import TodoListUI from './TodoListUI';
import './App.css';
import store from './store';
import {getInputChangeAction,getAddDataAction ,getDelAction,initListAction} from './store/actionCreators';
import { Modal} from 'antd';
import {  ExclamationCircleOutlined } from '@ant-design/icons';

class TodoList extends Component {

    constructor(props) {
        super(props);
        /* this.state = {
         inputValue: 'sss',
         list: []
         }*/
        this.state = store.getState();
      this.state.img = '';
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addData = this.addData.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleDelItem = this.handleDelItem.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleImage = this.handleImage.bind(this);

        // 订阅
        store.subscribe(this.handleStoreChange);
        console.log(store.getState());
        console.log(store);

    }

  componentWillMount() {
    React.get('/backstage/authCode').then(res => {
      const {authCode} = res.data;
      let _src = 'data:image/jpg;base64,'+authCode;
      this.setState({
        img:_src
      })
      console.log(res);
    })
    console.log('componentWillMount')
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
        console.log('render');
        return (
          <Fragment>
            <TodoListUI inputValue={this.state.inputValue}
                        handleInputChange={this.handleInputChange}
                        handleDelItem={this.handleDelItem}
                        handleDel={this.handleDel}
                        addData={this.addData}
                        list={this.state.list}
            />
            <img src={this.state.img} onClick={this.handleImage} alt=""/>
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

        const action = getInputChangeAction(val);

        /*const action = {
            type: CHANGE_INPUT_VALUE,
            value: val
        };*/

        store.dispatch(action);

        // console.log(val);
        // const val = this.input.value; // 也可以这样写 ref

        // this.setState(() => ({inputValue: val}));
        // console.log(e.target.value);
    }

    // 感知数据变化，同步store数据
    handleStoreChange(e) {
      console.log('xxxx');
      this.setState(store.getState);

    }

    /*新增*/
    addData(val) {
        if (!val) return;

        const action = getAddDataAction();
        /*const action = {
            type:ADD_TODO_ITEM
        };*/
        store.dispatch(action);

        /*this.setState((prevState) => ({
            list: [...this.state.list, val],// 两种写法 list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }), () => {// setState 的异步回调
            // console.log(this.ul.querySelectorAll('li').length);
        });*/

    }

    /*删除*/
    handleDelItem(index) {
        console.log(index);
            /*immutable 不允许state直接做改变，后期优化有影响*/
            /*  const List = this.state.list;
             List.splice(i,1);
             this.setState(() =>({list: List}));*/

          //通过redux删除
          const action = getDelAction(index);
          /*const action = {
            type: DELETE_TODO_ITEM,
            index
          }*/
          store.dispatch(action);


            //优化 后
            /*this.setState((prevState) => {
                const list = [...prevState.list];
                list.splice(index, 1);
                return {list};
            })*/

    }

    /*改变img*/

  handleImage() {
    React.get('/backstage/authCode').then(res => {
      const {authCode} = res.data;
      let _src = 'data:image/jpg;base64,'+authCode;
      this.setState({
        img:_src
      })
      console.log(res);
    })
  }
    // 确认删除
  handleDel(index) {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除该工作任务吗？',
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{this.handleDelItem(index)},
    });
  }
}


export default TodoList;
