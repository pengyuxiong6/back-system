//user 的 model
export default {
  namespace: 'user',
  state: {
    username: '一帆',
  },

  //异步
  effects: {
    *login(action, { put }) {
      let response = yield fetch('http://localhost:3000/user', {
        method: 'POST',
        body: JSON.stringify(action.payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let res = yield response.json();
      console.log(res);
      yield put({ type: 'setUserName', name: res.username })
    },
  },
  //修改仓库数据
  reducers: {
    setUserName(state, action) {
      return { ...state, ...{ username: action.name } };
    },
  },
};
