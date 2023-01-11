/** @type {import('next').NextConfig} */

const isGitHubActions = process.env.GITHUB_ACTIONS || false
let assetPrefix = ''
let basePath = '/'

if (isGitHubActions) {
  // get repo name from `<owner>/<repo>`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
} else if (process.env.NODE_ENV === 'development') {

} else {
  const folder = 'pta'
  assetPrefix = `/${folder}/`
  basePath = `/${folder}`
}

const nextConfig = {
  reactStrictMode: true,
  assetPrefix,
  basePath,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
