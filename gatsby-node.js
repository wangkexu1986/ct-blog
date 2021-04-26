const { createFilePath } = require("gatsby-source-filesystem");

const createIndex = require("./src/queries/createIndex");
const createCategory = require("./src/queries/createCategory");
const createPost = require("./src/queries/createPost");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
};

exports.createPages = async ({ graphql, actions }) => {
  await createIndex({ actions, graphql });
  await createCategory({ actions, graphql });
  await createPost({ actions, graphql });
};
