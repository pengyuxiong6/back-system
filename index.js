import { Button, Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const Login = props => {
  let { getFieldDecorator } = props.form;
  return (
    <div className={styles.box}>
      <div className={styles.box_logo}>
        <a href="/">
          <h1>{props.userName} - 我的天，你真帅</h1>
        </a>
        <span>登录-后台管理系统</span>
      </div>

      <Form className={styles.box_body}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <div className={styles.form_group}>
              <input type="text" name="username" placeholder="用户名" />
            </div>,
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <div className={styles.form_group}>
              <input type="password" name="password" placeholder="密码" />
            </div>,
          )}
        </Form.Item>

        <Button
          block
          type="primary"
          size="large"
          onClick={() => {
            props.handleLogin(props.form);
          }}
        >
          登录
        </Button>
      </Form>
    </div>
  );
};

export default connect(
  state => {
    return {
      userName: state.user.userName,
    };
  },
  (dispatch, props) => {
    return {
      handleLogin: form => {
        // console.log(123);
        // 1. 表单校验
        form.validateFields((error, values) => {
          if (!error) {
            // 表单校验通过
            console.log(values); // {username: '', password: ''}
            // 2. dispatch 异步
            dispatch({ type: 'user/login', payload: values });
          }
        });
      },
    };
  },
)(Form.create(null)(Login));

// antd- form 表单的使用
// 1. 引入 Form Input
// 2. 通过 Form.create(null)(UI组件) 创建 Form 实例
// 3. UI组件中将得到一个 form 的prop
// 4. form.getFieldDecorator('表单域的名字', { rules: []})( Input组件 )

// 表单的校验，校验通过 values 就是输入框的值。如果不通过， err 就是错误信息
// 5. form.validateFields((err, values) => {})
//
