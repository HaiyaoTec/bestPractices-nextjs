/** @type {import('next').NextConfig} */
const {i18n} = require('./next-i18next.config')
module.exports = {
    reactStrictMode: false,
    swcMinify: true,
    i18n,
    webpack: (config, {isServer}) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack']
        })
        return config
    }
};
