import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    imgUrl: '',
    // 我要拍照的背景图片和切割出来的人体图片,
    dragImg: {
      bgInfo: {},
      userUrl: '',
    },
    // 成绩详情数据
    scroeDetail: {},
    // 用户信息
    userInfo: null,
    //是否提示用户未操作
    isPrompt: true,
    // 浏览器title
    appHeaderTitle: '',
  },
  mutations: {
    putAppHeaderTitle(state, value) {
      state.appHeaderTitle = value;
    },
    updateDragImg(state, value) {
      state.dragImg = { ...state.dragImg, ...value };
    },
    updateScroeDetail(state, value) {
      state.scroeDetail = value;
    },
    updateUserInfo(state, value) {
      state.userInfo = value;
    },
    updatePrompt(state, value) {
      state.isPrompt = value;
    },
  },
  actions: {
    updateDragImg(context, payload) {
      context.commit('updateDragImg', payload);
    },
    updateScroeDetail(context, payload) {
      context.commit('updateScroeDetail', payload);
    },
    updateUserInfo(context, payload) {
      context.commit('updateUserInfo', payload);
    },
    updatePrompt(context, payload) {
      context.commit('updatePrompt', payload);
    },
  },
  // modules: {},
});
