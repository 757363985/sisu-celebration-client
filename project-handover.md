## 一体机与微信网页切换

一体机启动命令：yarn-start-pc

微信启动命令：yarn-start

vue.config.js

```javascript
// 通过这里的全局变量配置切换
configureWebpack: (config) => {
    const plugins = [
      new DefinePlugin({
        'process.env.NODE_PLATFOFM': JSON.stringify(process.env.NODE_PLATFOFM),
      }),
    ];
```

配置启动命令

```json
"scripts": {
    "start": "vue-cli-service serve",
    "start-pc": "cross-env NODE_PLATFOFM=PC vue-cli-service serve",
    "build": "vue-cli-service build",
    "build-pc": "cross-env NODE_PLATFOFM=PC vue-cli-service build",
  },
```

## 图片合成

文件路径：src/helpers/drag-img.js

使用的 js 库：http://fabricjs.com/

```javascript
class DragImage {
  //xxxxx
}
```

## 人脸数据收集和上传

文件路径：src/helpers/open-camera.js

```javascript
/* 初始化，打开相机 */
function openCamera() {
  // xxxx
}

/* 完成，导出人像**/
function exportVideoToImg() {//xxx}
```

## 轮播图配置

使用的 webpack 插件：copy-webpack-plugin

banner 文件路径：src/public/banner.json

## 成绩配置

文件路径：src/public/grade.json

轮播图和成绩配置详情请看 public 文件夹内的 readme 文件

## 扫码上传

前端生成一个随机 key ---> 将 key 添加在二维码链接参数上 ---> 然后生成二维码 ---> 一体机开始轮询 ---> 用户扫描二维码上传文件成功--->后端将文件信息返回--->前端接收到数据--->轮询完成

扫码上传示例文件路径：src/views/grade/check-reults/scan.vue

2020 年 10 月 26 日 10:33:23

联系人：李清龙

邮箱：924229679@qq.com
