import React from 'react';
import { List, Space } from 'antd';
import { CarryOutOutlined, MessageOutlined, LikeOutlined, FontSizeOutlined, TagsOutlined } from '@ant-design/icons';
import { Link, graphql } from "gatsby"

import Layout from '../components/layout';
import Nav from '../components/nav';
import Pagination from '../components/pagination';
import G1 from '../components/g1';
import G2 from '../components/g2';
import G3 from '../components/g3';

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
      <Nav location={location}/>
      <div className="blogs">
        <div className="blog-content">
          <List
            itemLayout="vertical"
            size="large"
            dataSource={posts}
            renderItem={item => {
              const post = item.node.childrenMarkdownRemark[0];
              const { title, date, tag } = post.frontmatter;
              return (
                <List.Item
                  key={title}
                  actions={[
                    <IconText icon={CarryOutOutlined} text={date} key="list-vertical-date" />,
                    <IconText icon={FontSizeOutlined} text={`${post.wordCount.words || 0} 字`} key="list-vertical-word-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    <IconText icon={LikeOutlined} text="10" key="list-vertical-link" />,
                    <IconText icon={TagsOutlined} text={tag} key="list-vertical-tag" />,
                  ]}
                >
                  <div className="blog-title">
                    <h2 >
                      <Link to={post.fields.slug}>{title}</Link>
                    </h2>
                    <p>{post.excerpt}</p>
                  </div>
                </List.Item>
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

