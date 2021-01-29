/* eslint-disable prettier/prettier */
const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 去掉注释
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 开启压缩
const TerserPlugin = require('terser-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const { HashedModuleIdsPlugin, DefinePlugin } = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}

/** 是否是正式打包 */
const isProduction = process.env.NODE_ENV === 'production';

/** 是否是一体机 */
const isPC = process.env.NODE_PLATFOFM === 'PC';

/** import 全局变量 */
const externals = {
  // 'ali-oss': 'OSS',
  // 'dingtalk-jsapi': 'dd',
  vue: 'Vue',
  vuex: 'Vuex',
  'vue-router': 'VueRouter',
  'vue-lazyload': 'VueLazyload',
};

/** cdn 资源文件 */
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: [],
  },
  // 生产环境
  build: {
    css: [],
    js: [
      // 'https://gosspublic.alicdn.com/aliyun-oss-sdk-6.7.0.min.js',
      // 'https://g.alicdn.com/dingding/dingtalk-jsapi/2.10.3/dingtalk.open.js',
      'https://cdn.dataofx.com/vue@2.6.11/vue.runtime.min.js',
      'https://cdn.dataofx.com/vue-router@3.1.6/vue-router.min.js',
      'https://cdn.dataofx.com/vuex@3.3.0/vuex.min.js',
      'https://cdn.dataofx.com/vue-lazyload@1.3.3/vue-lazyload.js',
    ],
  },
};

module.exports = {
  publicPath: isPC ? './' : '/',
  productionSourceMap: false,
  assetsDir: 'static',
  chainWebpack: (config) => {
    // 项目 src 目录
    config.resolve.alias.set('@', resolve('src'));

    config.resolve.alias.set('@static', resolve('src/static'));
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) =>
        Object.assign(options, {
          limit: 10240,
        }),
      );
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');

    // 移除 preload 插件
    config.plugins.delete('preload');

    config.plugin('html').tap((args) => {
      args[0].title = '校庆';

      if (isProduction) {
        args[0].cdn = cdn.build;
      }

      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev;
      }

      return args;
    });

    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
  },

  configureWebpack: (config) => {
    const plugins = [
      new DefinePlugin({
        'process.env.NODE_PLATFOFM': JSON.stringify(process.env.NODE_PLATFOFM),
      }),
    ];

    if (isProduction) {
      // 服务器也要相应开启gzip
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.8,
        }),
      );

      plugins.push(
        new CopyWebpackPlugin([{
          from: './src/public',
          to: './public',
          ignore: ['.*']
        }])
      )

      // 用于根据模块的相对路径生成 hash 作为模块 id, 一般用于生产环境
      plugins.push(new HashedModuleIdsPlugin());

      // 开启分离js
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_debugger: true, // console
                drop_console: true, // 注释console
                pure_funcs: ['console.log'], // 移除console， 必须和上一条同时使用才能去除console
              },
            },
          }),
        ],
        splitChunks: {
          cacheGroups: {
            element: {
              name: 'vendors-vant',
              test: /[\\/]node_modules[\\/]vant[\\/]/,
              chunks: 'initial',
              reuseExistingChunk: true,
              enforce: true,
              priority: 3,
            },
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 2,
            },
            common: {
              name: 'common',
              chunks: 'initial',
              minChunks: 2,
              maxInitialRequests: 5,
              priority: 1,
            },
          },
        },
      };

      // 取消 webpack 警告的性能提示
      config.performance = {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 1000 * 500,
        // 生成文件的最大体积
        maxAssetSize: 1000 * 1000,
        // 只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js');
        },
      };

      // 打包时npm包转CDN
      config.externals = externals;
    }

    return { plugins };
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // hack: 'true; @import "~@scf/ding-style-less/vant.less";',
          hack: 'true; @import "~@/assets/less/custom-theme.less";',
        },
      },
      postcss: {
        plugins: isPC
          ? []
          : [
            require('postcss-pxtorem')({
              rootValue: 37.5,
              propList: ['*'],
              selectorBlackList: ['van-hairline--', 'van-picker'],
            }),
          ],
      },
    },
  },

  devServer: {
    open: false, // 自动启动浏览器
    host: '', // localhost
    port: 6060, // 端口号
    https: false,
    hotOnly: false, // 热更新
    disableHostCheck: true,
    proxy: {
      '/mock': {
        target: '192.168.2.54:9901', // Mock 环境地址
        changeOrigin: true,
      },
      '/api/v1/common-auth': {
        target: 'http://192.168.2.54:9008', // 开发环境地址
        changeOrigin: true,
        // pathRewrite: function (path) {
        //   return path.replace(/\/common-auth\//, '/');
        // },
        pathRewrite: {
          '^/api/v1/common-auth': '/api/v1',
        },
      },
      '/api/v1': {
        // target: 'http://192.168.2.202:9901/',
        target: 'http://dag.sisu.edu.cn/',
        // 开发环境地址
        // target: 'http://192.168.2.202:9901/',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '/',
        // },
      },
    },
    historyApiFallback: {
      index: '/index.html'//index.html为当前目录创建的template.html
    }
  },

};
