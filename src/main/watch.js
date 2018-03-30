var chokidar = require('chokidar')

var watcher = null
var ready = false
module.exports.watch = function () {

  // 文件新增时
  function addFileListener(path_) {
    if (ready) {
      console.log('File', path_, 'has been added')
    }
  }
  function addDirecotryListener(path) {
    if (ready) {
      console.log('Directory', path, 'has been added')
    }
  }

  // 文件内容改变时
  function fileChangeListener(path_) {
      console.log('File', path_, 'has been changed')
  }

  // 删除文件时，需要把文件里所有的用例删掉
  function fileRemovedListener(path_) {
      console.log('File', path_, 'has been removed')
  }

  // 删除目录时
  function directoryRemovedListener(path) {
    log.info('Directory', path, 'has been removed')
  }

  if (!watcher) {
    watcher = chokidar.watch('/var/test/testproject')
  }
  watcher
    .on('add', addFileListener)
    .on('addDir', addDirecotryListener)
    .on('change', fileChangeListener)
    .on('unlink', fileRemovedListener)
    .on('unlinkDir', directoryRemovedListener)
    .on('error', function (error) {
      log.info('Error happened', error);
    })
    .on('ready', function () {
      console.info('Initial scan complete. Ready for changes.');
      ready = true
    })
}