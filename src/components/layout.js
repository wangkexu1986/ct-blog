import * as React from 'react'
import { Layout } from 'antd';

import SEO from './seo';
import Header from './header';
import Footer from './footer';

const { Content } = Layout;

const CLayout = ({ title, children, location }) => {
  return (
    <Layout className="layout-container">
      <SEO title={title} />
      <Header location={location} />
      <Content>{children}</Content>
      <Footer/>
    </Layout>
  )
};

export default CLayout;
