export default {
  namespace: 'student',
  state: {
    list: [], //学生数据
    limit: 5,//每页显示的条数
    page:1,//当前页数
    total: 1,//数据的总条数
  },

  effects: {
    *getList(action,{ put, select }) {
        let page = action.page;
        let limit = action.pageSize;
        let url = `http://localhost:3000/student?_page=${page}&_limit=${limit}`;
        let response = yield fetch(url);
        let res = yield response.json();
        let total = yield parseInt(response.headers.get('X-Total-Count')) ;
        yield put({ 
            type: "setList",
            list: res ,
            total,
            page,
            limit
            })
    }
  },

  reducers: {
    //设置list
    setList(state, action) {
      return Object.assign({}, state, {
        list: action.list,
        total: action.total,
        page: action.page,
        limit: action.limit
      });
    },
  },
};
