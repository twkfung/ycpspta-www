/** @type {import('next').NextConfig} */

const isGitHubActions = process.env.GITHUB_ACTIONS || false
let assertPrefix = ''
let basePath = '/'

if (isGitHubActions) {
  // get repo name from `<owner>/<repo>`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
  assertPrefix = `/${repo}/`
  basePath = `/${repo}`
} else if (process.env.NODE_ENV === 'development') {

} else {
  const folder = 'pta'
  assertPrefix = `/${folder}/`
  basePath = `/${folder}`
}

const nextConfig = {
  reactStrictMode: true,
  assertPrefix,
  basePath
}

module.exports = nextConfig
