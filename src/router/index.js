import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';
import * as Helpers from '@/helpers';

Vue.use(VueRouter);

let routes = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/about.vue'),
    meta: {
      title: '关于我们',
    },
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404/404.vue'),
  },
];

if (Helpers.isDesktopClient) {
  routes = routes.concat([
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/home/home.vue'),
    },
    {
      path: '/graduation-photo',
      name: 'GraduationPhoto',
      component: () =>
        import(
          /* webpackChunkName: "graduation-photo" */ '@/views/graduation-photo/graduation-photo.vue'
        ),
      meta: {
        title: '毕业留影',
      },
    },
    {
      path: '/memories',
      name: 'Memories',
      component: () => import(/* webpackChunkName: "memories" */ '@/views/memories/memories.vue'),
      meta: {
        title: '毕业留影',
      },
    },
    {
      path: '/grade',
      name: 'Grade',
      component: () => import(/* webpackChunkName: "grade" */ '@/views/grade/grade.vue'),
      meta: {
        title: '成绩查询',
      },
    },
    {
      path: '/grade/check-results',
      name: 'CheckResults',
      component: () =>
        import(
          /* webpackChunkName: "check-results" */
          '@/views/grade/check-results/check-results.vue'
        ),
      meta: {
        title: '查询成绩',
      },
    },
    {
      path: '/grade/proxy-check-results',
      name: 'ProxyCheckResults',
      component: () =>
        import(
          /* webpackChunkName: "proxy-check-results" */
          '@/views/grade/proxy-check-results/proxy-check-results.vue'
        ),
      meta: {
        title: '查询成绩',
      },
    },
    {
      path: '/grade/grade-results',
      name: 'GradeResults',
      component: () =>
        import(
          /* webpackChunkName: "grade-results" */
          '@/views/grade/grade-results/grade-results.vue'
        ),
      meta: {
        title: '查询成绩',
      },
    },
    {
      path: '/shadow',
      name: 'Shadow',
      component: () => import(/* webpackChunkName: "shadow" */ '@/views/shadow/shadow.vue'),
      meta: {
        title: '光影回忆',
      },
    },
    {
      path: '/shadow-select',
      name: 'ShadowSelect',
      component: () =>
        import(/** webpackChunkName:"shadowselect" */ '@/views/shadow-select/shadow-select.vue'),
      meta: {
        title: '光影回忆',
      },
    },
    {
      path: '/shadow-list/:id',
      name: 'Shadow-List',
      component: () =>
        import(/* webpackChunkName: "take-pictrue" */ '@/views/shadow-list/shadow-list.vue'),
      meta: {
        title: '光影回忆',
      },
    },
    {
      path: '/take-pictrue',
      name: 'TakePictrue',
      component: () =>
        import(/* webpackChunkName: "take-pictrue" */ '@/views/take-pictrue/take-pictrue.vue'),
      meta: {
        title: '我要拍照',
      },
    },
    {
      path: '/take-pictrue/next',
      name: 'TakePictrueNext',
      component: () =>
        import(
          /* webpackChunkName: "take-pictrue-nex" */ '@/views/take-pictrue/take-pictrue-next/take-pictrue-next.vue'
        ),
      meta: {
        title: '我要拍照',
      },
    },
    {
      path: '/take-pictrue/compound-img',
      name: 'CompoundImg',
      component: () =>
        import(
          /* webpackChunkName: "take-pictrue-nex" */ '@/views/take-pictrue/compound-img/compound-img.vue'
        ),
      meta: {
        title: '合成图片',
      },
    },
    {
      path: '/school-overview',
      name: 'SchoolOverview',
      component: () =>
        import(
          /* webpackChunkName: "school-overview" */
          '@/views/school-overview/school-overview.vue'
        ),
      meta: {
        title: '学校简介',
      },
    },
    {
      path: '/history',
      name: 'History',
      component: () =>
        import(
          /* webpackChunkName: "history" */
          '@/views/history/history.vue'
        ),
      meta: {
        title: '学校历史沿革',
      },
    },
    {
      path: '/chronicle',
      name: 'Chronicle',
      component: () =>
        import(
          /* webpackChunkName: "cronicle" */
          '@/views/chronicle/chronicle.vue'
        ),
      meta: {
        title: '学校大事记',
      },
    },
    {
      path: '/chronicle-details/:id',
      name: 'chronicleDetails',
      component: () =>
        import(
          /* webpackChunkName: "cronicle" */
          '@/views/chronicle/chronicle-details.vue'
        ),
      meta: {
        title: '学校大事记',
      },
    },
    {
      path: '/news',
      name: 'News',
      component: () =>
        import(
          /* webpackChunkName: "news" */
          '@/views/news/news.vue'
        ),
      meta: {
        title: '校庆新闻',
      },
    },
    {
      path: '/news-details/:id',
      name: 'NewsDetails',
      component: () =>
        import(
          /* webpackChunkName: "news-detail" */
          '@/views/news-detail/news-detail.vue'
        ),
      meta: {
        title: '新闻详情',
      },
    },
    {
      path: '/cunzhao',
      name: 'Cunzhao',
      component: () =>
        import(
          /* webpackChunkName: "cunzhao" */
          '@/views/cunzhao/cunzhao.vue'
        ),
      meta: {
        title: '我的寸照',
      },
    },
    {
      path: '/cunzhao-content',
      name: 'Cunzhao',
      component: () =>
        import(
          /* webpackChunkName: "cunzhao" */
          '@/views/cunzhao/cunzhao-content/cunzhao-content.vue'
        ),
      meta: {
        title: '我的寸照',
      },
    },
    {
      path: '/map',
      name: 'Map',
      component: () => import(/* webpackChunkName: "map" */ '@/views/map/map.vue'),
      meta: {
        title: '学校地图',
      },
    },
  ]);
} else {
  routes = routes.concat([
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/home-mobile/home-mobile.vue'),
    },
    {
      path: '/customer-binding',
      name: 'CustomerBinding',
      component: () =>
        import(
          /* webpackChunkName: "customer-binding" */ '@/views/customer-binding/customer-binding.vue'
        ),
      meta: {
        title: '绑定用户信息',
      },
    },
    {
      path: '/file-solicitation',
      name: 'FileSolicitation',
      component: () =>
        import(
          /* webpackChunkName: "file-solicitation" */ '@/views/file-solicitation/file-solicitation.vue'
        ),
      meta: {
        title: '档案征集',
      },
    },
    // {
    //   path: '/goods-solicitation',
    //   name: 'GoodsSolicitation',
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "goods-solicitation" */ '@/views/goods-solicitation/goods-solicitation.vue'
    //     ),
    //   meta: {
    //     title: '实物征集',
    //   },
    // },
    {
      path: '/consulting-service',
      name: 'ConsultingService',
      component: () =>
        import(
          /* webpackChunkName: "consulting-service" */ '@/views/consulting-service/consulting-service.vue'
        ),
      meta: {
        title: '服务咨询',
      },
    },
    {
      path: '/shadow',
      name: 'Shadow',
      component: () => import(/* webpackChunkName: "shadow" */ '@/views/shadow/shadow-mobile.vue'),
      meta: {
        title: '光影回忆',
      },
    },
    {
      path: '/shadow-list/:id',
      name: 'Shadow-List',
      component: () =>
        import(/* webpackChunkName: "shadow-list" */ '@/views/shadow-list/shadow-list-mobile.vue'),
      meta: {
        title: '光影回忆',
      },
    },
    {
      path: '/graduation-photo',
      name: 'GraduationPhoto',
      component: () =>
        import(
          /* webpackChunkName: "graduation-photo" */ '@/views/graduation-photo/graduation-photo-mobile.vue'
        ),
      meta: {
        title: '毕业留影',
      },
    },
    {
      path: '/user-bind',
      name: 'UserBind',
      component: () =>
        import(/* webpackChunkName: "user-bind" */ '@/views/user-bind/user-bind.vue'),
      meta: {
        title: '用户信息绑定',
      },
    },
    {
      path: '/personal-information',
      name: 'PersonalInformation',
      component: () =>
        import(
          /* webpackChunkName: "shadow" */
          '@/views/personal-information/personal-information.vue'
        ),
      meta: {
        title: '个人信息完善',
      },
    },
    {
      path: '/media-resources',
      name: 'MediaResources',
      component: () =>
        import(
          /* webpackChunkName: "shadow" */
          '@/views/media-resources/media-resources.vue'
        ),
      meta: {
        title: '媒体资源征集',
      },
    },
    {
      path: '/news',
      name: 'News',
      component: () =>
        import(
          /* webpackChunkName: "news" */
          '@/views/news/news-mobile.vue'
        ),
      meta: {
        title: '校庆新闻',
      },
    },
    {
      path: '/news-details/:id',
      name: 'NewsDetails',
      component: () =>
        import(
          /* webpackChunkName: "news-details" */
          '@/views/news-detail/newsDetail-mobile.vue'
        ),
      meta: {
        title: '新闻详情',
      },
    },
    {
      path: '/business-guide',
      name: 'Business',
      component: () =>
        import(
          /* webpackChunkName: "business-guide" */
          '@/views/news/news-mobile.vue'
        ),
      meta: {
        title: '业务指导',
      },
    },
    {
      path: '/business-details/:id',
      name: 'BusinessDetails',
      component: () =>
        import(
          /* webpackChunkName: "business-details" */
          '@/views/news-detail/newsDetail-mobile.vue'
        ),
      meta: {
        title: '业务指导详情',
      },
    },
    {
      path: '/library',
      name: 'Library',
      component: () =>
        import(
          /* webpackChunkName: "Library" */
          '@/views/news/news-mobile.vue'
        ),
      meta: {
        title: '馆务动态',
      },
    },
    {
      path: '/library-details/:id',
      name: 'LibraryDetails',
      component: () =>
        import(
          /* webpackChunkName: "LibraryDetails" */
          '@/views/news-detail/newsDetail-mobile.vue'
        ),
      meta: {
        title: '馆务动态详情',
      },
    },
    {
      path: '/collection',
      name: 'Collection',
      component: () =>
        import(
          /* webpackChunkName: "collection" */
          '@/views/collection/collection-mobile.vue'
        ),
      meta: {
        title: '实物征集',
      },
    },
    {
      path: '/archives',
      name: 'Archives ',
      component: () =>
        import(
          /* webpackChunkName: "archives" */
          '@/views/collection/collection-mobile.vue'
        ),
      meta: {
        title: '档案馆简介',
      },
    },
    {
      path: '/advice',
      name: 'Advice',
      component: () =>
        import(
          /* webpackChunkName: "advice" */
          '@/views/collection/collection-mobile.vue'
        ),
      meta: {
        title: '服务咨询',
      },
    },
    {
      path: '/history',
      name: 'History',
      component: () =>
        import(
          /* webpackChunkName: "history" */
          '@/views/history/history-mobile.vue'
        ),
      meta: {
        title: '历史沿革',
      },
    },
    {
      path: '/upload-picture',
      name: 'UploadPicture',
      component: () =>
        import(
          /* webpackChunkName: "upload-picture" */
          '@/views//upload-picture//upload-picture-mobile.vue'
        ),
      meta: {
        title: '上传图片',
      },
    },
    {
      path: '/auth-page',
      name: 'AuthPage',
      component: () =>
        import(
          /* webpackChunkName: "auth-page" */
          '@/views//auth-page//auth-page.vue'
        ),
      meta: {
        title: '微信授权',
      },
    },
    {
      path: '/cunzhao-content',
      name: 'Cunzhao',
      component: () =>
        import(
          /* webpackChunkName: "cunzhao" */
          '@/views/cunzhao/cunzhao-content/cunzhao-content-mobile.vue'
        ),
      meta: {
        title: '我的寸照',
      },
    },
  ]);
}

const router = new VueRouter({
  routes,
  mode: 'hash',
});

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
    store.commit('putAppHeaderTitle', to.meta.title);
    if (to.meta.title !== '查询成绩' && to.meta.title !== '我的寸照') {
      // 如果不在成绩查询页面，就清除用户信息
      store.dispatch('updateUserInfo', null);
      store.dispatch('updateScroeDetail', []);
    }
    // 如果不在我要拍照页面，清除照片选择数据
    if (to.meta.title !== '我要拍照' && to.meta.title !== '合成图片') {
      store.dispatch('updateDragImg', { bgInfo: {}, userUrl: '' });
    }
  }

  next();
});

export default router;
