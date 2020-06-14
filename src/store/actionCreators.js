import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM ,DELETE_TODO_ITEM} from './actionTypes';

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE, /*ADD_TODO_ITEM ,DELETE_TODO_ITEM*/
  value
})

export const getAddDataAction = () => ({
  type: ADD_TODO_ITEM
})

export const getDelAction = (value) => ({
  type: DELETE_TODO_ITEM,
  value
})