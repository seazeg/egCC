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
const os = require("os");

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


const getBin = (name) => {
  if (os.platform === 'win32') {
    name = name + '.exe'
  }
  return name
}


// 利用ipc让html标签获取主进程的方法,最小化,最大化,关闭
ipcMain.on('min', e => mainWindow.minimize());
ipcMain.on('close', e => mainWindow.close());

// 加载图片
ipcMain.on('uploadImg', function (e, list) {
  console.log("收到:", list);
  const _dir = process.cwd();
  for (var i = 0; i < list.length; i++) {
    // console.log("times:",list.length);
    let path = list[i];
    // console.log("这里:",path);
    let filePath = list[i].split("\\").slice(0, list[i].split("\\").length - 1).join("\\") + "\\",
      tempName = list[i].split('\\').pop(),
      fileName = tempName.split('.')[0] + '-end.' + tempName.split('.')[1],
      imgType = tempName.split('.')[1].toLowerCase();

    setTimeout(() => {
      if (imgType == 'png') {
        child_process.spawn(_dir + '/bin/win/' + getBin('pngquant'), ['--ext', '-end.png', path, '-v']).on('close', function (code) {
          if (code == 0) {
            console.log('子进程已退出，退出码 ', code);
            e.sender.send('uploadImg-return', {
              flag: true,
              oldFile: tempName,
              newFile: fileName,
              filePath: filePath
            })
          }
        });
      } else if (imgType == 'jpg' || imgType == 'jpeg') {
        // console.log(fileName);
        // console.log(path);
        // console.log(tempName);
        child_process.spawn(_dir + '/bin/win/' + getBin('mozcjpeg'), ['-outfile', filePath + fileName, path]).on('close', function (code) {
          if (code == 0) {
            console.log('子进程已退出，退出码 ', code);
            e.sender.send('uploadImg-return', {
              flag: true,
              oldFile: tempName,
              newFile: fileName,
              filePath: filePath
            })
          }
        });
      } else {
        e.sender.send('uploadImg-return', {
          flag: false,
          error: "非png,jpg,jpeg图片"
        })
      }
    }, 500);

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