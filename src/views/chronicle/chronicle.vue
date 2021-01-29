<template>
  <div>
    <i-head-img :headImg="topImg" />
    <div :class="$style.bigEventWarpper">
      <!-- <i-time-line
        v-for="i in lines"
        :key="i.id"
        :coverImg="i.cover"
        :time="i.year"
        :historyText="i.description"
      /> -->
      <div :class="$style.bigEventList">
        <blockquote
          v-for="years in yearArrary"
          :id="years.hrefId"
          :key="years.hrefId"
          :class="$style.idControl"
        >
          <div
            v-for="year in years.ageList"
            :key="year.id"
            :class="$style.yearItemWarpper"
            @click="onGoChronicle(year.id)"
          >
            <span :class="$style.yearText">{{ year.year }}年大事记</span>
            <img :class="$style.yearItemBack" :src="backImg" alt="" />
          </div>
        </blockquote>

        <!-- 年份锚点 -->
        <ul :class="$style.linkWarpper">
          <li v-for="(years, index) in yearArrary" :key="years.hrefId">
            <a
              :href="`#${years.hrefId}`"
              :class="index === activeHref ? $style.activeHref : ''"
              @click="onToYear($event, years.hrefId, index)"
              >{{ index === 0 ? 1951 : 1900 + years.hrefId * 10 }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HeadImg from '@/components/head-img-mobile/head-img';
import BackGround from '@/assets/big-event-background.png';
import TopImg from '@/assets/big-event.png';

import { GetChronicle } from './services/services';

export default {
  name: 'GraduationPhoto',
  components: {
    'i-head-img': HeadImg,
  },
  data() {
    return {
      topImg: TopImg,
      backImg: BackGround,
      lines: [
        // {
        //   id: 1951,
        //   year: 1951,
        // },
        // {
        //   id: 1952,
        //   year: 1952,
        // },
        // {
        //   id: 1953,
        //   year: 1953,
        // },
        // {
        //   id: 1954,
        //   year: 1954,
        // },
        // {
        //   id: 1955,
        //   year: 1955,
        // },
        // {
        //   id: 1956,
        //   year: 1956,
        // },
        // {
        //   id: 1957,
        //   year: 1957,
        // },
        // {
        //   id: 1958,
        //   year: 1958,
        // },
        // {
        //   id: 1959,
        //   year: 1959,
        // },
        // {
        //   id: 1960,
        //   year: 1960,
        // },
        // {
        //   id: 1961,
        //   year: 1961,
        // },
        // {
        //   id: 1962,
        //   year: 1962,
        // },
        // {
        //   id: 1963,
        //   year: 1963,
        // },
        // {
        //   id: 1964,
        //   year: 1964,
        // },
        // {
        //   id: 1965,
        //   year: 1965,
        // },
        // {
        //   id: 1966,
        //   year: 1966,
        // },
        // {
        //   id: 1967,
        //   year: 1967,
        // },
        // {
        //   id: 1968,
        //   year: 1968,
        // },
        // {
        //   id: 1969,
        //   year: 1969,
        // },
        // {
        //   id: 1970,
        //   year: 1970,
        // },
        // {
        //   id: 1971,
        //   year: 1971,
        // },
        // {
        //   id: 1980,
        //   year: 1980,
        // },
        // {
        //   id: 1990,
        //   year: 1990,
        // },
        // {
        //   id: 2000,
        //   year: 2000,
        // },
        // {
        //   id: 2010,
        //   year: 2010,
        // },
        // {
        //   id: 2020,
        //   year: 2020,
        // },
        // {
        //   id: 2030,
        //   year: 2030,
        // },
        // {
        //   id: 2040,
        //   year: 2040,
        // },
      ],
      hrefTopArrays: [],
      activeHref: 0,
    };
  },
  computed: {
    // 按年份进行分组
    yearArrary: function () {
      let newYearArrary = [];
      const allYearArrary = [];
      let startYearKey = 0;
      this.lines.forEach((item) => {
        const itemkey = Math.floor((Number(item.year) - 1900) / 10);
        if (itemkey === startYearKey) {
          newYearArrary.push(item);
        } else {
          if (newYearArrary.length > 0) {
            allYearArrary.push({
              hrefId: startYearKey,
              ageList: newYearArrary,
            });
            newYearArrary = [];
          }
          newYearArrary.push(item);
          startYearKey = itemkey;
        }
      });
      allYearArrary.push({
        hrefId: startYearKey,
        ageList: newYearArrary,
      });
      return allYearArrary;
    },
  },
  mounted() {
    GetChronicle().then(({ data }) => {
      this.lines = data;
    });
    const hrefArray = document.getElementsByTagName('blockquote');
    setTimeout(() => {
      hrefArray.forEach((item) => {
        this.hrefTopArrays.push(item.offsetTop);
      });
    }, 100);
    this.onListenHeight();
  },
  methods: {
    // 点击锚点跳转
    onToYear: async function (e, year, index) {
      e.preventDefault();
      const a = document.getElementById(year);
      a.scrollIntoView();
      setTimeout(() => {
        this.activeHref = index;
      }, 100);
    },
    // 监听页面当前的高度,更换激活的锚点
    onListenHeight: function () {
      const length = this.hrefTopArrays.length;
      console.log(this.hrefTopArrays);
      window.onscroll = () => {
        const y = document.body.scrollTop || document.documentElement.scrollTop;
        this.hrefTopArrays.forEach((topLine, order) => {
          if (order < length - 1) {
            if (topLine < y && y < this.hrefTopArrays[order + 1]) {
              this.activeHref = order;
            }
          } else {
            if (topLine < y) {
              this.activeHref = order;
            }
          }
        });
      };
    },
    // 点击前往大事记详情业
    onGoChronicle: function (chronicleId) {
      this.$router.push(`chronicle-details/${chronicleId}`);
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';
.bigEventWarpper {
  margin: 0 40px;
}

.bigEventList {
  padding: 0 0 20px 0;
}

.idControl {
  padding-top: 160px;
  margin-top: -150px;
  display: block;
}

.yearItemWarpper {
  width: 880px;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 30px;
  text-align: center;
  line-height: 200px;
  position: relative;
  // background: url('/src/assets/big-event-background.png');

  .yearText {
    color: @color-primary;
    font-size: 58px;
    z-index: 100;
    position: relative;
    letter-spacing: 6px;
  }
}

.yearItemBack {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
}

.linkWarpper {
  position: fixed;
  right: 0;
  top: 480px;
  height: 1480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;

  li {
    list-style: none;
    margin-bottom: 96px;

    a {
      color: @color-primary;
      font-size: 32px;
      line-height: 32px;
      text-decoration: none;
    }

    .activeHref {
      font-size: 38px;
      line-height: 38px;
      font-weight: bold;
    }
  }
}
</style>
