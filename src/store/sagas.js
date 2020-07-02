import { /*call,*/ put, takeEvery/*, takeLatest */} from 'redux-saga/effects'
import { GET_INIT_LIST } from './actionTypes'
import {initListAction} from './actionCreators';
import React from 'react';


function* getInitList() {
  try {
    const res = yield React.get('/backstage/authCode');
    const action = initListAction(res.data);
    yield put(action);
    console.log(action);
  }catch (e) {
    console.log('网络连接失败');
  }
}
function* mySaga() {
  //通过对takeEvery  监听对应的 actionTypes 进行 相应的处理
  yield takeEvery(GET_INIT_LIST, getInitList);
}
export default mySaga;