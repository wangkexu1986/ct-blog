const path = require("path");

const { LEET_CODE_PAGE_LIMIT } =  require('../utils/constants');

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allFile(
        filter: {sourceInstanceName: {eq: "leetcode"}}
        sort: {fields: childrenMarkdownRemark___frontmatter___date, order: DESC}
      ) {
        edges {
          node {
            childrenMarkdownRemark {
              excerpt
              fields {
                slug
              }
              frontmatter {
                date
                title
              }
            }
          }
        }
      }
    }
  `);

  const postsEdges = result.data.allFile.edges;
  Array.from({ length: postsEdges.length }).forEach((__value__, index) => {
    const pageNumber = index + 1;
    createPage({
      path: `/leetcode/${pageNumber}`,
      component: path.resolve(`./src/templates/leetcode.js`),
      context: {
        limit: LEET_CODE_PAGE_LIMIT,
        skip: index * LEET_CODE_PAGE_LIMIT,
        total: postsEdges.length,
        page: pageNumber,
        pagePath: 'leetcode',
        pageSize: LEET_CODE_PAGE_LIMIT,
      },
    });
  });
};