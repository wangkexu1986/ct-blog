import React from 'react';
import {Divider, List, Space} from 'antd';
import { TagsOutlined, MessageOutlined, UserOutlined, FontSizeOutlined, CarryOutOutlined } from '@ant-design/icons';
import { Link, graphql } from "gatsby"

import { TypeColor } from "../utils/constants";
import Layout from '../components/layout';
import Nav from '../components/nav';
import Pagination from '../components/pagination';
import G1 from "../components/g1";
import G2 from "../components/g2";
import G3 from "../components/g3";

const IconText = ({ icon, text, style }) => (
  <Space style={style}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Category = ({ data, location, pageContext }) => {
  const posts = data.allFile.edges;
  return (
    <Layout title='主页' location={ location }>
      <Nav location={location}/>
      <div className="blogs">
        <div className="blog-content">
          <List
            itemLayout="vertical"
            size="large"
            dataSource={posts}
            renderItem={item => {
              const post = item.node.childrenMarkdownRemark[0];
              const { title, date, tag, author} = post.frontmatter;
              const type = post.frontmatter.type || '其他';
              return (
                <div className="blog-card">
                  <List.Item
                    key={title}
                    actions={[
                      <IconText icon={UserOutlined} text={author || "无名"} key="list-vertical-author" />,
                      <IconText icon={CarryOutOutlined} text={date} key="list-vertical-date" />,
                      <IconText icon={FontSizeOutlined} text={`${post.wordCount.words || 0} 字`} key="list-vertical-word-o" />,
                      <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                      <IconText icon={TagsOutlined} text={tag} key="list-vertical-tag" style={{fontSize: "14px"}}/>,
                    ]}
                  >
                    <div className="blog-title">
                      <h2 >
                        <Link to={post.fields.slug}>{title}</Link>
                      </h2>
                      <p>{post.excerpt}</p>
                    </div>
                  </List.Item>
                  <Divider style={{color: TypeColor[type]}} plain>{type}</Divider>
                </div>
              )}}
          />
          <Pagination path={`${process.env.GATSBY_SITE_BASE_URL}`} {...pageContext} />
        </div>
        <div className="blog-graph">
          <G1/>
          <G2/>
          <G3/>
        </div>
      </div>
    </Layout>
  )
};

export default Category;

export const categoryQuery = graphql`
  query CategoryQuery($skip:Int!, $category: String!) {
    allFile(
      limit: 10
      sort: {fields: childrenMarkdownRemark___frontmatter___date, order: DESC}
      skip: $skip
      filter: {sourceInstanceName: {eq: "blog"}, childrenMarkdownRemark: {elemMatch: {frontmatter: {category: {eq: $category}}}}}
    ) {
      edges {
        node {
          id
          childrenMarkdownRemark {
            fields {
              slug
            }
            frontmatter {
              date
              title
              tag
              type
              author
            }
            excerpt
            timeToRead
            wordCount {
              words
            }
          }
        }
      }
    }
  }
`;

