import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {Space} from "antd";
import { TagsOutlined, CarryOutOutlined } from '@ant-design/icons';
import Gitalk from 'gatsby-plugin-gitalk'
import '@suziwen/gitalk/dist/gitalk.css'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Blog = ({ data }) => {
  const post = data.markdownRemark;
  const { title, date, tag } = post.frontmatter;
  const gitalkConfig = {
    id: post.id,
    title: title,
  };
  return (
    <Layout>
      <div className="blog">
        <div className="blog-body">
          <div className="blog-title">{title}</div>
          <div className="blog-icon">
            <IconText icon={CarryOutOutlined} text={date} key="list-vertical-date" />&nbsp;&nbsp;&nbsp;
            <IconText icon={TagsOutlined} text={tag} key="list-vertical-tag" />
          </div>
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          <Gitalk options={gitalkConfig}/>
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
      }
      tableOfContents
      id
    }
  }
`;
