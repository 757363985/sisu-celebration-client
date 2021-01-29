import oss from 'ali-oss';

import { GetOssToken } from '@/apis/common';

import { getUuid } from './get-uuid';

/**
 * @method 上传文件到oss
 * @param {fileObject} file
 */
const uploadPath = (file) => {
  let fileType = 'jpg';
  if (file.name && file.name.indexOf('.') > -1) {
    fileType = file.name.split('.')[file.name.split('.').length - 1];
  }
  file.uid = getUuid();
  // 上传文件的路径，使用日期命名文件目录
  return `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}/${
    file.name ? file.name.split('.')[0] : 'xxx'
    // eslint-disable-next-line prettier/prettier
    }-${file.uid}.${fileType || 'jpg'}`;
};

const uploadOss = (options) => {
  return new Promise((resove, reject) => {
    GetOssToken()
      .then((res) => {
        const {
          data: { accessKeyId, accessKeySecret, securityToken, bucket, region },
        } = res;

        const store = oss({
          accessKeyId,
          accessKeySecret,
          bucket,
          region,
          securityToken,
        });

        // 生成key
        const key = uploadPath(options.file);

        return { key, store, securityToken };
      })
      .then(({ key, store, securityToken }) => {
        // 上传到oss
        store
          .put(key, options.file, {
            headers: {
              'x-oss-security-token': securityToken,
            },
          })
          .then(() => {
            resove(key);
          });
      })

      .catch((e) => {
        reject(e);
      });
  });
};

export default uploadOss;
