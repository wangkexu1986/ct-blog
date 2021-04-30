import * as React from 'react'
import { Result } from 'antd';
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title='404: 出错了' />
      <Result
        status="404"
        title="404"
        subTitle="您访问的网页不存在. 请点击主页"
      />,
    </Layout>
  )
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default NotFoundPage;
