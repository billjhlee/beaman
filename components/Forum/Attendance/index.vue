<template>
  <div class="">
    <div class="att_attd_rank_ctnr">
      <div class="att_attd_rank">
        <Rank title="개근순위" align="consecutive" />
      </div>
      <div class="att_attd_rank">
        <Rank title="출석순위" align="first" />
      </div>

      <div class="att_attd_rank">
        <Rank title="1등 순위" align="total" />
      </div>
    </div>
    <br />

    <Stats ref="user_stats" />
    <br />

    <Attend @attend="attend" />

    <ul class="fattdnc_attendees" v-if="attendees.list.length > 0 || appended">
      <li v-for="atdee in attendees.list" class="fattdnc_attendee">
        <Attendee
          :username="atdee.username"
          :content="atdee.content"
          :thumbnail="atdee.User.thumbnail"
        />
      </li>
      <li v-if="appended" class="fattdnc_attendee">
        <Attendee
          :username="appended.username"
          :content="appended.content"
          :thumbnail="appended.thumbnail"
        />
      </li>
    </ul>
    <button v-if="this.attendees.nextPage !== -1" @click="getAttendees">
      더불러오기
    </button>
  </div>
</template>
<style lang="scss">
.att_attd_rank_ctnr {
  display: flex;
  // flex-wrap: wrap;
}
.att_attd_rank {
  width: 33.33%;
}
.att_attd_ctnr {
  width: 25%;
  @media only screen and(max-width: $tablet) {
    width: 50%;
  }
  @media only screen and(max-width: $mobile) {
  }
}
.fattdnc_attendees {
  display: flex;
  flex-wrap: wrap;
}

.fattdnc_attendee {
  margin-top: 2rem;
  width: 33.33%;
  text-align: center;
  max-height: 600px;
  overflow: auto;
  @media only screen and(max-width: $tablet) {
    width: 50%;
  }
  @media only screen and(max-width: $mobile) {
    width: 100%;
  }
}
</style>
<script>
import Attend from './Attend'
import Attendee from './Attendee'
import Rank from './Rank'
import Stats from './Stats'
// import Times from './Times'

export default {
  components: {
    Attend,
    Attendee,
    Rank,
    Stats
    // Times
  },
  data() {
    return {
      attendees: {
        nextPage: 0,
        pageSize: 10,
        date: '',
        list: [],
        align: 'createdAt'
      },
      appended: null
    }
  },
  methods: {
    getAttendees: async function() {
      if (this.attendees.nextPage === -1) return
      let query = `?page=${this.attendees.nextPage}&pageSize=${this.attendees.pageSize}`
      let res = await this.$axios.get(`/checkin${query}`)
      this.attendees.list = this.attendees.list.concat(res.data.result)
      this.attendees.nextPage = res.data.nextPage
      this.attendees.pageSize = res.data.pageSize
    },
    attend: async function(data) {
      try {
        let res = await this.$axios.post('/3/checkin', {
          content: data.content
        })
        if (!res.data) {
          this.$toast.error('이미 출석하셨습니다!', {
            duration: 2000,
            action: {
              text: '닫기',
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          })
          return
        }
        // console.log(this.attendees.list)
        const { consecutive, first, total } = res.data.result.stats
        if (!!res.data) this.appended = data
        // this.attendees.list.push(data)
        // console.log(this.attendees.list)
        this.$refs.user_stats.update_stat({ consecutive, first, total })
      } catch (err) {}
    }
  },
  mounted() {
    this.getAttendees()
  }
}
</script>
