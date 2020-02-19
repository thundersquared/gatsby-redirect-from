const chalk = require('chalk');

exports.createPages = ({graphql, actions}, pluginOptions) => {
    const {createRedirect} = actions;

    const markdownQuery = pluginOptions.query || 'allMarkdownRemark';

    return new Promise((resolve, reject) => {
        resolve(
            graphql(`
                {
                    q: ${markdownQuery}(
                        filter: {
                            frontmatter: {
                                redirect_from: {
                                    ne: null
                                }
                            }
                        }
                    ) {
                        edges {
                            node {
                                frontmatter {
                                    redirect_from
                                    slug
                                }
                            }
                        }
                    }
                }
            `).then(result => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                }

                const allPosts = result.data.q.edges;

                const redirects = [];

                // For all posts with redirect_from frontmatter,
                // extract all values and push to redirects array
                allPosts.forEach(post => {
                    redirects.push({
                        from: post.node.frontmatter.redirect_from,
                        to: post.node.frontmatter.slug,
                        permanent: post.node.frontmatter.permanent ? post.node.frontmatter.permanent : false,
                    });
                });

                // Create redirects from the just constructed array
                redirects.forEach(({from, to, permanent}) => {
                    // iterate through all `from` array items
                    from.forEach(from => {
                        createRedirect({
                            fromPath: from,
                            toPath: to,
                            isPermanent: permanent,
                            redirectInBrowser: true,
                        });
                    });
                });

                resolve(
                    console.log(`${chalk.green('success')} create redirects`), // eslint-disable-line no-console
                );
            }),
        );
    });
};
