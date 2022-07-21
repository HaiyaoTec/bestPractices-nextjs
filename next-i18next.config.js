const path = require('path')
module.exports = {
    i18n: {
        defaultLocale: 'zh',
        locales: ['zh', 'en'],
        reloadOnPrerender: process.env.NODE_ENV === 'development',
        localePath: path.resolve('./public/locales'),
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
