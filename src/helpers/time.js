/**
 * 格式化时间成时间实例 2020-02-02 22:22:22 -> 2020/02/02 22:22:22
 * @param {string} t 时间 2020-02-02 22:22:22
 */
export const formatTime2Date = (t) => {
  // 2020-02-02 22:22:22 -> 2020/02/02 22:22:22
  // 避免 iOS 出问题
  return new Date(t.replace(/-/g, '/'));
};

/**
 * 格式化时间
 * @param {Date} t 时间戳
 * @param {string} format yyyy-MM-dd hh:mm:ss
 * @returns {string} 2011-11-11 11:11:11
 */
export const formatTime = (t, format = 'yyyy-MM-dd hh:mm:ss') => {
  const date = {
    'M+': t.getMonth() + 1,
    'd+': t.getDate(),
    'h+': t.getHours(),
    'm+': t.getMinutes(),
    's+': t.getSeconds(),
    'q+': Math.floor((t.getMonth() + 3) / 3),
    'S+': t.getMilliseconds(),
  };

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (const k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length),
      );
    }
  }
  return format;
};

/**
 * 格式化时间成文字
 * @param {Date} t 时间
 */
export const formatTime2Text = (t) => {
  const st = t.getTime();
  const now = new Date().getTime();
  const timeLag = Math.ceil((now - st) / 1000);

  if (timeLag <= 60) {
    return '一分钟前';
  }

  if (timeLag <= 60 * 4) {
    return '三分钟前';
  }

  if (timeLag <= 60 * 6) {
    return '五分钟前';
  }

  if (timeLag <= 60 * 11) {
    return '十分钟前';
  }

  if (timeLag <= 60 * 31) {
    return '半小时前';
  }

  if (timeLag <= 60 * 61) {
    return '一小时前';
  }

  if (timeLag <= 60 * 61 * 2) {
    return '两小时前';
  }

  if (timeLag <= 60 * 60 * 3) {
    return '三小时前';
  }

  if (timeLag <= 60 * 60 * 6) {
    return '半天前';
  }

  if (timeLag <= 60 * 60 * 24) {
    return '一天前';
  }

  if (timeLag <= 60 * 60 * 24 * 2) {
    return '两天前';
  }

  if (timeLag <= 60 * 60 * 24 * 3) {
    return '三天前';
  }

  return formatTime(t).split(' ')[0];
};
