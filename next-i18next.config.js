module.exports = {
    i18n: {
        defaultLocale: 'zh',
        locales: ['zh', 'en'],
        reloadOnPrerender: process.env.NODE_ENV === 'development',
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
