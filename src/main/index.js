import {
  app,
  BrowserWindow,
  ipcMain,
  Tray
} from 'electron'
import {
  JQUERY_DEBUGGER
} from 'electron-devtools-installer';

const child_process = require('child_process');
const fs = require("fs");
const ck = require('chokidar')
var async = require('async');
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
ipcMain.on('uploadImg', function (event, list) {
  const _dir = process.cwd();


  for (var i in list) {
    let path = list[i];
    let filePath = list[i].replace(list[i].split('\\')[list[i].split('\\').length - 1], ""),
      tempName = list[i].split('\\')[list[i].split('\\').length - 1],
      fileName = tempName.split('.')[0] + '-fs8.' + tempName.split('.')[1];

    child_process.spawn(_dir + '/bin/win/pngquant.exe', [path, '-v']).on('close', function (code) {
      if (code == 0) {
        console.log('子进程已退出，退出码 ', code);
        event.sender.send('uploadImg-return', {
          flag: true,
          fileName: fileName
        })
      }
    });

    // workerProcess.stdout.on('data', function (data) {
    //   console.log('stdout: ' + data);
    // });

    // workerProcess.stderr.on('data', function (data) {
    //   console.log('stderr: ' + data);
    // });



    // let filePath = list[i].replace(list[i].split('\\')[list[i].split('\\').length - 1], ""),
    //   tempName = list[i].split('\\')[list[i].split('\\').length - 1],
    //   fileName = tempName.split('.')[0] + '-fs8.' + tempName.split('.')[1];

    // let ready = false;
    // ck.watch(filePath).on('add', function (e) {
    //   if (ready) {
    //     if (e == filePath + fileName) {
    //       event.sender.send('uploadImg-return', e)
    //     }
    //   }
    // }).on('ready', function () {
    //   console.info('Initial scan complete. Ready for changes.');
    //   ready = true
    // });

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