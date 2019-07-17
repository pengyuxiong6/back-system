import styles from "./index.less";
import NavLink from "umi/NavLink"
const Menu = () => {
    return (
        <ul className={styles.wrap}>
            <li>
                <NavLink to="/" exact activeClassName={styles.active}>系统首页</NavLink>
            </li>
            <li>
                <NavLink to="/student" exact activeClassName={styles.active}>学生管理</NavLink>
            </li>
        </ul>
    );
};

export default Menu;