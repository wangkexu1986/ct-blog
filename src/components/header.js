import React, { useState, useEffect } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Menu, Layout, Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;

const menu = [
  { name: '主页', href: `${process.env.GATSBY_SITE_BASE_URL}`},
  { name: '力扣解题', href: `${process.env.GATSBY_SITE_BASE_URL}leetcode` },
  { name: '读书笔记', href: `${process.env.GATSBY_SITE_BASE_URL}notes` },
  { name: '编码规范', href: `${process.env.GATSBY_SITE_BASE_URL}styles` },
  { name: '好书推荐', href: `${process.env.GATSBY_SITE_BASE_URL}books` },
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

  useEffect(() => {
    setSelectedMenu([pathname]);
  }, [pathname]);
  return (
    <Header className="header">
      <Row gutter={24} className="header-container">
        <Col span={3} offset={1}>
          <div className="logo">{site.siteMetadata.title}</div>
        </Col>
        <Col span={12}>
          <Menu mode="horizontal" selectedKeys={selectedMenu}>
            {menu.map((m) =>
              <Menu.Item key={m.href}>
                <Link to={m.href}>{m.name}</Link>
              </Menu.Item>
            )}
          </Menu>
        </Col>
        <Col span={8}>
          <Input size="large" placeholder="检索" prefix={<SearchOutlined />} />
        </Col>
      </Row>


    </Header>
  )
};

export default CHeader;
