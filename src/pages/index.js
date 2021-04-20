import React from 'react';

import Layout from '../components/layout';
import Nav from '../components/nav'

const Index = ({ location }) => {
  return (
    <Layout title='主页' location={ location }>
      <Nav/>
      <div> 主页 </div>
    </Layout>
  )
};

export default Index;
