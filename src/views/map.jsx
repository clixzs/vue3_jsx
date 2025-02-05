import { defineComponent, nextTick, onMounted, ref } from 'vue'
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import { useAddLayer } from '@/hooks/useAddLayer'
import RollerComponent from '@/components/roller'
const { addVectorLayer, addImageryLayer, removeImageryLayer } = useAddLayer()

export default defineComponent({
  props: {
    widthD: {
      type: Object,
      default: {
        width: '100%',
        height: '100vh'
      }
    },

  },
  setup (props, context) {
    let paramValue = ref('') // url参数
    let paramType = ref('') // url参数
    const rollerRef = ref(null)
    let toolbar = ref(null)

    onMounted(() => {
      var map = null
      map = new maptalks.Map('mapView', {
        center: [120.11143123, 31.496465123],
        zoom: 9.7,
        pitch: 0, // 倾斜度
        minZoom: 5,
        maxZoom: 13.4,
        attribution: false,
        spatialReference: {
          projection: 'EPSG:4326',
        },
        zoomControl: true,
        scaleControl: true,
      })
      window.viewer = map
      toolbar.value = new maptalks.control.Toolbar({
        'position': { 'top': 80, 'left': 80 },
        'items': [{
          item: '卷帘',
          click: function () { rollerRef.value.rollerApi(); }
        }]
      })
        .addTo(map);
      initialLayer()// 解析url参数，加载图斑
    })


    // 初始化加载底图
    function initialLayer () {
      try {
        // 获取url参数
        const hash = window.location.hash.substring(1); // 去掉开头的 '#'
        const params = new URLSearchParams(hash.split('?')[1]);
        paramValue.value = params.get('layerName');
        paramType.value = params.get('type');
        if (paramType.value && paramValue.value) { // 如果有type参数，则只 添加影像图层
          addImageryLayer(paramValue.value)
          return
        }
        if (paramValue.value) { // 如果没有type参数，则添加矢量图层
          toolbar.value.remove()
          addVectorLayer(paramValue.value)
        }
      } catch (error) {
        console.log('url参数解析失败', error);
      }
    }


    const buttonStyle = { width: props.widthD };
    return () => <>
      <div style='position: relative'>
        {<RollerComponent paramValue={paramValue.value} paramType={paramType.value} removeImageryLayer={removeImageryLayer} addImageryLayer={addImageryLayer} ref={rollerRef}></RollerComponent>}
        <div id='mapView' style={buttonStyle.width}></div >
      </div>
    </>
  }
})
