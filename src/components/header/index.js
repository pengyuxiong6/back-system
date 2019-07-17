//头部组件
import styles from "./index.less";

const Header = () => {
    return (
        <div className={styles.wrap}>
            <div className={styles.left}>徐坤,好美</div>
            <div className={styles.right}>
                <div>设置</div>
                <div>修改</div>
                <div className={styles.userInfo}>用户信息</div>
            </div>
        </div>
    );
};

export default Header;