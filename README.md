# readme

> 钉钉微应用 Vue + Vant 基础代码库

## 目录结构

```
|-- src

|--|-- assets 静态资源📂

|--|-- components 公共组件📂

|--|-- router 路由📂

|--|-- apis fetch 目录、通用接口

|--|-- store vuex目录

|--|-- views 页面目录

```

## 自定义主题

项目里引入 `@scf/ding-style-less` 覆盖 `vant` 的默认配置，如果主题色需要重新修改，可以使用 `src/assets/less/custom-theme.less` 文件重新赋值 `@color-primary` 变量，修改 `vue.config.js` 的 `css-less-modifyVars-hack` 配置，`hack: 'true; @import "~@/assets/less/custom-theme.less";'`,

## REM

项目中有使用 rem 适配屏幕，`vant` 的尺寸按照哦 375 的设计稿做的，所以元素大小需要转换成 375 设计稿的尺寸。

## 钉钉微应用

* 【注意】Android 端打开新页面时推荐使用openLink JSAPI。

## 命名规范

文件夹、文件名 以小写字母、数字组成，多个单词以 `-` 链接。

变量名称，对象、异步方法以大写字母开头，同步方法以小写字母开头，HTTP 请求函数名称以 HTTP method 开头。

## 代码格式化

安装 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 插件。

## 代码提交

```
npm commit

yarn commit
```

通过 `commitizen`、`cz-customizable` 实现，约定分类在 `.cz-config.js` 配置。

[优雅的提交你的 Git Commit Message](https://juejin.im/post/5afc5242f265da0b7f44bee4)

## 更新日志

[点击查看](./changelog.md)
