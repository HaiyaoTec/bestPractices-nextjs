const path = require('path')
const config = {
    i18n: {
        defaultLocale: 'zh',
        locales: ['zh', 'en'],
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
if (process.env.NODE_ENV === 'production')config.i18n.localePath = path.resolve('./public/locales')
module.exports = config
