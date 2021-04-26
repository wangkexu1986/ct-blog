import React from 'react';
import { Card } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';

function G1() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
          }
        }
      }
    `
  );

  return (
    <div className="g1">
      <Card title="投稿字数" extra={<span>2021年</span>}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  )
}

export default G1;
