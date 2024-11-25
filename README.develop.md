# Developer's Notes

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It targets to deploy a static export to GitHub Pages using GitHub Actions monitoring on the branch `gh-pages. Packages used to create this project:

- `create-next-app ^13.4.5`
- `Next.js ^14.2.18`
- `TypeScript ^5.7.2`
- `React ^18.3.1`

This page is a developer's note on the development of this project.

## Getting Started to Deploy to GitHub Pages

1. Start with an empty GitHub repo.
2. Run `npx create-next-app@latest --typescript --use-npm` to create a Next.js app ([ref](https://nextjs.org/learn/basics/create-nextjs-app/setup)).
3. I am using `nvm 1.1.10` (for windows) with `npm 10.9.0` and `node 22.11.0` (also tested `npm 8.19.2` and `node 18.11.0`). Reinstall npm version inside nvm if Unexpected Token error is encountered during project creation ([ref](https://github.com/npm/cli/issues/4234#issuecomment-1232257450)).
4. Configure to deploy to GitHub Pages ([ref](https://www.viget.com/articles/host-build-and-deploy-next-js-projects-on-github-pages/))

    - Configure GitHub to enable Pages with `gh-pages` branch. Create the branch `gh-pages` first.
    - Configure GitHub Actions with a build and deploy workflow (.yml).
        - Upload repo Deploy Key and Actions secrets ([ref](https://github.com/gregrickaby/nextjs-github-pages))
        - Consume `${{ secrets.ACTIONS_DEPLOY_KEY }}` in workflow action
    - Configure Next.js to load resources from `/<repo>`.
    - Optionally configure next/Image loader. (not yet)
        - Instead I disable image API optimization.

## Routes under a Subpath

By default Next.js serves the app at the root route.
Since the GitHub Pages are published under the URL pattern: `<user>/<repo>`, we need to modify the base url for all links and
prefix urls for assets in Next by providing `basePath` and `assetPrefix` in Next config. Next will rewrite links supplied to next/Link.
Image assets provided to next/Image must be preparing using `import` image statements.

## WordPress

WordPress documentations

- [JavaScript client](http://wp-api.org/node-wpapi/api-reference/wpapi/1.1.2/WPAPI.html)
- [WPAP doc](http://wp-api.org/node-wpapi/api-reference/wpapi/1.1.2/index.html)
- [Git repo](https://github.com/WP-API/node-wpapi)
- [WP GraphQL](https://www.wpgraphql.com/)

### Config page on WordPress

The app loads the JSON content from the WP page at `/pages/config`. The JSON should follow the following example. `activeTags` defines an array of tags which should be included in the target page. By default, `"pta-all-time"` is automatically appended to this array.

```json
{
    "activeTags": [
        "pta-2024-2026",
        "pta-2022-2024"
    ]
}
