import { defineComponent, defineExpose, onMounted, nextTick, ref, watch } from "vue"
import * as echarts from "echarts"

export default defineComponent({
  name: "Modal",
  props: {
    isShow: Boolean,
    default: false
  },
  setup(props) {
    const dialogVisible = ref(props.isShow)
    const echartRef = ref(null)
    // watch(() => props.isShow, (newValue) => {
    //   show()
    // })
    onMounted(() => {
      nextTick(() => {
        show()
      })
    })
    const show = () => {
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
    defineExpose({ show })
    return () => <>
      <el-dialog title="数据类型统计" v-model={dialogVisible.value}>
        <div ref={echartRef} style="width: 900px; height: 450px;margin:auto;"></div >
      </el-dialog>
    </>
  }

})