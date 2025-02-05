
import { defineComponent, ref } from 'vue';
import { Share, View } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import {
    getLocation,
    getLocationVector
} from './location'

export default defineComponent({
    name: 'LocationDialog',
    props: {
        title: {
            type: String,
            default: '服务地址'
        }
    },
    setup (props, context) {
        const list = ref([])
        let isShow = ref(false)

        const show = (e, type) => {
            console.log(e.row, type);
            list.value = type === 'img' ? getLocation(e.row.layerName) : getLocationVector(e.row.layerName)
            isShow.value = true
        }
        context.expose({ show })
        const handleShare = (i) => {
            const { label, value } = i
            navigator.clipboard.writeText(value).then(() => {
                ElNotification({
                    title: '提示',
                    message: '复制成功',
                    type: 'success'
                })
            })
        }
        const handleView = (i) => {
            if (i.type === 'vector') {
                window.open(`${window.location.origin}/web/#/map?layerName=${i.name}`, '_blank')
                return
            }
            window.open(`${window.location.origin}/web/#/map?layerName=${i.name}&type=img`, '_blank')
        }
        return () => (
            <el-dialog v-model={isShow.value} title={props.title} width="800" onClose={() => {
                list.value = []
                isShow.value = false
            }}>
                {
                    list.value.map(item => <div style='padding-bottom: 15px;border-bottom: 1px solid #ccc;'>
                        <h3 style='margin-bottom: 10px;font-weight: 600;color:#000'>{item.title}</h3>
                        {item.children.map(i => <div style='margin-bottom: 10px;display: flex;justify-content: space-between;'>
                            <div style='display: inline-block;width: 200px;'>{i.label}：</div>
                            <el-input v-model={i.value} placeholder="请输入服务地址" readonly style="width: 600px;" >
                                {{
                                    append: (e) => (
                                        <div style='display: flex;justify-content: space-between;'>
                                            <el-button icon={Share} onClick={() => handleShare(i)}></el-button>
                                            {i.show && <el-button onClick={() => handleView(i)} style='margin-left: 10px;border-left:1px solid #ccc' icon={View}></el-button>}
                                        </div>
                                    )
                                }}
                            </el-input>
                        </div>)
                        }
                    </div>)
                }
            </el-dialog >
        );
    }
});
