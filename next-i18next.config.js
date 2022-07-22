const path = require('path')
module.exports = {
    i18n: {
        defaultLocale: 'zh',
        locales: ['zh', 'en'],
        reloadOnPrerender: process.env.NODE_ENV === 'development',
        localePath: process.env.NODE_ENV === 'production'?path.resolve('./public/locales'):'public/locales',
        domains: [
            {
                domain: 'example.com',
                defaultLocale: 'en'
            },
            {
                domain: 'example.cn',
                defaultLocale: 'zh'
            }
        ]
    },
}
