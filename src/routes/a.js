//路由页面
//默认情况下，umi的路由处理是这样
//1. 加载 layout/index.js 。 通过 props.children
//2. 再根据 url 地址找到要渲染哪个 pages 里面的页面

//如果在 某个 路由页面中 配置 了Routes 的配置，那么配置的组件将会做为当前路由页面的父路由页面
//1 - layout/index.js
//2 - routes/a.js
export default (props) => {
    return <div>我的天{props.children}</div>
}