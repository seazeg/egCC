<template>
    <div class="wrapper">
        <el-upload class="upload-box" action="" :on-change="change" :on-remove="handleRemove" drag :auto-upload='false' multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处进行压缩
            </div>
        </el-upload>
        <el-button plain @click="success">
            成功
        </el-button>
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

                ipc.on('uploadImg-return', (e, result) => {
                    // console.log(arg);
                    this.success(result);
                })


            },
            success(result) {
                if (result) {
                    this.$notify({
                        title: '成功',
                        message: '转换成功!',
                        type: 'success',
                        position: 'bottom-right'
                    });
                }
            },
            // success2() {
            //     this.$message({
            //         message: '恭喜你，这是一条成功消息',
            //         type: 'success'
            //     });
            // }
        }
    }
</script>

<style>
</style>