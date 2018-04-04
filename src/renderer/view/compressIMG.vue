<template>
    <div class="wrapper">
        <!-- <div class="upload-opr"> -->
        <div class="upload-list">
            <el-upload action="" class="upload-box" ref="uploadImg" :on-change="change" :on-exceed="notice" drag :auto-upload='false'
                multiple :limit=8 :show-file-list="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将PNG, JPG, JPEG文件拖到此处进行压缩
                </div>
            </el-upload>
            <div class="file_list">
                <p v-for="(item,index) in tmpfileList">
                    <span>{{item.name}}</span>
                    <i class="iconfont icon-ai04 ready" v-if="item.flag==0"></i>
                    <img src="../assets/images/loading.svg" class="loading" v-if="item.flag==1" />
                    <i class="iconfont icon-duihao2 end" v-if="item.flag==2"></i>
                </p>
            </div>
        </div>
        <div class="upload-clear" @click="clear">
            <i class=" iconfont icon-qingkong"></i>
    
        </div>
        <div class="upload-compress" @click="compress">
            <i class=" iconfont icon-ai04"></i>
        
        </div>

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
                tmpfileList: []
            };
        },
        methods: {
            openFile() {
                console.log(this.filePath);
            },
            notice() {
                this.$message.error({
                    message: 'No,No,No, 你的机器没那么牛逼, 一次最多转换8张图片',
                    center: true
                });
            },
            change(file, fileList) {
                var params = [],
                    pathList = [],
                    tmpfileList = []
                this.filePath = fileList[0].raw.path.split("\\").slice(0, fileList[0].raw.path.split("\\").length -
                    1).join("\\");
                for (var i in fileList) {
                    pathList.push(fileList[i].raw.path);
                    tmpfileList.push({
                        flag: 0,
                        name: fileList[i].name,
                        filePath: fileList[i].raw.path
                    })
                }
                this.tmpfileList = tmpfileList;
                params.push(pathList, tmpfileList);
                this.pathList = params;
            },
            compress() {
                if (!!this.pathList.length) {
                    for (var x in this.tmpfileList) {
                        this.tmpfileList[x].flag = 1;
                    }
                    ipc.send('uploadImg', this.pathList);
                    this.$refs.uploadImg.clearFiles();
                    this.pathList = [];
                } else {
                    this.$message.error({
                        message: '先加入图片到暂存区',
                        center: true
                    });
                }
            },
            clear(){
                this.tmpfileList = [];
                this.pathList = [];
            }
        },
        mounted() {
            ipc.on('uploadImg-return', (e, result) => {
                this.tmpfileList = result;
                // this.notify(result);
                // console.log(result);
            })
        }
    }
</script>

<style>
</style>