import router from "./router";

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path!='/login' && !token) {
    next('/login')
    // await jwtToken()
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // console.log(to)
})
