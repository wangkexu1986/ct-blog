import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Divider, Space } from "antd";
import { TagsOutlined, CarryOutOutlined } from '@ant-design/icons';
import { TypeColor } from "../utils/constants";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Blog = ({ data }) => {
  const post = data.markdownRemark;
  const { title, date, tag, type } = post.frontmatter;
  return (
    <Layout>
      <div className="blog">
        <div className="blog-body">
          <div className="blog-title">{title}</div>
          <div className="blog-icon">
            <IconText icon={CarryOutOutlined} text={date} key="list-vertical-date" />&nbsp;&nbsp;&nbsp;
            <IconText icon={TagsOutlined} text={tag} key="list-vertical-tag" />
          </div>
          <Divider style={{color: TypeColor[type]}} plain>{type}</Divider>
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <div className="blog-index">
          <strong>目录</strong>
          <div className="toc-nav" dangerouslySetInnerHTML={{ __html: post.tableOfContents }}/>
        </div>
      </div>
    </Layout>
  )
};

export default Blog;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        tag
        type
      }
      tableOfContents
      id
    }
  }
`;
