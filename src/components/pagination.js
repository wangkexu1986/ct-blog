import React from 'react';
import { Pagination } from 'antd';
import { navigate } from 'gatsby';

const Page = (props) => {
  const { pagePath, category, page, total, pageSize } = props;
  return (
    <Pagination
      current={page}
      total={total}
      pageSize={pageSize}
      onChange={
        (p) => navigate(`/${pagePath}/${category}/${p}`)}/>
  );
};

export default Page;