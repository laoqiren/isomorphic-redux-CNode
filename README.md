# isomorphic-redux-forum

## About

基于React->Node->Mongo技术栈的类CNode社区同构单页Web应用,关于此项目开发过程中的经验总结移步[我的技术博客](http://luoxia.me/code)相关文章:[使用React SSR构建Isomorphic应用](http://luoxia.me/code/2017/02/07/%E4%BD%BF%E7%94%A8React%20SSR%E6%9E%84%E5%BB%BAIsomorphic%E5%BA%94%E7%94%A8/)

## 用到的技术栈
<ul>
<li>React 构建Web组件</li>

<li>React-router 客户端路由及ssr路由</li>

<li>redux 管理应用state</li>

<li>react服务端渲染 实现同构</li>

<li>node/express 提供服务</li>

<li>webpack 构建</li>

<li>webpack-isomorphic-tools 处理ssr静态资源</li>

<li>JWTs 前后端分离下的token验证</li>

<li>Ant Design 构建UI</li>

<li>redux-devtools 开发者工具</li>

<li>mongodb/mongoose 提供数据库管理</li>
</ul>

## 项目线上Demo

即将上线

## 运行Demo

### 安装依赖
```
npm install
```
### 编译
```
npm run build
```
### 运行Node server
```
npm run start
```

### 访问3000端口

## 开发环境

### 安装依赖

```
npm install
```

### 启动webpack server
```
npm run run-dev-server
```

### 启动express服务器
```
npm run run-server
```
### 访问服务:3000端口(包含了HMR)

## TODO
<ul>
    <li>修复bugs</li>
    <li>修改文章</li>
    <li>修改个人资料</li>
    <li>进一步优化UI</li>
    <li>单元测试</li>
</ul>