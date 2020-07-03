import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'antd/dist/antd.css';
import {get,post} from './http';
import TodoList from './TodoList';
import store from './store';

React.get = get;
React.post =post;

console.log(React);

//Provider连接store  在Provider下的组件都可以拿到store内的数据
const App = (
  <Provider store={store}>
    <TodoList/>
  </Provider>
);



ReactDOM.render(App, document.getElementById('root'));
// ReactDOM.render(<TodoList/>, document.getElementById('root'));

