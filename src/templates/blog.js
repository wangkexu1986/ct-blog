import React from "react"
import { graphql } from "gatsby"

import { Divider, Space } from "antd";
import { TagsOutlined, CarryOutOutlined, UserOutlined } from '@ant-design/icons';
import { TypeColor } from "../utils/constants";

import Layout from "../components/layout"
import Comments from "../components/comments";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Blog = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { title, date, tag, author } = post.frontmatter;
  const type = post.frontmatter.type || '其他';
  const { sourceInstanceName } = pageContext;
  return (
    <Layout>
      <div className="blog">
        <div className="blog-body">
          <div className="blog-title">{title}</div>
          <div className="blog-icon">
            <IconText icon={UserOutlined} text={author || "无名"} key="list-vertical-author" />&nbsp;&nbsp;&nbsp;
            <IconText icon={CarryOutOutlined} text={date} key="list-vertical-date" />&nbsp;&nbsp;&nbsp;
            <IconText icon={TagsOutlined} text={tag} key="list-vertical-tag" />
          </div>
          {sourceInstanceName === 'blog' && <Divider style={{color: TypeColor[type]}} plain>{type}</Divider>}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <div className="blog-index">
          <strong>目录</strong>
          <div className="toc-nav" dangerouslySetInnerHTML={{ __html: post.tableOfContents }}/>
        </div>
      </div>
      <Comments />
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
        author
      }
      tableOfContents
      id
    }
  }
`;
