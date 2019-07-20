import { message } from 'antd';
//user 的 model
export default {
  namespace: 'user',
  state: {
    userInfo: window.localStorage.getItem('userInfo')
      ? JSON.parse(window.localStorage.getItem('userInfo'))
      : null,
  },

  //异步
  // effects: {
  //   *login(action, { put }) {
  //     let response = yield fetch('/auth/sign-in', {
  //       method: 'POST',
  //       body: JSON.stringify(action.payload),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     let res = yield response.json();
  //     console.log(res);
  //     if (res.code === -1) {
  //       message.info(res.msg);
  //     }else{
  //       message.info("登录成功")
  //     }
  //   },
  // },
  //修改仓库数据
  reducers: {
    setUserInfo(state, action) {
      return { ...state, ...{ userInfo: action.userInfo } };
    },
  },
};
