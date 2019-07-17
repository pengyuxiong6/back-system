import styles from './index.less';
import Header from "../components/header";
import Menu from "../components/menu";
//css module 的使用
//基本布局
function BasicLayout(props) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Header/>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <Menu/>
        </div>
        <div className={styles.right}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
//单页布局
function SimpleLayout(props) {
  return <div className={styles.container}>{props.children}</div>
}
export default (props) => {
  //判断 如果显示的是 登录页面， 那么就使用 单页布局
  if (props.location.pathname === '/login') {
    return <SimpleLayout {...props}/>
  }
    return <BasicLayout {...props}/>
};
