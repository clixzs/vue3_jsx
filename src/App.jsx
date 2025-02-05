import { RouterLink, RouterView } from 'vue-router'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {

    return () => <>
      {/* <header>
        <div className="wrapper">
          <RouterLink to="/">按数据类型</RouterLink>
          <RouterLink to="/nations">按国家</RouterLink>
        </div>
      </header> */}
      <RouterView />
    </>
  }
})


