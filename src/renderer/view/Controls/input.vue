<template>
  <div class="wrapper">
    <div class="view">
      <el-tabs v-model="tabChecked" type="border-card">
        <el-tab-pane name="preview">
          <span slot="label" class="lab-icon">
            <i class="iconfont icon-yulan"></i>preview</span>
          <div class="view-box preview">
            <div class="eg_input" style="position: relative;">
              <input class="_eg_input" :style="inputStyle"></input>
              <span class="_eg_input_placeholder" :style="placeStyle">{{toolsParam.placeholderText}}</span>
            </div>
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
          <span class="field">placeholderText</span>
          <p>
            <el-input v-model="toolsParam.placeholderText" placeholder="请输入名称"></el-input>
          </p>
        </div>
        <div class="box">
          <span class="field">inputBox</span>
          <p>
            <el-input v-model="toolsParam.inputBox" placeholder="请输入名称"></el-input>
          </p>
        </div>
        <div class="box">
          <span class="field">inputObj</span>
          <p>
            <el-input v-model="toolsParam.inputObj" placeholder="请输入名称"></el-input>
          </p>
        </div>
        <div class="box">
          <span class="field">placeholderObj</span>
          <p>
            <el-input v-model="toolsParam.placeholderObj" placeholder="请输入名称"></el-input>
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
          placeholderText: '请输入内容',
          inputBox: 'eg_input',
          inputObj: '_eg_input',
          placeholderObj: '_eg_placeholder',
          width: 300,
          height: 60,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: '#282828',
          borderRadius: 1,
          fontSize: 20,
          color: '#fff',
          background: '#6a6a6a'
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
      inputStyle: function () {
        return {
          'display': 'inline-block',
          'width': this.toolsParam.width + 'px',
          'height': this.toolsParam.height + 'px',
          'line-height': this.toolsParam.height - this.toolsParam.borderWidth * 2 + 'px',
          'background': this.toolsParam.background,
          'color': this.toolsParam.color,
          'border': this.toolsParam.borderWidth + 'px ' + this.toolsParam.borderStyle + ' ' + this.toolsParam.borderColor,
          'border-radius': this.toolsParam.borderRadius + 'px',
          'font-size': this.toolsParam.fontSize + 'px',
          'padding': '0 20px'
        }
      },
      placeStyle: function () {
        return {
          'display': 'inline-block',
          'position': 'absolute',
          'top': 0,
          'color': this.toolsParam.color,
          'font-size': this.toolsParam.fontSize + 'px',
          'line-height': this.toolsParam.height - this.toolsParam.borderWidth * 2 + 'px',
          'padding-left': 20 + 'px'
        }
      },
      formatCSS: function () {
        var o = this.inputStyle,
          oo = this.placeStyle,
          result = `.` + this.toolsParam.inputBox + ` {position: relative;}\n`;
        result += '.' + this.toolsParam.inputBox + ' >.' + this.toolsParam.inputObj + ' {' + '\n';
        for (var i in o) {
          result += '\t' + i + ":" + o[i] + ';\n';
        }
        result += '}\n';
        result += '.' + this.toolsParam.inputBox + ' >.' + this.toolsParam.placeholderObj + ' {' + '\n';
        for (var ii in oo) {
          result += '\t' + ii + ":" + oo[ii] + ';\n';
        }
        result += '}';
        return result
      },
      html: function () {
        return `<div class="eg_input">
	<input class="` + this.toolsParam.inputObj + `"></input>
	<span class="` +
          this.toolsParam.placeholderObj +
          `">` + this.toolsParam.placeholderText + `</span>
</div>`
      },
      jsCode: function () {
        return `function inputFn(obj, maxnum) {
	$(obj).children("` + this.toolsParam.inputObj +
          `").off().on({
	  "focus": function () {
		var _this = $(this);
		if (!!_this.siblings("` + this.toolsParam
          .placeholderObj +
          `")) {
		  _this.siblings("` + this.toolsParam.placeholderObj +
          `").hide();
		}
	  },
	  "blur": function () {
		var _this = $(this);
		if (!!_this.siblings("` + this.toolsParam
          .placeholderObj +
          `")) {
		  if (_this.val() == "") {
			_this.siblings("` + this.toolsParam.placeholderObj +
          `").show();
		  } else {
			_this.siblings("` + this.toolsParam.placeholderObj +
          `").hide();
		  }
		}
	  }
	})

	$(obj).children("` + this.toolsParam.placeholderObj +
          `").off().on("click", function () {
	  var _this = $(this);
	  _this.hide();
	  _this.siblings("` + this.toolsParam
          .inputBox +
          `").focus();
	})
}
inputFn("` + this.toolsParam.inputBox + `")`
      },

    },
    mounted() {
      var $ = this.jquery;

      function inputFn(obj, maxnum) {
        $(obj).children("._eg_input").off().on({
          "focus": function () {
            var _this = $(this);
            if (!!_this.siblings("._eg_input_placeholder")) {
              _this.siblings("._eg_input_placeholder").hide();
            }
          },
          "blur": function () {
            var _this = $(this);
            if (!!_this.siblings("._eg_input_placeholder")) {
              if (_this.val() == "") {
                _this.siblings("._eg_input_placeholder").show();
              } else {
                _this.siblings("._eg_input_placeholder").hide();
              }
            }
          },
          "keyup": function () {
            var _this = $(this),
              num = _this.val().length
            if (!!_this.siblings("._eg_input_fontnum")) {
              _this.siblings("._eg_input_fontnum").text(num + "/" + _this.attr("maxlength"))
            }
          }
        })

        $(obj).children("._eg_input_placeholder").off().on("click", function () {
          var _this = $(this);
          _this.hide();
          _this.siblings("._eg_input").focus();
        })
      }
      inputFn(".eg_input")
    }
  }
</script>