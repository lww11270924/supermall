module.exports = {
    configureWebpack:{//表示配置config的webpack
        resolve: {
            //配置别名后，引用就不需要要./之类的
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views'
            }
        }
    }
}
