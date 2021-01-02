export default ({ store, route, redirect, app }) => {
  // console.log(obj)
  // const { store, route, redirect } = obj
  // this.$store.dispatch('users/check')
  const user = store.state.users.user
  const blockedRoute = /\/admin\/*/g
  let authreqRoutes = ['/bookmarks', '/profile']

  if (!user) {
    if (route.path.match(blockedRoute)) {
      redirect('/')
    } else {
      authreqRoutes.forEach(authreqroute => {
        if (route.path.startsWith(authreqroute)) {
          app.$toast.error('로그인해주세요', {
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          })
          redirect('/login')
        }
      })
    }
  } else {
    if (!user.email_verified) {
      // if (route.path !== '/' && route.path !== '/verify') {
      //   redirect('/verify')
      //   app.$toast.clear()
      //   app.$toast.error('해당 페이지를 보시려면 이메일 인증을 해주세요!', {
      //     action: {
      //       text: 'CLOSE',
      //       onClick: (e, toastObject) => {
      //         toastObject.goAway(0)
      //       }
      //     }
      //   })
      // }
    }
    if (route.path === '/login') {
      redirect('/profile')
    }
  }
}
