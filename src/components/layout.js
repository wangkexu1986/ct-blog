import * as React from 'react'

import SEO from './seo';
import Header from './header';
import Footer from './footer';

import '../styles/index.css';

const Layout = ({ title, children }) => {

  return (
    <div>
      <SEO title={title} />
      <Header />
      <div>{children}</div>
      <Footer/>
    </div>
  )
};

export default Layout;
