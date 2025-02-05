import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'TableTemplate',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    // 操作列是否显示
    isOpt: {
      type: Boolean,
      default: false
    },
    optWidth: {
      type: Number,
      default: 150
    },
    pageInfo: {
      type: Object,
      default: () => ({
        total: 0,
        pageSize: 10,
        pageNum: 1
      })
    },
    optBtn: {
      type: Function,
      default: null
    },
    isPage: {
      type: Boolean,
      default: true
    },
    handlePageChange: {
      type: Function,
      default: null
    }
  },
  setup (props) {
    // const { data, columns, isOpt, optBtn, pageInfo, isPage } = props
    // onMounted(()=>{
    //   const { data, columns, isOpt, optBtn, pageInfo, isPage } = props
    // })
    const handlePageChange = (pageNum) => {
      console.log('pageNum', pageNum)
      props.handlePageChange(pageNum)
    }
    return () => <>
      <el-table data={props.data}>
        <el-table-column label="序号" width="70" align="center">
          {
            {
              default: ({ $index }) => <span>{props.pageInfo.pageSize * (props.pageInfo.pageNum - 1) + $index + 1}</span>
            }
          }
        </el-table-column>
        {
          props.columns.map(item => <el-table-column
            key={item.prop}
            prop={item.prop}
            label={item.label}
            width={item.width}
            align={item.align || 'left'}
            type={item.type}
            fixed={item.fixed || false}
            show-overflow-tooltip={item.showOverflowTooltip || false}
            formatter={item.formatter}
          />)
        }
        {
          props.isOpt && <el-table-column label="操作" width={props.optWidth} align="center">
            {
              {
                default: (scope) => props.optBtn(scope),
              }
            }
          </el-table-column>
        }
      </el-table>
      {
        props.isPage && <div className='flex flex-ju-end' style={{ marginTop: '10px' }}><el-pagination
          page-size={props.pageInfo.pageSize}
          layout="total,prev, pager, next"
          total={props.pageInfo.total}
          current-change={page => handlePageChange(page)}
        /></div>
      }
    </>
  }
})
