import React from 'react';

import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM ,DELETE_TODO_ITEM,INIT_LIST_ACTION,GET_INIT_LIST} from './actionTypes';

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE, /*ADD_TODO_ITEM ,DELETE_TODO_ITEM*/
  value
})

export const getAddDataAction = () => ({
  type: ADD_TODO_ITEM
})

export const getDelAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
})

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
})

//redux-saga 配合
export const getInitAction = () => ({
  type: GET_INIT_LIST
})

//redux-thunk 写法
export const getImgCode = () => {
  return (dispatch) => {
    React.get('/backstage/authCode').then(res => {
      const {authCode} = res.data;
      let _src = 'data:image/jpg;base64,'+authCode;
        const action = initListAction(_src);
        dispatch(action);
        console.log(action);
    })
  }
}