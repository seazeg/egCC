<template>
    <div class="wrapper">
        <el-upload class="upload-box" action="" :on-change="change" :on-remove="handleRemove" drag :auto-upload='false' multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处进行压缩
            </div>
        </el-upload>

    </div>
</template>
<script>
    const {
        ipcRenderer: ipc
    } = require('electron');
    export default {
        data() {
            return {
                fileList2: []
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            change(file, fileList) {
                // console.log(fileList);
                var pathList = []
                for (var i in fileList) {
                    // var a = fileList[i].raw.path.replace("/\/g",'0')
                    // console.log(a);
                    pathList.push(fileList[i].raw.path);
                }
                ipc.send('uploadImg', pathList);

            },
            notify(result) {
                if (result.flag) {
                    this.$notify.success({
                        title: '压缩成功',
                        message: result.filePath + result.newFile,
                        dangerouslyUseHTMLString: true,
                        type: 'success',
                        position: 'bottom-right',
                        duration: 0
                    });
                }
            }
        },
        mounted() {
            ipc.on('uploadImg-return', (e, result) => {
                this.notify(result);
            })
        }
    }
</script>

<style>
</style>