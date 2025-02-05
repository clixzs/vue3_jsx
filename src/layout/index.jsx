import { defineComponent, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import './index.scss'
import Menus from './Menus'
export default defineComponent({
  setup() {
    const router = useRouter()
    const breadcrumbList = ref([])
    watch(() => router.currentRoute.value.path, (val) => {
      breadcrumbList.value = router.currentRoute.value.matched
    },{
      immediate: true
    })
    return () => <>
      <div class="common-layout">
        <el-container>
          <el-header className="flex flex-al-center flex-ju-center" style={{height: '60px',fontSize: '20px'}}>
            大数据资产管理与服务平台-无锡道达科技有限公司
          </el-header>
          <el-container>
            <el-aside width="200px">
              <Menus />
            </el-aside>
            <el-main>
              <el-card shadow="never" style="margin-bottom: 10px;">
                <el-breadcrumb>
                  {
                    breadcrumbList.value.map(item => <el-breadcrumb-item>{item.meta.title}</el-breadcrumb-item>)
                  }
                </el-breadcrumb>
              </el-card>
              <RouterView></RouterView>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </>
  }
})