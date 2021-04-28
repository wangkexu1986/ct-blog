import React from 'react';
import { Link, graphql } from "gatsby";

import Layout from '../components/layout';

const Note = ({ data, location, pageContext }) => {
  const contents = data.dir.distinct;
  const note = data.note.edges[0] || { node: {} };
  return (
    <Layout title='读书笔记' location={ location }>
      <div className="blog">
        <div className="blog-index">
          <strong>目录</strong>
          {contents.map((dir, index) => {
            const [content, path] = dir.split('/');
            return <div className="toc-nav" key={dir}>
              <Link to={`/notes/${content}/${index+1}`}>{path}</Link>
            </div>
          })}
        </div>
        <div className="blog-body">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: note.node.html }} />
        </div>
      </div>
    </Layout>
  )
};

export default Note;

export const indexQuery = graphql`
  query NoteAndDir($dir: String, $filePath: String){
    dir: allFile(
      filter: {relativeDirectory: {regex: $dir}, sourceInstanceName: {eq: "notes"}}
    ) {
      distinct(field: relativeDirectory)
    }
    note: allMarkdownRemark(
      filter: {fields: {slug: {eq: $filePath}}}
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`;

