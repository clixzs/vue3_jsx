import { defineComponent, ref, nextTick } from 'vue'
import { jwtToken } from '@/api/dataService'
import { useRouter } from 'vue-router'
import Test from '@/components/Test.'
export default defineComponent({
    name: 'Login',
    setup () {
        const userForm = ref({
            userName: 'admin',
            password: ''
        })
        const router = useRouter()
        const testRef = ref()

        const jumpLogin = async () => {
            // console.log(testRef.value.consoleFun())
            // return
            const token = await jwtToken()
            if (token) {
                router.push('/dataService/vector')
            }
        }
        return () => <>
            <div>
                <div style="width: 400px;margin: 0 auto;">
                    <el-form model={userForm.value}>
                        <el-form-item label="用户名">
                            <el-input v-model={userForm.value.userName} placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" >
                            <el-input v-model={userForm.value.password} placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <div>
                            <el-button type="primary" onClick={jumpLogin} style="width:100%">登录</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
            {/* <Test ref={testRef} name="测试好看"></Test> */}
        </>
    }
})
