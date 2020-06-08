/**
 * Created by maibenben on 2020/5/28.
 */
const defaultState = {
    inputValue: '杨坤最帅',
    list: ['哈哈好好学习','学习使我快乐']
}
// reducer 查询数据
export default (state = defaultState, action) => {
    if (action.type ===  "change_input_value") {
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    if (action.type ===  "add_todo_item") {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';

        return newState;
    }
    console.log(state, action);

    return state;
}