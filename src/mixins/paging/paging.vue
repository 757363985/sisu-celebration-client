<script>
export default {
  name: 'MixinsPaging',
  data() {
    return {
      /** 分页列表 */
      PAGING_LIST: [],
      /** 分页当前页数 */
      PAGING_PAGE: 0,
      /** 分页当前大小 */
      PAGING_SIZE: 10,
      /** 分页总共页数 */
      PAGING_TOTLE_PAGE: 99,
      /** 分页还有更多 */
      PAGING_MORE: true,
      /** 分页额外参数 */
      PAGING_PARAMS: {},
      /** 分页是否加载中 */
      PAGING_LOADING: false,
      /** 当前页面是下拉刷新 */
      PAGING_REFRESHING: false,
      /** 分页是否替换/分页 replace */
      PAGING_REPLACE: false,
      /** 发起请求时的时间错 */
      PAGING_TS: 0,
      /** 分页列表一共有多少条数据 */
      PAGING_TOTALCOUNT: 0,
    };
  },
  methods: {
    /** 请求下一个分页数据 */
    GET_PAGING_NEXT: function (refresh = false) {
      // 不是刷新并且页面加载中
      // 总页数小于等于当前页数退出
      // 退出
      if (!refresh && (this.PAGING_LOADING || !this.PAGING_MORE)) {
        return Promise.reject();
      }

      this.PAGING_LOADING = true;
      this.PAGING_REFRESHING = refresh;

      /** 新页数 */
      const page = refresh ? 1 : this.PAGING_PAGE + 1;
      /** 记录发起请求时的时间戳 */
      const nowTimestamp = new Date();

      // 更新时间戳
      this.PAGING_TS = nowTimestamp;

      return new Promise((resolve, reject) => {
        this.GET_PAGING({
          ...this.PAGING_PARAMS,
          size: this.PAGING_SIZE,
          page: page,
        })
          .then(({ data }) => {
            if (this.PAGING_TS === nowTimestamp) {
              // 更新列表数据
              this.PAGING_LIST =
                this.PAGING_REPLACE || refresh ? data.list : this.PAGING_LIST.concat(data.list);
              this.PAGING_TOTLE_PAGE = data.totalPage;
              this.PAGING_PAGE = page;
              this.PAGING_LOADING = false;
              this.PAGING_REFRESHING = false;
              this.PAGING_TOTALCOUNT = data.totalCount;
              this.PAGING_MORE = this.PAGING_TOTLE_PAGE > this.PAGING_PAGE;
            }
            resolve(this.PAGING_LOADING);
          })
          .catch(() => {
            if (this.PAGING_TS === nowTimestamp) {
              this.PAGING_LOADING = false;
              this.PAGING_REFRESHING = false;
            }
            reject(this.PAGING_LOADING);
          });
      });
    },
  },
};
</script>
