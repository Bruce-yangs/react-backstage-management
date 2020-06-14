import React, { Component,Fragment } from 'react';
import {Input, List, Typography, Divider} from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

class TodoListUI extends Component {
  render() {
    const {Search} = Input;

    return (
      <Fragment>
        <h1>TodoList</h1>
        <div className="addTaskName"><label htmlFor="in" className="label">任务名称</label>
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
            value={this.props.inputValue}
            onChange={this.props.handleInputChange}
            allowClear
            onSearch={value => this.props.addData(value)}
          />
        </div>
        <Divider orientation="left">TodoList 清单</Divider>
        <List
          style={{width: 300}}
          header={<div>各项待完成工作</div>}
          footer={<div>今日事，今日毕</div>}
          bordered
          locale={{emptyText:'暂无数据'}}
          dataSource={this.props.list}
          renderItem={(item,index) => (
            <List.Item className="break" >
              <div className="content" style={{display:'flex',justifyContent: 'space-between'}}>
                <div>
                  <Typography.Text mark>[ITEM]</Typography.Text> {item}
                </div>
                <CloseCircleOutlined  onClick={()=>{this.props.handleDel(index)}}/>
              </div>

            </List.Item>
          )}
        />
      </Fragment>
    )
  }
}
export default TodoListUI;