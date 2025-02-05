import { defineComponent, onMounted, ref } from 'vue'
import Map from '../../map'
import { getLayerDetail, getStylesData, updateLayerStyle, getLayerByCode } from '@/api/dataService'
import { useAddLayer } from '@/hooks/useAddLayer'
import { ElNotification } from 'element-plus'


export default defineComponent({
    name: 'LayerStyle',
    props: {},
    setup (props, context) {
        const hash = window.location.hash.substring(1); // 去掉开头的 '#'
        const params = new URLSearchParams(hash.split('?')[1]);
        const paramValue = params.get('layerName');
        const { addVectorLayer } = useAddLayer()
        let sayerName = ref('')
        let options = ref([])
        let refresh = ref(0)
        const layerEdit = ref({})

        onMounted(() => {
            // 获取样式数据
            getStylesData({
                currentPage: 1,
                pageSize: 1000,
                styleName: ''
            }).then(res => {
                if (res.data && res.data.length > 0) {
                    options.value = res.data.map(item => {
                        return {
                            label: item.name,
                            value: item.id
                        }
                    })
                } else {
                    ElNotification({
                        title: '错误',
                        message: '样式数据获取失败',
                        type: 'error',
                    })
                }
            })

            // 获取图层详情
            getLayerDetail(paramValue).then(res => {
                if (res.id) {
                    layerEdit.value = res
                    sayerName.value = res.styleName
                } else {
                    ElNotification({
                        title: '错误',
                        message: '图层详情获取失败',
                        type: 'error',
                    })
                }
            })
        })
        const updateLayerStyleApi = (val) => {
            // 更新样式
            updateLayerStyle({
                layerName: paramValue,
                styleName: val
            }).then(res => {
                getLayerByCode(layerEdit.value.id).then(res => {
                    addVectorLayer(paramValue)
                })
            })
        }
        return () => (
            <>
                <el-card shadow="never" style='height:calc(100vh - 170px);overflow:hidden;'>
                    <h1 style='width:100%;text-align:left;background: #f5f7fa;'>
                        <span style='font-size:16px;font-weight:600'>选择样式：</span>
                        <el-select
                            v-model={sayerName.value}
                            placeholder="Select"
                            size="large"
                            style="width: 240px"
                            onChange={updateLayerStyleApi}
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
                    </h1>
                    <Map widthD={{ width: '100%', height: '680px' }}></Map >
                </el-card >
            </>
        )
    }
})
