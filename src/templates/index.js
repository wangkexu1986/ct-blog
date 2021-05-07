import React from 'react';
import { List, Space, Divider } from 'antd';
import { CarryOutOutlined, EyeOutlined, UserOutlined, FontSizeOutlined, TagsOutlined } from '@ant-design/icons';
import { Link, graphql } from "gatsby"

import { TypeColor } from "../utils/constants";

import Layout from '../components/layout';
import Nav from '../components/nav';
import Pagination from '../components/pagination';
import G1 from '../components/g1';
import G2 from '../components/g2';
import G3 from '../components/g3';

const IconText = ({ icon, text, style }) => (
  <Space style={style}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Home = ({ data, location, pageContext }) => {
  const posts = data.allFile.edges;
  const countList = data.allPageViews.nodes || [];

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
              const { title, date, tag, author } = post.frontmatter;
              const slug = post.fields.slug;
              const view = countList.find(c => c.id === `/ct-blog${slug}`) || {};
              const type = post.frontmatter.type || '其他';
              return (
                <div className="blog-card" key={slug}>
                  <Link to={post.fields.slug}>
                    <List.Item
                      key={title}
                      actions={[
                        <IconText icon={UserOutlined} text={author || "无名"} key="list-vertical-author" />,
                        <IconText icon={CarryOutOutlined} text={date} key="list-vertical-date" />,
                        <IconText icon={FontSizeOutlined} text={`${post.wordCount.words || 0} 字`} key="list-vertical-word-o" />,
                        <IconText icon={EyeOutlined} text={ view.totalCount || 0 } key="list-vertical-message" />,
                        <IconText icon={TagsOutlined} text={tag} key="list-vertical-tag" style={{fontSize: "14px"}}/>,
                      ]}
                    >
                      <div className="blog-title">
                        <h2>{title}</h2>
                        <p>{post.excerpt}</p>
                      </div>
                    </List.Item>
                  </Link>
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

export default Home;

export const indexQuery = graphql`
  query IndexQuery($skip:Int!, $limit: Int!) {
    allFile(
      limit: $limit
      sort: {fields: childrenMarkdownRemark___frontmatter___date, order: DESC}
      skip: $skip
      filter: {sourceInstanceName: {eq: "blog"}, childrenMarkdownRemark: {elemMatch: {html: {ne: ""}}}}    
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
    allPageViews(sort: {order: DESC, fields: totalCount}) {
      nodes {
        id
        totalCount
      }
    }
  }
`;

