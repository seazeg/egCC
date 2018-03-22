<template>
  <div class="layout-sidetools">
    <span class="operate iconfont icon-youshuangjiantou"></span>
    <div class="group">
      <div class="box" v-for="item in navInfo">
        <a class="iconfont" :class="[{'checked':item.flag},item.icon]" @click="to(item)">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "layout-sidetools",
    data() {
      return {
        navInfo: [{
          "name": "按钮",
          "eName": "button",
          "icon": "icon-anniu",
          "href": "/work",
          "flag": false
        }, {
          "name": "按钮",
          "eName": "button",
          "icon": "icon-danhangshurukuang",
          "href": "/work",
          "flag": false
        }, {
          "name": "按钮",
          "eName": "button",
          "icon": "icon-shuzishurukuang",
          "href": "/work",
          "flag": false
        }, {
          "name": "按钮",
          "eName": "button",
          "icon": "icon-duohangshurukuang",
          "href": "/work",
          "flag": false
        }, {
          "name": "按钮",
          "eName": "button",
          "icon": "icon-sousuokuang",
          "href": "/work",
          "flag": false
        }, {
          "name": "按钮",
          "eName": "button",
          "icon": "icon-xialakuangbiaodan",
          "href": "/work",
          "flag": false
        }, {
          "name": "按钮",
          "eName": "button",
          "icon": "icon-38kaiguanguan1",
          "href": "/work",
          "flag": false
        }, {
          "name": "按钮",
          "eName": "button",
          "icon": "icon-danxuanyixuan",
          "href": "/work",
          "flag": false
        }, {
          "name": "按钮",
          "eName": "button",
          "icon": "icon-sousuokuang",
          "href": "/work",
          "flag": false
        }, {
          "name": "按钮",
          "eName": "button",
          "icon": "icon-duoxuanyixuan",
          "href": "/work",
          "flag": false
        }]
      }
    },
    methods: {
      to(obj) {
        this.$router.push({
          path: obj.href,
          query: {
            type: obj.eName
          }
        })
        for (var i in this.navInfo) {
          this.navInfo[i].flag = false;
        }
        obj.flag = true;
      }
    }
  }
</script>