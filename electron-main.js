// 引入electron并创建一个Browserwindow
const { app, BrowserWindow, Menu } = require('electron');
// const cp = require('child_process');
const path = require('path');
const url = require('url');
app.commandLine.appendSwitch(
  'unsafely-treat-insecure-origin-as-secure',
  'http://192.168.2.203:6060/',
);
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;

function createWindow() {
  // 创建浏览器窗口,宽高自定义具体大小你开心就好
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 1920,
    // fullscreen: true,
    title: '川外校庆', // 窗体的标题
    icon: path.join(__dirname, './public/favicon.ico'), // 窗体的标题ico （这个只在在windows下有效）
    webPreferences: {
      nodeIntegration: true, // 是否集成 Nodejs
      webviewTag: true,
      webPreferences: {
        webSecurity: false,
      },
    },
  });
  //  加载应用----- electron-quick-start中默认的加载入口
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './dist/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  // 加载应用----适用于 react 项目
  // mainWindow.loadURL('http://192.168.2.203:6060/');

  // 打开开发者工具，默认不打开
  mainWindow.webContents.openDevTools();

  // 关闭window时触发下列事件.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
// 禁止使用缓存
app.commandLine.appendSwitch('--disable-http-cache');

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow);

// 所有窗口关闭时退出应用.
app.on('window-all-closed', () => {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
});

/* 隐藏electron创听的菜单栏 */
Menu.setApplicationMenu(null);
