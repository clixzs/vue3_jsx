import { defineComponent, ref } from 'vue'
import './index.scss'
import TableTemplate from '@/components/TableTemplate'
import moment from 'moment/moment'
export default defineComponent({
  name: 'Roles',
  setup() {
    const tableData = ref([
      {
        id: 1,
        roleName: '超级管理员',
        roleDesc: '超级管理员',
        createTime: '2022-01-01 12:00:00',
        updateTime: '2022-01-01 12:00:00',
        accessList: '添加/删除/修改',
        tenantId: 1,
        tenantName: '无锡道达科技有限公司'
      },
      {
        id: 2,
        roleName: '管理员',
        roleDesc: '分属租户1的角色',
        createTime: '2022-01-01 12:00:00',
        updateTime: '2022-01-01 12:00:00',
        accessList: '添加/删除/修改',
        tenantId: 1,
        tenantName: '公司1'
      },
      {
        id: 3,
        roleName: '操作员',
        roleDesc: '分属租户1的操作员角色',
        createTime: '2022-01-01 12:00:00',
        updateTime: '2022-01-01 12:00:00',
        accessList: '添加/删除/修改',
        tenantId: 1,
        tenantName: '公司1'
      },
    ]);
    const tableColumns = ref([
      {
        label: '角色名称',
        prop: 'roleName'
      },
      {
        label: '角色描述',
        prop: 'roleDesc'
      },
      {
        label: '所属租户',
        prop: 'tenantName',
      },
      {
        label: '关联权限',
        prop: 'accessList'
      },
      {
        label: '创建时间',
        prop: 'createTime',
        align: 'center',
        formatter: (row, column, cellValue, index) => {
          return cellValue ? moment(cellValue).format('YYYY-MM-DD HH:mm:ss') : '';
        },
        width: 160
      },
      {
        label: '更新时间',
        prop: 'updateTime',
        align: 'center',
        formatter: (row, column, cellValue, index) => {
          return cellValue ? moment(cellValue).format('YYYY-MM-DD HH:mm:ss') : ''
        },
        width: 160
      }
    ])
    const addRole = () => {
    }
    const edit = (row) => {
    }
    return () => <>
      <el-card shadow="never">
        <div style='margin-bottom: 20px'>
          <el-button type="primary" onClick={() => addRole()}>添加角色</el-button>
        </div>
        <TableTemplate data={tableData.value} columns={tableColumns.value} isOpt={true} optBtn={scope => (
          <div style="text-align: center;">
            <el-link type="primary" onClick={edit(scope)} disabled={scope.row.id === 1}>
              编辑
            </el-link>
            <el-link type="warning" style="margin-left:10px;" disabled={scope.row.id === 1}>
              删除
            </el-link>
          </div>
        )}></TableTemplate>
      </el-card>
    </>
  }
})