const path = require("path");

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
       allFile(filter: {sourceInstanceName: {in: ["leetcode", "blog"]}}) {
        edges {
          node {
            childMarkdownRemark {
              fields {
                slug
              }
            }
            sourceInstanceName
          }
        }
      }
    }
  `);

  result.data.allFile.edges.forEach(({ node }) => {
    if (node.childMarkdownRemark) {
      const post = node.childMarkdownRemark;
      createPage({
        path: post.fields.slug,
        component: path.resolve(`./src/templates/blog.js`),
        context: {
          slug: post.fields.slug,
          sourceInstanceName: node.sourceInstanceName
        },
      })
    }
  })
};

