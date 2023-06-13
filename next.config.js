/** @type {import('next').NextConfig} */

const isGitHubActions = process.env.GITHUB_ACTIONS || false
let assetPrefix = ""
let basePath = ""

if (isGitHubActions) {
  // get repo name from `<owner>/<repo>`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "")
  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
} else if (process.env.NODE_ENV === "development") {
  // no change in development server
} else {
  // prefix subpath for local export
  const folder = "www"
  assetPrefix = `/${folder}/`
  basePath = `/${folder}`
}

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: (assetPrefix === "" ? undefined : assetPrefix),
  basePath: (basePath === "" ? undefined : basePath),
  images: {
    unoptimized: true,
  },
  output: "export",
}

module.exports = nextConfig
