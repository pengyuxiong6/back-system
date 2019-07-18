import styles from './index.less';
import { Table, Button, Input, Popconfirm, Modal,Form } from 'antd';
import { connect } from 'dva';
import React from 'react';

class Student extends React.Component {
state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  //表格列的数据表现
  columns = [
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
            <Button onClick={this.showModal}>修改</Button>
            <Popconfirm
              title="你真的要删除哇"
              onCancel={() => {
                console.log('取消了');
              }}
              onConfirm={() => {
                this.props.delStu(row.id);
              }}
            >
              <Button>删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  
  render() {
    return (
      <div>
        {/* 1. 字符串的形式，this.refs.myInput
          2. 函数的形式， this.myInput
          <Input ref="myInput"/> */}
        <Input
          className={styles.inp}
          ref={el => {
            this.myInput = el;
          }}
        />
        <Button
          onClick={() => {
            console.log(this.myInput.state.value);
            this.props.getList(1, this.props.limit, this.myInput.state.value);
          }}
        >
          搜索
        </Button>
        <Table
          dataSource={this.props.data}
          columns={this.columns}
          pagination={{
            total: this.props.total, //数据总条数
            defaultPageSize: this.props.limit, //默认每页显示多少条
            onChange: (page, pageSize) => {
              this.props.getList(page, pageSize);
            },
          }}
          rowKey="id"
        />
        <Modal
          title="学生信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        > 
        </Modal>
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
      page: state.student.page,
    };
  },
  dispatch => {
    return {
      //获取学生列表
      //page 请求的页码
      //pageSize 请求每页的条数
      getList: (page = 1, pageSize = 5, searchName = '') => {
        dispatch({
          type: 'student/getList',
          page,
          pageSize,
          searchName,
        });
      },
      delStu: id => {
        dispatch({
          type: 'student/delStu',
          id,
        });
      },
    };
  },
)(Student);
