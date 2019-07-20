/**
 * 这个是做登录校验的一个路由组件
 */

 import { connect } from "dva";
 import { Redirect } from "dva/router";

 const PrivateRoute = props => {
     if (props.userName) {
         return <div>{props.children}</div>
     }else{
         return <Redirect to="/login"/>
     }
 };

 export default connect(
     state => {
        return {
            userName: state.user.userName
        }
     },
     null
 )(PrivateRoute)