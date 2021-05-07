import React from 'react';
import { Link, graphql } from "gatsby";
import {Space} from "antd";
import { CarryOutOutlined, UserOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
import Layout from '../components/layout';

const Note = ({ data, location, pageContext }) => {
  const contents = data.dir.distinct;
  const note = data.note.edges[0] || { node: { frontmatter: {} } };
  const { name } = pageContext;
  const { title, author, date } = note.node.frontmatter;
  return (
    <Layout title={title} location={ location }>
      <div className="note">
        <div className="note-index">
          <h2>{name}</h2>
          {contents.map((dir, index) => {
            const [content, path] = dir.split('/');
            return <div className="note-nav" key={dir}>
              <Link to={`/notes/${content}/${index+1}`}>{path}</Link>
            </div>
          })}
        </div>
        <div className="note-body">
          <div className="blog-icon">
            <IconText icon={UserOutlined} text={author || "无名"} key="list-vertical-author" />,
            <IconText icon={CarryOutOutlined} text={date} key="list-vertical-date" />
          </div>
          <div className="note-content" dangerouslySetInnerHTML={{ __html: note.node.html }} />
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
            date
            author
          }
          html
        }
      }
    }
  }
`;

