export default {
  namespace: 'student',
  state: {
    list: [], //学生数据
    searchName: "",//搜索关键字
    limit: 5,//每页显示的条数
    page:1,//当前页数
    total: 1,//数据的总条数
  },

  effects: {
    *getList(action,{ put, select }) {
        let page = yield select(state => state.student.page);
        let limit = yield select(state => state.student.limit);
        let searchName = yield select(state => state.student.searchName);

        page = action.page || page;
        limit = action.pageSize || limit;
        searchName = action.searchName || searchName;
        let url = `http://localhost:3000/student?_page=${page}&_limit=${limit}&name_like=${searchName}`;
        let response = yield fetch(url);
        let res = yield response.json();
        let total = yield parseInt(response.headers.get('X-Total-Count')) ;
        yield put({ 
            type: "setList",
            list: res ,
            total,
            page,
            limit,
            searchName
            })
    },
    //删除某个学生
    *delStu(action,{ put }) {
        //1. 学生id
        let id = action.id;
        //2. 请求
        let response = yield fetch(`http://localhost:3000/student/${id}`,{
            method: "DELETE",
        });
        let res = yield response.json();
        //3.1 直接操作仓库
        // yield put({ type: "delStusync", id });
        //3.2 可以让 getList 重新执行
        yield put({ type: "getList" })
    }
  },

  reducers: {
    //设置list
    setList(state, action) {
      return Object.assign({}, state, {
        list: action.list,
        total: action.total,
        page: action.page,
        limit: action.limit,
        searchName: action.searchName
      });
    },
    delStusync(state,{ id }) {
        //将list 中的某一项给删除
        //得到要删除的学生在学生集合中的下标
        let index = state.list.findIndex(item => item.id === id);
        let newList = [...state.list];
        newList.splice(index,1);
        return Object.assign({},state, {
            list: newList
        })
    }
  },
};
