import firebase from 'firebase/app'
import 'firebase/auth'
import Cookie from 'js-cookie'

var firebaseConfig =
  process.env.NODE_ENV === 'production'
    ? {
        apiKey: 'AIzaSyD8BME7MNn7iSTqq1IS3t42uh2zJ2JkT3k',
        authDomain: 'beerman1-85f3e.firebaseapp.com',
        databaseURL: 'https://beerman1-85f3e.firebaseio.com',
        projectId: 'beerman1-85f3e',
        storageBucket: 'beerman1-85f3e.appspot.com',
        messagingSenderId: '944493831304',
        appId: '1:944493831304:web:b0482943af3cc80143eb3d',
        measurementId: 'G-WM3QKTWLLY'
      }
    : // {
      //   apiKey: 'AIzaSyATcctFggy6MTCf3zYschx-kr_0qOe7D5Y',
      //   authDomain: 'beerman-dev.firebaseapp.com',
      //   databaseURL: 'https://beerman-dev.firebaseio.com',
      //   projectId: 'beerman-dev',
      //   storageBucket: 'beerman-dev.appspot.com',
      //   messagingSenderId: '749727788577',
      //   appId: '1:749727788577:web:3bca5eb98ebf664d91bd60',
      //   measurementId: 'G-VF8C02CYD0'
      // }
      {
        apiKey: 'AIzaSyATcctFggy6MTCf3zYschx-kr_0qOe7D5Y',
        authDomain: 'beerman-dev.firebaseapp.com',
        databaseURL: 'https://beerman-dev.firebaseio.com',
        projectId: 'beerman-dev',
        storageBucket: 'beerman-dev.appspot.com',
        messagingSenderId: '749727788577',
        appId: '1:749727788577:web:3bca5eb98ebf664d91bd60',
        measurementId: 'G-VF8C02CYD0'
      }
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''

const auth = firebase.auth()
auth.languageCode = 'ko'

var provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')
// if (process.client) {
// }
auth.onAuthStateChanged(async user => {
  if (user) {
    // console.log(user)
    let expires = Cookie.get('expires')
    let diff = Date.parse(expires) - new Date().getTime()
    diff = Math.floor(diff / 1000 / 60)

    if (diff <= 0) {
      const token = await user.getIdToken(true)

      let new_expires = new Date()
      new_expires.setTime(new_expires.getTime() + 55 * 60 * 1000)
      Cookie.set('access_token', token, {
        expires: 7,
        domain: process.env.cookieUrl
      })
      Cookie.set('expires', new_expires, {
        expires: 7,
        domain: process.env.cookieUrl
      })
    }
  } else {
  }
})

export { auth, provider }
