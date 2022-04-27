<template>
  <div class="hero">
    <b-container>
      <div class="right-manager">
        <div class="row">
          <div class="col-md-12">
            <div class="main-height-manager"></div>
            <div class="title">
              <div class="organizer">Rants.</div>
              <div class="organizer-sub">
                My <i><b style="color: #00d395">ran</b>dom though<b style="color: #00d395">ts</b></i> and updates stream.
              </div>
            </div>
            <div class="title">
              <div class="status-text">
                Availability:&nbsp; <span class="available-text" :style="{ backgroundColor: this.availability[1] }">{{ this.availability[0] }}</span>
              </div>
            </div>
            <div class="subscribe-holder">
              <a href="https" target="_blank"
                ><span class="subscribe-text"><b-icon-arrow-up-right-circle-fill style="color: #00d395"></b-icon-arrow-up-right-circle-fill> subscribe</span> <span class="subscribe-sub-text">no spam. promise.</span></a
              >
            </div>
            <div class="deletemessage">These updates are deleted every 30 days, by design.</div>
            <!-- <span class="subscribe-sub-text">Zero spam.</span> -->
            <div class="sub-height-manager"></div>
            <b-row>
              <b-col md="8">
                <div class="status-container">
                  <div class="inner-status-container">
                    <div v-for="items in this.statuses" :key="Object.keys(items)[0]">
                      <span class="date">{{ Object.keys(items)[0] }}</span>
                      <div v-for="status in items" :key="status.createdat" class="under-status-container">
                        <div v-for="stat in status" :key="stat.createdat" class="test">
                          <span class="status-text-disp">{{ stat.status }}</span>
                          <span class="status-text-disp-time float-right">{{ String(new Date(stat.updatedat)).match(/\d\d:\d\d/)[0] }}</span>
                        </div>
                      </div>
                      <div class="manage-height-by-date"></div>
                    </div>
                  </div>
                </div>
              </b-col>
              <b-col md="4"></b-col>
            </b-row>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>


<style scoped>
body {
  background-color: rgb(8, 10, 14);
}
.hero {
  min-height: calc(100vh - 100px);
  background-color: rgb(8, 10, 14);
  background-image: url("~assets/pattern-large-dots.svg");
  background-repeat: repeat;
  background-size: contain;
  font-family: "Open sans";
}
.right-manager {
  margin-left: 5px;
}
.test {
  margin-top: 10px;
  margin-left: 15px;
  margin-left: 10px;
}
.main-height-manager {
  height: 30px;
}
.sub-height-manager {
  height: 50px;
}
.organizer {
  font-weight: 600;
  color: #fff;
  font-size: 1.4rem;
}
.organizer-sub {
  font-weight: 400;
  color: rgb(218, 218, 218);
  font-size: 1rem;
}
.title {
  padding-bottom: 20px;
  border-bottom: 1px dashed rgb(39, 39, 39);
}
.status-text {
  padding-top: 1rem;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  font-weight: 600;
  font-family: "Open sans";
  color: rgb(255, 255, 255);
}
.available-text {
  color: rgb(255, 255, 255);
  padding: 2px;
  border-radius: 5px;
  padding-right: 5px;
  padding-left: 5px;
  font-weight: 400;
}
.status-container {
  margin-bottom: 60px;
}
.inner-status-container {
  height: 100%;
}
.date {
  font-weight: 300;
  color: rgb(126, 126, 126);
}
.status-text-disp {
  color: rgb(202, 202, 202);
  margin-top: 10px;
  cursor: default;
}
.status-text-disp:hover {
  color: #fff;
}
.manage-height-by-date {
  height: 25px;
}
.under-status-container {
  border-left: 1px solid rgb(126, 126, 126);
  margin-left: 20px;
}
.status-text-disp-time {
  font-size: 0.8rem;
  margin-top: 0px;
  margin-bottom: 5px;
  color: rgb(202, 202, 202);
  font-weight: 200;
}
.subscribe-holder {
  margin-top: 20px;
}
.subscribe-text {
  padding-top: 15px;
  color: rgb(184, 184, 184);
  padding-bottom: 4px;
  border-bottom: 1px solid rgb(51, 51, 51);
  padding-right: 10px;
}
.subscribe-text:hover {
  padding-top: 15px;
  color: rgb(255, 255, 255);
  padding-bottom: 4px;
  border-bottom: 2px solid rgb(102, 102, 102);
  padding-right: 10px;
}
.btn {
  background-color: #00d395 !important;
  border-color: transparent !important;
  font-size: 12px;
}
.subscribe-sub-text {
  color: rgb(202, 202, 202) !important;
  font-size: 10px;
  float: right;
  vertical-align: bottom;
}
.deletemessage {
  margin-top: 20px;
  font-size: 14px;
  color: rgb(117, 117, 117);
}
a {
  color: inherit;
}
</style>
<script >
const ldash = require("lodash");
import { BIconArrowUpRightCircleFill } from "bootstrap-vue";
export default {
  methods: {
    async getStatuses() {
      console.log(process.env.NUXT_ENV_API_BASE_URL);
      const responseStatuses = await fetch(`${process.env.NUXT_ENV_API_BASE_URL}/get/status`, {
        headers: {
          "x-api-key": process.env.NUXT_ENV_API_KEY_GET,
        },
        method: "get",
      });
      const responseAvail = await fetch(`${process.env.NUXT_ENV_API_BASE_URL}/get/available`, {
        headers: {
          "x-api-key": process.env.NUXT_ENV_API_KEY_GET,
        },
        method: "get",
      });
      const status = await responseStatuses.json();
      status.forEach((element) => {
        element.createdat = new Date(element.createdat).toDateString();
      });
      const statusByDate = ldash.groupBy(status, "createdat");
      const myData = Object.keys(statusByDate)
        .reverse()
        .map((key) => ({
          [new Date(key).toDateString()]: statusByDate[key],
        }));
      this.statuses = myData;
      const available = await responseAvail.json();
      this.availability = this.getCurrentStatusAndColor(available[0].currentstatus);
    },

    getCurrentStatusAndColor(status) {
      status = "onem";
      const equivalenceTable = new Map([
        ["avl", ["available", "#00d395"]],
        ["lavl", ["limited availability", "rgb(255, 188, 134)"]],
        ["navl", ["not available", "rgb(255, 134, 134)"]],
        ["onph", ["available on phone", "rgb(134, 142, 255)"]],
        ["onem", ["available on email", "rgb(207, 134, 255)"]],
      ]);
      const getStatus = equivalenceTable.get(status);
      return getStatus;
    },
  },
  layout: "header",
  data: () => {
    return {
      statuses: [],
      availability: [],
    };
  },
  mounted() {
    this.getStatuses();
  },
  components: {
    BIconArrowUpRightCircleFill,
  },
};
</script>
