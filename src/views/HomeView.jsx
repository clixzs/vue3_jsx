import { defineComponent, onMounted, onUnmounted, ref, nextTick } from "vue"
import * as echarts from "echarts"
export default defineComponent({
  name: "HomeView",
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
        // title: {
        //   text: "数据类型统计",
        //   left: "center",
        // },
        legend: {
          show: true,
          data: ["历史统计数据", "地缘事件数据", "互联网新闻事件数据"]
        },
        xAxis: {
          type: "category",
          data: ["历史统计数据", "地缘事件数据", "互联网新闻事件数据"]
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [20729, 8435, 895],
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
              show: false,
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
                data: [{
                  value: 20729,
                  name: '历史统计数据'
                }, {
                  value: 8435,
                  name: '地缘事件数据'
                }, {
                  value: 895,
                  name: '互联网新闻事件数据'
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
              data: ["历史统计数据", "地缘事件数据", "互联网新闻事件数据"]
            },
            xAxis: {
              show: true,
              type: "category",
              data: ["历史统计数据", "地缘事件数据", "互联网新闻事件数据"]
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: [20729, 8435, 895],
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
              data: ["历史统计数据", "地缘事件数据", "互联网新闻事件数据"]
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c}'
            },
            xAxis: {
              show: true,
              type: "category",
              data: ["历史统计数据", "地缘事件数据", "互联网新闻事件数据"]
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: [20729, 8435, 895],
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
    const isShow = ref(false)
    const echartRef = ref(null)
    const showModal = () => {
      const echart_ = echarts.init(echartRef.value)
      console.log(echart_)
      echart_.setOption({
        legend: {
          show: true,
          data: ["政治环境专题数据", "经济环境专题数据", "文化环境专题数据", "军事环境专题数据", "科技环境专题数据", "生态环境专题数据"]
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
        },
        xAxis: {
          show: true,
          type: "category",
          data: ["政治环境专题数据", "经济环境专题数据", "文化环境专题数据", "军事环境专题数据", "科技环境专题数据", "生态环境专题数据"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [2354, 7656, 2832, 3459, 2643, 1785],
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

      <el-dialog title="历史统计数据" v-model={isShow.value} width="1200px">
        <div ref={echartRef} style="width: 1200px; height: 450px;margin:auto;"></div >
      </el-dialog>
    </>
  }
})