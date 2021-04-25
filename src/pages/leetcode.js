import React from 'react';
import { List, Typography, Row, Col } from 'antd';
import { Link, graphql } from "gatsby"

import Layout from '../components/layout';

const LeetCode = ({ data, location }) => {
  const leetCodeList = data.allFile.edges;

  return (
    <Layout title='力扣解题' location={ location }>
      <List
        className="leetcode"
        dataSource={leetCodeList}
        renderItem={file => {
          const item = file.node.childrenMarkdownRemark[0];
          const { date, title, level } = item.frontmatter;
          return (
            <List.Item>
              <Row span={24}>
                <Col span={20}>
                  <Typography.Text>[{level}] </Typography.Text><Link to="">{title}</Link>
                </Col>
                <Col span={4}>
                  {date}
                </Col>
              </Row>

            </List.Item>
          )
        }}/>
    </Layout>
  )
};

export default LeetCode;

export const pageQuery = graphql`
  query CodeQuery {
    allFile(
      filter: {sourceInstanceName: {eq: "leetcode"}}
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
              level
            }
          }
        }
      }
    }
  }
`;

