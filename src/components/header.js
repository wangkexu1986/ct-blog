import React, { useState, useEffect } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Menu, Layout, Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;

const menu = [
  { name: '主页', href: '/'},
  { name: '力扣解题', href: '/leetcode' },
  { name: '读书笔记', href: '/notes' },
  { name: '规范', href: '/styles' },
  { name: '好书推荐', href: '/books' },
];

const CHeader = ({ location }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  const { pathname } = location || {};
  const [selectedMenu, setSelectedMenu] = useState(['/']);
  console.log(3, location, pathname);
  useEffect(() => {
    setSelectedMenu([pathname]);
  }, [pathname]);
  return (
    <Header className="header">
      <Row gutter={24}>
        <Col span={3} offset={1}>
          <div className="logo">{site.siteMetadata.title}</div>
        </Col>
        <Col span={10}>
          <Menu mode="horizontal" selectedKeys={selectedMenu}>
            {menu.map((m) =>
              <Menu.Item key={m.href}>
                <Link to={m.href}>{m.name}</Link>
              </Menu.Item>
            )}
          </Menu>
        </Col>
        <Col span={10}>
          <Input size="large" placeholder="检索" prefix={<SearchOutlined />} />
        </Col>
      </Row>


    </Header>
  )
};

export default CHeader;
