import styles from './index.less';
import { Button, Form } from 'antd';
import { connect } from 'dva';

export default () => {
  return (
    <div className={styles.box}>
      <div className={styles.box_logo}>
        <a href="/">
          <h1>徐坤 - 你太美了</h1>
        </a>
        <span>登录-后台管理系统</span>
      </div>
      <div className={styles.box_body} />
    </div>
  );
};
