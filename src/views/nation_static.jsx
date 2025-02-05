import { defineComponent, onMounted, onUnmounted, ref, nextTick } from "vue"
import * as echarts from "echarts"
export default defineComponent({
  setup() {
    let myEcharts = echarts
    const echartObj = ref(null)
    const checkRadio = ref("line")
    onMounted(() => {
      initChart()
    })

    onUnmounted(() => {
      myEcharts.dispose
    })

    function initChart() {
      echartObj.value = myEcharts.init(document.getElementById("myEcharts"))
      echartObj.value.setOption({

        legend: {
          show: true,
          data: ['中国', '美国', '日本', '韩国', '朝鲜', '俄罗斯', '印度尼西亚', '马来西亚', '澳大利亚', '新西兰', '泰国', '越南']
        },
        xAxis: {
          type: "category",
          data: ['中国', '美国', '日本', '韩国', '朝鲜', '俄罗斯', '印度尼西亚', '马来西亚', '澳大利亚', '新西兰', '泰国', '越南'],
          axisLabel: {
            interval: 0, //设置文本标签全部显示
            rotate: 45, //如果内容重叠最好设置一下旋转，就不会重叠了
            formatter: function (value) { //如果再不行就用formatter自己来截取换行
              return value
            }
          }
        },
        tooltip: {
          // trigger: 'item',
          trigger: 'axis',
          formatter: '{b} : {c}'
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [4588, 6118, 2447, 2141, 1835, 3671, 1682, 1224, 2753, 918, 1071, 612],
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top",
                  formatter: "{c}"
                }
              }
            }
          }
        ]
      })
      echartObj.value.on("click", function (params) {
        console.log(params)
        if (params.name === "历史统计数据") {
          isShow.value = true
          nextTick(() => {
            showModal()
          })
        }
      })
      window.onresize = function () {
        echartObj.value.resize()
      }
    }
    const handleRadioChange = (val) => {
      let options = {}
      switch (val) {
        case 'pie':
          options = {
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            legend: {
              show: true,
              bottom: 10,
              left: 'center'
            },
            xAxis: {
              show: false
            },
            series: [
              {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data:
                  [{
                    value: 4588,
                    name: '中国'
                  }, {
                    value: 6118,
                    name: '美国'
                  }, {
                    value: 2447,
                    name: '日本'
                  }, {
                    value: 2141,
                    name: '韩国'
                  }, {
                    value: 1835,
                    name: '朝鲜'
                  }, {
                    value: 3671,
                    name: '俄罗斯'
                  }, {
                    value: 1682,
                    name: '印度尼西亚'
                  }, {
                    value: 1224,
                    name: '马来西亚'
                  }, {
                    value: 2753,
                    name: '澳大利亚'
                  }, {
                    value: 918,
                    name: '新西兰'
                  }, {
                    value: 1071,
                    name: '泰国'
                  }, {
                    value: 612,
                    name: '越南'
                  }],

                type: val,
              }
            ]
          }
          break
        case 'bar':
          options = {
            // title: {
            //   text: "数据类型统计",
            //   left: "center",
            // },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c}'
            },
            legend: {
              show: true,
              data: ['中国', '美国', '日本', '韩国', '朝鲜', '俄罗斯', '印度尼西亚', '马来西亚', '澳大利亚', '新西兰', '泰国', '越南']
            },
            xAxis: {
              show: true,
              type: "category",
              data: ['中国', '美国', '日本', '韩国', '朝鲜', '俄罗斯', '印度尼西亚', '马来西亚', '澳大利亚', '新西兰', '泰国', '越南'],
              axisLabel: {
                interval: 0, //设置文本标签全部显示
                rotate: 45, //如果内容重叠最好设置一下旋转，就不会重叠了
                formatter: function (value) { //如果再不行就用formatter自己来截取换行
                  return value
                }
              }
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: [4588, 6118, 2447, 2141, 1835, 3671, 1682, 1224, 2753, 918, 1071, 612],
                type: val,
                barWidth: '40%',
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      position: 'top',
                      formatter: '{c}'
                    }
                  }
                }
              }
            ]
          }
          break
        case 'line':
          options = {
            legend: {
              show: true,
              data: ['中国', '美国', '日本', '韩国', '朝鲜', '俄罗斯', '印度尼西亚', '马来西亚', '澳大利亚', '新西兰', '泰国', '越南']
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c}'
            },
            xAxis: {
              show: true,
              type: "category",
              data: ['中国', '美国', '日本', '韩国', '朝鲜', '俄罗斯', '印度尼西亚', '马来西亚', '澳大利亚', '新西兰', '泰国', '越南'],
              axisLabel: {
                interval: 0, //设置文本标签全部显示
                rotate: 45, //如果内容重叠最好设置一下旋转，就不会重叠了
                formatter: function (value) { //如果再不行就用formatter自己来截取换行
                  return value
                }
              }
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: [4588, 6118, 2447, 2141, 1835, 3671, 1682, 1224, 2753, 918, 1071, 612],
                type: val,
                smooth: true,
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      position: 'top',
                      formatter: '{c}'
                    }
                  }
                }
              }
            ]
          }
          break
      }
      echartObj.value.setOption(options)
    }
    return () => <>
      <div style="margin:auto;padding: 10px">
        <el-radio-group v-model={checkRadio.value} onChange={handleRadioChange}>
          <el-radio-button label="折线图" value="line" />
          <el-radio-button label="饼图" value="pie" />
          <el-radio-button label="柱状图" value="bar" />
        </el-radio-group>
      </div>
      <div class="echarts-box">
        <div id="myEcharts" style="width: 900px; height: 450px;margin:auto;"></div>
      </div>
    </>
  }
})