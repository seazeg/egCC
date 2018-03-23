<template>
  <div class="wrapper">
    <div class="view">
      <el-tabs v-model="tabChecked" type="border-card">
        <el-tab-pane name="preview">
          <span slot="label" class="lab-icon">
            <i class="iconfont icon-yulan"></i>preview</span>
          <div class="view-box preview">
            <span :style="buttonStyle[0]" :onMouseOver='buttonHoverStyle[1]' :onMouseOut='buttonStyle[1]'>{{toolsParam.buttonText}}</span>
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
      <div class="control_group_title">基础属性：</div>
      <div class="control_group">
        <div class="box">
          <span class="field">buttonText</span>
          <p>
            <el-input v-model="toolsParam.buttonText" placeholder="请输入名称"></el-input>
          </p>
        </div>
        <div class="box">
          <span class="field">buttonObj</span>
          <p>
            <el-input v-model="toolsParam.buttonObj" placeholder="请输入名称"></el-input>
          </p>
        </div>
      </div>
      <div class="control_group_title">初始样式：</div>
      <div class="control_group">
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
      <div class="control_group_title">Hover样式：</div>
      <div class="control_group">
        <div class="box">
          <div class="left">
            <span class="field">hoverColor</span>
            <p class="group">
              <el-color-picker v-model="toolsParam.hoverColor" show-alpha></el-color-picker>
              <el-input v-model="toolsParam.hoverColor" placeholder="请输入色号"></el-input>
            </p>
          </div>
          <div class="right">
            <span class="field">hoverBackground</span>
            <p class="group">
              <el-color-picker v-model="toolsParam.hoverBackground" show-alpha></el-color-picker>
              <el-input v-model="toolsParam.hoverBackground" placeholder="请输入色号"></el-input>
            </p>
          </div>
        </div>
        <div class="box">
          <span class="field">hoverBorderWidth</span>
          <p>
            <el-slider v-model="toolsParam.hoverBorderWidth" :max="10" show-input></el-slider>
          </p>
        </div>
        <div class="box">
          <div class="left">
            <span class="field">hoverBorderStyle</span>
            <p>
              <el-select v-model="toolsParam.hoverBorderStyle" placeholder="请选择" style="width:100%">
                <el-option v-for="item in borderOpt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </p>
          </div>
          <div class="right">
            <span class="field">hoverBorderColor</span>
            <p class="group">
              <el-color-picker v-model="toolsParam.hoverBorderColor" show-alpha></el-color-picker>
              <el-input v-model="toolsParam.hoverBorderColor" placeholder="请输入色号"></el-input>
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabChecked: 'preview',
        toolsParam: {
          buttonText: 'Button',
          buttonObj: 'eg_button',
          width: 300,
          height: 100,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#ca4341',
          borderRadius: 10,
          fontSize: 32,
          color: '#fff',
          background: '#ca4341',
          hoverColor: '#111',
          hoverBackground: '#fff',
          hoverBorderWidth: 2,
          hoverBorderStyle: 'solid',
          hoverBorderColor: '#111',
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
      buttonStyle: function () {
        var o = {
            'display': 'inline-block',
            'width': this.toolsParam.width + 'px',
            'height': this.toolsParam.height + 'px',
            'line-height': this.toolsParam.height - this.toolsParam.borderWidth * 2 + 'px',
            'text-align': 'center',
            'background': this.toolsParam.background,
            'color': this.toolsParam.color,
            'border': this.toolsParam.borderWidth + 'px ' + this.toolsParam.borderStyle + ' ' + this.toolsParam.borderColor,
            'border-radius': this.toolsParam.borderRadius + 'px',
            'font-size': this.toolsParam.fontSize + 'px',
            'cursor': 'pointer',
            // 'padding': '0 10px'
          },
          str = 'this.style.cssText="' + JSON.stringify(o).replace(/,/g, ';').replace(/"/g, '').replace(
            '{', '')
          .replace('}', '') + '"';

        return [o, str];
      },
      buttonHoverStyle: function () {
        var o = {
            'background': this.toolsParam.hoverBackground,
            'color': this.toolsParam.hoverColor,
            'border': this.toolsParam.hoverBorderWidth + 'px ' + this.toolsParam.hoverBorderStyle + ' ' + this.toolsParam
              .hoverBorderColor,
            'display': 'inline-block',
            'width': this.toolsParam.width + 'px',
            'height': this.toolsParam.height + 'px',
            'line-height': this.toolsParam.height - this.toolsParam.borderWidth * 2 + 'px',
            'text-align': 'center',
            'border-radius': this.toolsParam.borderRadius + 'px',
            'font-size': this.toolsParam.fontSize + 'px',
            'cursor': 'pointer',
            'padding': '0 10px'
          },
          str = 'this.style.cssText="' + JSON.stringify(o).replace(/,/g, ';').replace(/"/g, '').replace('{',
            '')
          .replace('}', '') + '"',
          display = {
            'background': this.toolsParam.hoverBackground,
            'color': this.toolsParam.hoverColor,
            'border': this.toolsParam.hoverBorderWidth + 'px ' + this.toolsParam.hoverBorderStyle + ' ' + this.toolsParam
              .hoverBorderColor
          }
        return [o, str, display];
      },
      formatCSS: function () {
        var o = this.buttonStyle[0],
          oo = this.buttonHoverStyle[2],
          result = '.' + this.toolsParam.buttonObj + ' {' + '\n';
        for (var i in o) {
          result += '\t' + i + ":" + o[i] + ';\n';
        }
        result += '}\n';
        result += '.' + this.toolsParam.buttonObj + ':hover {' + '\n';
        for (var ii in oo) {
          result += '\t' + ii + ":" + oo[ii] + ';\n';

        }
        result += '}';
        return result
      },
      html: function () {
        return `<span class="` + this.toolsParam.buttonObj + `">` + this.toolsParam.buttonText + `</span>`
      },
      jsCode: function () {
        return ''
      }
    }
  }
</script>