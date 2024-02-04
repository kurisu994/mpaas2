import { defineConfig } from '@tarojs/cli';

const path = require('path');

const config = defineConfig({
  projectName: 'mpaas2',
  date: '2024-1-19',
  designWidth: (input) => {
    // @ts-ignore 配置 NutUI 375 尺寸
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375;
    }
    // 全局使用 Taro 默认的 750 尺寸
    return 750;
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sass: {
    resource: [path.resolve(__dirname, '..', 'src/assets/styles/custom_theme.scss')],
    data: `@import "@nutui/nutui-react-taro/dist/styles/variables.scss";`,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  copy: {
    patterns: [{ from: 'mini.project.json', to: `dist/${process.env.TARO_ENV}/mini.project.json` }],
    options: {},
  },
  plugins: ['@tarojs/plugin-html', '@taro-hooks/plugin-react'],
  defineConstants: {},
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      exclude: ['@nutui/nutui-react-taro', '@nutui/icons-react-taro'],
    },
  },
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  alias: {
    src: path.resolve(__dirname, '..', 'src'),
    '@/resource': path.resolve(__dirname, '..', 'src/resource'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@/stores': path.resolve(__dirname, '..', 'src/stores'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@@/package.json': path.resolve(__dirname, '..', 'package.json'),
    '@@/project.config.json': path.resolve(__dirname, '..', 'project.config.json'),
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: { selectorBlackList: ['nut-'] },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    optimizeMainPackage: {
      enable: true,
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      },
    },
  },
});

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
