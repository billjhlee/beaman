<template>
  <div class="nuxt_ctnr forum_ctnr">
    <VerifyEmail v-if="verify_email" />
    <UsernameVerify v-if="verify_username" />
    <div class="f_sect fgrid_container">
      <div class="fgrid_left">
        <div class="f_sect f_bg_trans">
          <Menu />
        </div>
        <div class="f_sect f_bg_trans">
          <Ranks />
        </div>
      </div>
      <div class="fgrid_mid">
        <nuxt />
      </div>
      <div class="fgrid_right">
        <div class="f_sect f_bg_trans">
          <Container>
            <UPP />
          </Container>
        </div>
        <div class="f_sect f_bg_trans">
          <PContent />
        </div>
        <div class="f_sect f_bg_trans">
          <PComment />
        </div>
        <div class="f_sect f_bg_trans">
          <BeermanBoardPartial />
        </div>
      </div>
      <Modal
        @m_modal_close="m_close"
        :open="$store.state.modal.open"
        :classoverride="
          $store.state.modal.current === 'login'
            ? 'forum_modal_ctnr forum_modal_maxwidth'
            : 'forum_modal_ctnr'
        "
      >
        <!-- <UPPFULL />-->

        <UPPFULL
          :id="$store.state.modal.data.id"
          v-if="$store.state.modal.current === 'user'"
          :isModal="true"
        />
        <Post
          :id="$store.state.modal.data.id"
          v-else-if="$store.state.modal.current === 'post'"
        />
        <Login v-else-if="$store.state.modal.current === 'login'" />
      </Modal>
    </div></div
></template>
<style lang="scss">
.forum_modal_ctnr {
  width: 70%;
  @media only screen and (min-width: $desktop) {
    width: 60%;
  }
  @media only screen and(max-width: $tablet) {
    width: 80%;
  }
}

.forum_modal_maxwidth {
  max-width: 600px;
}
.forum_ctnr {
  background: #1e272e;
}
.f_sect_half {
  width: 50%;
  @media only screen and (max-width: $desktop) {
    width: 100%;
  }
}
.f_sect_double {
  display: flex;
  flex-wrap: wrap;
}

.fsect_ttl {
  cursor: pointer;
  // font-weight: 600;
  color: black;
  font-size: 1.4rem;
  // padding: 0 1rem;
  margin-bottom: 0.5rem;
}
.f_sect {
  padding: 5px;
  box-sizing: border-box;
}
.f_bg_trans {
  background: transparent;
}
.f_bg_white {
  background: #fff;
}
.f_ctnr {
  padding: 12px;
  border-radius: 4px;
  box-sizing: border-box;
}
.f_100 {
  width: 100%;
  height: 100%;
}
.fgrid_left {
  width: 15%;
  @media only screen and(max-width: $tablet) {
    // display: none;
    width: 100%;
  }
}
.fgrid_mid {
  width: 52.5%;
  @media only screen and(max-width: $tablet) {
    width: 100%;
  }
}

.fgrid_right {
  width: 32.5%;
  @media only screen and(max-width: $tablet) {
    width: 100%;
  }
}
.fgrid_container {
  width: 100%;
  // min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
}

.placeholder_item_style {
  width: 100%;
  // height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
// body {
//   font-family: 'Do Hyeon';
// }
</style>
<script>
import VerifyEmail from '~/components/Forum/VerifyEmail'
import Profile from '~/components/Forum/Profile'
import Popular from '~/components/Forum/Popular'
import Menu from '~/components/Forum/Menu'
import PBWTTL from '~/components/Forum/Boards/PartialBoardWTTL'
import Modal from '~/components/Modal'
import BeermanBoardPartial from '~/components/Forum/Boards/BeermanBoardPartialWTTL'
import Container from '~/components/Forum/Container'
import UPP from '~/components/Forum/UserProfile/UserProfilePartial'
import UPPFULL from '~/components/Forum/UserProfile/Full'
import PContent from '~/components/Forum/Popular/ContentPartial'
import PComment from '~/components/Forum/Popular/CommentPartial'
import Ranks from '~/components/Forum/Ranks'
import Post from '~/components/Forum/Posts'
import Login from '~/components/Forum/Login'
import UsernameVerify from '~/components/Forum/UsernameVerify'

export default {
  components: {
    UsernameVerify,
    Container,
    Profile,
    Popular,
    Menu,
    PBWTTL,
    Modal,
    BeermanBoardPartial,
    UPP,
    UPPFULL,
    PContent,
    PComment,
    Ranks,
    Post,
    Login,
    VerifyEmail
  },
  data() {
    return {}
  },
  methods: {
    m_close: function() {
      this.$store.dispatch('modal/close')
    }
  },
  computed: {
    modal_open: function() {
      return this.$store.state.modal.open
    },
    verify_email: function() {
      return (
        this.$store.state.users.user !== null &&
        !this.$store.state.users.user.email_verified
      )
    },
    verify_username: function() {
      return (
        this.$store.state.users.user !== null &&
        !this.$store.state.users.user.username
      )
    }
  },
  watch: {
    modal_open: function(newVal) {
      if (newVal) {
        document.documentElement.style.overflow = 'hidden'
        return
      }

      document.documentElement.style.overflow = 'auto'
    },
    vemail_open: function(newVal) {
      if (newVal) {
        document.documentElement.style.overflow = 'hidden'
        return
      }

      document.documentElement.style.overflow = 'auto'
    },
    modal_open: function(newVal) {
      if (newVal) {
        document.documentElement.style.overflow = 'hidden'
        return
      }

      document.documentElement.style.overflow = 'auto'
    }
  }
}
</script>
