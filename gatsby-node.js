const { createFilePath } = require("gatsby-source-filesystem");

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
  await createPost({ actions, graphql });
};
