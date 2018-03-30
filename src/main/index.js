import {
  app,
  BrowserWindow,
  ipcMain,
  Tray
} from 'electron'

const child_process = require('child_process');
const fs = require("fs");
const watch = require("./watch")

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 750,
    width: 1300,
    maxHeight: 750,
    maxWidth: 1300,
    minHeight: 750,
    minWidth: 1300,
    useContentSize: true,
    resizable: false,
    fullscreen: false,
    frame: false,
    titleBarStyle: 'customButtonsOnHover'
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    win.show()
  })

}






// 利用ipc让html标签获取主进程的方法,最小化,最大化,关闭
ipcMain.on('min', e => mainWindow.minimize());
ipcMain.on('close', e => mainWindow.close());
ipcMain.on('uploadImg', function (e, list) {
  const _dir = process.cwd()
  for (var i in list) {
    let path = list[i];
    const workerProcess = child_process.spawn(_dir + '/bin/win/pngquant.exe ', [path]);

    workerProcess.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    workerProcess.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    workerProcess.on('close', function (code) {
      console.log('子进程已退出，退出码 ' + code);
    });

    let filePath = list[i].replace(list[i].split('\\')[list[i].split('\\').length - 1], ""),
      fileName = list[i].split('\\')[list[i].split('\\').length - 1];
    // fileName = fileName.split(',')[0] + '-fs8' + fileName.split(',')[1]

    e.sender.send('uploadImg-return', true)
  }

})



app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})