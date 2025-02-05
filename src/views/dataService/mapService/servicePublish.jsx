import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const activeIndex = ref(1)
    return () => (
      <>
        <el-card shadow="never">
          <div></div>
          <div class="flex flex-ju-center">
            <el-steps style="width: 100%;" active={activeIndex.value} align-center>
              <el-step title="选择数据"/>
              <el-step title="设置参数"/>
              <el-step title="发布完成"/>
            </el-steps>
          </div>
          {
            activeIndex.value == 1 && <>
              <el-button type="primary">选择数据</el-button>
            </>
          }
        </el-card>
      </>
    )
  },
})
