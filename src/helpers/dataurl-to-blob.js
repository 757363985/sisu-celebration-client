import { getUuid } from './get-uuid';
/**
 * @method base64转blob
 * @param dataurl 图片路径
 */
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    // mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  // console.log(arr[0].match(/:(.*?);/)[1]);
  return new File([u8arr], `${getUuid()}.png`, { type: 'image/png' });
}
