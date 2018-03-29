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
                // console.log(this.fileList2);
                ipc.send('uploadImg', file.raw.path);
                this.success();
            },
            success() {
                this.$notify({
                    title: '成功',
                    message: '转换成功!',
                    type: 'success',
                    position: 'bottom-right'
                });
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