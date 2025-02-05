import { defineComponent, onMounted, ref } from 'vue'
import { getStylesData } from '@/api/dataService'
import TableTemplate from '@/components/TableTemplate'
export default defineComponent({
  setup() {
    onMounted(() => {
      initData()
    })
    const pageInfo = ref({
      pageNum: 1,
      pageSize: 10,
      total: 0
    })
    const layerName = ref("")
    const dataList = ref([])
    const initData = async () => {
      const res = await getStylesData({
        currentPage: pageInfo.value.pageNum,
        pageSize: pageInfo.value.pageSize,
        styleName: layerName.value
      })
      pageInfo.value.total = res.total
      dataList.value = res.data
    }
    const tableColumns = ref([
      {
        label: '样式名称',
        prop: 'name'
      },
      {
        label: '样式类型',
        prop: 'category'
      },
      {
        label: '文件类型',
        prop: 'format'
      },
      {
        label: '创建时间',
        prop: 'createTime',
        // formatter: (row) => {
        //   return row.minLevel + '-' + row.maxLevel
        // }
      },
    ])
    const handleSearch = () => {
      pageInfo.value.pageNum = 1
      initData()
    }
    return () => (
      <>
        <el-card shadow="never">
          <div className="flex flex-ju-between flex-al-center" style="margin-bottom:20px">
            <el-button type="primary">添加样式表</el-button>
            <el-input v-model={layerName.value} placeholder="请输入图层名称" clearable onChange={handleSearch} style="width:300px">
              {
                {
                  suffix: () => <el-icon class="el-input__icon"><Search /></el-icon>
                }
              }
            </el-input>
          </div>
          <TableTemplate data={dataList.value} pageInfo={pageInfo.value} columns={tableColumns.value}></TableTemplate>
        </el-card>
      </>
    )
  },
})
