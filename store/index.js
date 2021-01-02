import JWTDecode from 'jwt-decode'
import cookieparser from 'cookieparser'
import { auth } from '~/services/firebase'
import Cookie from 'js-cookie'

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    if (process.server && process.static) return
    if (!req.headers.cookie) return

    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.access_token

    if (!accessTokenCookie) return

    const decoded = JWTDecode(accessTokenCookie)

    if (decoded) {
      commit('users/SET_USER', {
        uid: decoded.user_id,
        email: decoded.email,
        email_verified: decoded.email_verified,
        username: parsed.username,
        thumbnail: parsed.thumbnail
        // expires: parsed.expires
      })
    }
  },
  nuxtClientInit({ commit, dispatch }, { req }) {
    // const parsed = cookieparser.parse(req.headers.cookie)

    if (process.server && process.static) return
    let accessTokenCookie = Cookie.get('access_token')
    let username = Cookie.get('username')
    let thumbnail = Cookie.get('thumbnail')
    let expires = Cookie.get('expires')

    // const decoded = JWTDecode(accessTokenCookie)
    if (accessTokenCookie) {
      const decoded = JWTDecode(accessTokenCookie)

      if (decoded) {
        commit('users/SET_USER', {
          uid: decoded.user_id,
          email: decoded.email,
          email_verified: decoded.email_verified,
          username,
          thumbnail,
          expires
        })
      }

      if (!decoded.email_verified) dispatch('users/validateemail')
    }
  }
}
