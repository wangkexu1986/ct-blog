import React from 'react';
import { Card } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';

function G3() {
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
    <div className="g3">
      <Card title="月次投稿" extra={<span>2021</span>}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  )
}

export default G3;
