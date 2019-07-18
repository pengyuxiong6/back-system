import styles from './index.less';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import React from "react";

//表格列的数据表现
const columns = [
  {
    title: '序号', //列名
    dataIndex: 'id', //用数据的那个来渲染这个列
  },
  {
    title: '名字',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    //自定义显示模板
    render: (text, row, index) => {
      //text  当前行的指定属性的数据
      //row   当前行的数据 { id: 1,name: "",age, sex }
      return <div>{text === 1 ? '男' : '女'}</div>;
    },
  },
  {
    title: '操作',
    render: (text, row, index) => {
      return (
        <div>
          <Button>修改</Button>
          <Button
            onClick={() => {
              alert('当前的id是' + row.id);
            }}
          >
            删除
          </Button>
        </div>
      );
    },
  },
];

class Student extends React.Component {
  render() {
    return (
      <div>
        <Table dataSource={this.props.data} columns={columns}
        pagination= {{
            total: this.props.total,//数据总条数
            defaultPageSize:this.props.limit,//默认每页显示多少条
            onChange: (page, pageSize) => {
                console.log(page,pageSize);
                this.props.getList(page, pageSize);
            }
        }}
        rowKey="id" />
      </div>
    );
  }

  componentDidMount() {
      this.props.getList();
  }
}

export default connect(
  state => {
    return {
      data: state.student.list,
      limit: state.student.limit,
      total: state.student.total,
    };
  },
  dispatch => {
    return {
        //获取学生列表
        //page 请求的页码
        //pageSize 请求每页的条数
      getList: (page = 1, pageSize = 5) => {
        dispatch({ 
            type: 'student/getList',
            page,
            pageSize
        });
      },
    };
  },
)(Student);
