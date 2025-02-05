import { defineComponent, onMounted, ref, watch } from 'vue'
import { routes } from '@/router'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const routes_ = routes.filter(item => item.meta.show)
    const router = useRouter()
    const activeMenu = ref('')
    onMounted(() => {
      activeMenu.value = lowercaseFirstLetter(router.currentRoute.value.name)
    })
    // 首字母小写
    const lowercaseFirstLetter = (string) => {
      return string.charAt(0).toLowerCase() + string.slice(1)
    }
    const handleOpen = (key, keyPath) => {
      // console.log(key, keyPath)
      // activeMenu.value = key
      router.push({
        path: keyPath.join('/')
      })
    }
    // watch(() => router.currentRoute.value.path, () => {
    //   console.log('-----',router.currentRoute.value,'----')
    //   activeMenu.value = router.currentRoute.value.name.toLocaleLowerCase()
    //   console.log(activeMenu.value,'----d-d-d-')
    // })
    return () => <>

      <el-menu active-text-color="#ffd04b" text-color="#fff"
        background-color="#545c64" onSelect={handleOpen} default-active={activeMenu.value} unique-opened={true}>
        {
          routes_.map(route => <el-sub-menu index={route.path} data-path={route.path} key={route.path}>
            {
              {
                title: () => <span>{route.meta.title}</span>,
                default: () => <>
                  {
                    route.children.map(subRoute => subRoute.meta.show && <el-menu-item index={subRoute.path} key={subRoute.path} data-path={subRoute.path}>
                      {subRoute.meta.title}
                    </el-menu-item>)
                  }
                </>
              }
            }
          </el-sub-menu>)
        }
      </el-menu>
    </>
  }
})
