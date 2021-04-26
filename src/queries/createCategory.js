const path = require('path');

const { BLOG_PAGE_LIMIT } =  require('../utils/constants');

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allFile(
        filter: {sourceInstanceName: {eq: "blog"}, childrenMarkdownRemark: {elemMatch: {html: {ne: ""}}}}
        sort: {fields: childrenMarkdownRemark___frontmatter___date, order: DESC}
      ) {
        group(field: childrenMarkdownRemark___frontmatter___category) {
          totalCount
          fieldValue
        }
        edges {
          node {
            childrenMarkdownRemark {
              excerpt
              fields {
                slug
              }
              frontmatter {
                category
                date
                title
              }
            }
          }
        }
      }
    }
  `);

  const postsEdges = result.data.allFile.group;
  postsEdges.forEach(group => {
    const { totalCount, fieldValue } = group;
    const pageCount = Math.ceil(totalCount / BLOG_PAGE_LIMIT);
      Array.from({ length: pageCount }).forEach((__value__, index) => {
        const pageNumber = index + 1;
        createPage({
          path: `/blog/${fieldValue}/${pageNumber}`,
          component: path.resolve(`./src/templates/category.js`),
          context: {
            limit: BLOG_PAGE_LIMIT,
            skip: index * BLOG_PAGE_LIMIT,
            total: postsEdges.length,
            page: pageNumber,
            category: fieldValue,
            pagePath: 'blog',
            pageSize: BLOG_PAGE_LIMIT,
        },
      });
    });
  });
};

