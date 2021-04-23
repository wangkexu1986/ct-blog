import * as React from 'react'
import { Layout } from 'antd';

import SEO from './seo';
import Header from './header';
import Footer from './footer';

const { Content } = Layout;

const CLayout = ({ title, children, location }) => {
  return (
    <Layout>
      <SEO title={title} />
      <Header location={location} />
      <Content className="layout-container">{children}</Content>
      <Footer/>
    </Layout>
  )
};

export default CLayout;
