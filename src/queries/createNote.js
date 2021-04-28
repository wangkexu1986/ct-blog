const path = require("path");

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allDirectory(
        filter: {sourceInstanceName: {eq: "notes"}, relativePath: {ne: ""}, relativeDirectory: {ne: ""}}
      ) {
        group(field: relativeDirectory) {
          edges {
            node {
              id
              children {
                id
              }
              relativePath
              relativeDirectory
            }
          }
        }
      }
    }
  `);

  const books = result.data.allDirectory.group;
  books.forEach(({ edges }) => {
    edges.forEach(({ node }, index ) => {
      createPage({
        path: `/notes/${node.relativeDirectory}/${ index+1 }`,
        component: path.resolve(`./src/templates/note.js`),
        context: {
          dir: `/${node.relativeDirectory}/i`,
          filePath: `/${node.relativePath}/`,
        },
      });
    });
  });
};