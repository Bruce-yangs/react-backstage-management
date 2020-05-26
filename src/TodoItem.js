import React, {Component} from 'react';
import PropTypes from 'prop-types'

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.handleDelItem = this.handleDelItem.bind(this);
    }

    // 一个组件要从父组件接受参数
    // 只要父组件的render函数被重新执行了,子组件的这个生命周期函数就会被执行
    // 如果该组件第一次存在于父组件中，不会被执行
    // 如果之前存在，才会被执行
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps');
    }
    // 移除，才会被执行
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    // 在组件被更新之前自动执行 返回 布尔值
    shouldComponentUpdate(nextProps,nextState) {
        if (nextProps.item !== this.props.item) {
            return true;
        } else {
            return false;
        }
        console.log('TodoItem--- shouldComponentUpdate');
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

// 校验传输类型
TodoItem.propTypes = {
    // item: PropTypes.string.isRequired, //isRequired 必填
    // item: PropTypes.arrayOf(PropTypes.number,PropTypes.string), // 数组中可以是数字，也可以是字符串
    // item: PropTypes.oneOfType([PropTypes.number,PropTypes.string]), // 数据可以是数字，也可以是字符串
    item: PropTypes.string.isRequired,
    delFn: PropTypes.func,
    index: PropTypes.number
}

// 设置默认值
TodoItem.defaultProps = {
    item: '嘻嘻哈哈'
}


export default TodoItem;
