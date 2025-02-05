
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'EditDialog',
    props: {
        detailList: {
            type: Object,
            default: () => { }
        },
        title: {
            type: String,
            default: '详情'
        },
        isShow: {
            type: Boolean,
            default: false
        },
        showApi: {
            type: Function,
            default: null
        }
    },
    setup (props) {
        return () => (
            <el-dialog v-model={props.isShow} title={props.title} width="800" onClose={props.showApi}>
                {Object.entries(props.detailList).map(([key, value]) => (
                    <div key={key}>
                        <span style="display:inline-block;width:80px;font-size:15px;padding:10px 0;font-weight: 700;">
                            {key}:
                        </span>
                        <span style="font-size:16px;padding:10px 0;" >{value}</span>
                    </div>
                ))}
            </el-dialog>
        );
    }
});
