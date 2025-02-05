import TableTemplate from '@/components/TableTemplate'
import { defineComponent, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import './index.scss'
export default defineComponent({
  name: 'Tenants',
  setup() {
    const formData = ref({
      tenantName: '',
      tenantCode: '',
      tenantDesc: '',
      tenantImg: '',
      tenantStatus: '',
      effectiveDate: '',
    })
    const dialogVisible = ref(false)
    const tableColumns = ref([
      {
        prop: 'tenantName',
        label: '租户名称',
        width: '200',
      },
      {
        prop: 'tenantCode',
        label: '租户编码',
        width: '200',
      },
      {
        prop: 'tenantDesc',
        label: '租户描述',
      },
      {
        prop: 'createTime',
        label: '创建时间',
      },
      {
        prop: 'updateTime',
        label: '更新时间',
      },
    ])
    const tableData = ref([
      {
        id: 1,
        tenantName: '无锡道达科技有限公司',
        tenantCode: '0000000001',
        tenantDesc: '主公司',
        createTime: '2021-01-01 00:00:00',
        updateTime: '2021-01-01 00:00:00',
      },
      {
        id: 2,
        tenantName: '公司1',
        tenantCode: '0000000002',
        tenantDesc: 'admin',
        createTime: '2021-01-01 00:00:00',
        updateTime: '2021-01-01 00:00:00',
      },
      {
        id: 3,
        tenantName: '公司2',
        tenantCode: '0000000003',
        tenantDesc: 'test',
        createTime: '2021-01-01 00:00:00',
        updateTime: '2021-01-01 00:00:00',
      },
    ])
    const optBtn = scope => (
      <div style="text-align: center;">
        <el-link type="primary" onClick={edit(scope)} disabled={scope.row.id === 1}>
          编辑
        </el-link>
        <el-link type="warning" style="margin-left:10px;" disabled={scope.row.id === 1}>
          删除
        </el-link>
      </div>
    )
    const edit = scope => () => {
      console.log(scope)
    }
    const handleAvatarSuccess = (res, file) => {
      console.log(res)
    }
    const beforeAvatarUpload = file => {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
    }
    return () => (
      <>
        <el-card shadow="never">
          <div
            className="flex flex-ju-between flex-al-center"
            style="margin-bottom: 20px;"
          >
            <el-button
              type="primary"
              onClick={() => (dialogVisible.value = true)}
            >
              添加租户
            </el-button>
          </div>
          <TableTemplate
            data={tableData.value}
            columns={tableColumns.value}
            isOpt={true}
            optBtn={optBtn}
          >
          </TableTemplate>
        </el-card>
        <el-dialog v-model={dialogVisible.value} title="添加租户" width="30%">
          <el-form model={formData.value} label-width="80px">
            <el-form-item label="租户名称">
              <el-input
                v-model={formData.value.tenantName}
                placeholder="请输入租户名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="租户编码">
              <el-input
                v-model={formData.value.tenantCode}
                placeholder="请输入租户编码"
              ></el-input>
            </el-form-item>
            <el-form-item label="租户描述">
              <el-input
                type="textarea"
                row="3"
                v-model={formData.value.tenantDesc}
                placeholder="请输入租户描述"
              ></el-input>
            </el-form-item>
            <el-form-item label="租户状态">
              <el-select
                v-model={formData.value.tenantStatus}
                placeholder="请选择租户状态"
              >
                <el-option label="启用" value={1}></el-option>
                <el-option label="禁用" value={0}></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="租户logo">
              <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                show-file-list={false}
                on-success={handleAvatarSuccess}
                before-upload={beforeAvatarUpload}
              >
                {formData.value.tenantImg ? (
                  <img src={formData.value.tenantImg} class="avatar" />
                ) : (
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                )}
              </el-upload>
            </el-form-item>
            <el-form-item label="有效日期">
              <el-date-picker
                v-model={formData.value.effectiveDate}
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style={{ width: '100%' }}
              ></el-date-picker>
            </el-form-item>
            <div align="center">
              <el-button type="primary" onClick={() => { }}>
                确定
              </el-button>
            </div>
          </el-form>
        </el-dialog>
      </>
    )
  },
})
