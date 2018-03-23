<template>
  <div class="wrapper">
    <div class="view">
      <el-tabs v-model="tabChecked" type="border-card">
        <el-tab-pane name="preview">
          <span slot="label" class="lab-icon">
            <i class="iconfont icon-yulan"></i>preview</span>
          <div class="view-box preview">
            <span :style="editStyle">{{buttonText}}</span>
          </div>
        </el-tab-pane>
        <el-tab-pane name="html">
          <span slot="label" class="lab-icon">
            <i class="iconfont icon-html"></i>html</span>
          <div class="view-box html">
            <pre v-highlight>
              <code v-text="html">
              </code>
            </pre>
          </div>
        </el-tab-pane>
        <el-tab-pane name="css">
          <span slot="label" class="lab-icon">
            <i class="iconfont icon-css"></i>css</span>
          <div class="view-box css">
            <pre v-highlight>
              <code v-html="formatCSS">
              </code>
            </pre>
          </div>

        </el-tab-pane>
        <el-tab-pane name="javascript">
          <span slot="label" class="lab-icon">
            <i class="iconfont icon-js"></i>javascript</span>
          <div class="view-box js">
            <pre v-highlight>
              <code v-html="jsCode">
              </code>
            </pre>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="edit">
      <div class="box">
        <span class="field">buttonText</span>
        <p>
          <el-input v-model="buttonText" placeholder="请输入名称"></el-input>
        </p>
      </div>
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
            <el-input v-model="toolsParam.color" placeholder="请输入色号"></el-input>
          </p>
        </div>
        <div class="right">
          <span class="field">background</span>
          <p class="group">
            <el-color-picker v-model="toolsParam.background" show-alpha></el-color-picker>
            <el-input v-model="toolsParam.background" placeholder="请输入色号"></el-input>
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
            <el-input v-model="toolsParam.borderColor" placeholder="请输入色号"></el-input>
          </p>
        </div>
      </div>
      <div class="box">
        <span class="field">borderRadius</span>
        <p>
          <el-slider v-model="toolsParam.borderRadius" :max="500" show-input></el-slider>

        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        buttonText: 'Button',
        tabChecked: 'preview',
        toolsParam: {
          width: 300,
          height: 100,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#ca4341',
          borderRadius: 10,
          fontSize: 32,
          color: '#fff',
          background: '#ca4341'
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
          result = '.button {' + '\n';
        for (var i in o) {
          result += '\t' + i + ":" + o[i] + ';\n';
        }
        result += '}';
        return result
      },
      html: function () {
        return `<span class="button">` + this.buttonText + `</span>`
      },
      jsCode: function () {
        return ''
      }
    }
  }
</script>