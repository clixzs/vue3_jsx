import { defineComponent, nextTick, onMounted, ref } from 'vue'
import * as maptalks from 'maptalks'




export default defineComponent({
    props: {
        paramValue: {
            type: String,
            default: ''
        },
        paramType: {
            type: String,
            default: ''
        },
        removeImageryLayer: {
            type: Function,
            default: () => { }
        },
        addImageryLayer: {
            type: Function,
            default: () => { }
        }
    },
    setup (props, context) {


        let layer = ref(null) // 基础图层
        let layer1 = ref(null) // 叠加图层
        let sayerName = ref('')  // 左侧下拉选项
        let sayerName1 = ref('') // 右侧下拉选项
        const showRoller = ref(false) // 卷帘开关

        function rollerApi (name = props.paramValue, type) {
            !type ? showRoller.value = !showRoller.value : ''
            if (showRoller.value) {
                props.removeImageryLayer() // 删除原有的图层
                baserLayer(name) // 添加基础图层
                nextTick(() => {
                    sayerName.value = name
                    var swipe = document.getElementById('swipe');
                    var renderer = layer.value.getRenderer();
                    var canvasGetter = renderer.getCanvasImage;
                    var swipeCanvas = document.createElement('canvas');
                    renderer.getCanvasImage = function () {
                        var layerImage = canvasGetter.call(renderer);
                        if (!layerImage || !layerImage.image) {
                            return layerImage;
                        }
                        var ctx = renderer.context;
                        var width = renderer.canvas.width * (swipe.value / 100);
                        var height = ctx.canvas.height;
                        var leftCtx = swipeCanvas.getContext('2d');
                        swipeCanvas.width = ctx.canvas.width;
                        swipeCanvas.height = ctx.canvas.height;
                        leftCtx.clearRect(0, 0, swipeCanvas.width, swipeCanvas.height);
                        leftCtx.drawImage(layerImage.image, 0, 0, width, height, 0, 0, width, height);
                        layerImage.image = swipeCanvas;
                        return layerImage;
                    };
                    swipe.addEventListener('input', inputClick);
                })
            } else {
                clearLayer()
                props.addImageryLayer(props.paramValue)
                swipe.removeEventListener('input', inputClick);
                swipe.style.display = 'none';
            }
        }

        context.expose({
            rollerApi
        })
        function inputClick () { // 卷帘滑动input事件
            layer.value.getRenderer().setToRedraw();
        }

        let options = ref([{
            value: '无锡10M分辨率影像_202408',
            label: '无锡10M分辨率影像_202408',
        },
        {
            value: '无锡10M分辨率影像_202405',
            label: '无锡10M分辨率影像_202405',
        },])

        function baserLayer (name) { // 添加基础图层
            if (layer.value) {
                layer.value.remove()
                layer.value = null
            }
            const params = {
                urlTemplate: `${import.meta.env.VITE_BASE_API}/maptilecache/service/wms`,
                layers: name || `无锡10M分辨率影像_202405`,
                version: '1.0.0',
                timestamp: new Date().getTime(),
                format: 'image/png',
                srs: 'EPSG:4326',
            }
            layer.value = new maptalks.WMSTileLayer('wmsImg1', params)
            layer.value.addTo(window.viewer)
        }

        function clearLayer () { // 清除图层
            if (layer.value) {
                layer.value.remove()
                layer.value = null
            }
            if (layer1.value) {
                layer1.value.remove()
                layer1.value = null
            }
        }


        function updateLayerLeft (e) { // 左侧图层添加
            rollerApi(e, 'selse')
        }

        function updateLayerRight (e) { // 右侧图层添加
            if (layer1.value) {
                layer1.value.remove()
                layer1.value = null
            }
            const params1 = {
                urlTemplate: `${import.meta.env.VITE_BASE_API}/maptilecache/service/wms`,
                layers: `${e}`,
                version: '1.0.0',
                timestamp: new Date().getTime(),
                format: 'image/png',
                srs: 'EPSG:4326',
            }
            layer1 = new maptalks.WMSTileLayer('wmsImg2', params1)
            window.viewer.setBaseLayer(layer1);
        }



        return () => <>
            <div style='position: relative'>
                {showRoller.value && <div style='position: absolute;;width: 100%;z-index: 999;padding: 10px 0;'>
                    <div>
                        <input type="range" id="swipe" />
                    </div>
                    <div style='display: flex;justify-content: flex-end'>
                        <el-select
                            v-model={sayerName.value}
                            placeholder="选择图层"
                            style="width: 240px"
                            onChange={updateLayerLeft}
                        >
                            {
                                options.value.map(item => (
                                    <el-option
                                        key={item.value}
                                        label={item.label}
                                        value={item.label}
                                    ></el-option>
                                ))
                            }
                        </el-select>
                        --
                        <el-select
                            v-model={sayerName1.value}
                            placeholder="选择图层"
                            style="width: 240px"
                            onChange={updateLayerRight}
                        >
                            {
                                options.value.map(item => (
                                    <el-option
                                        key={item.value}
                                        label={item.label}
                                        value={item.label}
                                    ></el-option>
                                ))
                            }
                        </el-select>
                    </div>
                </div>}
            </div>
        </>
    }
})
