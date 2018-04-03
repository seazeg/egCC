<template>
    <div class="wrapper">
        <el-upload class="upload-box" action="" ref="uploadImg" :on-change="change" :on-exceed="notice" drag :auto-upload='false'
            multiple :limit=10>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处进行压缩
            </div>
        </el-upload>
        <!-- <el-badge :value="resultNum" class="img_result_list">
            <i class="iconfont icon-menu2" @click="openFile()"></i>
            <div class="file_list">
                <p v-for="(item,index) in fileList">{{index+1}}.{{item.name}}<i>{{item.flag}}</i></p>
            </div>
        </el-badge> -->

        <el-button type="info" round @click="compress">压缩</el-button>
    </div>
</template>
<script>
    const {
        ipcRenderer: ipc
    } = require('electron');
    export default {
        data() {
            return {
                resultNum: 0,
                filePath: "",
                pathList: [],
                fileList: []
            };
        },
        methods: {
            openFile() {
                console.log(this.filePath);
            },
            notice() {
                alert("一次最多转换10张图片");
            },
            change(file, fileList) {
                var pathList = [],
                    tmpfileList = []
                for (var i in fileList) {
                    pathList.push(fileList[i].raw.path);
                    tmpfileList.push({
                        flag: false,
                        name: fileList[i].name,
                        filePath: fileList[i].raw.path
                    })
                }
                this.filePath = fileList[0].raw.path.split("\\").slice(0, fileList[0].raw.path.split("\\").length -
                    1).join("\\");

                this.pathList = pathList;
                this.fileList = tmpfileList;

            },
            compress() {
                if (!!this.pathList.length) {
                    ipc.send('uploadImg', this.pathList);
                    this.$refs.uploadImg.clearFiles();
                    this.pathList = [];
                }
            },
            notify(result) {
                if (result.flag) {
                    this.$notify.success({
                        title: '压缩成功',
                        message: result.filePath + result.newFile,
                        dangerouslyUseHTMLString: true,
                        type: 'success',
                        position: 'bottom-right',
                        duration: 2000
                    });
                    this.resultNum++;
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