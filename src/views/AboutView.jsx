import { defineComponent, nextTick, onMounted } from "vue"
import * as echarts from 'echarts'
import { centerPositions } from '@/assets/data/world_center_position'
import world from "@/assets/data/world.json"
export default defineComponent({
  name: "AboutView",
  props: {
    msg: String
  },
  setup(props) {
    const markImg = new URL('@/assets/images/mark.png', import.meta.url).href
    const natios = ['中国', '美国', '日本', '韩国', '朝鲜', '俄罗斯', '印度尼西亚', '马来西亚', '澳大利亚', '新西兰', '泰国', '越南']
    const nationStatic = [4588, 6118, 2447, 2141, 1835, 3671, 1682, 1224, 2753, 918, 1071, 612]
    let dataMap = []
    Object.keys(centerPositions).forEach((name) => {
      let obj = {}
      natios.forEach((nation, i) => {
        if (nation == name) {
          obj.name = name
          obj.coord = centerPositions[name].position
          // obj.value = nationStatic[i]
          dataMap.push(obj)
        }
      })
    })
    const options = {
      backgroundColor: '#A9C3EC',
      itemStyle: {
        borderColor: "#A1AAC7",
        borderWidth: 2,
        shadowColor: "#98B5E5",
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        shadowBlur: 2,
      },
      series: [
        {
          type: 'map',       // 表示这是地图类型
          map: 'world',      // 指定使用世界地图
          roam: true,        // 开启鼠标缩放和平移漫游
          selectedMode: false,
          label: {
            show: false,
            color: "#ffffff",
          },
          itemStyle: {
            borderColor: "#A1AAC7",
            areaColor: '#DFE9F8',
            borderWidth: 1,
          },
          emphasis: {
            label: {
              show: true,
              color: "#000",
            },
            itemStyle: {
              areaColor: "#f2faf9",
            },
          },
          markPoint: {
            symbol: `image://${markImg}`,
            symbolSize: 30, // 标记点大小
            data: dataMap
          }
        },
      ]
    }
    onMounted(() => {
      nextTick(() => {
        const myChart = echarts.init(document.getElementById('chartRef')) // echarts.init(myRadar1)
        echarts.registerMap("world", { geoJSON: world })

        myChart.setOption(options)
        window.onresize = () => {
          myChart.resize()
        }
        myChart.on('click', function (e) {
          const data = e.data
          handleWordClick(data)
        })

      })
    })
    const handleWordClick = (data) => {
      console.log(data)
    }
    return () => <>
      <div id="chartRef" style="width: 100%; height: 100%;"></div>
      <Modal></Modal>
    </>
  }
})
