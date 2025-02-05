import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    name: String
  },
  setup(props, context) {
    const consoleFun = () => {
      console.log('测试')
    }
    context.expose({consoleFun})
    return () => (
      <>
        <div class="test">{props.name}</div>
      </>
    )
  },
})
