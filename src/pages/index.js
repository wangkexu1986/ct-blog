import React from 'react';
import { List, Space, Card, Statistic } from 'antd';
import { ArrowUpOutlined, MessageOutlined, LikeOutlined, FontSizeOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Link, graphql } from "gatsby"

import Layout from '../components/layout';
import Nav from '../components/nav'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Index = ({ data, location }) => {
  const posts = data.allFile.edges;
  return (
    <Layout title='主页' location={ location }>
      <Nav/>
      <div className="blogs">
        <List
          className="blog-content"
          itemLayout="vertical"
          size="large"
          dataSource={posts}
          renderItem={item => {
            const post = item.node.childrenMarkdownRemark[0];
            const { title, description } = post.frontmatter;
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
        <div className="blog-graph">
          <Card>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </div>
      </div>

    </Layout>
  )
};

export default Index;

export const pageQuery = graphql`
  query PostQuery {
    allFile(
    filter: {sourceInstanceName: {eq: "blog"}, childrenMarkdownRemark: {elemMatch: {html: {ne: ""}}}}
      sort: {fields: childrenMarkdownRemark___frontmatter___date, order: DESC}
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
              description
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

