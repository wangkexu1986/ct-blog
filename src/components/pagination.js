import React from 'react';
import { Pagination } from 'antd';
import { navigate } from 'gatsby';

const Page = (props) => {
  const { pagePath, category, page, total, pageSize } = props;
  let path = `/${pagePath}`;
  if (category) {
    path = `/${pagePath}/${category}`;
  }
  return (
    <Pagination
      current={page}
      total={total}
      pageSize={pageSize}
      onChange={
        (p) => navigate(`${path}/${p}`)}/>
  );
};

export default Page;