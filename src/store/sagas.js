import { /*call,*/ put, takeEvery/*, takeLatest */} from 'redux-saga/effects'
import { GET_INIT_LIST } from './actionTypes'
import {initListAction} from './actionCreators';
import React from 'react';


function* getInitList() {
  try {
    const res = yield React.get('/backstage/authCode');
    const {authCode} = res.data;
    let _src = 'data:image/jpg;base64,'+authCode;
    const action = initListAction(_src);
    yield put(action);
  } catch (e) {
    console.log('网络连接失败');
  }
}
function* mySaga() {
  //通过对takeEvery  监听对应的 actionTypes 进行 相应的处理
  yield takeEvery(GET_INIT_LIST, getInitList);
}
export default mySaga;