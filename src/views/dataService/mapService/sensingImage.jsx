import { defineComponent, onMounted, ref } from 'vue'
import { getRemoteSensingImages } from '@/api/dataService'
import TableTemplate from '@/components/TableTemplate'
import { useRouter } from 'vue-router'
import EditDialog from '@/components/EditDialog'
import LocationDialog from '@/components/LocationDialog'



export default defineComponent({
  setup () {
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
      const res = await getRemoteSensingImages({
        page: pageInfo.value.pageNum,
        pageSize: pageInfo.value.pageSize,
        order: 'DESC',
        isBase: true,
        layerType: 'IMAGELAYER',
        layerName: layerName.value
      })
      pageInfo.value.total = res.total
      dataList.value = res.data
    }
    const tableColumns = ref([
      {
        label: '图层名称',
        prop: 'layerName'
      },
      {
        label: '瓦片格式',
        prop: 'mimeType',
        width: 120,
        align: 'center',
      },
      {
        label: '格网集',
        prop: 'gridSet',
        width: 120,
        align: 'center',
      },
      {
        label: '层级范围',
        prop: 'maxLevel',
        width: 120,
        align: 'center',
        formatter: (row) => {
          return row.minLevel + '-' + row.maxLevel
        }
      },
      {
        label: '切片状态',
        prop: 'tileStatus',
        width: 120,
        align: 'center',
      },
      {
        label: '发布状态',
        prop: 'status',
        width: 120,
        align: 'center',
        formatter: (row) => {
          return row.operation === 1 ? '发布成功' : '发布中'
        }
      }
    ])
    const handleSearch = () => {
      pageInfo.value.pageNum = 1
      initData()
    }
    const handlePageChange = (pageNum) => {
      pageInfo.value.pageNum = pageNum
      initData()
    }

    const locationRef = ref(null)

    const buttonStyle = { marginLeft: '10px' };
    const isShow = ref(false)
    const detailList = ref({})

    function showApi () {
      isShow.value = false
    }
    const btnOpt = (scope) => {
      // return
      const handleClick = (action) => () => {
        console.log(scope, "影像");
        switch (action) {
          case 'detail':
            isShow.value = true
            detailList.value = {
              '图层名称': scope.row.layerName,
              '数据位置': scope.row.dmFilePath,
              '授权': scope.row.layerName,
              '瓦片格式': scope.row.mimeType,
              '网格集': scope.row.gridSet,
              '发布时间': scope.row.createTime || scope.row.publishTime,
            }
            break;
          case 'preview':
            window.open(`${window.location.origin}/web/#/map?layerName=${scope.row.layerName}&type=img`, '_blank')
            break;
          case 'address':
            locationRef.value.show(scope, 'img')
            break;
          case 'delete':
            break;
        }
      };
      return (
        <div style={{ textAlign: 'center' }}>
          <el-button type="primary" size="small" style={buttonStyle} onClick={handleClick('detail')}>
            详情
          </el-button>
          <el-button type="primary" size="small" style={buttonStyle} onClick={handleClick('preview')}>
            预览
          </el-button >
          <el-button type="primary" size="small" style={buttonStyle} onClick={handleClick('address')}>
            服务地址
          </el-button>
          <el-button type="danger" size="small" style={buttonStyle} onClick={handleClick('delete')}>
            删除
          </el-button>
        </div >
      );
    }
    const router = useRouter()
    const jumpPublishService = () => {
      router.push('/dataService/servicePublish')
    }
    return () => (
      <>
        <el-card shadow="never">
          <div className="flex flex-ju-between flex-al-center" style="margin-bottom:20px">
            <el-button type="primary" onClick={jumpPublishService}>发布服务</el-button>
            <el-input v-model={layerName.value} placeholder="请输入图层名称" clearable onChange={handleSearch} style="width:300px">
              {
                {
                  suffix: () => <el-icon class="el-input__icon"><Search /></el-icon>
                }
              }
            </el-input>
          </div>
          <TableTemplate data={dataList.value} pageInfo={pageInfo.value} columns={tableColumns.value} handlePageChange={handlePageChange} optBtn={btnOpt} isOpt={true} optWidth={360}></TableTemplate>
        </el-card>
        <EditDialog detailList={detailList.value} title={'图层详情'} isShow={isShow.value} showApi={showApi}></EditDialog>
        <LocationDialog ref={locationRef}></LocationDialog>
      </>
    )
  },
})
