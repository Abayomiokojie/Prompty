/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        // domains: ['lh3.googleusercontent.com'], **** deprecated Next.js 13 method**

        // Next.js 14 method
        remotePatterns: [
            { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '**' },
        ]
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    }

};

export default nextConfig;