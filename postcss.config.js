module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      //移动端设计稿一般按照iphone6来设计，即750*1334
      viewportWidth: 375, //视口的宽度，对应的时设计稿的宽度/2，一般为750
      viewportHeight: 667, //视口的高度，对应的是设计稿的高度（也可以不配置）
      unitPrecision: 5, //指定‘px’转换为视口单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', //指定需要转换成的视口单位，建议使用vw
      // selectorBlankList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类
      minPixelValue: 1, //小于或等于‘1px’不转换为视口单位
      // exclude:[/TabBar/],//表示排除以TabBar开头的文件
      mediaQuery: false//允许在媒体查询中转换为‘px’
    }
  }
}
