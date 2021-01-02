<template>
  <!--<div class="f_sect fgrid_container">
    <div class="fgrid_left">
      <div class="f_sect f_bg_trans">
        <Menu />
      </div>
      <div class="f_sect f_bg_trans">
        <Ranks />
      </div>
    </div>
    <div class="fgrid_mid">-->
  <div>
    <div class="f_sect f_bg_trans">
      <Profile />
    </div>
    <div class="f_sect_double">
      <div class="f_sect f_bg_trans f_sect_half">
        <PBWTTL
          board_name="general"
          ttl="자유 게시판"
          :categories="['general']"
        />
      </div>
      <div class="f_sect f_bg_trans f_sect_half">
        <PBWTTL board_name="info" ttl="정보 게시판" :categories="['info']" />
      </div>
    </div>
  </div>
  <!--</div>
    <div class="fgrid_right">
      <div class="f_sect f_bg_trans">
        <UPP />
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
    <Modal /></div
>
-->
</template>
<style lang="scss">
// .f_sect_half {
//   width: 50%;
//   @media only screen and (max-width: $desktop) {
//     width: 100%;
//   }
// }
// .f_sect_double {
//   display: flex;
//   flex-wrap: wrap;
// }
// .f_sect_more_btn {
//   outline: 0;
//   border: 0;
//   margin-top: 1rem;
//   font-size: 1rem;
//   cursor: pointer;
//   color: black;
// }

// .fsect_ttl {
//   cursor: pointer;
//   font-weight: 600;
//   color: black;
//   font-size: 1.4rem;
//   // padding: 0 1rem;
//   margin-bottom: 0.5rem;
// }
// .f_sect {
//   padding: 4px;
//   box-sizing: border-box;
// }
// .f_bg_trans {
//   background: transparent;
// }
// .f_bg_white {
//   background: #fff;
// }
// .f_ctnr {
//   padding: 12px;
//   box-sizing: border-box;
// }
// .f_100 {
//   width: 100%;
//   height: 100%;
// }
// .fgrid_left {
//   width: 15%;
//   @media only screen and(max-width: $tablet) {
//     // display: none;
//     width: 100%;
//   }
// }
// .fgrid_mid {
//   width: 52.5%;
//   @media only screen and(max-width: $tablet) {
//     width: 100%;
//   }
// }

// .fgrid_right {
//   width: 32.5%;
//   @media only screen and(max-width: $tablet) {
//     width: 100%;
//   }
// }
// .fgrid_container {
//   width: 100%;
//   // min-height: 100vh;
//   display: flex;
//   flex-wrap: wrap;
// }

// .placeholder_item_style {
//   width: 100%;
//   // height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
</style>
<script>
import Profile from './Profile'
import Popular from './Popular'
import Menu from './Menu'
import PBWTTL from './Boards/PartialBoardWTTL'
import Modal from './Modal'
import BeermanBoardPartial from './Boards/BeermanBoardPartialWTTL'
import Container from './Container'
import UPP from './UserProfile/UserProfilePartial'
import PContent from './Popular/ContentPartial'
import PComment from './Popular/CommentPartial'
import Ranks from './Ranks'

export default {
  components: {
    Container,
    Profile,
    Popular,
    Menu,
    PBWTTL,
    Modal,
    BeermanBoardPartial,
    UPP,
    PContent,
    PComment,
    Ranks
  },
  data() {
    return {}
  }
}
</script>
