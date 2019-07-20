import styles from './index.less';
import { Button, Form, Input, Spin, message } from 'antd';
import { connect } from 'dva';
import router from "umi/router";
import React from "react"

class Login extends React.Component {
  state = {
    loading: false//是否正在请求中
  };

  handelLogin = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.setState({
          loading: true,
        });
        fetch('/auth/sign-in',{
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            'content-type': 'application/json',
          },
        }).then(response => response.json())
          .then(res => {
            if (res.code === 0) {
              message.success('登录成功');
              //1. 将数据写入到仓库与本地储存中
              window.localStorage.setItem('userInfo',JSON.stringify(res.data.userInfo));
              window.localStorage.setItem('token',res.data.token);
              this.props.setUserInfo(res.data.userInfo);
              //2. 跳转页面
              router.replace('/');
            }else {
              message.info(res.msg);
            }
            //不管成功还是失败，loading设置为 false
            this.setState({
              loading:false,
            })
          })
      }
    })
  }

  render() {
    let { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.box}>
        <div className={styles.box_logo}>
          <a href="/">
            <h1> - 你太美了</h1>
          </a>
          <span>登录-后台管理系统</span>
        </div>
        <Form className={styles.box_body}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please 输入 email!' },
                { type: 'email', message: '请输入正确的邮箱格式' },
              ],
            })(
              <div className={styles.form_group}>
                <Input type="text" placeholder="邮箱" />
              </div>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please 输入 Password!' }],
            })(
              <div className={styles.form_group}>
                <Input type="password" placeholder="密码" />
              </div>,
            )}
          </Form.Item>
          <Button
            type="primary"
            block
            size="large"
            disabled={this.state.loading}
            onClick={() => {
              this.handelLogin();
            }}
          >
            登录
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  {
    setUserInfo: userInfo => ({ type: 'user/setUserInfo',userInfo }),
  },
)(Form.create(null)(Login));

//antd - Form 表单的使用
//1. 引入 Form Input
//2. 通过 Form.create(null)(UI组件) 创建 Form 实例
//3. UI组件中将得到一个 Form 的props
//4. Form.getFieldDecorator("表单域的名字",{ rules: [] })(Input组件)

// 表单的校验， 校验通过 values 就是输入框的值。 如果不通过，err 就是错误信息
//5. Form.validateFields((err,values) => {})
