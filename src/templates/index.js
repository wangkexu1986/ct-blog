import React from 'react';
import { List, Space, Card, Statistic } from 'antd';
import { ArrowUpOutlined, MessageOutlined, LikeOutlined, FontSizeOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Link, graphql } from "gatsby"

import Layout from '../components/layout';
import Nav from '../components/nav';
import Pagination from '../components/pagination';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Home = ({ data, location, pageContext }) => {
  const posts = data.allFile.edges;
  return (
    <Layout title='主页' location={ location }>
      <Nav/>
      <div className="blogs">
        <div className="blog-content">
          <List
            itemLayout="vertical"
            size="large"
            dataSource={posts}
            renderItem={item => {
              const post = item.node.childrenMarkdownRemark[0];
              const { title } = post.frontmatter;
              return (
                <List.Item
                  key={title}
                  actions={[
                    <IconText icon={FontSizeOutlined} text={post.wordCount.words || 0} key="list-vertical-word-o" />,
                    <IconText icon={FieldTimeOutlined} text={post.timeToRead} key="list-vertical-time-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    <IconText icon={LikeOutlined} text="10" key="list-vertical-link" />,
                  ]}
                >
                  <h3>
                    <Link to={post.fields.slug}>{title}</Link>
                  </h3>
                  {post.excerpt}
                </List.Item>
              )}}
          />
          <Pagination path={`${process.env.GATSBY_SITE_BASE_URL}`} {...pageContext} />
        </div>

        <div className="blog-graph">
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

