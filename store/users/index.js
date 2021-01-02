import { auth, provider } from '@/services/firebase'
import interval_manager from '@/services/interval'
import Cookie from 'js-cookie'
import firebase_errs from '~/misc/firebase_errs'
import sql_errs from '~/misc/sql_errs'

export const state = () => ({ user: null, refresher: null, validator: null })

export const actions = {
  async loginguard({ state }, toast) {
    if (state.user === null) {
      toast.error('로그인해주세요', {
        duration: 2000,
        action: {
          text: '닫기',
          onClick: (e, toastObject) => {
            toastObject.goAway(0)
          }
        }
      })
      return false
    }
    return true
  },
  async passwordreset({ commit }, email, router, toast) {
    try {
      let social = await this.$axios.get('/user/type', {
        params: {
          email
        }
      })
      // console.log(social)
      if (social.data.type === 'social') return 'social'
    } catch (err) {
      // console.log(err, err.response)
      if (err.response.status === 400) {
        if (sql_errs[err.response.data]) throw sql_errs[err.response.data]
        else throw 'Something went wrong!\nPlease try again'
      } else throw 'Something went wrong!\nPlease try again'
    }
    try {
      let result = await auth.sendPasswordResetEmail(email)
    } catch (err) {
      throw '다시 한번 시도해주세요!'
    }
  },
  async googlelogin({ commit }, router, toast) {
    try {
      let result = await auth.signInWithPopup(provider)
      // The signed-in user info.
      var user = result.user
      const { email, emailVerified, uid } = user
      // console.log(result)
      // console.log(user)

      // token
      // var token = result.credential.accessToken
      const token = await auth.currentUser.getIdToken()

      let expires = new Date()
      expires.setTime(expires.getTime() + 57 * 60 * 1000)

      Cookie.set('access_token', token, {
        expires: 7,
        domain: process.env.cookieUrl
      })
      let server_result = await this.$axios.post('/user', {
        username: user.displayName,
        email,
        social: true
      })
      if (!server_result.data[1]) {
        Cookie.set('username', server_result.data[0].username, {
          expires: 7,
          domain: process.env.cookieUrl
        })
        Cookie.set('thumbnail', server_result.data[0].thumbnail, {
          expires: 7,
          domain: process.env.cookieUrl
        })
      }

      Cookie.set('expires', expires, {
        expires: 7,
        domain: process.env.cookieUrl
      })
      commit('SET_USER', {
        email,
        uid,
        expires,
        email_verified: emailVerified,
        username: server_result.data[0].username
      })
      commit('SET_REFRESHER', async () => {
        try {
          const token = await auth.currentUser.getIdToken(true)

          email = auth.currentUser.email

          let expires = new Date()
          expires.setTime(expires.getTime() + 57 * 60 * 1000)

          Cookie.set('access_token', token, {
            expires: 7,
            domain: process.env.cookieUrl
          })
          Cookie.set('expires', expires, {
            expires: 7,
            domain: process.env.cookieUrl
          })

          commit('UPDATE_USER_INFO', {
            expires
          })
        } catch (err) {
          dispatch('clearemailvalidator')
          if (
            err.code === 'auth/user-token-expired' ||
            err.code === 'auth/invalid-user-token'
          ) {
            toast.error('시간이 지나 로그아웃됐습니다. 다시 로그인 해주세요')
            // router.push({ path: '/' })
          }
        }
      })
      return true
      // console.log(result)
      // console.log('asdfjaskldfjaslkdfjaslkdfjaslkdjfaslkjflks')
      // console.log('user', user)
    } catch (err) {
      console.log('err', err)
      Cookie.remove('access_token')
      if (
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request' ||
        err.code === 'auth/popup-closed-by-user'
      ) {
      } else if (err.code && firebase_errs[err.code])
        throw firebase_errs[err.code]
      else if (err.response && err.reponse.data && sql_errs[err.response.data])
        throw sql_errs[err.response.data]
      else throw 'Something went wrong!\nPlease Try again'
      // var errorCode = error.code
      // var errorMessage = error.message
      // The email of the user's account used.
      // var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential
    }
  },
  async signout({ commit }) {
    try {
      let res = await auth.signOut()
      Cookie.remove('access_token')
      Cookie.remove('username')
      Cookie.remove('thumbnail')
      Cookie.remove('expires')
      commit('SET_USER', null)
      commit('CLEAR_REFRESHER')
    } catch (err) {
      throw 'Something went wrong. Please Signout again'
    }
  },
  async validateemail({ commit, dispatch }) {
    clearInterval(interval_manager.email_validator)
    // if (auth.currentUser)
    interval_manager.email_validator = setInterval(() => {
      if (auth.currentUser)
        auth.currentUser.reload().then(ok => {
          if (auth.currentUser && auth.currentUser.emailVerified) {
            dispatch('refresh')

            commit('UPDATE_USER_INFO', { email_verified: true })
            dispatch('clearemailvalidator')
          }
        })
    }, 1000)
  },
  async clearemailvalidator() {
    clearInterval(interval_manager.email_validator)
  },
  async login({ commit, dispatch }, account, router, toast) {
    try {
      let social = await this.$axios.get('/user/type', {
        params: {
          email: account.email
        }
      })
      if (social.data.type === 'social') return 'social'
    } catch (err) {
      if (err.response.status === 400) {
        if (sql_errs[err.response.data]) throw sql_errs[err.response.data]
        else throw 'Something went wrong!\nPlease try again'
      } else throw 'Something went wrong!\nPlease try again'
    }
    let email
    try {
      await auth.signInWithEmailAndPassword(account.email, account.password)

      const token = await auth.currentUser.getIdToken(true)
      const { uid, emailVerified } = auth.currentUser
      if (!emailVerified) dispatch('validateemail')

      email = auth.currentUser.email

      let expires = new Date()
      expires.setTime(expires.getTime() + 57 * 60 * 1000)

      Cookie.set('access_token', token, {
        expires: 7,
        domain: process.env.cookieUrl
      })
      Cookie.set('expires', expires, {
        expires: 7,
        domain: process.env.cookieUrl
      })
      commit('SET_USER', { email, uid, expires, email_verified: emailVerified })

      commit('SET_REFRESHER', async () => {
        try {
          const token = await auth.currentUser.getIdToken(true)

          email = auth.currentUser.email

          let expires = new Date()
          expires.setTime(expires.getTime() + 57 * 60 * 1000)

          Cookie.set('access_token', token, {
            expires: 7,
            domain: process.env.cookieUrl
          })
          Cookie.set('expires', expires, {
            expires: 7,
            domain: process.env.cookieUrl
          })

          commit('UPDATE_USER_INFO', {
            expires
          })
        } catch (err) {
          dispatch('clearemailvalidator')
          if (
            err.code === 'auth/user-token-expired' ||
            err.code === 'auth/invalid-user-token'
          ) {
            toast.error('시간이 지나 로그아웃됐습니다. 다시 로그인 해주세요')
            // router.push({ path: '/' })
          }
        }
      })
    } catch (err) {
      dispatch('clearemailvalidator')
      if (firebase_errs[err.code]) throw firebase_errs[err.code]
      else if (firebase_errs[err.message]) throw firebase_errs[err.message]
      else throw 'Something went wrong!\nPlease try again'
    }
    try {
      let user_info_req = await this.$axios.get('/user', {
        params: {
          email
        }
      })

      let { username, thumbnail } = user_info_req.data.user
      thumbnail = thumbnail ? thumbnail : ''
      Cookie.set('username', username, {
        expires: 7,
        domain: process.env.cookieUrl
      })
      Cookie.set('thumbnail', thumbnail, {
        expires: 7,
        domain: process.env.cookieUrl
      })

      commit('UPDATE_USER_INFO', {
        username,
        thumbnail
      })
    } catch (err) {
      await auth.signOut()
      dispatch('clearemailvalidator')
      Cookie.remove('access_token')
      Cookie.remove('username')
      Cookie.remove('thumbnail')
      Cookie.remove('expires')
      commit('SET_USER', null)
      commit('CLEAR_REFRESHER')
      if (err.response.status === 400) {
        if (sql_errs[err.response.data]) throw sql_errs[err.response.data]
        else throw 'Something went wrong!\nPlease try again'
      } else throw 'Something went wrong!\nPlease try again'
    }
  },
  async sendEmailVerification({ commit, dispatch }, setInterval = false) {
    try {
      await auth.currentUser.sendEmailVerification()
      if (setInterval) dispatch('validateemail')
    } catch (err) {
      if (err.code === 'auth/too-many-requests') throw err.code
      else if (firebase_errs[err.code]) throw firebase_errs[err.code]
      else throw 'Something went wrong!\nPlease Try again'
    }
  },
  async signup({ commit }, info) {
    try {
      let result = await this.$axios.post('/user', info)
    } catch (err) {
      if (err.response.status === 400) {
        console.log(err.response)
        if (sql_errs[err.response.data]) throw sql_errs[err.response.data]
        else throw err.response.data
      } else throw 'Something went wrong!\nPlease Try again'
    }
    const { email, password } = info
    try {
      let user = await auth.createUserWithEmailAndPassword(email, password)
    } catch (err) {
      await this.$axios.delete('/user', { params: { email } })
      if (firebase_errs[err.code]) throw firebase_errs[err.code]
      else throw 'Something went wrong!\nPlease Try again'
    }
  },
  async signup_firebase({ commit }, info) {
    // while (true) {
    try {
      const { email, password } = info
      await auth.createUserWithEmailAndPassword(email, password)
    } catch (err) {
      if (firebase_errs[err.code]) throw firebase_errs[err.code]
      else throw 'Something went wrong!\nPlease Try again' // throw 2
    }
    // }
  },
  async refresh({ commit }) {
    let getnewtoken = async () => {
      const token = await auth.currentUser.getIdToken(true)

      let expires = new Date()
      expires.setTime(expires.getTime() + 55 * 60 * 1000)

      Cookie.set('access_token', token, {
        expires: 7,
        domain: process.env.cookieUrl
      })
      Cookie.set('expires', expires, {
        expires: 7,
        domain: process.env.cookieUrl
      })

      commit('UPDATE_USER_INFO', {
        expires
      })
    }
    getnewtoken()
    commit('SET_REFRESHER', getnewtoken)
  }
}

export const mutations = {
  SET_USER: (state, account) => {
    state.user = account
  },
  UPDATE_USER_INFO: (state, info) => {
    state.user = {
      ...state.user,
      ...info
    }
  },
  SET_REFRESHER: (state, func) => {
    clearInterval(state.refresher)
    state.refresher = setInterval(func, 55 * 60 * 1000)
  },
  CLEAR_REFRESHER: state => {
    clearInterval(state.refresher)
  }
}
