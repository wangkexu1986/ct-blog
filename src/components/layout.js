import * as React from 'react'
import { Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

import SEO from './seo';
import Header from './header';

const { Content, Footer } = Layout;
deckDeckGoHighlightElement();

const CLayout = ({ title, children, location }) => {
  return (
    <Layout>
      <SEO title={title} description={title}/>
      <Header location={location} />
      <Content className="layout-container">
        {children}
      </Content>
      <Footer className="footer">
        <div className="footer-wrapper">
          <div className="copyright">
            CT-3G 技术博客 ©2021 DAC<br/>
          </div>
          <div className="links">
            <a href="https://github.com/DreamArtsChina/ct-blog" className="footer-link" target="_blank">
              <GithubOutlined />
            </a>
          </div>
        </div>
      </Footer>
    </Layout>
  )
};

export default CLayout;
