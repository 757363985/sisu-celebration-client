import { fabric } from 'fabric';

/**
 * @method 拖拽合影生成图片
 */
class DragImage {
  // canvas对象
  canvasObj = null;

  /**
   * @method 初始化canvas 添加背景图片
   * @param
   */
  createCanvas(options) {
    // 创建画布
    const canvas = new fabric.Canvas('canvas', {
      controlsAboveOverlay: true,
      backgroundVpt: true,
      // ...options,
    });
    // 设置宽度
    this.canvasObj = canvas;
    // 设置宽度
    canvas.setWidth(1000);
    // 设置高度
    canvas.setHeight(670);
    const image = document.createElement('img');

    image.onload = function () {
      const canvasImage = new fabric.Image(image, {});

      canvas.setBackgroundImage(
        canvasImage,
        function (oimg) {
          // 适应屏幕 相当于bg-size: 100% 100%;
          canvas.backgroundImage.set({
            scaleX: canvas.width / oimg.width,
            scaleY: canvas.height / oimg.height,
          });
        },
        {
          // 其他配置
          opacity: 1,
        },
      );
      // 拖拽点的颜色
      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.cornerColor = '#844d2d';
      fabric.Object.prototype.cornerSize = 30;
      fabric.Object.prototype.cornerStyle = 'circle';
    };
    image.crossOrigin = '';
    image.src = options.backgroundImage;
  }

  /**
   * @method 添加需要拖动的img
   * @param  imgUrl 图片的路径的路径
   */
  addImg(imgUrl) {
    const image = document.createElement('img');
    image.onload = () => {
      const imgElement = new fabric.Image(image, {});
      imgElement.scaleToWidth(image.width / 2);
      imgElement.scaleToHeight(image.height / 2);
      this.canvasObj.add(imgElement).renderAll();
    };

    image.crossOrigin = '';
    image.src = imgUrl;
  }

  /**
   * @method 导出canvas 为图片
   */
  exportImg() {
    /**
     * @method 将canvas转化为img
     * @param  canvas canvash画布
     */
    function convertCanvasToImage(canvasDom) {
      var image = new Image();
      image.crossOrigin = '';
      image.src = canvasDom.toDataURL('image/png');
      return image.src;
    }
    return convertCanvasToImage(this.canvasObj);
  }
}

export default DragImage;
