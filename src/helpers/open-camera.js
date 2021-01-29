/**
 * @method 打开相机并将画面展示在video标签中
 * @param videoId video标签的id
 */
export const openCamera = async (videoId) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      // width: { min: 1024, ideal: 2560, max: 4900 },
      // height: { min: 776, ideal: 1920, max: 3200 },
    },
  });
  const mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
  const video = document.getElementById(videoId);
  video.srcObject = stream;
  video.play();
  return [video, mediaStreamTrack];
};

/**
 * @method 暂停video
 * @param videoObj vidoe对象
 *  */
export const stopVideo = (videoObj) => {
  videoObj.pause();
};

/**
 * @method 播放video
 * @param  videoObj vidoe对象
 */
export const startVideo = (videoObj) => {
  videoObj.play();
};

/**
 * @method 导出video为图片
 * @param  videoObj vidoe对象
 */
export const exportVideoToImg = (videoObj) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 750;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoObj, 0, 0, 1000, 750);
  window.can = canvas;
  return new Promise((resolve) => {
    canvas.toBlob((bolb) => {
      resolve(bolb);
    }, 'image/jpeg');
  });
};
