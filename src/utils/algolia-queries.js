const indexName = `Pages`;

const pageQuery = `{
  pages: allFile(
    filter: {sourceInstanceName: {eq: "blog"}, childrenMarkdownRemark: {elemMatch: {html: {ne: ""}}}}
  ) {
    edges {
      node {
        id
        childrenMarkdownRemark {
          frontmatter {
            title
          }
          fields {
            slug
          }
          excerpt(pruneLength: 5000)
        }
      }
    }
  }
}`;

function pageToAlgoliaRecord({ node: { id, childrenMarkdownRemark } }) {
  const { frontmatter, fields, ...rest } = childrenMarkdownRemark[0];
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

module.exports = queries;
