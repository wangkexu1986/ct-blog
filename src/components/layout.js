import * as React from 'react'
import { Layout } from 'antd';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

import SEO from './seo';
import Header from './header';

const { Content, Footer } = Layout;
deckDeckGoHighlightElement();

const CLayout = ({ title, children, location }) => {
  return (
    <Layout>
      <SEO title={title} />
      <Header location={location} />
      <Content className="layout-container">{children}</Content>
      <Footer className="footer">CT-3G 技术博客 ©2021 DAC</Footer>
    </Layout>
  )
};

export default CLayout;
