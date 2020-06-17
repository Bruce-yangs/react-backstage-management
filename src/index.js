import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import {get,post} from './http';
import TodoList from './TodoList';

React.get = get;
React.post =post;

console.log(React);



ReactDOM.render(<TodoList/>, document.getElementById('root'));

