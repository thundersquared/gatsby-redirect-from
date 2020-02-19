![Travis](https://img.shields.io/travis/thundersquared/gatsby-redirect-from?style=flat-square)
![npm](https://img.shields.io/npm/v/@thundersquared/gatsby-redirect-from?style=flat-square)

# @thundersquared/gatsby-redirect-from

By adding a list of urls to the YAML frontmatter, this plugin creates redirects for all of them at build time. It uses Gatsby's [createRedirect](https://www.gatsbyjs.org/docs/actions/#createRedirect) under the hood.

**Table of Contents**

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Server Rendering](#server-rendering)
- [Usage](#usage)
- [Options](#options)
- [Plugin Development](#plugin-development)

---

## Prerequisites

- Gatsby v2
- Markdown files delivered from [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark)
- `slug` on `allMarkdownRemark.edges.node.fields`

Plugin assumes the default setup from [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog), with Markdown files processing by [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark) and adding a field `slug` for each file node. Head over to gatsby-starter-blog's [gatsby-node.js](https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/gatsby-node.js#L57) file to see how this is done.

If this does not fit your setup, you can [configure the default `query`](#options) being used.

## Installation

```bash
cd yourproject/
npm i gatsby-redirect-from gatsby-plugin-meta-redirect
```

Then load the plugin along with [gatsby-plugin-meta-redirect](https://github.com/getchalk/gatsby-plugin-meta-redirect) from your `gatsby-config.js`:

```js
plugins: [
  'gatsby-redirect-from',
  'gatsby-plugin-meta-redirect' // make sure this is always the last one
]
```

That's it. See [Usage](#usage).

### Server Rendering

Gatsby's `createRedirect` only creates client-side redirects, so further integration is needed to get server redirects too. Which is highly dependent on your hosting, if you want to have the proper HTML status codes like `301`, Apache needs `.htaccess` rules for that, nginx `rewrite` rules, S3 `RoutingRules` and so on.

One simple way, as suggested in installation, is to use [gatsby-plugin-meta-redirect](https://github.com/getchalk/gatsby-plugin-meta-redirect) to generate static HTML files with a `<meta http-equiv="refresh" />` tag for every `createRedirect` call. So it works out of the box with this plugin without further adjustments.

This way is the most compatible way of handling redirects, working with pretty much every hosting provider. Only catch: it's only for usability, no SEO-friendly `301` redirect is set anywhere.

## Usage

In your Markdown file's YAML frontmatter, use the key `redirect_from` followed by a list:

```yaml
---
title: Aperture File Types
redirect_from:
  - /new-goodies-aperture-file-types-icons/
  - /goodie-updated-aperture-file-types-v11/
  - /aperture-file-types-v12-released/
  - /2008/04/aperture-file-types/
  # note: forward slashes are required
---
```

## Options

Plugin does not require to be configured but some additional customization options are available:

| Option | Default             | Description                                                                                      |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------ |
| query  | `allMarkdownRemark` | Modify the query being used to get the frontmatter data. E.g. if you use MDX, set `allMdx` here. |

Add options to the plugins's configuration object in `gatsby-config.js` like so:

```js
plugins: [
  {
    resolve: 'gatsby-redirect-from',
    options: {
      query: 'allMdx'
    }
  }
  'gatsby-plugin-meta-redirect' // make sure this is always the last one
]
```

## Plugin Development

```bash
npm i
npm start

# production build
npm run build

# publishing to npm & GitHub releases
# uses https://github.com/webpro/release-it
npm run release
npm run release minor
npm run release major
```
