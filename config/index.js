import path from 'path'

const config = {
  projectName: 'weddingHall',
  date: '2020-7-2',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  alias: {
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@api': path.resolve(__dirname, '..', 'src/api'),
    '@assets': path.resolve(__dirname, '..', 'src/assets'),
    '@common': path.resolve(__dirname, '..', 'src/common'),
    '@models': path.resolve(__dirname, '..', 'src/models'),
    '@pages': path.resolve(__dirname, '..', 'src/pages'),
    '@store': path.resolve(__dirname, '..', 'src/store'),
    '@styles': path.resolve(__dirname, '..', 'src/styles'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
    '@package': path.resolve(__dirname, '..', 'package.json'),
    '@project': path.resolve(__dirname, '..', 'project.config.json'),
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: false,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
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
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
