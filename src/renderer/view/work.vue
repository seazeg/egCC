<template>
  <div class="wrapper">
    <div class="view">
      <el-tabs v-model="tabChecked" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="preview" name="preview">
          <div class="view-box preview">
            <span :style="editStyle" @click="outCss()">{{buttonText}}</span>
          </div>

        </el-tab-pane>
        <el-tab-pane label="css" name="css">
          <div class="view-box css">
           
          </div>
        </el-tab-pane>
        <el-tab-pane label="javascript" name="javascript">
          <div class="view-box js">
        
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="edit">
      <div class="box">
        <span class="field">width</span>
        <p>
          <el-slider v-model="toolsParam.width" :min="10" :max="500" show-input></el-slider>
        </p>
      </div>
      <div class="box">
        <span class="field">height</span>
        <p>
          <el-slider v-model="toolsParam.height" :min="10" :max="500" show-input></el-slider>
        </p>
      </div>
      <div class="box">
        <span class="field">fontSize</span>
        <p>
          <el-slider v-model="toolsParam.fontSize" :max="50" show-input></el-slider>
        </p>
      </div>
      <div class="box">
        <div class="left">
          <span class="field">color</span>
          <p class="group">
            <el-color-picker v-model="toolsParam.color" show-alpha></el-color-picker>
            <el-input v-model="toolsParam.color" placeholder="请输入内容"></el-input>
          </p>
        </div>
        <div class="right">
          <span class="field">background</span>
          <p class="group">
            <el-color-picker v-model="toolsParam.background" show-alpha></el-color-picker>
            <el-input v-model="toolsParam.background" placeholder="请输入内容"></el-input>
          </p>
        </div>
      </div>
      <div class="box">
        <span class="field">borderWidth</span>
        <p>
          <el-slider v-model="toolsParam.borderWidth" :max="10" show-input></el-slider>
        </p>
      </div>
      <div class="box">
        <div class="left">
          <span class="field">borderStyle</span>
          <p>
            <el-select v-model="toolsParam.borderStyle" placeholder="请选择" style="width:100%">
              <el-option v-for="item in borderOpt" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </p>
        </div>
        <div class="right">

          <span class="field">borderColor</span>
          <p class="group">
            <el-color-picker v-model="toolsParam.borderColor" show-alpha></el-color-picker>
            <el-input v-model="toolsParam.borderColor" placeholder="请输入内容"></el-input>
          </p>
        </div>
      </div>
      <div class="box">
        <span class="field">borderRadius</span>
        <p>
          <el-slider v-model="toolsParam.borderRadius" :max="500" show-input></el-slider>

        </p>
      </div>
      <!-- width:
        <el-slider v-model="toolsParam.width" :min="10" :max="500" show-input></el-slider>
      height:
      <el-slider v-model="toolsParam.height" :min="10" :max="500" show-input></el-slider>
      border-width:
      <el-slider v-model="toolsParam.borderWidth" :max="10" show-input></el-slider>
      border-style:
      <el-select v-model="toolsParam.borderStyle" placeholder="请选择" style="width: 410px;">
        <el-option v-for="item in borderOpt" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      border-radius:
      <el-slider v-model="toolsParam.borderRadius" :max="500" show-input></el-slider>
      border-color:
      <el-color-picker v-model="toolsParam.borderColor" show-alpha></el-color-picker>
      font-size:
      <el-slider v-model="toolsParam.fontSize" :max="50" show-input></el-slider>
      color:
      <el-color-picker v-model="toolsParam.color" show-alpha></el-color-picker>
      background:
      <el-color-picker v-model="toolsParam.background" show-alpha></el-color-picker>

      <textarea style="width:100%;height:30%;font-size:14px;">{{formatCSS}}
      </textarea> -->

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        buttonText: '测试按钮',
        tabChecked: 'preview',
        toolsParam: {
          width: 200,
          height: 50,
          // lineHeight: 50,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#111',
          borderRadius: 5,
          fontSize: 12,
          color: '#fff',
          background: 'red'
        },
        borderOpt: [{
          value: 'solid',
          label: 'solid'
        }, {
          value: 'dotted',
          label: 'dotted'
        }, {
          value: 'dashed',
          label: 'dashed'
        }, {
          value: 'double',
          label: 'double'
        }, {
          value: 'groove',
          label: 'groove'
        }, {
          value: 'ridge',
          label: 'ridge'
        }, {
          value: 'inset',
          label: 'inset'
        }, {
          value: 'outset',
          label: 'outset'
        }, {
          value: 'none',
          label: 'none'
        }]

      }
    },
    computed: {
      editStyle: function () {
        // console.log(this);
        return {
          'display': 'inline-block',
          'width': this.toolsParam.width - this.toolsParam.borderWidth * 2 - 20 + 'px',
          'height': this.toolsParam.height - this.toolsParam.borderWidth * 2 + 'px',
          'line-height': this.toolsParam.height - this.toolsParam.borderWidth * 2 + 'px',
          'text-align': 'center',
          'background': this.toolsParam.background,
          'color': this.toolsParam.color,
          'border': this.toolsParam.borderWidth + 'px ' + this.toolsParam.borderStyle + ' ' + this.toolsParam.borderColor,
          'border-radius': this.toolsParam.borderRadius + 'px',
          'font-size': this.toolsParam.fontSize + 'px',
          'cursor': 'pointer',
          'padding': '0 10px'
        }
      },
      formatCSS: function () {
        var o = this.editStyle,
          result = '';

        for (var i in o) {
          result += i + ":" + o[i] + ';\n';
          console.log(result);
        }
        return result
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>