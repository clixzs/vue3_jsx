import { defineComponent, ref, nextTick } from 'vue'
import { jwtToken } from '@/api/dataService'
import { useRouter } from 'vue-router'
// import Test from '@/components/Test.'
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
            <div style='height: 100vh; background: linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(12, 12, 12, 0.9) 40%, rgba(38, 38, 45, 0.85) 60%, rgba(90, 30, 70, 0.7) 100%);display: flex;align-items: center;justify-content: center;'>
                <div style="width: 400px;background:rgba(38, 38, 45, 0.3);padding: 30px;border-radius: 10px;box-shadow:rgba(134, 95, 122, 0.5) 0px 1px 20px 5px;">
                    <el-form label-position='left' label-width="auto" model={userForm.value} >
                        <el-form-item label="用户名" >
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
        </>
    }
})
