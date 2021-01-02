import Cookie from 'js-cookie'
export default function({ $axios, app, store }) {
  //   console.log(Cookie.get('access_token'))
  $axios.defaults.withCredentials = true
  // console.log($axios.defaults)
  //   console.log()
  //   $axios.onRequest(config => {
  // if (store.state.authToken) {
  // config.headers.common['withCredentials'] = true
  // config.headers.common['Access-Control-Allow-Headers'] =
  //   'Content-Type, Set-Cookie, *'
  // // }
  //   })
}
